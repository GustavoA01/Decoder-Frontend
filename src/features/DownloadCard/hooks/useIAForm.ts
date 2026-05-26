import { outputOptions } from '@/src/data/constants';
import { useIAResultProvider } from '@/src/data/IAResultContext';
import { DownloadFormData } from '@/src/data/schemas';
import { IAOutputType } from '@/src/data/types/api';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

const parseEvent = (eventText: string) => {
  const lines = eventText.split('\n');
  let event = 'message';
  const dataLines: string[] = [];

  for (const line of lines) {
    if (line.startsWith('event:')) event = line.slice('event:'.length).trim();

    if (line.startsWith('data:'))
      dataLines.push(line.slice('data:'.length).replace(/^ /, ''));
  }

  return { event, data: dataLines.join('\n') };
};

const normalizeStatusMessage = (message: string) =>
  message.replace(/v.deo/gi, 'video');

export const useIAForm = () => {
  const { resetIAResult, setError, setIsGenerating, setStatus, setSummary } =
    useIAResultProvider();
  const [selectedOutput, setSelectedOutput] = useState<IAOutputType>(
    outputOptions[0].id,
  );

  const { mutateAsync: iaSummaryMutation, isPending } = useMutation({
    mutationFn: async ({ url, type }: { url: string; type: IAOutputType }) => {
      resetIAResult();
      setIsGenerating(true);
      setStatus('Preparando video...');

      try {
        const requestUrl = `${process.env.NEXT_PUBLIC_PYTHON_URL}/ia-summary-stream`;
        const response = await fetch(requestUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url, type }),
        });

        if (!response.ok) throw new Error('Erro ao iniciar geracao com IA');

        const reader = response.body?.getReader();

        if (!reader) throw new Error('Resposta sem stream');
        setStatus('Escrevendo...');

        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { value, done } = await reader.read();

          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          const events = buffer.split('\n\n');
          buffer = events.pop() ?? '';

          for (const eventText of events) {
            const { event, data } = parseEvent(eventText);

            switch (event) {
              case 'chunk':
                setSummary((prev) => prev + data);
                break;
              case 'status': {
                const parsed = JSON.parse(data);
                const status = parsed.message ?? 'Processando...';
                setStatus(normalizeStatusMessage(status));
                break;
              }
              case 'done': {
                const parsed = JSON.parse(data);
                const status = parsed.message ?? 'Resumo gerado com sucesso';
                setStatus(normalizeStatusMessage(status));
                break;
              }
              case 'error': {
                const parsed = JSON.parse(data);
                const error =
                  parsed.error ?? parsed.message ?? 'Erro ao gerar resultado';
                throw new Error(error);
              }
              default:
                console.warn('Evento desconhecido:', event);
            }
          }
        }
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
