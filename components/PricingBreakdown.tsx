import React, { useState, useEffect } from 'react';
import { WizardData } from '../types';
import { PLATFORMS, FEATURES, SUPPORT, WHATSAPP_CHANNEL_PRICE } from '../constants';
import { Counter } from './ui/Counter';
import { Check, ShieldCheck, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  data: WizardData;
}

export const PricingBreakdown: React.FC<Props> = ({ data }) => {
  const [expandedSection, setExpandedSection] = useState<string>('platforms');

  // Auto-expand sections as they get populated if the current one is empty/irrelevant
  useEffect(() => {
    if (data.platforms.length > 0 && expandedSection !== 'platforms') return;
    if (data.platforms.length === 0 && data.features.length > 0 && expandedSection === 'platforms') {
        setExpandedSection('features');
    }
  }, [data.platforms.length, data.features.length]);

  const toggleSection = (section: string) => {
    setExpandedSection(prev => prev === section ? '' : section);
  };

  // Calculations
  const platformCost = data.platforms.reduce((acc, item) => {
    const platform = PLATFORMS.find(p => p.id === item.id);
    return acc + ((platform?.price || 0) * item.quantity);
  }, 0);

  const featureCost = data.features.reduce((acc, fid) => {
    const item = FEATURES.find(f => f.id === fid);
    return acc + (item?.price || 0);
  }, 0);

  const supportCost = data.support.reduce((acc, sid) => {
    const item = SUPPORT.find(s => s.id === sid);
    return acc + (item?.price || 0);
  }, 0);

  const channelCost = data.whatsappChannels * WHATSAPP_CHANNEL_PRICE;
  const subtotal = platformCost + featureCost + supportCost + channelCost;
  const totalDue = subtotal + data.balance;

  const AccordionItem: React.FC<{ 
    id: string; 
    title: string; 
    count: number;
    total: number;
    children: React.ReactNode; 
    hasContent: boolean 
  }> = ({ id, title, count, total, children, hasContent }) => {
    if (!hasContent) return null;
    const isOpen = expandedSection === id;

    return (
      <div className="border-b border-gray-100 last:border-0">
        <button 
          onClick={() => toggleSection(id)}
          className="w-full flex justify-between items-center py-4 text-left group focus:outline-none"
        >
          <div className="flex items-center gap-3">
             <h3 className={`text-sm font-bold uppercase tracking-wide transition-colors ${isOpen ? 'text-primary' : 'text-gray-500 group-hover:text-gray-700'}`}>
               {title}
             </h3>
             <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold transition-colors ${isOpen ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'}`}>
               {count}
             </span>
          </div>

          <div className="flex items-center gap-4">
             <span className={`text-sm font-semibold transition-colors ${isOpen ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-700'}`}>
                <Counter value={total} prefix="AED " />
             </span>
             <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : 'text-gray-300 group-hover:text-gray-400'}`}>
                <ChevronDown size={18} />
             </div>
          </div>
        </button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pb-4 space-y-3 pt-1">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const PricingRow: React.FC<{ label: string; price: number; icon?: any; quantity?: number }> = ({ label, price, icon: Icon, quantity }) => (
    <div className="flex items-end justify-between w-full text-base font-medium text-gray-700">
        <span className="flex items-center gap-2 shrink-0">
          {Icon && <Icon size={16} className="text-primary" strokeWidth={2.5} />}
          {quantity && quantity > 1 && <span className="text-gray-500 font-semibold text-sm">x{quantity}</span>}
          {label}
        </span>
        <div className="flex-1 border-b border-dotted border-gray-300 mb-1.5 mx-2" />
        <span className="shrink-0"><Counter value={price} prefix="AED " /></span>
    </div>
  );

  return (
    <div className="h-full bg-white bg-gradient-to-br from-white to-gray-50/50 rounded-r-[2.5rem] rounded-l-none border-l border-gray-100 px-8 pt-8 pb-2 flex flex-col relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

      <h2 className="text-2xl font-heading font-semibold text-gray-800 mb-6 pb-4 border-b border-gray-200 flex items-center gap-3 relative z-10">
        Plan Summary
      </h2>

      <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide relative z-10">
        
        {/* Platforms */}
        <AccordionItem 
            id="platforms" 
            title="Platforms" 
            count={data.platforms.length}
            total={platformCost}
            hasContent={data.platforms.length > 0}
        >
            {data.platforms.map(selection => {
              const item = PLATFORMS.find(p => p.id === selection.id);
              if (!item) return null;
              return (
                <PricingRow 
                    key={selection.id}
                    label={item.label} 
                    price={item.price * selection.quantity} 
                    icon={Check} 
                    quantity={selection.quantity}
                />
              );
            })}
        </AccordionItem>

        {/* Features */}
        <AccordionItem 
            id="features" 
            title="Features" 
            count={data.features.length}
            total={featureCost}
            hasContent={data.features.length > 0}
        >
            {data.features.map(fid => {
              const item = FEATURES.find(f => f.id === fid);
              if (!item) return null;
              return (
                <PricingRow 
                    key={fid} 
                    label={item.label} 
                    price={item.price} 
                    icon={Check} 
                />
              );
            })}
        </AccordionItem>

        {/* Support */}
        <AccordionItem 
            id="support" 
            title="Support" 
            count={data.support.length}
            total={supportCost}
            hasContent={data.support.length > 0}
        >
            {data.support.map(sid => {
              const item = SUPPORT.find(s => s.id === sid);
              if (!item) return null;
              return (
                <PricingRow 
                    key={sid} 
                    label={item.label} 
                    price={item.price} 
                    icon={ShieldCheck} 
                />
              );
            })}
        </AccordionItem>

        {/* Channels - separate items */}
        {data.whatsappChannels > 0 && (
           <div className="py-4 border-b border-gray-100">
             <PricingRow label={`${data.whatsappChannels} x WhatsApp Channel`} price={channelCost} />
           </div>
        )}

        {/* Balance Deposit */}
        {data.balance > 0 && (
           <div className="py-4">
              <PricingRow label="Prepaid Balance" price={data.balance} />
           </div>
        )}

      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 relative z-10">
        <div className="flex justify-between items-center text-gray-500 text-sm mb-2">
           <span>Monthly Recurring</span>
           <span className="font-semibold text-gray-700"><Counter value={subtotal} prefix="AED " /></span>
        </div>
        <div className="flex justify-between items-end">
          <span className="text-xl font-semibold text-gray-800">Total Due Today</span>
          <span className="text-4xl font-heading font-semibold text-primary">
            <Counter value={totalDue} prefix="AED " />
          </span>
        </div>
        <div className="mt-1 text-right text-[10px] text-gray-400 font-medium">
          Includes taxes & fees
        </div>
      </div>
    </div>
  );
};