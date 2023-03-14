import { FC, useState } from 'react';
import cn from 'classnames';
import { IOption } from '../../interfaces/IOption';
import { ModeOption } from '../ModeOption/ModeOption';
import styles from './styles.module.css';

interface Props {
  options: IOption[];
  defaultValue?: number;
  className?: string;
  onChange?: (value: number) => void;
}

export const ModeSwitcher: FC<Props> = ({
  options,
  defaultValue = 0,
  className = '',
  onChange = () => {},
}) => {
  const [selected, setSelected] = useState(defaultValue);

  const handleSelect = (value: number) => {
    setSelected(value);
    onChange(value);
  };

  return (
    <div className={cn(styles.switcher, className)}>
      {options.map((option, i) => (
        <ModeOption
          key={i}
          value={i}
          selected={selected === i}
          {...option}
          onClick={handleSelect}
        />
      ))}
    </div>
  );
};
