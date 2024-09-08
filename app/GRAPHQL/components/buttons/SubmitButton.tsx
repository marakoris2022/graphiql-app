'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@mui/material';

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      sx={{ color: 'white', background: 'grey' }}
      variant="contained"
      color="primary"
      type="submit"
      disabled={pending}
    >
      {pending ? 'Submitting...' : 'Submit'}
    </Button>
  );
};

export default SubmitButton;
