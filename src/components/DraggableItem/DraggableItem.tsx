import { FC } from 'react';
import styles from './styles.module.css';
import cn from 'classnames';

interface Props {
  children?: React.ReactNode;
  draggableId: string;
  available: boolean;
  flat?: boolean;
  isNotDraggable?: boolean;
}

export const DraggableItem: FC<Props> = ({
  children = false,
  draggableId,
  available,
  flat = false,
  isNotDraggable = false,
}) => {
  return (
    <div
      className={cn(
        styles.draggable,
        { [styles.disabled]: !available },
        { [styles.flat]: flat },
        { [styles.isNotDraggable]: isNotDraggable },
      )}
      id={draggableId}
    >
      {children}
    </div>
  );
};
