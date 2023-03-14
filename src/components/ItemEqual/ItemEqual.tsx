import { useAppDispatch } from '../../store/hooks';
import { setOperator } from '../../store/slices/calcSlices';
import { CalcButton } from '../CalcButton/CalcButton';
import styles from './styles.module.css';

export const ItemEqual = () => {
  const dispatch = useAppDispatch();

  const handleClick = (value: string) => {
    dispatch(setOperator(value));
  };

  return <CalcButton value='=' onClick={handleClick} type='primary' className={styles.equal} />;
};
