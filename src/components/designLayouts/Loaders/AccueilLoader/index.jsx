import React from 'react'
import './style.css'

const AccueilLoader = () => {
  return (
    <div className="h-screen bg-black flex flex-col justify-center items-center">
      {/* Premier loader */}
      <span className="loader"></span>

      {/* Deuxième loader avec effet "glitch" */}
      <div className="glitch-container">
        <div data-glitch="Chargement..." className="glitch">
          Chargement...
        </div>
      </div>
    </div>
  )
}

export default AccueilLoader
