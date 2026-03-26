import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
            <img src={assets.logo} className='mb-5 w-32 ' alt="" />
            <p className='w-full md:w-2/3 text-gray-600'>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
            </p>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>Company</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
            
        </div>
        <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                <li>+1-221-351-6752</li>
                <li>raza123@gmail.com</li></ul>
               
            </div>
            <div className='sm:col-span-3'>
                <hr />
                <p className='py-5 text-sm text-center'>Copyright 2026 all rights reserved</p>
            </div>
    </div>
  )
}

export default Footer