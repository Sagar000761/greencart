import React from 'react'
import useAppContext from '../context/AppContext'
import { useParams } from 'react-router-dom'
import { categories } from '../assets/assets'
import ProductCart from '../components/ProductCart'

const ProductCategories = () => {
    const {products}=useAppContext()
    const {category}=useParams()

    const searchCategory=categories.find((item)=>item.path.toLowerCase() === category )
    const filterProducts=products.filter((product)=>product.category.toLowerCase() === category)
    
  return (  
    <div className='mt-16'>
      {searchCategory && (
        <div className='flex flex-col items0-end w-max'>
          <p className='text-2xl font-medium'>{searchCategory.text.toUpperCase()}</p>
          <div className='w-16 h-0.5 bg-primary rounded-full'></div>
        </div>
      )}
      {filterProducts.length > 0 ? (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-4  mt-6'>
          {filterProducts.map((product)=>(
            <ProductCart key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className='flex items-center justify-center hh-[60vh'>
          <p className='text-2xl font-medium text-primary'>No product found in this category</p>
        </div>
      )}
    </div>
  )
}

export default ProductCategories