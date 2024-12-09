import React from 'react'
import { categoryInfos } from './categoryFullInfos';
import CategoryCards from './CategoryCards';
import classes from "./category.module.css";


const Category = () => {
  return (
    <div className={classes.category__container}>
      {categoryInfos.map((singleInfo, index) => (
        <CategoryCards key={index} data={singleInfo} />
      ))}
    </div>
  );
}

export default Category