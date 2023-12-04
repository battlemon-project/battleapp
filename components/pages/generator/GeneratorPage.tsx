import LemonScene from 'components/babylon/LemonScene';
import { ghostProperties } from 'utils/properties';
import { useModelLoader } from 'components/babylon/useModelLoader';
import { useState } from 'react';
import { PropertiesType } from 'utils/properties';

export default function GeneratorPage() {
  const { onModelReady } = useModelLoader()

  const [properties, setProperties] = useState<PropertiesType>(ghostProperties)

  return (
    <div className='mx-auto' style={{width: '512px', height: '512px'}}>
      <LemonScene properties={properties} onModelReady={onModelReady} setProperties={setProperties} isPaused={true} preloadItems={false} />
    </div>
  )
}