import qs from 'qs'
import { API_URL, URL_USER } from '../../../constants/ConfigAPI'

// Obtenir le token du localStorage
export const getAuthToken = () => {
  const token = localStorage.getItem('authToken')
  if (!token) {
    throw new Error('Token not found in localStorage')
  }
  return token
}

// Récupérer les données utilisateur
export const fetchInfoUser = async (setDataLoading) => {
  const token = getAuthToken()

  if (setDataLoading) {
    setDataLoading(true)
  }

  const query = qs.stringify({
    fields: [
      'username',
      'email',
      'NomPrenom',
      'address',
      'Date_of_birth',
      'phone_number',
      'Language',
    ],
    populate: {
      Avatar: {
        fields: ['name', 'url', 'alternativeText'],
      },
    },
  })

  try {
    const response = await fetch(`${URL_USER}?${query}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des données utilisateur')
    }

    const data = await response.json()

    if (setDataLoading) {
      setDataLoading(false)
    }

    return data
  } catch (error) {
    console.error(error)

    if (setDataLoading) {
      setDataLoading(false)
    }
    throw error
  }
}

export const updateUser = async (data) => {
  const token = getAuthToken()

  const response = await fetch(`${URL_USER}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorText = await response.text()
    const error = new Error(errorText)
    error.status = response.status
    throw error
  }

  return response.json()
}

export const uploadAvatar = async (file) => {
  const token = getAuthToken()

  const formData = new FormData()
  formData.append('files', file)

  const response = await fetch(`${API_URL}/api/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error("Erreur lors du téléchargement de l'avatar:", errorText)
    throw new Error("Erreur lors du téléchargement de l'avatar")
  }

  const data = await response.json()

  if (Array.isArray(data) && data.length > 0) {
    return data[0]
  } else {
    throw new Error('Image data not found in upload response')
  }
}
