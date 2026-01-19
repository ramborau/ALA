import React from 'react';
import { WizardData } from '../types';
import { PLATFORMS } from '../constants';
import * as LucideIcons from 'lucide-react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

interface Props {
  data: WizardData;
  update: (fields: Partial<WizardData>) => void;
}

// Subtle brand styles for selected state + Awesome Gradients for Buttons
const BRAND_STYLES: Record<string, { bg: string, border: string, shadow: string, buttonGradient: string }> = {
  whatsapp: { 
    bg: 'bg-[#25D366]/10', 
    border: 'border-[#25D366]', 
    shadow: 'shadow-[#25D366]/10',
    buttonGradient: 'bg-gradient-to-br from-[#25D366] to-[#128C7E]'
  },
  instagram: { 
    bg: 'bg-[#E1306C]/10', 
    border: 'border-[#E1306C]', 
    shadow: 'shadow-[#E1306C]/10',
    buttonGradient: 'bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737]'
  },
  messenger: { 
    bg: 'bg-[#00B2FF]/10', 
    border: 'border-[#00B2FF]', 
    shadow: 'shadow-[#00B2FF]/10',
    buttonGradient: 'bg-gradient-to-br from-[#00c6ff] to-[#0072ff]'
  },
  tiktok: { 
    bg: 'bg-[#000000]/5', 
    border: 'border-[#000000]', 
    shadow: 'shadow-[#000000]/10',
    buttonGradient: 'bg-gradient-to-br from-[#000000] to-[#333333]'
  },
  website: { 
    bg: 'bg-blue-50', 
    border: 'border-blue-500/50', 
    shadow: 'shadow-blue-500/10',
    buttonGradient: 'bg-gradient-to-br from-blue-500 to-blue-700'
  },
  rcs: { 
    bg: 'bg-[#1A73E8]/10', 
    border: 'border-[#1A73E8]', 
    shadow: 'shadow-[#1A73E8]/10',
    buttonGradient: 'bg-gradient-to-br from-[#1A73E8] to-[#1557b0]'
  },
};

const BRAND_IMAGES: Record<string, string> = {
  whatsapp: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2048px-WhatsApp.svg.png',
  instagram: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png',
  messenger: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Facebook_Messenger_logo_2020.svg/2048px-Facebook_Messenger_logo_2020.svg.png',
  tiktok: 'https://sf-tb-sg.ibytedtos.com/obj/eden-sg/uhtyvueh7nulogpoguhm/tiktok-icon2.png',
  website: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/2048px-Google_Chrome_icon_%28February_2022%29.svg.png',
  rcs: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Google_Messages_logo.svg/2048px-Google_Messages_logo.svg.png',
};

export const Step2_Platforms: React.FC<Props> = ({ data, update }) => {
  
  const updateQuantity = (id: string, delta: number) => {
    const currentList = [...data.platforms];
    const existingIndex = currentList.findIndex(p => p.id === id);

    if (existingIndex >= 0) {
      const newQuantity = currentList[existingIndex].quantity + delta;
      if (newQuantity <= 0) {
        // Remove
        currentList.splice(existingIndex, 1);
      } else {
        // Update
        currentList[existingIndex].quantity = newQuantity;
      }
      update({ platforms: currentList });
    } else if (delta > 0) {
      // Add new
      update({ platforms: [...currentList, { id, quantity: 1 }] });
    }
  };

  const getQuantity = (id: string) => {
    return data.platforms.find(p => p.id === id)?.quantity || 0;
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {PLATFORMS.map((platform) => {
        const quantity = getQuantity(platform.id);
        const isSelected = quantity > 0;
        const styles = BRAND_STYLES[platform.id] || { 
          bg: 'bg-primary/5', 
          border: 'border-primary', 
          shadow: 'shadow-primary/10',
          buttonGradient: 'bg-gradient-to-br from-primary to-primaryDark'
        };
        const imageUrl = BRAND_IMAGES[platform.id];
        
        return (
          <motion.div
            key={platform.id}
            onClick={() => !isSelected && updateQuantity(platform.id, 1)}
            whileHover={{ scale: 1.01 }}
            className={`
              relative rounded-2xl p-4 border transition-all duration-300
              flex flex-row items-center gap-4 group cursor-pointer overflow-hidden h-24
              focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary
              ${isSelected 
                ? `${styles.bg} ${styles.border} shadow-lg` 
                : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-md'
              }
            `}
            tabIndex={0}
          >
            {/* Image Icon - No Padding, No Border, No Shadow */}
            <div className="w-14 h-14 shrink-0 flex items-center justify-center">
              {imageUrl ? (
                <img src={imageUrl} alt={platform.label} className="w-full h-full object-contain" />
              ) : (
                <LucideIcons.MessageSquare size={28} className="text-gray-400" />
              )}
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <h3 className="font-heading font-semibold text-lg leading-tight truncate text-gray-900">
                {platform.label}
              </h3>
              <p className="text-sm font-medium text-gray-400">
                AED {platform.price}/mo
              </p>
            </div>

            {/* Quantity Spinner or Select Indicator */}
            <div className="shrink-0">
                {isSelected ? (
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col items-center justify-center gap-1 bg-white/50 rounded-lg p-1 border border-black/5"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center gap-2">
                         <button 
                            onClick={() => updateQuantity(platform.id, -1)}
                            className="w-7 h-7 rounded-md bg-white border border-gray-200 text-gray-600 flex items-center justify-center hover:bg-gray-50 transition-colors focus:border-primary"
                        >
                            <Minus size={14} strokeWidth={3} />
                        </button>
                        
                        <span className="font-heading font-semibold text-lg w-5 text-center text-gray-900">
                            {quantity}
                        </span>

                        <button 
                            onClick={() => updateQuantity(platform.id, 1)}
                            className={`w-7 h-7 rounded-md text-white border-0 flex items-center justify-center shadow-md hover:opacity-90 active:scale-95 transition-all focus:border-primary ${styles.buttonGradient}`}
                        >
                            <Plus size={14} strokeWidth={3} />
                        </button>
                    </div>
                </motion.div>
                ) : (
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Plus size={20} strokeWidth={2.5} className="text-gray-300 group-hover:text-white" />
                </div>
                )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};