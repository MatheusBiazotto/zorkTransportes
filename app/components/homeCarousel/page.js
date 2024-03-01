"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function Carousel() {
  return (
    <Swiper
      autoplay={true}
      centeredSlides={true}
      spaceBetween={100}
      slidesPerView={3}
      effect="slide"
      CarouselOptions={{
        effect: "slide",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 3,
        spaceBetween: 100,
      }}
    >
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
    </Swiper>
  );
}
