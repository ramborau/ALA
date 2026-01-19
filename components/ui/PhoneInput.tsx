import React from 'react';
import PhoneInputLib from 'react-phone-number-input';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({ 
  value, 
  onChange, 
  label, 
  className = "" 
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
          {label}
        </label>
      )}
      {/* 
         The structure is customized via Global CSS in index.html to match ShadCN.
         Class '.PhoneInput' targets the container.
         Class '.PhoneInputInput' targets the input.
      */}
      <PhoneInputLib
        international
        defaultCountry="AE"
        value={value}
        onChange={(val) => onChange(val || '')}
        placeholder="Enter phone number"
      />
    </div>
  );
};
