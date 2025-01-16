import React, { useState } from 'react'

const CustomButton = ({
  buttonText = 'Voir Plus',
  additionalStyles,
  disabled,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const baseStyle = {
    backgroundColor: isHovered ? '#000000' : '#262626',
    color: '#ffffff',
    border: `3px solid ${isHovered ? '#b81717' : '#000000'}`,
    borderRadius: isHovered ? '8px' : '0px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? '0.6' : '1',
    padding: '8px 20px',
    transition: 'all 0.5s',
  }

  const buttonStyle = { ...baseStyle, ...additionalStyles }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <div className='w-full h-full'>
      <button
        className="font-body text-lg font-bold w-[185px] h-[50px] duration-300"
        style={buttonStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        disabled={disabled}
      >
        {buttonText}
      </button>
    </div>
  )
}

export default CustomButton
