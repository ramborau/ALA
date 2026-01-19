import React from 'react';
import { WizardData } from '../types';
import { FEATURES } from '../constants';
import * as LucideIcons from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  data: WizardData;
  update: (fields: Partial<WizardData>) => void;
}

export const Step3_Features: React.FC<Props> = ({ data, update }) => {
  const toggleFeature = (id: string) => {
    const current = data.features;
    if (current.includes(id)) {
      update({ features: current.filter(f => f !== id) });
    } else {
      update({ features: [...current, id] });
    }
  };

  return (
    <div className="grid grid-cols-2 gap-5">
      {FEATURES.map((feature) => {
        const Icon = LucideIcons[feature.iconName as keyof typeof LucideIcons] as React.ElementType;
        const isSelected = data.features.includes(feature.id);

        return (
          <motion.div
            key={feature.id}
            onClick={() => toggleFeature(feature.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              relative cursor-pointer rounded-2xl p-4 border transition-all duration-200
              flex flex-row items-center gap-5 group
              focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary
              ${isSelected 
                ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10' 
                : 'border-gray-100 bg-white hover:border-primary/50 hover:shadow-md'
              }
            `}
            tabIndex={0}
          >
             <div className={`
              p-3 rounded-xl transition-colors duration-200 shrink-0
              ${isSelected ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-primary/20 group-hover:text-primary'}
            `}>
              {Icon ? <Icon size={26} strokeWidth={2.5} /> : null}
            </div>

            <div className="flex-1">
              <h3 className={`font-heading font-semibold text-lg ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                {feature.label}
              </h3>
              <p className="text-sm text-gray-400 font-medium">
                AED {feature.price}/mo
              </p>
            </div>

            <div className={`
              w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
              ${isSelected ? 'bg-primary border-primary' : 'border-gray-200 group-hover:border-primary'}
            `}>
              {isSelected && <LucideIcons.Check size={14} className="text-white" strokeWidth={4} />}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};