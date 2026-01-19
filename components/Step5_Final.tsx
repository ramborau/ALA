import React from 'react';
import { WizardData } from '../types';
import { Wallet } from 'lucide-react';
import { Counter } from './ui/Counter';

interface Props {
  data: WizardData;
  update: (fields: Partial<WizardData>) => void;
}

export const Step5_Final: React.FC<Props> = ({ data, update }) => {
  
  const handleBalanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Ensure we parse to integer to avoid string issues
    update({ balance: parseInt(e.target.value, 10) });
  };

  const percentage = ((data.balance - 1000) / (50000 - 1000)) * 100;

  return (
    <div className="space-y-6">
      
      {/* Balance Slider Card */}
      <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-shadow duration-300 group relative overflow-hidden">
         {/* Subtle gradient background */}
         <div className="absolute inset-0 bg-gradient-to-br from-white to-blue-50/30 pointer-events-none" />

         <div className="relative z-10">
            <div className="flex items-center gap-5 mb-10">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300 border border-blue-100 shadow-sm">
                <Wallet size={32} strokeWidth={2.5} />
                </div>
                <div>
                <h3 className="text-xl font-heading font-semibold text-gray-900 mb-1">Prepaid Balance</h3>
                <p className="text-gray-400 text-sm font-medium">Initial wallet deposit for your account</p>
                </div>
                <div className="ml-auto text-right">
                    <span className="block text-4xl font-heading font-semibold text-primary">
                    <Counter value={data.balance} prefix="AED " />
                    </span>
                </div>
            </div>

            <div className="px-2 py-4 relative">
                <div className="relative h-14 flex items-center justify-center">
                    
                    {/* Visual Track */}
                    <div className="absolute w-full h-5 bg-gray-100 rounded-full overflow-hidden shadow-inner border border-gray-200/50 pointer-events-none">
                        <div 
                            className="h-full bg-gradient-to-r from-primary to-primaryDark transition-all duration-75 ease-linear"
                            style={{ width: `${percentage}%` }}
                        />
                    </div>

                    {/* Actual Input - Key Fix: z-index must be higher than everything else */}
                    <input 
                        type="range"
                        min="1000"
                        max="50000"
                        step="1000"
                        value={data.balance}
                        onChange={handleBalanceChange}
                        className="absolute w-full h-full opacity-0 cursor-pointer z-50 appearance-none m-0 p-0"
                    />

                    {/* Visual Thumb - Follows position */}
                    <div 
                        className="absolute h-9 w-9 bg-white border-[3px] border-primary rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.15)] pointer-events-none z-40 flex items-center justify-center transition-all duration-75 ease-linear"
                        style={{ 
                            left: `calc(${percentage}% - 18px)` 
                        }}
                    >
                        <div className="w-2.5 h-2.5 bg-primary rounded-full" />
                    </div>
                </div>

                <div className="flex justify-between text-xs font-semibold text-gray-400 mt-2 font-heading pointer-events-none select-none">
                    <span>AED 1,000</span>
                    <span>AED 50,000</span>
                </div>
            </div>
         </div>
      </div>

    </div>
  );
};