import { motion } from 'framer-motion';
import { DownloadFormProps } from '../types';
import { useDownloadForm } from '../hooks/useDownloadForm';
import { IASection } from '../components/IASection';
import { FormFooter } from '../components/FormFooter';
import { useSubmitForm } from '../hooks/useSubmitForm';
import { useIAForm } from '../hooks/useIAForm';
import { InputSection } from '../components/InputSection';

export const DownloadForm = ({ description, activeTab }: DownloadFormProps) => {
  const { errors, handleSubmit, register } = useSubmitForm();
  const { handleDownload, isDownloading } = useDownloadForm(activeTab);
  const { onSubmitIAForm, selectedOutput, setSelectedOutput } = useIAForm();

  return (
    <form id="download" className="space-y-4">
      <InputSection
        errors={errors}
        isDownloading={isDownloading}
        register={register}
      />

      <motion.p
        key={description}
        className="text-sm leading-6 text-white/56"
        initial={{
          opacity: 0,
          y: 8,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.2,
          ease: 'easeOut',
        }}
      >
        {description}
      </motion.p>

      <IASection
        setSelectedOutput={setSelectedOutput}
        selectedOutput={selectedOutput}
      />

      <FormFooter
        onSubmitIA={handleSubmit(onSubmitIAForm)}
        onSubmitDownload={handleSubmit(handleDownload)}
        isDownloading={isDownloading}
      />
    </form>
  );
};
