import ReactDOM from "react-dom/client";
import LemonScene from './LemonScene';
import { getRandomTraits } from 'utils/properties';
import { useModelLoader } from './useModelLoader';
import { useState } from 'react';
import { PropertiesType } from 'lemon';

const defaultTraits: PropertiesType = getRandomTraits();

function GeneratorWrapper() {
  const { onModelReady } = useModelLoader()

  const [traits, setTraits] = useState<PropertiesType>(defaultTraits)

  return (
    <div className='mx-auto' style={{width: '512px', height: '512px'}}>
      <LemonScene traits={traits} items={{}} onModelReady={onModelReady} setTraits={setTraits} isPaused={true} />
    </div>
  )
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<GeneratorWrapper />);

