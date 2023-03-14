import styles from './styles.module.css';
import cn from 'classnames';
import { FC, useCallback, useEffect, useState } from 'react';
import { ConstructorFieldTip } from '../ConstructorFieldTip/ConstructorFieldTip';
import { DRAGGABLE, IDraggable, isDraggableId } from '../../data/dragDropData';
import { ReactSortable, Sortable } from 'react-sortablejs';
import { DraggableItem } from '../DraggableItem/DraggableItem';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addItem, deleteItem } from '../../store/slices/draggableSlice';
import { getDraggable, getMode } from '../../store/selectors';
import { Mode } from '../../constants/modeOptions';
import { setOperator, updateCurrentOperand } from '../../store/slices/calcSlices';

interface Props {
  className?: string;
  isDropzoneActive?: boolean;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

export const ConstructorField: FC<Props> = ({
  className = '',
  isDropzoneActive = false,
  onDragStart,
  onDragEnd,
}) => {
  const [state, setState] = useState<IDraggable[]>([]);
  const dispatch = useAppDispatch();
  const draggable = useAppSelector(getDraggable);
  const mode = useAppSelector(getMode);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', ','];
      const operators = ['x', '/', '-', '+', '='];

      if (digits.includes(event.key)) {
        dispatch(updateCurrentOperand(event.key));
      }

      if (operators.includes(event.key)) {
        dispatch(setOperator(event.key));
      }
    },
    [dispatch],
  );

  useEffect(() => {
    if (mode === Mode.runtime) {
      document.addEventListener('keydown', handleKeyPress);
    } else {
      document.removeEventListener('keydown', handleKeyPress);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [mode, handleKeyPress]);

  const handleAdd = (event: Sortable.SortableEvent) => {
    dispatch(addItem(event.item.id));
  };

  const handleDoubleClick = (event: React.MouseEvent) => {
    if (mode === Mode.runtime) {
      return;
    }
    const target = event.target;
    if (target instanceof HTMLDivElement) {
      const id = target.closest('#display')?.id || target.id;
      if (id && isDraggableId(id)) {
        dispatch(deleteItem(id));
        setState((prevState) => prevState.filter((item) => item.id !== id));
      }
    }
  };

  return (
    <div
      className={cn(
        styles.container,
        styles.list,
        { [styles.active]: isDropzoneActive },
        className,
      )}
      onDoubleClick={handleDoubleClick}
    >
      {!draggable.display.available && (
        <DraggableItem
          key={DRAGGABLE.display.id}
          draggableId={DRAGGABLE.display.id}
          available={true}
          flat
          isNotDraggable
        >
          {DRAGGABLE.display.node}
        </DraggableItem>
      )}
      <ReactSortable
        group={{
          name: 'constructor',
        }}
        className={cn(styles.list, styles.dropzone)}
        animation={200}
        list={state}
        setList={setState}
        onAdd={handleAdd}
        onStart={onDragStart}
        onEnd={onDragEnd}
        disabled={mode === Mode.runtime}
      >
        {state.length ? (
          state
            .filter((element) => element.id !== 'display')
            .map((element) => (
              <DraggableItem
                key={element.id}
                draggableId={element.id}
                available={true}
                flat
                isNotDraggable={mode === Mode.runtime}
              >
                {element.node}
              </DraggableItem>
            ))
        ) : (
          <ConstructorFieldTip />
        )}
      </ReactSortable>
    </div>
  );
};
