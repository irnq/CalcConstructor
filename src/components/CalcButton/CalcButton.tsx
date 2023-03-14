import { FC } from 'react';
import styles from './styles.module.css';
import cn from 'classnames';

interface Props {
  value: string;
  onClick: (value: string) => void;
  className?: string;
  type?: 'default' | 'primary';
}

export const CalcButton: FC<Props> = ({ value, onClick, className = '', type = 'default' }) => {
  return (
    <button
      className={cn(styles.btn, className, { [styles.primary]: type === 'primary' })}
      onClick={() => {
        onClick(value);
      }}
    >
      {value}
    </button>
  );
};
