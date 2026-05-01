'use server';
import { SubmitLinkResponseType, SubmitLinkType } from '../data/types';

export const submitLink = async ({
  url,
  mode,
}: SubmitLinkType): Promise<SubmitLinkResponseType> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PYTHON_URL}/download`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, mode }),
    },
  ).then((res) => res.json());

  return response;
};
