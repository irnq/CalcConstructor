import { FC } from 'react';
import cn from 'classnames';
import styles from './styles.module.css';
import { Color } from '../../constants/colors';

interface Props {
  value: number;
  icon?: string;
  title: string;
  selected: boolean;
  onClick: (value: number) => void;
}

export const ModeOption: FC<Props> = ({ value, icon = '', title, selected, onClick }) => {
  const iconStyle: React.CSSProperties = {
    width: '2rem',
    height: '2rem',
    stroke: selected ? Color.accent : Color.darkGrey,
  };

  const handleSelect = () => {
    if (!selected) {
      onClick(value);
    }
  };

  return (
    <span className={cn(styles.option, { [styles.active]: selected })} onClick={handleSelect}>
      {!!icon && (
        <svg style={iconStyle}>
          <use xlinkHref={icon}></use>
        </svg>
      )}
      {title}
    </span>
  );
};
