import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { fetchProducts } from '../redux/slices/productSlice'
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {
  
  const dispatch = useDispatch()
  const {allProducts,loading,errorMsg} = useSelector(state=>state.productReducer)
  console.log(allProducts,loading,errorMsg);

  const [currentPage,setCurrentPage]=useState(1)
  const productsPerPage=8
  const totalPages =Math.ceil(allProducts?.length/productsPerPage)
  const currentPageProductLastIndex =currentPage* productsPerPage
  const currentPageProductFirestIndex =currentPageProductLastIndex- productsPerPage
  const currentPageProduct =allProducts?.slice(currentPageProductFirestIndex,currentPageProductLastIndex)
  

  useEffect(()=>{
    dispatch(fetchProducts())
  },[])


  const navigateToNext =()=>{
       if(currentPage!=totalPages){
        setCurrentPage(currentPage+1)
       }
  }

  const navigateToBack =()=>{
       if(currentPage!=1){
        setCurrentPage(currentPage-1)
       }
  }

  return (
  <>
  <Header insideHome={true}/>
  <div style={{paddingTop:'100px'}} className='container px-4 mx-auto grow'>  
    {loading ? (
      <div className='flex justify-center items-center text-lg'>
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" width={"200px"} height={"200px"} alt="" />
      </div>
    ) : (
    <><div className='grid grid-cols-4 gap-4'>
       { allProducts?.length>0 ? 
       currentPageProduct.map((product) =>(
        <div key={product?.id} className='rounded border p-2 shadow'>
            <img width={'100%'} height={'200px'} src={product?.thumbnail} alt="" />
            <div className='text-center'>
                <h3 className='text-xl font-bold'>{product?.title}</h3>
                <Link to={`/${product?.id}/view`} className='bg-blue-400 rounded p-1 mt-3 text-white inline-block'>View More....</Link>
            </div>
        </div>
       ))
        :
        <div className='flex justify-center items-center font-bold text-red-600 my-5 text-lg'>
          Products not found....
        </div>
        
        }
    </div>
    <div className='text-2xl text-center font-bold mt-20'>
      <span onClick={navigateToBack} className='cursor-pointer'><i className='fa-solid fa-backward me-5'></i></span>
      <span>{currentPage}of{totalPages}</span>
      <span onClick={navigateToNext} className='cursor-pointer'><i className='fa-solid fa-forward me-5'></i></span>
    </div>
    </>
    )}
    
  </div>
 
  </> 

  );

};

export default Home