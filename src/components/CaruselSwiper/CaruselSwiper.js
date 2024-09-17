import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './styles.css';

// import required modules
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';

export default function CaruselSwiper({ allCountries }) {
    return (
        <div className='mb-6'>
            <Swiper
                spaceBetween={30}
                effect={'fade'}
                navigation={true}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                  }}
                pagination={{
                    clickable: true,
                }}
                modules={[EffectFade, Navigation, Pagination, Autoplay]}
                className="mySwiper"
            >

                {allCountries.map(item => ( 
                    <SwiperSlide key={item.id}>
                        <img src={item.flag} alt='country img' width={"100%"} />
                    </SwiperSlide>
                ))}


            </Swiper>
        </div>
    );
}