import styles from './styles.module.css';
import { ICON } from '../../constants/icons';

export const ConstructorFieldTip = () => {
  return (
    <div className={styles.container}>
      <svg className={styles.icon}>
        <use xlinkHref={ICON.addElement}></use>
      </svg>
      <p className={styles.text}>
        <span className={styles.accent}>Перетащите сюда</span> любой элемент из левой панели
      </p>
    </div>
  );
};
