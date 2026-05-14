import { iaSummary } from '@/src/actions/iaSummary';
import { outputOptions } from '@/src/data/constants';
import { DownloadFormData } from '@/src/data/schemas';
import { IAOutputType } from '@/src/data/types';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

export const useIAForm = () => {
  const [selectedOutput, setSelectedOutput] = useState<IAOutputType>(
    outputOptions[0].id,
  );

  const { mutateAsync: iaSummaryMutation, isPending: isGeneratingIA } =
    useMutation({
      mutationFn: (url: string) => iaSummary({ url, type: selectedOutput }),
      onSuccess: () => {
        toast.success('Resultado gerado com sucesso!');
      },
      onError: (error) => {
        toast.error('Erro ao gerar resultado com IA!');
        console.error(error);
      },
    });

  const onSubmitIAForm = async (data: DownloadFormData) => {
    const response = await iaSummaryMutation(data.url);
    console.log(response);
  };

  return {
    selectedOutput,
    setSelectedOutput,
    onSubmitIAForm,
    isGeneratingIA,
  };
};
