import React from 'react'
import './Product.css'
import { useNavigate } from 'react-router-dom';

function Product({ product }) {
  const { id, price, image, title, description } = product
  const navigateToDetails = useNavigate();
  return (
    <div className="product">
      <img src={image} alt={title} className="product-image" />
      <div>
        <h3 className="product-title">{title}</h3>
        <span className="product-price">{price} ₺</span>
      </div>

      <div className='flex-row'>
        <button onClick={() => navigateToDetails("/product-details/" + id)} className='detail-button'>Detayına Git</button>
      </div>

    </div>
  )
}

export default Product
// <p className="product-desc">{description}</p>