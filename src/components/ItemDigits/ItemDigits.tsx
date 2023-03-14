import { CalcButton } from '../CalcButton/CalcButton';
import styles from './styles.module.css';
import { useAppDispatch } from '../../store/hooks';
import { updateCurrentOperand } from '../../store/slices/calcSlices';

export const ItemDigits = () => {
  const dispatch = useAppDispatch();

  const handleClick = (value: string) => {
    dispatch(updateCurrentOperand(value));
  };

  return (
    <div className={styles.grid}>
      <CalcButton value='7' onClick={handleClick} />
      <CalcButton value='8' onClick={handleClick} />
      <CalcButton value='9' onClick={handleClick} />
      <CalcButton value='4' onClick={handleClick} />
      <CalcButton value='5' onClick={handleClick} />
      <CalcButton value='6' onClick={handleClick} />
      <CalcButton value='1' onClick={handleClick} />
      <CalcButton value='2' onClick={handleClick} />
      <CalcButton value='3' onClick={handleClick} />
      <CalcButton value='0' onClick={handleClick} className={styles.twoColumn} />
      <CalcButton value=',' onClick={handleClick} />
    </div>
  );
};
