import LemonScene from 'components/babylon/LemonScene';
import { getRandomTraits } from 'utils/properties';
import { useModelLoader } from 'components/babylon/useModelLoader';
import { useState } from 'react';
import { PropertiesType } from 'lemon';

const defaultTraits: PropertiesType = getRandomTraits();

export default function GeneratorPage() {
  const { onModelReady } = useModelLoader()

  const [traits, setTraits] = useState<PropertiesType>(defaultTraits)

  return (
    <div className='mx-auto' style={{width: '512px', height: '512px'}}>
      <LemonScene traits={traits} items={{}} onModelReady={onModelReady} setTraits={setTraits} isPaused={true} />
    </div>
  )
}