import React, { useState, useRef } from 'react'
import { updateUser } from './InfoUserApi'
import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js'
import SaveButton from '../../designLayouts/buttons/SaveButton'
import CancelButton from '../../designLayouts/buttons/Cancel'
import { SuccessNotif, ErrorNotif } from '../../Notif&Error/Notif'
import ImageUpload from './ImgUpload/index'

const PersonalInfo = ({ userData, onSave, onSaveImage }) => {
  const [formData, setFormData] = useState({
    username: userData.username || '',
    NomPrenom: userData.NomPrenom || '',
    address: userData.address || '',
    Date_of_birth: userData.Date_of_birth || '',
    phone_number: userData.phone_number || '',
    Language: userData.Language || '',
    email: userData.email || '',
    Avatar: userData.Avatar || null,
  })

  const [initialData, setInitialData] = useState({ ...formData })
  const [avatarData, setAvatarData] = useState(userData.Avatar || null)
  const [errors, setErrors] = useState({ email: '', username: '' })

  const [showSuccessNotif, setShowSuccessNotif] = useState(false)
  const [showErrorNotif, setShowErrorNotif] = useState(false)
  const [errorNotifMessage, setErrorNotifMessage] = useState('')

  const imageUploadRef = useRef(null)

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value.trim(),
    })
  }

  const handleImageChange = (file) => {
    setAvatarData(file)
    setFormData({
      ...formData,
      Avatar: file,
    })
  }

  const getModifiedData = () => {
    const modifiedData = {}
    for (const key in formData) {
      if (formData[key] !== initialData[key]) {
        modifiedData[key] = formData[key]
      }
    }
    return modifiedData
  }

  const handleSave = async () => {
    const newErrors = {}

    // Validation de l'email
    if (!formData.email) {
      newErrors.email = "L'adresse email est obligatoire."
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'adresse email est invalide."
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      setShowErrorNotif(true)
      setErrorNotifMessage(Object.values(newErrors).join(' '))
      setShowSuccessNotif(false)
      return
    }

    try {
      const modifiedData = getModifiedData()
      await updateUser(modifiedData) // Appel à l'API

      setShowSuccessNotif(true)
      setShowErrorNotif(false)
      setTimeout(() => {
        setShowSuccessNotif(false)
        if (imageUploadRef.current) {
          imageUploadRef.current.resetImage()
        }
      }, 3000)

      if (onSave) {
        onSave(formData)
      }

      if (avatarData !== userData.Avatar && onSaveImage) {
        onSaveImage(true)
      }

      setInitialData({
        ...formData,
        Avatar: avatarData,
      })

      if (imageUploadRef.current) {
        await imageUploadRef.current.handleUpload()
      }
    } catch (error) {
      // Vérifiez si l'erreur est une instance d'Error et possède une propriété `status`
      if (error instanceof Error && error.status) {
        console.error('Erreur:', error.message)

        // Gestion des erreurs spécifiques basées sur le code de statut
        if (error.status === 409) {
          setErrorNotifMessage(
            "Erreur: le nom d'utilisateur ou l'adresse email est déjà prise."
          )
        } else {
          setErrorNotifMessage('Erreur lors de la mise à jour des données.')
        }
      } else {
        // Cas où l'erreur n'est pas une instance d'Error ou n'a pas de statut
        console.error('Erreur inconnue:', error)
        setErrorNotifMessage(
          'Erreur inconnue lors de la mise à jour des données.'
        )
      }

      setShowErrorNotif(true)
      setShowSuccessNotif(false)
    }
  }

  const handlePhoneChange = (value) => {
    try {
      const phoneNumber = parsePhoneNumber(value, 'FR')
      if (phoneNumber && isValidPhoneNumber(phoneNumber.number)) {
        setFormData({
          ...formData,
          phone_number: phoneNumber.formatInternational(),
        })
      } else {
        setFormData({
          ...formData,
          phone_number: value,
        })
      }
    } catch (error) {
      console.error('Erreur lors du formatage du numéro de téléphone:', error)
      setFormData({
        ...formData,
        phone_number: value,
      })
    }
  }

  const isFormModified =
    JSON.stringify(formData) !== JSON.stringify(initialData)
  const isAvatarModified = avatarData !== userData.Avatar

  const showSaveCancelButtons = isFormModified || isAvatarModified

  const handleCancel = () => {
    setFormData(initialData)
    setAvatarData(userData.Avatar)

    setShowErrorNotif(false)
    setShowSuccessNotif(false)

    if (imageUploadRef.current) {
      imageUploadRef.current.resetImage()
    }
  }

  if (!userData) {
    return <div>Données utilisateur introuvable</div>
  }

  return (
    <div>
      <div className="flex flex-col items-center mdl:items-start">
        <h2 className="text-2xl font-title font-semibold mb-6">
          Informations personnelles
        </h2>
        <p className="text-gray-600 mb-10 text-center mdl:text-left">
          Gérez vos informations personnelles, y compris les numéros de
          téléphone et l'adresse e-mail où vous pouvez être contacté.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg shadow-md">
          <h4 className="text-sm font-semibold text-gray-700 font-body">
            Nom Utilisateur
          </h4>
          <input
            className="text-gray-800 font-body w-full"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username}</p>
          )}
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow-md">
          <h4 className="text-sm font-semibold text-gray-700 font-body">
            Nom & Prénom
          </h4>
          <input
            className="text-gray-800 font-body w-full"
            type="text"
            name="NomPrenom"
            value={formData.NomPrenom}
            onChange={handleChange}
          />
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow-md">
          <h4 className="text-sm font-semibold text-gray-700">Adresse</h4>
          <input
            className="text-gray-800 font-body w-full"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow-md">
          <h4 className="text-sm font-semibold text-gray-700">
            Date de Naissance
          </h4>
          <input
            className="text-gray-800 font-body w-full"
            type="date"
            name="Date_of_birth"
            value={formData.Date_of_birth}
            onChange={handleChange}
          />
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow-md">
          <h4 className="text-sm font-semibold text-gray-700">Langage</h4>
          <input
            className="text-gray-800 font-body w-full"
            type="text"
            name="Language"
            value={formData.Language}
            onChange={handleChange}
          />
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow-md">
          <h4 className="text-sm font-semibold text-gray-700">Adresse Mail</h4>
          <input
            className="text-gray-800 font-body w-full"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow-md">
          <h4 className="text-sm font-semibold text-gray-700">
            Numéro de Téléphone
          </h4>
          <input
            className="text-gray-800 font-body w-full"
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={(e) => handlePhoneChange(e.target.value)}
          />
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow-md">
          <ImageUpload ref={imageUploadRef} onImageChange={handleImageChange} />
        </div>
      </div>
      {showSaveCancelButtons && (
        <div className="mt-5 flex justify-between space-x-4">
          <SaveButton onClick={handleSave} />
          <CancelButton onClick={handleCancel} />
        </div>
      )}
      <div
        className={`transition-opacity duration-500 ease-in-out p-4 ${
          showErrorNotif
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4'
        }`}
      >
        {showErrorNotif && <ErrorNotif message={errorNotifMessage} />}
      </div>
      <div
        className={`transition-opacity duration-500 ease-in-out p-2 ${
          showSuccessNotif
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4'
        }`}
      >
        {showSuccessNotif && (
          <SuccessNotif message="Données enregistrées avec succès !" />
        )}
      </div>
    </div>
  )
}

export default PersonalInfo
