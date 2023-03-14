import React, { useState } from 'react';
import './App.css';
import cn from 'classnames';
import { ConstructorField } from './components/ConstructorField/ConstructorField';
import { ItemBar } from './components/ItemBar/ItemBar';
import { ModeSwitcher } from './components/ModeSwitcher/ModeSwitcher';
import { OPTIONS } from './constants/modeOptions';
import { Mode } from './constants/modeOptions';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { setMode } from './store/slices/draggableSlice';
import { getMode } from './store/selectors';
import { resetCalcState } from './store/slices/calcSlices';

function App() {
  const dispatch = useAppDispatch();
  const mode = useAppSelector(getMode);
  const [dropzoneActive, setDropzoneActive] = useState(false);

  const handleChangeMode = (value: number) => {
    dispatch(setMode(value));
    dispatch(resetCalcState());
  };

  const changeDropzoneBg = () => {
    setDropzoneActive((prevValue) => !prevValue);
  };

  return (
    <div className='App'>
      <ModeSwitcher
        options={OPTIONS}
        defaultValue={Mode.constructor}
        className='align-right'
        onChange={handleChangeMode}
      />
      <div className='container'>
        <ItemBar
          className={cn('bar')}
          hidden={mode === Mode.runtime}
          onDragStart={changeDropzoneBg}
          onDragEnd={changeDropzoneBg}
        />
        <ConstructorField
          className={cn('bar', 'align-right')}
          isDropzoneActive={dropzoneActive}
          onDragStart={changeDropzoneBg}
          onDragEnd={changeDropzoneBg}
        />
      </div>
    </div>
  );
}

export default App;
