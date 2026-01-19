import React, { useState } from 'react';
import { WizardData } from '../types';
import { Step1_Profile } from './Step1_Profile';
import { Step2_Platforms } from './Step2_Platforms';
import { Step3_Features } from './Step3_Features';
import { Step4_Support } from './Step4_Support';
import { Step5_Final } from './Step5_Final';
import { Step6_Integrations } from './Step6_Integrations';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AnimatedUser, 
  AnimatedLayoutGrid, 
  AnimatedZap, 
  AnimatedLifeBuoy, 
  AnimatedWallet, 
  AnimatedLayers 
} from './ui/AnimatedIcons';

interface Props {
  data: WizardData;
  update: (fields: Partial<WizardData>) => void;
  onComplete: () => void;
}

const STEPS = [
  { id: 1, title: 'Profile', subtitle: 'Let\'s get to know you', icon: AnimatedUser },
  { id: 2, title: 'Platforms', subtitle: 'Where do you want to be?', icon: AnimatedLayoutGrid },
  { id: 3, title: 'Features', subtitle: 'Power up your business', icon: AnimatedZap },
  { id: 4, title: 'Support', subtitle: 'We\'ve got your back', icon: AnimatedLifeBuoy },
  { id: 5, title: 'Balance', subtitle: 'Setup prepaid balance', icon: AnimatedWallet },
  { id: 6, title: 'Integrations', subtitle: 'Connect your stack', icon: AnimatedLayers },
];

export const Wizard: React.FC<Props> = ({ data, update, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0);

  const next = () => {
    if (currentStep < STEPS.length) {
      setDirection(1);
      setCurrentStep(c => c + 1);
    } else {
      onComplete();
    }
  };

  const back = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep(c => c - 1);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 20 : -20,
      opacity: 0,
      filter: 'blur(5px)'
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)'
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -20 : 20,
      opacity: 0,
      filter: 'blur(5px)'
    })
  };

  const CurrentIcon = STEPS[currentStep - 1].icon;

  return (
    <>
      {/* Header Area - Stronger Border */}
      <div className="px-8 pt-6 pb-2 border-b border-gray-200">
         <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-5">
               {/* Large Animated Icon with strict 10px padding rule */}
               <motion.div 
                 key={currentStep}
                 initial={{ scale: 0.8, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 transition={{ type: "spring", duration: 0.5 }}
                 className="w-16 h-16 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary shadow-sm p-[10px]"
               >
                 <CurrentIcon size={44} />
               </motion.div>

               <div>
                 <h1 className="text-3xl font-heading font-semibold text-gray-900 mb-0.5">
                   {STEPS[currentStep - 1].title}
                 </h1>
                 <p className="text-gray-500 font-medium text-base">
                   {STEPS[currentStep - 1].subtitle}
                 </p>
               </div>
            </div>

            <div className="flex flex-col items-end">
               <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-1.5">Step {currentStep} of {STEPS.length}</span>
               <div className="h-2 w-32 bg-gray-100 rounded-full overflow-hidden">
                 <motion.div 
                   className="h-full bg-primary"
                   initial={{ width: 0 }}
                   animate={{ width: `${(currentStep / STEPS.length) * 100}%` }}
                   transition={{ duration: 0.5, ease: "circOut" }}
                 />
               </div>
            </div>
         </div>
      </div>

      {/* Scrollable Content Area with subtle gradient */}
      <div className="flex-1 overflow-y-auto px-8 py-6 custom-scrollbar relative bg-gradient-to-b from-white to-gray-50/20">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentStep}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8 }}
            className="w-full"
          >
            {currentStep === 1 && <Step1_Profile data={data} update={update} />}
            {currentStep === 2 && <Step2_Platforms data={data} update={update} />}
            {currentStep === 3 && <Step3_Features data={data} update={update} />}
            {currentStep === 4 && <Step4_Support data={data} update={update} />}
            {currentStep === 5 && <Step5_Final data={data} update={update} />}
            {currentStep === 6 && <Step6_Integrations data={data} update={update} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Sticky Bottom Buttons (50-50 Split) */}
      <div className="flex w-full mt-auto h-[72px] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] z-10">
        <button
            onClick={back}
            disabled={currentStep === 1}
            className={`
                w-1/2 h-full flex items-center justify-center gap-3
                bg-white border-t border-r border-gray-100 text-gray-600 font-heading font-semibold text-xl
                rounded-bl-[2.5rem] transition-colors hover:bg-gray-50 hover:text-gray-900 active:bg-gray-100
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white
            `}
        >
            <ArrowLeft size={24} strokeWidth={2.5} />
            Back
        </button>

        <button
            onClick={next}
            className={`
                w-1/2 h-full flex items-center justify-center gap-3
                bg-primary text-white font-heading font-semibold text-2xl tracking-wide
                rounded-br-[2.5rem] transition-all
                hover:bg-primaryDark hover:shadow-[inset_0_-4px_0_rgba(0,0,0,0.1)] active:scale-[0.99]
                relative overflow-hidden group
            `}
        >
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative flex items-center gap-3">
              {currentStep === STEPS.length ? 'Secure Payment' : 'Next Step'}
              {currentStep === STEPS.length ? <Check size={28} strokeWidth={3} /> : <ArrowRight size={28} strokeWidth={3} />}
            </span>
        </button>
      </div>
    </>
  );
};