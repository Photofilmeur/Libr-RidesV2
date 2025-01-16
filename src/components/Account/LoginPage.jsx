import React, { useState, useMemo, useContext } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import SingInUp from '../designLayouts/buttons/SignInUp/index'
import { authenticate } from './authAPI'
import authContext from '../../constants/authContext'
import { useNavigate } from 'react-router-dom'
import './LoginStyle.css'

function LoginPage() {
  const history = useNavigate()
  const [showPasscode, setShowPasscode] = useState(false)
  const [credentials, setCredentials] = useState({
    identifier: '',
    password: '',
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [isRequestLimitExceeded, setIsRequestLimitExceeded] = useState(false)

  const { setIsAuthenticated } = useContext(authContext)

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget
    setCredentials({
      ...credentials,
      [name]: value.trim(),
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await authenticate(credentials)
      setIsAuthenticated(true)
      setIsRequestLimitExceeded(false)
      history('/Account/MyAccount', { replace: true })
      console.log(response)
    } catch (error) {
      console.log(error)
      if (error.response && error.response.status === 429) {
        setIsRequestLimitExceeded(true)
        setErrorMessage('Trop de tentatives. Veuillez réessayer plus tard.')
        setTimeout(() => {
          setIsRequestLimitExceeded(false)
        }, 10000)
      } else {
        setErrorMessage("Erreur dans le mot de passe ou l'identifiant")
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
        <h2 className="title font-title font-bold">Connexion</h2>
        <h3 className="subtitle font-title">Entrez vos identifiants</h3>
        <br />
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-wrapper font-body">
            <input
              className="input"
              type="text"
              name="identifier"
              placeholder="Nom d'utilisateur ou Email"
              value={credentials.identifier}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              disabled={isRequestLimitExceeded} // Désactiver le champ si la limite de requêtes est dépassée
            />
            <input
              className="input"
              type={showPasscode ? 'text' : 'password'}
              name="password"
              placeholder="Mot de passe"
              value={credentials.password}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              disabled={isRequestLimitExceeded}
            />
            <button
              className="toggle-button"
              onClick={togglePasscodeVisibility}
              aria-label="Toggle passcode visibility"
              disabled={isRequestLimitExceeded}
            >
              {toggleIcon}
            </button>
          </div>

          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

          <SingInUp buttonText="Connexion" disabled={isRequestLimitExceeded} />

          <div className="flex flex-col gap-2 font-title">
            <a className="link" href="/Account/Sign-Up">
              Créer un compte
            </a>

            

            <a
              className="link text-sm"
              target="_blank"
              rel="noopener noreferrer"
              href="http://localhost:1337/admin/"
            >
              <p className="admin-link">Admin</p>
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
