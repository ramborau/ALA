import React, { useState, useRef, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

interface Option {
  value: string;
  label: string;
  iconName?: string;
}

interface CustomSelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  icon?: keyof typeof LucideIcons;
  className?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder = "Select...",
  icon,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const MainIcon = icon ? LucideIcons[icon] as React.ElementType : null;

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`w-full ${className}`} ref={containerRef}>
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
          {label}
        </label>
      )}
      
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-full bg-white border border-gray-200 text-gray-900 font-medium rounded-xl h-14 
            flex items-center justify-between px-4
            focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary 
            hover:border-primary/50 transition-all duration-200 shadow-sm
            ${isOpen ? 'border-primary ring-4 ring-primary/10' : ''}
          `}
        >
          <div className="flex items-center gap-3 overflow-hidden">
            {MainIcon && (
                <MainIcon size={20} strokeWidth={1.5} className="text-gray-400 shrink-0" />
            )}
            
            {selectedOption ? (
              <div className="flex items-center gap-2 truncate">
                 {selectedOption.iconName && (
                   (() => {
                     const OptIcon = LucideIcons[selectedOption.iconName as keyof typeof LucideIcons] as React.ElementType;
                     return OptIcon ? <OptIcon size={16} className="text-gray-500" /> : null;
                   })()
                 )}
                 <span className="truncate">{selectedOption.label}</span>
              </div>
            ) : (
              <span className="text-gray-400 font-light">{placeholder}</span>
            )}
          </div>

          <ChevronDown 
            size={18} 
            className={`text-gray-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`} 
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 5, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="absolute z-50 top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden max-h-[280px] overflow-y-auto"
            >
              <div className="p-1">
                {options.map((option) => {
                  const isSelected = option.value === value;
                  const OptIcon = option.iconName ? LucideIcons[option.iconName as keyof typeof LucideIcons] as React.ElementType : null;

                  return (
                    <div
                      key={option.value}
                      onClick={() => {
                        onChange(option.value);
                        setIsOpen(false);
                      }}
                      className={`
                        flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer text-sm font-medium transition-colors
                        ${isSelected ? 'bg-primary/5 text-primary' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}
                      `}
                    >
                      <div className="flex items-center gap-3">
                         {OptIcon && <OptIcon size={16} className={isSelected ? 'text-primary' : 'text-gray-400'} />}
                         <span>{option.label}</span>
                      </div>
                      {isSelected && <Check size={16} className="text-primary" />}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
