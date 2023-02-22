/* eslint-disable prefer-const */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetProductsFilterDto } from 'src/dto/getProduct.dto';
import { CreateProductDto } from 'src/dto/product.dto';
import { ReviewsDto } from 'src/dto/reviews.dto';
import { Product, ProductDocument } from 'src/models/product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private ProductModel: Model<ProductDocument>,
  ) {}

  async getAllProducts(getProductsFilterDto: GetProductsFilterDto) {
    let { pageSize, pageNumber, keyword, sortBy, category } =
      getProductsFilterDto;
    pageSize = 9;
    const page = Number(pageNumber) || 1;
    keyword = keyword
      ? {
          productName: { $regex: keyword, $options: 'i' },
        }
      : {};
    category = category
      ? {
          category: { $regex: category, $options: 'i' },
        }
      : {};
    if (sortBy === 'Newest') {
      sortBy = { createdAt: -1 };
    } else if (sortBy === 'Oldest') {
      sortBy = { createdAt: 1 };
    } else if (sortBy === 'A - Z') {
      sortBy = { productName: 1 };
    } else if (sortBy === 'Z - A') {
      sortBy = { productName: -1 };
    } else if (sortBy === 'Price Low to High') {
      sortBy = { price: 1 };
    } else if (sortBy === 'Price High to Low') {
      sortBy = { price: -1 };
    }

    const count = await this.ProductModel.countDocuments({
      ...keyword,
      ...category,
    });

    const products = await this.ProductModel.find({
      ...keyword,
      ...category,
    })
      .sort(sortBy)
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    return { products, count, page, pages: Math.ceil(count / pageSize) };
  }
  async getOneProduct(id: string) {
    return this.ProductModel.findById({ _id: id });
  }
  async getTopRatedProducts() {
    const products = await this.ProductModel.find({})
      .sort({ avgRating: -1 })
      .limit(4);
    return products;
  }
  async createProduct(createProduct: CreateProductDto) {
    const { productName, imgUrl, category, price, shortDesc, description } =
      createProduct;

    const productField = {
      productName,
      imgUrl,
      category,
      price,
      shortDesc,
      description,
    };

    const product = new this.ProductModel(productField);

    try {
      return await product.save();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  async updateProduct(id: string, updateProduct: CreateProductDto) {
    const { productName, imgUrl, category, price, shortDesc, description } =
      updateProduct;

    const productField = {
      productName,
      imgUrl,
      category,
      price,
      shortDesc,
      description,
    };
    try {
      const product = this.ProductModel.findByIdAndUpdate(
        { _id: id },
        { $set: productField },
        { new: true },
      );
      return await product;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  async deleteProduct(id: string) {
    return this.ProductModel.remove({ _id: id });
  }

  async createReviews(createReview: ReviewsDto, id: string, user: any) {
    const product = await this.ProductModel.findById(id);

    const { rating, comment } = createReview;

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.userId.toString() === user._id.toString(),
      );

      if (alreadyReviewed) {
        throw new InternalServerErrorException(
          'You have already reviewed this product',
        );
      }
      product.reviews.push({
        userId: user._id,
        rating: Number(rating),
        comment: comment,
      });
      product.avgRating =
        product.reviews.reduceRight((acc, item) => item.rating + acc, 0) /
        product.reviews.length;
      try {
        return await product.save();
      } catch (error) {
        throw new InternalServerErrorException(error.message);
      }
    } else {
      throw new InternalServerErrorException('Product not found');
    }
  }
}
