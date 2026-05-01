import { submitLink } from '@/src/actions/submitLink';
import { DownloadFormData, downloadSchema } from '@/src/data/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { TabIdProps } from '../types';

export const useDownloadForm = (activeTab: TabIdProps) => {
  const methods = useForm<DownloadFormData>({
    resolver: zodResolver(downloadSchema),
  });

  const handleDownload = async ({ url }: DownloadFormData) => {
    await submitLink({
      url,
      mode: activeTab,
    });
  };

  return {
    register: methods.register,
    handleSubmit: methods.handleSubmit,
    errors: methods.formState.errors,
    handleDownload,
  };
};
