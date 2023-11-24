import ReactDOM from "react-dom/client";
import LemonScene from './LemonScene';
import { getRandomProperties } from 'utils/properties';
import { useModelLoader } from './useModelLoader';
import { useState } from 'react';
import { PropertiesType } from 'lemon';

const defaultProperties: PropertiesType = getRandomProperties();

function GeneratorWrapper() {
  const { onModelReady } = useModelLoader()

  const [properties, setProperties] = useState<PropertiesType>(defaultProperties)

  return (
    <div className='mx-auto' style={{width: '512px', height: '512px'}}>
      <LemonScene properties={properties} onModelReady={onModelReady} setProperties={setProperties} isPaused={true} />
    </div>
  )
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<GeneratorWrapper />);

