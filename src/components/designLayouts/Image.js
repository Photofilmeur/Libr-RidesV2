import React from 'react'

const ImageComponent = ({ imgSrc, className }) => {
  return <img className={className} src={imgSrc} alt={imgSrc} />
}

export default ImageComponent
