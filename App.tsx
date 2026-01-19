import React, { useState } from 'react';
import { WizardData } from './types';
import { Wizard } from './components/Wizard';
import { PricingBreakdown } from './components/PricingBreakdown';
import { PaymentModal } from './components/PaymentModal';
import { WHATSAPP_CHANNEL_PRICE, PLATFORMS, FEATURES, SUPPORT } from './constants';

const INITIAL_DATA: WizardData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  website: '',
  industry: '',
  currency: 'AED',
  termsAccepted: true,
  platforms: [],
  features: [],
  support: [],
  whatsappChannels: 0,
  balance: 1000,
  integrations: [],
};

function App() {
  const [data, setData] = useState<WizardData>(INITIAL_DATA);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const updateData = (fields: Partial<WizardData>) => {
    setData(prev => ({ ...prev, ...fields }));
  };

  const calculateTotal = () => {
     const platformCost = data.platforms.reduce((acc, item) => {
       const platform = PLATFORMS.find(p => p.id === item.id);
       return acc + ((platform?.price || 0) * item.quantity);
     }, 0);
     
     const featureCost = data.features.reduce((acc, fid) => acc + (FEATURES.find(f => f.id === fid)?.price || 0), 0);
     const supportCost = data.support.reduce((acc, sid) => acc + (SUPPORT.find(s => s.id === sid)?.price || 0), 0);
     const channelCost = data.whatsappChannels * WHATSAPP_CHANNEL_PRICE;
     return platformCost + featureCost + supportCost + channelCost + data.balance;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] flex items-center justify-center p-4 md:p-8 font-sans text-slate-800 text-lg">
      <div className="w-full max-w-[1400px] bg-white h-[90vh] rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 flex ring-4 ring-white/50 relative z-10">
        
        {/* Left Column - Wizard (64%) */}
        <div className="w-[64%] h-full flex flex-col relative bg-white bg-gradient-to-b from-white to-gray-50/30">
          <Wizard 
            data={data} 
            update={updateData} 
            onComplete={() => setIsPaymentOpen(true)}
          />
        </div>

        {/* Right Column - Pricing (36%) - Removed padding to revert height change */}
        <div className="w-[36%] h-full bg-gray-50/50 border-l border-gray-100 backdrop-blur-sm">
           <PricingBreakdown data={data} />
        </div>

      </div>
      
      {/* Background Decorative Blobs */}
      <div className="fixed top-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-0 mix-blend-multiply filter" />
      <div className="fixed bottom-20 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none -z-0 mix-blend-multiply filter" />

      <PaymentModal 
        isOpen={isPaymentOpen} 
        onClose={() => setIsPaymentOpen(false)}
        total={calculateTotal()}
        data={data}
      />
    </div>
  );
}

export default App;