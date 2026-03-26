import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const Collection = () => {
  const { products } = useContext(ShopContext);
  return (
    <div className='flex flex-col sm:flex-row sm:gap-10 pt-10 border-t'>
      {/* {filter-options} */}
    </div>
  )
}

export default Collection