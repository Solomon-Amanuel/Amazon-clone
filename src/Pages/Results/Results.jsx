import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import ProductCards from "../../components/Product/ProductCards";
import classes from "./results.module.css";
import Loader from "../../components/Loader/Loader";

const Results = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const { categoryName } = useParams();
  // console.log(categoryName);

  useEffect(() => {
    setisLoading(true);
    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        setResults(res.data)
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err)
        setisLoading(false);
      });
  }, []);

  return (
    <Layout>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category/{categoryName}</p>
        <hr />
        {isLoading ? (
          <Loader />
        ) : (
          <div className={classes.products__container}>
            {results?.map((product) => (
              <ProductCards
                key={product.id}
                product={product}
                renderAdd={true}
              />
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Results;
