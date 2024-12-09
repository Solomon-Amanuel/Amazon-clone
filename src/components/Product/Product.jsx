import React, { useEffect, useState } from 'react'
import ProductCards from './ProductCards';
import axios from 'axios'
import classes from './product.module.css'
import Loader from '../Loader/Loader';

const Product = () => {
    const [products, setProducts] = useState()
    const [isLoading, setisLoading] = useState(false);

    useEffect(() => {
      setisLoading(true);
        axios.get("https://fakestoreapi.com/products")
        .then((res)=>{
            setProducts(res.data)
            setisLoading(false);
        }).catch((err)=>{
            console.log(err);
            setisLoading(false);
        })
    }, []);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={classes.products__container}>
          {products?.map((singleProduct) => (
            <ProductCards
              product={singleProduct}
              key={singleProduct.id}
              renderAdd={true}
            />
          ))}
        </section>
      )}
    </>
  );
}

export default Product