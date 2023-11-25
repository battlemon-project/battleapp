import LemonScene from 'components/babylon/LemonScene';
import { getRandomProperties } from 'utils/properties';
import { useModelLoader } from 'components/babylon/useModelLoader';
import { useState } from 'react';
import { PropertiesType } from 'lemon';

const defaultProperties: PropertiesType = getRandomProperties();

export default function GeneratorPage() {
  const { onModelReady } = useModelLoader()

  const [properties, setProperties] = useState<PropertiesType>(defaultProperties)

  return (
    <div className='mx-auto' style={{width: '512px', height: '512px'}}>
      <LemonScene properties={properties} onModelReady={onModelReady} setProperties={setProperties} isPaused={true} preloadItems={true} />
    </div>
  )
}