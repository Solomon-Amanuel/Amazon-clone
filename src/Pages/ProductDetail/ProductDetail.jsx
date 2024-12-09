import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import ProductCards from "../../components/Product/ProductCards";
import classes from './productDetail.module.css'
import Loader from "../../components/Loader/Loader";

const ProductDetail = () => {

  const [product, setproduct] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const { productId } =useParams()

  useEffect(() => {
    setisLoading(true)
    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setproduct(res.data)
        setisLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setisLoading(false)
      })
  }, [])
  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : (
        <ProductCards
          product={product}
          flex={true}
          renderDesc={true}
          renderAdd={true}
        />
      )}
    </Layout>
  );
}

export default ProductDetail;
