import React from 'react'

const CancelButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center w-1/3 px-4 py-1.5 bg-red-500 text-white border border-red-600 rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300 ease-in-out transform hover:-translate-y-0.5 text-sm"
      aria-label="Cancel"
    >
      <svg
        className="w-4 h-4 mr-1.5"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
      Cancel
    </button>
  )
}

export default CancelButton
