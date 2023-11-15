import LemonScene from 'components/babylon/LemonScene';
import { getRandomProps } from 'utils/properties';
import { useModelLoader } from 'components/babylon/useModelLoader';
import { useState } from 'react';
import { PropertiesType } from 'lemon';

const defaultProps = getRandomProps();

export default function GeneratorPage() {
  const { onModelReady } = useModelLoader()

  const [properties, setProperties] = useState<PropertiesType>(defaultProps)

  return (
    <div className='mx-auto' style={{width: '512px', height: '512px'}}>
      <LemonScene properties={properties} items={{}} onModelReady={onModelReady} setProperties={setProperties} isPaused={true} />
    </div>
  )
}