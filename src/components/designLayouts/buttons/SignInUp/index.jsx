import React from 'react'
import './style.css'

const SignInUp = ({ buttonText, disabled }) => {
  return (
    <button className="custom-button" disabled={disabled}>
      {buttonText}
      <div className="arrow-wrapper">
        <div className="arrow"></div>
      </div>
    </button>
  )
}

export default SignInUp
