'use client';

import Button from '@mui/material/Button';
import styles from './buttons.module.css';
import cn from 'classnames';

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
