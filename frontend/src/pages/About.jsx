import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from './../components/NewsLetterBox';

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
         <Title text1={'ABOUT'} text2={'US'}/>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
           <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
           <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
           <p>We are dedicated to providing a seamless and reliable online shopping experience with quality products at the best prices. Our goal is to make shopping easy, fast, and trustworthy for every customer. Your satisfaction is our top priority.
</p>
           <p>We continuously update our collection to bring you the latest trends and best deals. With secure payments and quick delivery, we ensure a hassle-free experience every time you shop with us.</p>
            <b className='text-gray-800'>Our Mission</b>
            <p>Our mission is to simplify online shopping by offering high-quality products, affordable prices, and a smooth user experience. We aim to build trust with our customers through reliable service, secure transactions, and timely delivery. Our focus is to continuously improve and bring value to every customer we serve.
</p>
           </div>
           </div>
           <div className='text-xl py-4'>
             <Title text1={'WHY'} text2={'CHOOSE US'}/>
           </div>
           <div className='flex flex-col md:flex-row text-sm mb-20'>
             <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
               <b>Quality Assurance</b>
               <p className='text-gray-600'>We are committed to maintaining the highest standards of quality across all our products. Each item goes through strict quality checks to ensure durability, reliability, and customer satisfaction. Our goal is to deliver products you can trust, every single time.
</p>
             </div>
             <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
               <b>Convenience</b>
               <p className='text-gray-600'>We prioritize your convenience by creating a smooth and effortless shopping experience. From easy navigation to quick checkout and fast delivery, every step is designed to save your time and make shopping simple. Our goal is to make everything you need just a few clicks away.</p>
             </div>
             <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
               <b>Exceptional Customer Service</b>
               <p className='text-gray-600'>Our external customer service team is dedicated to providing prompt and helpful support whenever you need it. We ensure clear communication, quick resolution of issues, and a friendly experience across all channels. Your satisfaction and trust are at the heart of everything we do.</p>
             </div>
           </div>
            <NewsLetterBox />
      </div>
   
  )
}

export default About