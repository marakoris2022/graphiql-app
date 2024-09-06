'use client';

import { useFormStatus } from 'react-dom';
import styles from './buttons.module.css';

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button className={styles.submitBtn} type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
};

export default SubmitButton;
