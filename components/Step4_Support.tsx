import React from 'react';
import { WizardData } from '../types';
import { SUPPORT } from '../constants';
import * as LucideIcons from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  data: WizardData;
  update: (fields: Partial<WizardData>) => void;
}

export const Step4_Support: React.FC<Props> = ({ data, update }) => {
  const toggleSupport = (id: string) => {
    const current = data.support;
    if (current.includes(id)) {
      update({ support: current.filter(s => s !== id) });
    } else {
      update({ support: [...current, id] });
    }
  };

  return (
    <div className="space-y-4">
      {SUPPORT.map((item) => {
        const Icon = LucideIcons[item.iconName as keyof typeof LucideIcons] as React.ElementType;
        const isSelected = data.support.includes(item.id);

        return (
          <motion.div
            key={item.id}
            onClick={() => toggleSupport(item.id)}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.99 }}
            className={`
              cursor-pointer rounded-2xl p-4 border transition-all duration-200
              flex flex-row items-center gap-4 group
              focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary
              ${isSelected 
                ? 'border-primary bg-primary/5' 
                : 'border-gray-100 bg-white hover:border-primary/30'
              }
            `}
            tabIndex={0}
          >
             <div className={`
              w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-200 shrink-0
              ${isSelected ? 'bg-primary text-white' : 'bg-indigo-50 text-indigo-400 group-hover:bg-primary/20 group-hover:text-primary'}
            `}>
              {Icon ? <Icon size={22} strokeWidth={2.5} /> : null}
            </div>

            <div className="flex-1">
              <h3 className={`font-heading font-semibold text-lg ${isSelected ? 'text-gray-900' : 'text-gray-800'}`}>
                {item.label}
              </h3>
            </div>

            <div className="text-right">
              <span className={`block font-semibold text-lg ${isSelected ? 'text-primary' : 'text-gray-500'}`}>
                AED {item.price}
              </span>
              <span className="text-xs text-gray-400 uppercase">per month</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};