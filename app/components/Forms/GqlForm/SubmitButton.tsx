'use client';

import { useFormStatus } from 'react-dom';
import styles from './gqlForm.module.css';

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button className={styles.submit} type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
};

export default SubmitButton;
