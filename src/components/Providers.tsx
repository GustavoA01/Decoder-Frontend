'use client';
import { IAResultProvider } from '@/src/data/IAResultContext';
import { QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { queryClient } from '../lib/queryClient';
import { Toaster } from './ui/sonner';

export const Providers = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <IAResultProvider>
      <Toaster />
      {children}
    </IAResultProvider>
  </QueryClientProvider>
);
