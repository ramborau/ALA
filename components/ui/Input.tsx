import React from 'react';
import * as LucideIcons from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement> {
  label?: string;
  icon?: keyof typeof LucideIcons;
  error?: string;
  as?: 'input' | 'select';
  options?: { value: string; label: string }[];
}

export const Input: React.FC<InputProps> = ({ 
  label, 
  icon, 
  className = '', 
  error, 
  as = 'input',
  options,
  ...props 
}) => {
  const IconComponent = icon ? LucideIcons[icon] as React.ElementType : null;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
          {label}
        </label>
      )}
      <div className="relative group">
        {IconComponent && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors duration-200 pointer-events-none z-10">
            <IconComponent size={20} strokeWidth={1.5} />
          </div>
        )}
        
        {as === 'select' ? (
          <select
            className={`w-full bg-white border border-gray-200 text-gray-900 font-medium rounded-xl h-14 ${IconComponent ? 'pl-12' : 'pl-4'} pr-10 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary hover:border-primary/50 transition-all duration-200 appearance-none cursor-pointer shadow-sm ${className}`}
            {...props as any}
          >
            {options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            className={`w-full bg-white border border-gray-200 text-gray-900 font-medium rounded-xl h-14 ${IconComponent ? 'pl-12' : 'pl-4'} pr-4 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary hover:border-primary/50 transition-all duration-200 shadow-sm placeholder:text-gray-400 placeholder:font-light ${className}`}
            {...props}
          />
        )}

        {as === 'select' && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none transition-colors group-hover:text-gray-600">
            <LucideIcons.ChevronDown size={18} strokeWidth={1.5} />
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{error}</p>}
    </div>
  );
};