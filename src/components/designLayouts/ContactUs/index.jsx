import React, { useState } from 'react'
import './style.css'

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleReset = () => {
    setFormData({ name: '', email: '', message: '' })
  }

  const handleSubmit = () => {
    console.log('envoie impossible, Formulaire en cours de développement')
  }

  return (
    <div className="bg-gray-100 sm:pt-16 lg:py-12 px-4 sm:px-6 lg:px-10">
      <div className="max-w-screen-xl mx-auto text-center">
        <h2 className="xl:text-4xl lg:text-3xl xs:text-2xl font-body font-bold mb-6">
          Nous contacter
        </h2>
        <p className="xl:text-xl lg:text-lg xs:text-md mb-6 font-title">
          Vous avez des questions ou souhaitez en savoir plus sur nos produits ?
          N'hésitez pas à nous contacter.
        </p>

        <div className="flex items-center justify-center lg:pt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Informations de contact */}
            <div className="form-container">
              <div className="form flex-col space-y-8">
                <span className="heading font-body">Adresse</span>
                <p className="input font-title">123, Avenue de la Liberté</p>
                <p className="input font-title">75000 Paris, France</p>
                <p className="input font-title">
                  Téléphone : +33 1 23 45 67 89
                </p>
                <p className="input font-title">
                  Email : contact@librrides.com
                </p>
              </div>
            </div>

            {/* Formulaire de contact */}
            <div className="form-container">
              <div className="form">
                <span className="heading font-body">Envoyer un message</span>
                <input
                  placeholder="Nom"
                  type="text"
                  className="input font-title"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <input
                  placeholder="Email"
                  id="mail"
                  type="email"
                  className="input font-title"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <textarea
                  placeholder="Votre message..."
                  rows="10"
                  cols="30"
                  id="message"
                  name="message"
                  className="textarea font-title"
                  value={formData.message}
                  onChange={handleInputChange}
                />
                <div className="button-container">
                  <div
                    className="send-button font-title"
                    onClick={handleSubmit}
                  >
                    Envoyer
                  </div>
                  <div className="reset-button-container">
                    <div
                      id="reset-btn"
                      className="reset-button font-title"
                      onClick={handleReset}
                    >
                      Réinitialiser
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
