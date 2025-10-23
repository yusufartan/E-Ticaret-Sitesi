import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../../redux/slices/productSlice'
import Product from './Product'
import './Product.css'

function ProductList() {
  const dispatch = useDispatch()
  const { products, loading, error } = useSelector((store) => store.product)

  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])

  if (loading) return <p className="loading">Ürünler yükleniyor...</p>
  if (error) return <p className="error">Bir hata oluştu: {error}</p>

  return (
    <div className="product-list">
      {products?.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductList
