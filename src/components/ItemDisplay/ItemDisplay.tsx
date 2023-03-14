import styles from './styles.module.css';
import { FC } from 'react';
import cn from 'classnames';
import { useAppSelector } from '../../store/hooks';
import { getCurrentOperand, getResult } from '../../store/selectors';

interface Props {
  value?: number;
}

export const ItemDisplay: FC<Props> = ({ value = 0 }) => {
  const currentOperand = useAppSelector(getCurrentOperand);
  const result = useAppSelector(getResult);

  return (
    <div className={cn(styles.display)}>
      <p className={cn(styles.text)}>{currentOperand || result || value}</p>
    </div>
  );
};
