'use client';

import Button from '@mui/material/Button';

type ExplorerButtonProps = {
  showFn: () => void;
};

const ExplorerButton = ({ showFn }: ExplorerButtonProps) => {
  return (
    <Button
      sx={{ color: 'white' }}
      variant="contained"
      color="success"
      type="button"
      onClick={showFn}
    >
      Explorer
    </Button>
  );
};

export default ExplorerButton;
