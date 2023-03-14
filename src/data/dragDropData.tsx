import { ItemDigits } from '../components/ItemDigits/ItemDigits';
import { ItemDisplay } from '../components/ItemDisplay/ItemDisplay';
import { ItemEqual } from '../components/ItemEqual/ItemEqual';
import { ItemOperators } from '../components/ItemOperators/ItemOperators';

export type DraggableId = 'display' | 'operators' | 'digits' | 'equal';

export interface IDraggable {
  id: DraggableId;
  index: number;
  node: React.ReactNode;
}

export const isDraggableId = (str: string): str is DraggableId => {
  return ['display', 'operators', 'digits', 'equal'].includes(str);
};

export const DRAGGABLE: { [key: string]: IDraggable } = {
  display: {
    id: 'display',
    index: 0,
    node: <ItemDisplay />,
  },
  operators: {
    id: 'operators',
    index: 1,
    node: <ItemOperators />,
  },
  digits: {
    id: 'digits',
    index: 2,
    node: <ItemDigits />,
  },
  equal: {
    id: 'equal',
    index: 3,
    node: <ItemEqual />,
  },
};
