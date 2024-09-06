'use client';

import styles from './buttons.module.css';
import cn from 'classnames';

type ExplorerButtonProps = {
  showFn: () => void;
};

const ExplorerButton = ({ showFn }: ExplorerButtonProps) => {
  return (
    <button className={cn(styles.button, styles.explorerBtn)} type="button" onClick={showFn}>
      Explorer
    </button>
  );
};

export default ExplorerButton;
