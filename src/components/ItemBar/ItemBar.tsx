import styles from './styles.module.css';
import cn from 'classnames';
import { FC, useState } from 'react';
import { DraggableItem } from '../DraggableItem/DraggableItem';
import { ReactSortable } from 'react-sortablejs';
import { useAppSelector } from '../../store/hooks';
import { getDraggable } from '../../store/selectors';
import { IDraggable, DRAGGABLE } from '../../data/dragDropData';

interface Props {
  className?: string;
  hidden?: boolean;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

export const ItemBar: FC<Props> = ({ className = '', hidden = false, onDragStart, onDragEnd }) => {
  const draggable = useAppSelector(getDraggable);
  const [state, setState] = useState<IDraggable[]>(Object.values(DRAGGABLE));

  return (
    <ReactSortable
      className={cn(styles.bar, className, { [styles.hidden]: hidden })}
      animation={200}
      group={{
        name: 'constructor',
        pull: 'clone',
        put: false,
      }}
      list={state}
      setList={setState}
      onStart={onDragStart}
      onEnd={onDragEnd}
    >
      {state.map((element) => {
        return (
          <DraggableItem
            key={element.id}
            draggableId={element.id}
            available={draggable[element.id].available}
          >
            {element.node}
          </DraggableItem>
        );
      })}
    </ReactSortable>
  );
};
