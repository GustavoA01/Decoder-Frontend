import { outputOptions } from '@/src/data/constants';
import { useState } from 'react';

export const useIAForm = () => {
  const [selectedOutput, setSelectedOutput] = useState(outputOptions[0].id);

  const onSubmitIAForm = () => {};

  return { selectedOutput, setSelectedOutput, onSubmitIAForm };
};
