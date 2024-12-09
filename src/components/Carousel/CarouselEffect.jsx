import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { img } from './images/data';
import classes from './carousel.module.css'

const CarouselEffect = () => {
  return (
    <>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {img?.map((singleImg, index) => (
          <img key={index} src={singleImg} alt="images" />
        ))}
      </Carousel>
      <div className={classes.hero__img}></div>
    </>
  );
}

export default CarouselEffect;