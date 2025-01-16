import React, { useState, useMemo, useContext } from 'react'
import axios from 'axios'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import SingInUp from '../designLayouts/buttons/SignInUp/index'
import { useNavigate } from 'react-router-dom'
import RegisterAPI from './RegiAPI'
import './LoginStyle.css'
import { authenticate } from './authAPI'
import authContext from '../../constants/authContext'
import { URL_USER } from '../../constants/ConfigAPI'

function RegisterPage() {
  const { setIsAuthenticated } = useContext(authContext)
  const history = useNavigate()
  const [showPasscode, setShowPasscode] = useState(false)
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: '',
    role: 'Authenticated',
  })
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isBlocked, setIsBlocked] = useState(false)

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget

    if (name === 'confirmPassword') {
      setConfirmPassword(value.trim()) // Mise à jour de l'état pour la confirmation du mot de passe
    } else {
      setCredentials({
        ...credentials,
        [name]: value.trim(),
      })
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    // Vérifier que le mot de passe et la confirmation sont identiques
    if (credentials.password !== confirmPassword) {
      setErrorMessage('Les mots de passe ne correspondent pas.')
      return
    }

    try {
      const { cartId, token } = await RegisterAPI(credentials)
      await authenticate({
        identifier: credentials.email,
        password: credentials.password,
      })
      setIsAuthenticated(true)
      await axios.put(
        `${URL_USER}`, // URL pour mettre à jour l'utilisateur
        { carts: cartId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      history('/Account/Login') // Redirection vers la page de compte
      setIsBlocked(false)
      console.log('Inscription et connexion réussies')
    } catch (error) {
      console.error('ERROR', error)
      if (error.response && error.response.status === 429) {
        setIsBlocked(true)
        setErrorMessage('Trop de tentatives, veuillez réessayer plus tard.')
        setTimeout(() => {
          setIsBlocked(false)
        }, 10000)
      } else {
        setErrorMessage(error.message || "Une erreur inconnue s'est produite.")
      }
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleSubmit(event)
    }
  }

  const togglePasscodeVisibility = (event) => {
    event.preventDefault()
    setShowPasscode(!showPasscode)
  }

  const toggleIcon = useMemo(
    () => (showPasscode ? <FaEyeSlash /> : <FaEye />),
    [showPasscode]
  )

  return (
    <div className="body">
      <div className="login">
        <h2 className="title font-title font-bold">Inscription</h2>
        <h3 className="subtitle font-title">Entrez vos identifiants</h3>
        <br />
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-wrapper font-body">
            <input
              className="input"
              type="text"
              name="username"
              placeholder="Nom d'utilisateur"
              value={credentials.username}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              disabled={isBlocked}
            />
            <input
              className="input"
              type="text"
              name="email"
              placeholder="Email"
              value={credentials.email}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              disabled={isBlocked}
            />
            <input
              className="input"
              type={showPasscode ? 'text' : 'password'}
              name="password"
              placeholder="Mot de passe"
              value={credentials.password}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              disabled={isBlocked}
            />
            <input
              className="input"
              type={showPasscode ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirmation mot de passe"
              value={confirmPassword}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              disabled={isBlocked}
            />
            <button
              className="toggle-button "
              onClick={togglePasscodeVisibility}
              aria-label="Toggle passcode visibility"
              disabled={isBlocked}
            >
              {toggleIcon}
            </button>
          </div>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <SingInUp buttonText="S'inscrire" disabled={isBlocked} />
          <div className="flex flex-col gap-2 font-title">
            <a className="link" href="/Account/Login">
              J'ai déjà un compte
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage
