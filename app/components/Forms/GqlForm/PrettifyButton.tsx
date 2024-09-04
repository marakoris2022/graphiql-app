'use client';

import { useFormStatus } from 'react-dom';
import styles from './gqlForm.module.css';
import { MouseEventHandler } from 'react';

type PrettifyButtonProps = {
  handler: () => void;
};

const PrettifyButton = ({ handler }: PrettifyButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button className={styles.prettify} onClick={handler} type="button" disabled={pending}>
      {pending ? 'Prettifying...' : 'Prettify'}
    </button>
  );
};

export default PrettifyButton;
