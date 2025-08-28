import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToWishlist } from '../redux/slices/wishlistSlice'
import { addToCart } from '../redux/slices/cartSlice'

const View = () => {
 
 
 const userCart = useSelector(state=>state.cartReducer)
  const dispatch = useDispatch()
  const userWishlist = useSelector(state=>state.wishlistReducer)

  const [product,setProduct] = useState({})
  const {id} = useParams()
  console.log(id);
  const {allProducts} = useSelector(state=>state.productReducer)
  console.log(allProducts);


  useEffect(()=>{
    if(sessionStorage.getItem("allProducts")){
      const allProducts = JSON.parse(sessionStorage.getItem("allProducts"))
      setProduct(allProducts.find(item=>item.id==id))
    }
    
  },[])
  console.log(product);

  const handleWishlist=()=>{
    const existingWishlist = userWishlist?.find(item=>item?.id==id)
    if(existingWishlist){
      alert("Product Already Existing in wishlist")
    }else{
      dispatch(addToWishlist(product))
      alert("Product added to wishlist")
    }

  }

  const handleCart=()=>{
    dispatch(addToCart(product))
    const existingProduct = userCart?.find(item=>item?.id==id)
    if(existingProduct){
      alert("Product Quantity incremented")
    }else{
     
      alert("Product added to cart")
    }

  }
  
  
  return (
    <>
      <Header />
      <div className='flex flex-col mx-5 grow'>
        <div className='grid grid-cols-2 items-center h-screen'>
          <img width={"600px"} src={product?.thumbnail} alt="" />
         
          

          <div>
            <h3 className='font-bold'>{product?.id}</h3>
            <h3 className='text-5xl font-bold'>{product?.title}</h3>
            <h3 className='font-bold text-red-500 text-2xl'>{product?.price}</h3>
            <h3 >{product?.brand}</h3>
            <h3>{product?.category}</h3>
            <p>
              <span className='font-bold'>Description</span>:
              {product?.description}
            </p>
            <h3 className="font-bold">Client Reviews</h3>
            {
              product?.reviews?.length>0 ?
              product?.reviews?.map(item=>(
                <div key={item.date} className="shadow border rounded p-2 mb-2">
                  <h5>
                    <span className="font-bold">
                      {item?.reviewName}
                    </span> :
                    <span>{item?.comment}</span>
                  </h5>
                  <p>Rating : {item?.rating} <i className="fa-solid fa-star text-yellow-400"></i></p>
                </div>
              )):
              <div className="font-bold text-red-600">No reviews yet!!</div>
            }
           
          </div>


        </div>
         <div className='mt-2'>
              <button onClick={handleWishlist} className='bg-blue-700 rounded text-white p-2 me-5'>ADD TO WISHLIST</button>
              <button onClick={handleCart} className='bg-blue-700 rounded text-white p-2'>ADD TO CART</button>

            </div>

      </div>
    </>
  )
}

export default View