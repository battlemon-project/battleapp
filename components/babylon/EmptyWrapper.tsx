import ReactDOM from "react-dom/client";
import LemonScene from './LemonScene';
import { getRandomProps } from 'utils/properties';
import { useModelLoader } from './useModelLoader';
import { useState } from 'react';
import { PropertiesType } from 'lemon';

const defaultProps = getRandomProps();

function GeneratorWrapper() {
  const { onModelReady } = useModelLoader()

  const [properties, setProperties] = useState<PropertiesType>(defaultProps)

  return (
    <div className='mx-auto' style={{width: '512px', height: '512px'}}>
      <LemonScene properties={properties} items={{}} onModelReady={onModelReady} setProperties={setProperties} isPaused={true} />
    </div>
  )
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<GeneratorWrapper />);

