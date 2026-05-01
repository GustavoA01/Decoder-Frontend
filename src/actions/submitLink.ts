'use server';
import { SubmitLinkType } from '../data/types';

export const submitLink = async ({ url, mode }: SubmitLinkType) => {
  console.log({ url, mode });
};
