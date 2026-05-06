import { tabs } from '@/src/data/constants';
import { motion } from 'framer-motion';
import { TabIdProps, TabsButtonsProps } from '../types';

export const TabsButtons = ({
  activeTab,
  handleTabChange,
}: TabsButtonsProps) => (
  <div className="grid h-auto w-full grid-cols-2 rounded-2xl bg-white/8 p-1">
    {tabs.map((tab) => {
      const Icon = tab.icon;
      const isActive = activeTab === tab.id;

      return (
        <button
          key={tab.id}
          type="button"
          onClick={() => handleTabChange(tab.id as TabIdProps)}
          className={`relative flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl text-sm transition ${
            isActive ? 'text-slate-950' : 'text-white'
          }`}
        >
          {isActive && (
            <motion.span
              layoutId="active-download-tab"
              className="absolute inset-0 rounded-xl bg-primary"
              transition={{
                type: 'spring',
                stiffness: 420,
                damping: 32,
              }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            <Icon className="size-4" />
            {tab.label}
          </span>
        </button>
      );
    })}
  </div>
);
