import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AdminRoleGuard } from 'src/auth/guards/admin-role.guard';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { GetProductsFilterDto } from 'src/dto/getProduct.dto';
import { CreateProductDto } from 'src/dto/product.dto';
import { ReviewsDto } from 'src/dto/reviews.dto';
import { GetCurrentUser } from 'src/utils/getCurrentUser.decorator';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Get()
  getAllProducts(@Query() getProductsFilterDto: GetProductsFilterDto) {
    return this.service.getAllProducts(getProductsFilterDto);
  }
  @Get('top-rated')
  getTopRatedProducts() {
    return this.service.getTopRatedProducts();
  }
  @Get(':id')
  getOneProduct(@Param('id') id: string) {
    return this.service.getOneProduct(id);
  }
  @UseGuards(AdminRoleGuard)
  @UseGuards(JwtGuard)
  @Post('')
  createProduct(@Body() createProduct: CreateProductDto) {
    return this.service.createProduct(createProduct);
  }
  @UseGuards(JwtGuard)
  @Post('/:id/reviews')
  createReviews(
    @Body() createReview: ReviewsDto,
    @Param('id') id: string,
    @GetCurrentUser() user: any,
  ) {
    return this.service.createReviews(createReview, id, user);
  }

  @UseGuards(AdminRoleGuard)
  @UseGuards(JwtGuard)
  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() updateProduct: CreateProductDto,
  ) {
    return this.service.updateProduct(id, updateProduct);
  }
  @UseGuards(AdminRoleGuard)
  @UseGuards(JwtGuard)
  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.service.deleteProduct(id);
  }
}
