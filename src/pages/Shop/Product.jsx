import React from 'react'
import GlobalProduct from '../../components/Products/GlobalProduct'
import HeaderBottomProduct from '../../components/Header/HeaderBottomProduct'
import Footer from '../../components/Footer/index'

function Product() {
  return (
    <div className="w-full mx-auto">
      <HeaderBottomProduct />
      <GlobalProduct />
      <Footer />
    </div>
  )
}
export default Product
