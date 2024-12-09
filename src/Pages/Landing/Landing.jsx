import React from "react";
import Layout from "../../components/Layout/Layout";
import Category from "../../components/Category/Category";
import Product from "../../components/Product/Product";
import Carousel from "../../components/Carousel/CarouselEffect";

const Landing = () => {
  return (
    <Layout>
      <Carousel />
      <Category />
      <Product />
    </Layout>
  );
};

export default Landing;
