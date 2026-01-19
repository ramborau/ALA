import React from 'react';
import { WizardData } from '../types';
import { INDUSTRIES, CURRENCIES } from '../constants';
import { Input } from './ui/Input';
import { CustomSelect } from './ui/CustomSelect';
import { PhoneInput } from './ui/PhoneInput';
import { Check } from 'lucide-react';

interface Props {
  data: WizardData;
  update: (fields: Partial<WizardData>) => void;
}

export const Step1_Profile: React.FC<Props> = ({ data, update }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <Input 
          label="First Name" 
          placeholder="John" 
          icon="User"
          value={data.firstName}
          onChange={e => update({ firstName: e.target.value })}
        />
        <Input 
          label="Last Name" 
          placeholder="Doe" 
          icon="User"
          value={data.lastName}
          onChange={e => update({ lastName: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Input 
          label="Email Address" 
          type="email" 
          placeholder="john@company.com" 
          icon="Mail"
          value={data.email}
          onChange={e => update({ email: e.target.value })}
        />
        
        <PhoneInput 
          label="Phone Number"
          value={data.phone}
          onChange={phone => update({ phone })}
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Input 
          label="Company Name" 
          placeholder="Acme Inc." 
          icon="Building2"
          value={data.company}
          onChange={e => update({ company: e.target.value })}
        />
        <Input 
          label="Website" 
          placeholder="www.acme.com" 
          icon="Globe"
          value={data.website}
          onChange={e => update({ website: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
         <CustomSelect 
           label="Industry"
           icon="Briefcase"
           value={data.industry}
           onChange={val => update({ industry: val })}
           options={INDUSTRIES}
           placeholder="Select Industry"
         />
         <CustomSelect 
           label="Currency"
           value={data.currency}
           onChange={val => update({ currency: val })}
           options={CURRENCIES}
         />
      </div>
      
      {/* Terms & Conditions Checkbox */}
      <div className="flex items-start gap-3 mt-2 p-4 bg-blue-50/30 rounded-2xl border border-blue-100 hover:border-blue-200 transition-colors cursor-pointer" onClick={() => update({ termsAccepted: !data.termsAccepted })}>
        <div className="relative flex items-center mt-0.5">
          <input
            type="checkbox"
            checked={data.termsAccepted}
            onChange={(e) => update({ termsAccepted: e.target.checked })}
            className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 transition-all checked:border-primary checked:bg-primary"
            onClick={(e) => e.stopPropagation()} 
          />
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100">
            <Check size={14} strokeWidth={3} />
          </div>
        </div>
        <label className="text-sm font-medium text-gray-600 leading-relaxed select-none cursor-pointer">
          I agree to the <span className="text-primary font-semibold hover:underline">Terms & Conditions</span>, <span className="text-primary font-semibold hover:underline">Privacy Policy</span> and receive communications.
        </label>
      </div>

    </div>
  );
};