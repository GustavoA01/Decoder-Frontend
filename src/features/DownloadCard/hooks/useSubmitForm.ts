import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DownloadFormData, downloadSchema } from '@/src/data/schemas';

export const useSubmitForm = () => {
  const methods = useForm<DownloadFormData>({
    resolver: zodResolver(downloadSchema),
  });

  return {
    register: methods.register,
    handleSubmit: methods.handleSubmit,
    errors: methods.formState.errors,
  };
};
