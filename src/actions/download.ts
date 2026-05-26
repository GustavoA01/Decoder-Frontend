'use server';
import { SubmitLinkResponseType, SubmitLinkType } from '../data/types/api';

export const download = async ({
  url,
  mode,
}: SubmitLinkType): Promise<SubmitLinkResponseType> => {
  const requestUrl = `${process.env.NEXT_PUBLIC_PYTHON_URL}/download`;
  const response = await fetch(requestUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url, mode }),
  }).then((res) => res.json());

  if (!response.ok) throw new Error('Erro ao fazer download');

  return response;
};
