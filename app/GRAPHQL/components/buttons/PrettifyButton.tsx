'use client';

import { Button } from '@mui/material';

type PrettifyButtonProps = {
  handler: () => void;
};

const PrettifyButton = ({ handler }: PrettifyButtonProps) => {
  return (
    <Button
      sx={{ color: 'white', background: 'grey' }}
      variant="contained"
      color="primary"
      onClick={handler}
    >
      Prettify
    </Button>
  );
};

export default PrettifyButton;
