import React from 'react';
import Carousel from '../components/Carousel';
import Categories from '../components/Categories';
import FeaturedProducts from '../components/FeaturedProducts';
import Featured from '../components/Featured';
import Offer from '../components/Offer';
import TopRatedProduct from '../components/TopRatedProduct';

function Home(props) {
  return (
    <div>
      <Carousel />
      <Featured />
      <Categories />
      <FeaturedProducts />
      <Offer />
      <TopRatedProduct />
    </div>
  );
}

export default Home;
