import React from 'react';
import { WizardData } from '../types';
import { INTEGRATION_CATEGORIES } from '../constants';
import * as LucideIcons from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  data: WizardData;
  update: (fields: Partial<WizardData>) => void;
}

export const Step6_Integrations: React.FC<Props> = ({ data, update }) => {
  const toggleIntegration = (item: string) => {
    const current = data.integrations;
    if (current.includes(item)) {
      update({ integrations: current.filter(i => i !== item) });
    } else {
      update({ integrations: [...current, item] });
    }
  };

  return (
    <div className="space-y-8 pb-4">
      {INTEGRATION_CATEGORIES.map((category, idx) => {
        const Icon = LucideIcons[category.iconName as keyof typeof LucideIcons] as React.ElementType || LucideIcons.Layers;

        return (
          <div key={idx} className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-gray-100 rounded-lg text-gray-600">
                    <Icon size={18} strokeWidth={2.5} />
                </div>
                <h3 className="font-heading font-semibold text-lg text-gray-800">{category.title}</h3>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {category.items.map((item) => {
                const isSelected = data.integrations.includes(item);
                
                return (
                  <motion.div
                    key={item}
                    onClick={() => toggleIntegration(item)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      cursor-pointer rounded-xl px-5 py-4 border text-base font-semibold transition-all duration-200
                      flex items-center justify-between gap-2
                      focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary
                      ${isSelected 
                        ? 'bg-primary/5 text-primary border-primary shadow-sm' 
                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }
                    `}
                    tabIndex={0}
                  >
                    <span className="truncate">{item}</span>
                    {isSelected && (
                        <LucideIcons.Check size={18} strokeWidth={3} className="shrink-0 text-primary" />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};