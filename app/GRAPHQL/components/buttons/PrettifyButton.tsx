'use client';

import { useFormStatus } from 'react-dom';
import styles from './buttons.module.css';
import { MouseEventHandler } from 'react';

type PrettifyButtonProps = {
  handler: () => void;
};

const PrettifyButton = ({ handler }: PrettifyButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button className={styles.prettifyBtn} onClick={handler} type="button" disabled={pending}>
      {pending ? 'Formatting...' : 'Prettify'}
    </button>
  );
};

export default PrettifyButton;
