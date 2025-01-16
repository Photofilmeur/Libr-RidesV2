import React, { useState } from 'react'
import './DropBoxAccount.css'
import DeleteAccountButton from '../buttons/DeleteButton'
import LogoutButton from '../buttons/LogoutButton'
import { logout } from '../../Account/authAPI'
import DeleteAccount from '../../Account/MyAccount/DeleteAccount'

const DropBoxAccount = () => {
  const [showDeleteAccount, setShowDeleteAccount] = useState(false)

  const handleDeleteAccountClick = () => {
    setShowDeleteAccount(true)
  }

  const handleCloseDeleteAccount = () => {
    setShowDeleteAccount(false)
  }

  return (
    <div className="">
      <label className="popup">
        <input type="checkbox" />
        <div className="burger" tabIndex="0">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <nav className="popup-window">
          <div className="flex flex-col space-y-10 mt-2 w-full">
            <LogoutButton onClick={logout} />
            <DeleteAccountButton onClick={handleDeleteAccountClick} />
          </div>
        </nav>
      </label>

      {showDeleteAccount && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <DeleteAccount handleCancel={handleCloseDeleteAccount} />
          <button
            onClick={handleCloseDeleteAccount}
            className="absolute top-4 right-4 text-gray-200"
          >
            X
          </button>
        </div>
      )}
    </div>
  )
}

export default DropBoxAccount
