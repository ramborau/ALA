import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, CheckCircle, User, Mail, Phone, Building2, Apple } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { WizardData } from '../types';
import { PLATFORMS, FEATURES, SUPPORT, WHATSAPP_CHANNEL_PRICE } from '../constants';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  data: WizardData;
}

export const PaymentModal: React.FC<Props> = ({ isOpen, onClose, total, data }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-md"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 30 }}
            className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-6xl h-[85vh] overflow-hidden flex flex-row z-10"
          >
            {isSuccess ? (
               <div className="w-full h-full flex flex-col items-center justify-center text-center p-12 bg-white">
                  <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center text-green-500 mb-8"
                  >
                    <CheckCircle size={64} strokeWidth={3} />
                  </motion.div>
                  <h2 className="text-4xl font-heading font-semibold text-gray-900 mb-4">Payment Successful!</h2>
                  <p className="text-xl text-gray-500 mb-10 max-w-md">Your GreenFlow account has been activated. Welcome aboard!</p>
                  <Button onClick={onClose} className="w-64">Go to Dashboard</Button>
               </div>
            ) : (
              <>
                {/* Left Column: Contact & Order Summary (35%) */}
                <div className="w-[35%] bg-gray-50/80 border-r border-gray-100 p-8 flex flex-col overflow-y-auto">
                    
                    {/* Contact Information (Moved here) */}
                    <div className="mb-10">
                        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Contact Information</h4>
                        <div className="bg-white border border-gray-200 rounded-2xl p-6 grid grid-cols-2 gap-6 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                                    <User size={20} />
                                </div>
                                <div>
                                    <div className="text-xs text-gray-400 font-medium">Name</div>
                                    <div className="text-gray-900 font-semibold">{data.firstName} {data.lastName}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                                    <Building2 size={20} />
                                </div>
                                <div>
                                    <div className="text-xs text-gray-400 font-medium">Company</div>
                                    <div className="text-gray-900 font-semibold">{data.company || 'N/A'}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <div className="text-xs text-gray-400 font-medium">Email</div>
                                    <div className="text-gray-900 font-semibold truncate max-w-[100px]" title={data.email}>{data.email}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <div className="text-xs text-gray-400 font-medium">Phone</div>
                                    <div className="text-gray-900 font-semibold truncate max-w-[100px]" title={data.phone}>+{data.phone}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h3 className="text-2xl font-heading font-semibold text-gray-900 mb-8">Order Summary</h3>
                    
                    <div className="space-y-6 flex-1">
                        {/* Summary Items */}
                        <div className="space-y-4">
                            {data.platforms.map(selection => {
                                const p = PLATFORMS.find(x => x.id === selection.id);
                                if (!p) return null;
                                const cost = p.price * selection.quantity;
                                return (
                                    <div key={selection.id} className="flex justify-between items-center text-gray-600 font-medium">
                                        <span>{selection.quantity > 1 ? `${selection.quantity} x ` : ''}{p.label}</span>
                                        <span>AED {cost}</span>
                                    </div>
                                );
                            })}
                            {data.features.map(id => {
                                const f = FEATURES.find(x => x.id === id);
                                return f ? (
                                    <div key={id} className="flex justify-between items-center text-gray-600 font-medium">
                                        <span>{f.label}</span>
                                        <span>AED {f.price}</span>
                                    </div>
                                ) : null;
                            })}
                            {data.support.map(id => {
                                const s = SUPPORT.find(x => x.id === id);
                                return s ? (
                                    <div key={id} className="flex justify-between items-center text-gray-600 font-medium">
                                        <span>{s.label}</span>
                                        <span>AED {s.price}</span>
                                    </div>
                                ) : null;
                            })}
                            {data.whatsappChannels > 0 && (
                                <div className="flex justify-between items-center text-gray-600 font-medium">
                                    <span>{data.whatsappChannels} x WhatsApp Channels</span>
                                    <span>AED {data.whatsappChannels * WHATSAPP_CHANNEL_PRICE}</span>
                                </div>
                            )}
                        </div>

                        {data.balance > 0 && (
                            <div className="pt-6 border-t border-gray-200">
                                <div className="flex justify-between items-center text-gray-800 font-semibold">
                                    <span>Prepaid Balance</span>
                                    <span>AED {data.balance.toLocaleString()}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <div className="flex justify-between items-end">
                            <span className="text-gray-500 font-medium">Total Due</span>
                            <span className="text-3xl font-heading font-semibold text-primary">AED {total.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                {/* Right Column: Checkout & Payment (65%) */}
                <div className="w-[65%] flex flex-col relative bg-white">
                    {/* Close Button */}
                    <div className="absolute top-6 right-6 z-20">
                        <button onClick={onClose} className="p-2 bg-gray-50 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-10 pb-32">
                        <h2 className="text-3xl font-heading font-semibold text-gray-900 mb-8">Checkout</h2>

                        {/* Payment Options */}
                        <div className="mb-8">
                             <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Payment Method</h4>
                             
                             {/* Digital Wallets */}
                             <div className="grid grid-cols-3 gap-4 mb-6">
                                <button className="h-14 rounded-xl border border-gray-200 bg-white flex items-center justify-center hover:border-blue-500 hover:bg-blue-50 transition-all group">
                                    <span className="font-semibold text-blue-900 italic text-xl group-hover:scale-105 transition-transform">PayPal</span>
                                </button>
                                <button className="h-14 rounded-xl border border-gray-200 bg-black text-white flex items-center justify-center gap-2 hover:bg-gray-800 transition-all group">
                                     <Apple size={20} fill="currentColor" />
                                     <span className="font-semibold text-lg">Pay</span>
                                </button>
                                <button className="h-14 rounded-xl border border-gray-200 bg-white flex items-center justify-center gap-1.5 hover:border-gray-300 transition-all group">
                                     <span className="font-semibold text-gray-600 text-lg">G</span>
                                     <span className="font-semibold text-gray-600 text-lg">Pay</span>
                                </button>
                             </div>

                             <div className="relative mb-6">
                                 <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                                 <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-400 font-medium">Or pay with card</span></div>
                             </div>

                             {/* Credit Card Form */}
                             <div className="space-y-5">
                                <Input label="Cardholder Name" placeholder={data.firstName + ' ' + data.lastName} icon="User" />
                                <Input label="Card Number" placeholder="0000 0000 0000 0000" icon="CreditCard" />
                                <div className="grid grid-cols-2 gap-5">
                                    <Input label="Expiry Date" placeholder="MM/YY" />
                                    <Input label="CVC" placeholder="123" icon="Lock" />
                                </div>
                             </div>
                        </div>
                    </div>

                    {/* Sticky Footer Button */}
                    <div className="absolute bottom-0 right-0 left-0 bg-white p-0 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] border-t border-gray-50">
                        <button 
                            onClick={handlePay}
                            disabled={isProcessing}
                            className={`
                                w-full h-[80px] bg-primary text-white font-heading font-semibold text-2xl
                                flex items-center justify-center gap-3
                                rounded-br-[2.5rem] rounded-bl-none transition-all
                                hover:bg-primaryDark active:scale-[0.99]
                                relative overflow-hidden btn-3d
                            `}
                            style={{ boxShadow: 'none' }} 
                        >
                            {isProcessing ? (
                                <span className="animate-pulse">Processing...</span>
                            ) : (
                                <>
                                    <Lock size={24} strokeWidth={2.5} className="opacity-80" />
                                    Pay AED {total.toLocaleString()}
                                </>
                            )}
                        </button>
                    </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};