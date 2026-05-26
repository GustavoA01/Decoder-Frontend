import { download } from '@/src/actions/download';
import { DownloadFormData } from '@/src/data/schemas';
import { TabIdProps } from '@/src/data/types';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useDownloadForm = (activeTab: TabIdProps) => {
  const { mutateAsync: downloadMutation, isPending: isDownloading } =
    useMutation({
      mutationFn: (url: string) => download({ url, mode: activeTab }),
      onSuccess: async (data) => {
        const url = `${process.env.NEXT_PUBLIC_PYTHON_URL}/get-file/${data.filename[0]}`;
        window.location.href = url;
        toast.success('Download feito com sucesso!');
      },
      onError: (error) => {
        toast.error('Erro ao fazer download!');
        console.error(error);
      },
    });

  const handleDownload = async (data: DownloadFormData) =>
    await downloadMutation(data.url);

  return {
    handleDownload,
    isDownloading,
  };
};
