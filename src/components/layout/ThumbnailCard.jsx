import React from 'react'
import './ThumbnailCard.css'

const ThumbnailCard = (props) => {
  return (
    <div className='item-card' onClick={props.onClick}>
      <div className='img-box'>
        <img className='item-img' src='./pokeball.png' alt='item thumbnail'/>
      </div>
      <span className='item-name'>{props.name}</span>
    </div>
  )
}

export default ThumbnailCard