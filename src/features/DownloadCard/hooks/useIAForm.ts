import { outputOptions } from '@/src/data/constants';
import { useIAResultProvider } from '@/src/data/IAResultContext';
import { DownloadFormData } from '@/src/data/schemas';
import { IAOutputType, IASummaryResponseType } from '@/src/data/types/api';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

export const useIAForm = () => {
  const { resetIAResult, setError, setIsGenerating, setStatus, setSummary } =
    useIAResultProvider();
  const [selectedOutput, setSelectedOutput] = useState<IAOutputType>(
    outputOptions[0].id,
  );

  const { mutateAsync: iaSummaryMutation, isPending } = useMutation({
    mutationFn: async ({ url, type }: { url: string; type: IAOutputType }) => {
      resetIAResult();
      setError(null);
      setIsGenerating(true);
      setStatus('Preparando resumo...');

      try {
        const requestUrl = `${process.env.NEXT_PUBLIC_PYTHON_URL}/ia-summary`;
        const response = await fetch(requestUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url, type }),
        });

        if (!response.ok) throw new Error('Erro ao gerar resumo com IA');

        const data = (await response.json()) as IASummaryResponseType;

        setSummary(data.summary);
        setStatus(data.message || 'Resumo gerado com sucesso');

        return data;
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Erro ao gerar resultado';
        setError(message);
        throw error;
      } finally {
        setIsGenerating(false);
      }
    },
  });

  const onSubmitIAForm = async (data: DownloadFormData) => {
    await iaSummaryMutation({
      url: data.url,
      type: selectedOutput,
    });
  };

  return {
    selectedOutput,
    setSelectedOutput,
    onSubmitIAForm,
    isGeneratingIA: isPending,
  };
};
