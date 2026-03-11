
import React from 'react';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
  srLabel: string;
  onIcon?: React.ReactNode;
  offIcon?: React.ReactNode;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange, srLabel, onIcon, offIcon }) => {
  return (
    <button
      type="button"
      className={`${
        checked ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
      } relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
      role="switch"
      aria-checked={checked}
      onClick={onChange}
    >
      <span className="sr-only">{srLabel}</span>
      <span className="flex items-center justify-center h-full w-full absolute">
        {onIcon && <span className={`transition-opacity duration-200 ease-in-out ${checked ? 'opacity-100' : 'opacity-0'}`}>{onIcon}</span>}
        {offIcon && <span className={`transition-opacity duration-200 ease-in-out ${checked ? 'opacity-0' : 'opacity-100'}`}>{offIcon}</span>}
      </span>
      <span
        aria-hidden="true"
        className={`${
          checked ? 'translate-x-6' : 'translate-x-1'
        } inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out shadow-lg`}
      />
    </button>
  );
};

export default ToggleSwitch;
