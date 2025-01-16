import React from 'react'

const buttonStyle = {
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  background: 'none',
  padding: 0,
  appendArrows: '.slick-arrows-container',
  zIndex: 1,
}

const svgStyle = {
  width: '24px',
  height: '24px',
}

export function NextArrow(props) {
  const { onClick } = props

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-between slick-arrows-container">
      <button
        className="text-white absolute top-1/2 transform-translate-y-1/2 right-0 h-auto w-auto"
        style={buttonStyle}
        onClick={onClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          style={svgStyle}
          onMouseEnter={(e) =>
            (e.currentTarget.querySelector('path').style.fill = 'red')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.querySelector('path').style.fill = 'white')
          }
        >
          <path
            style={{ fill: 'white', transition: 'fill 0.3s ease' }}
            d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
          />
        </svg>
      </button>
    </div>
  )
}

export function PreviousArrow(props) {
  const { onClick } = props

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-between slick-arrows-container">
      <button
        className="text-white absolute top-1/2 transform-translate-y-1/2 left-0 h-auto w-auto"
        style={buttonStyle}
        onClick={onClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          style={svgStyle}
          onMouseEnter={(e) =>
            (e.currentTarget.querySelector('path').style.fill = 'red')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.querySelector('path').style.fill = 'white')
          }
        >
          <path
            style={{ fill: 'white', transition: 'fill 0.3s ease' }}
            d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288l306.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
          />
        </svg>
      </button>
    </div>
  )
}
