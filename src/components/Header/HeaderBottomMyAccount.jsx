import React from 'react'
import DropBoxAccount from '../designLayouts/DropDownBox/DropBoxAccount'

const HeaderBottomMyAccount = () => {
  return (
    <div className="p-4 bg-white shadow-md">
      <div className="mdl:mx-10 mx-2 flex justify-between items-center">
        <div className="text-lg font-title font-semibold ">Votre compte</div>
        <div className="mr-2">
          <DropBoxAccount />
        </div>
      </div>
    </div>
  )
}

export default HeaderBottomMyAccount
