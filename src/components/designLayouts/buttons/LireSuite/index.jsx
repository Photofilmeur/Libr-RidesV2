import React from 'react';
import './style.css';

const LireSuiteButton = ({ onClick, containerClass }) => {
  return (
    <label className={`container ${containerClass}`}>
      <input type="checkbox" onClick={onClick} />
      <svg
        viewBox="0 0 512 512"
        height="1em"
        xmlns="http://www.w3.org/2000/svg"
        className="chevron-down "
      >
        <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
      </svg>
      <span className="tooltip-text font-title">LIRE LA SUITE</span>
      <span className="tooltip-close font-title">FERMER</span>
    </label>
  );
};

export default LireSuiteButton;
