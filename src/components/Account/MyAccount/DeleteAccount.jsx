import React, { useState } from 'react'

import { getAuthToken } from './InfoUserApi'
import { URL_USER, URL_CARTME } from '../../../constants/ConfigAPI'
import { SuccessNotif, ErrorNotif } from '../../Notif&Error/Notif'

const DeleteAccount = ({ handleCancel }) => {
  const [error, setError] = useState(false)
  const [reussite, setReussite] = useState(false)

  const handleDelete = async () => {
    const token = getAuthToken()

    try {
      // 1. Supprimer le panier
      const cartResponse = await fetch(`${URL_CARTME}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })

      if (!cartResponse.ok) {
        throw new Error('Erreur lors de la suppression du panier')
      }

      // 2. Supprimer le compte
      const userResponse = await fetch(`${URL_USER}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })

      if (!userResponse.ok) {
        throw new Error('Erreur lors de la suppression du compte')
      }

      const data = await userResponse.json()
      // Gestion de la réponse après la suppression
      localStorage.removeItem('authToken')
      localStorage.removeItem('username')
      setError(false)
      setReussite(true)
      setTimeout(() => {
        window.location.href = '/Account/Login'
      }, 2000)
    } catch (error) {
      console.error(error)
      setError(true)
      setReussite(false)
    }
  }

  return (
    <div className="">
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-xl w-full mx-auto bg-gray-800 rounded-xl overflow-hidden">
          <div className="max-w-sm mx-auto pt-12 pb-8 px-5 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 mb-5 bg-gray-600 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 21"
                height="21"
                width="24"
              >
                <path
                  fill="#FF4842"
                  d="M12.0005 15C11.8027 15 11.6093 15.0587 11.4449 15.1686C11.2804 15.2784 11.1523 15.4346 11.0766 15.6173C11.0009 15.8001 10.9811 16.0011 11.0197 16.1951C11.0583 16.3891 11.1535 16.5673 11.2933 16.7071C11.4332 16.847 11.6114 16.9422 11.8054 16.9808C11.9993 17.0194 12.2004 16.9996 12.3831 16.9239C12.5659 16.8482 12.722 16.72 12.8319 16.5556C12.9418 16.3911 13.0005 16.1978 13.0005 16C13.0005 15.7348 12.8951 15.4805 12.7076 15.2929C12.52 15.1054 12.2657 15 12.0005 15ZM22.6705 16.47L14.6205 2.47003C14.3603 2.00354 13.9802 1.61498 13.5196 1.3445C13.0591 1.07401 12.5346 0.931396 12.0005 0.931396C11.4663 0.931396 10.9419 1.07401 10.4813 1.3445C10.0207 1.61498 9.64065 2.00354 9.38046 2.47003L1.38046 16.47C1.11125 16.924 0.966598 17.441 0.9611 17.9688C0.955602 18.4966 1.08945 19.0166 1.34914 19.4761C1.60883 19.9356 1.98516 20.3185 2.44014 20.5861C2.89512 20.8536 3.41264 20.9964 3.94046 21H20.0605C20.5925 21.0053 21.1164 20.8689 21.5784 20.6049C22.0403 20.341 22.4238 19.9589 22.6894 19.4978C22.9551 19.0368 23.0933 18.5134 23.09 17.9814C23.0866 17.4493 22.9418 16.9277 22.6705 16.47ZM20.9405 18.47C20.8528 18.626 20.7249 18.7556 20.5701 18.8453C20.4154 18.935 20.2393 18.9815 20.0605 18.98H3.94046C3.76157 18.9815 3.58556 18.935 3.43077 18.8453C3.27599 18.7556 3.14811 18.626 3.06046 18.47C2.97269 18.318 2.92648 18.1456 2.92648 17.97C2.92648 17.7945 2.97269 17.622 3.06046 17.47L11.0605 3.47003C11.1444 3.30623 11.2719 3.16876 11.4289 3.07277C11.5859 2.97678 11.7664 2.92599 11.9505 2.92599C12.1345 2.92599 12.315 2.97678 12.472 3.07277C12.629 3.16876 12.7565 3.30623 12.8405 3.47003L20.8905 17.47C20.9897 17.6199 21.0467 17.7937 21.0555 17.9732C21.0643 18.1527 21.0245 18.3312 20.9405 18.49V18.47ZM12.0005 7.00003C11.7352 7.00003 11.4809 7.10538 11.2933 7.29292C11.1058 7.48046 11.0005 7.73481 11.0005 8.00003V12C11.0005 12.2652 11.1058 12.5196 11.2933 12.7071C11.4809 12.8947 11.7352 13 12.0005 13C12.2657 13 12.52 12.8947 12.7076 12.7071C12.8951 12.5196 13.0005 12.2652 13.0005 12V8.00003C13.0005 7.73481 12.8951 7.48046 12.7076 7.29292C12.52 7.10538 12.2657 7.00003 12.0005 7.00003Z"
                ></path>
              </svg>
            </div>
            <h4 className="text-xl text-gray-100 font-semibold mb-5">
              Suppression du compte
            </h4>
            <p className="text-gray-300 font-medium">
              Êtes-vous sûr de vouloir supprimer définitivement votre compte et
              ses données ?
            </p>
            {error && (
              <div className="p-4">
                <ErrorNotif message="Erreur - Échec de la suppression." />
              </div>
            )}
            {reussite && (
              <div className="p-2">
                <SuccessNotif message="Succès - Votre compte a bien été supprimé" />
              </div>
            )}
          </div>
          <div className="pt-5 pb-6 px-6 text-right bg-gray-900 -mb-2">
            <button
              onClick={handleCancel}
              disabled={reussite}
              className="inline-block w-full h-auto sm:w-auto sm:h-auto py-3 px-5 mb-2 mr-4 text-center font-semibold leading-6 text-gray-200 bg-gray-500 hover:bg-gray-400 rounded-lg transition duration-200"
            >
              Annuler
            </button>

            <button
              onClick={handleDelete}
              disabled={reussite}
              className="inline-block w-full h-auto sm:w-auto sm:h-auto py-3 px-5 mb-2 text-center font-semibold leading-6 text-blue-50 bg-red-500 hover:bg-red-600 rounded-lg transition duration-200"
            >
              SUPPRIMER
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteAccount
