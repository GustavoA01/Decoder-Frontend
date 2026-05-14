'use client';
import { IAResultProvider } from '@/src/data/IAResultContext';
import { QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { queryClient } from '../lib/queryClient';
import { Toaster } from './ui/sonner';

type ProvidersProps = {
  children: ReactNode;
};

const Providers = ({ children }: ProvidersProps) => (
  <QueryClientProvider client={queryClient}>
    <IAResultProvider>
      <Toaster />
      {children}
    </IAResultProvider>
  </QueryClientProvider>
);

export default Providers;
