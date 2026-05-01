import { submitLink } from '@/src/actions/submitLink';
import { DownloadFormData, downloadSchema } from '@/src/data/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { TabIdProps } from '../types';
import { toast } from 'sonner';

export const useDownloadForm = (activeTab: TabIdProps) => {
  const methods = useForm<DownloadFormData>({
    resolver: zodResolver(downloadSchema),
  });

  const { mutateAsync: downloadMutation, isPending: isDownloading } =
    useMutation({
      mutationFn: (url: string) => submitLink({ url, mode: activeTab }),
      onSuccess: async (data) => {
        const url = `${process.env.NEXT_PUBLIC_PYTHON_URL}/get-file/${data.filename[0]}`;
        window.location.href = url;
        toast.success('Download iniciado com sucesso!');
      },
      onError: (error) => {
        toast.error('Erro ao fazer download!');
        console.error(error);
      },
    });

  const handleDownload = async (data: DownloadFormData) => {
    await downloadMutation(data.url);
  };

  return {
    register: methods.register,
    handleSubmit: methods.handleSubmit,
    errors: methods.formState.errors,
    handleDownload,
    isDownloading,
  };
};
