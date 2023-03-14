import { useAppDispatch } from '../../store/hooks';
import { setOperator } from '../../store/slices/calcSlices';
import { CalcButton } from '../CalcButton/CalcButton';
import styles from './styles.module.css';

export const ItemOperators = () => {
  const dispatch = useAppDispatch();

  const handleClick = (value: string) => {
    dispatch(setOperator(value));
  };

  return (
    <div className={styles.operators}>
      <CalcButton value='/' onClick={handleClick} />
      <CalcButton value='x' onClick={handleClick} />
      <CalcButton value='-' onClick={handleClick} />
      <CalcButton value='+' onClick={handleClick} />
    </div>
  );
};
