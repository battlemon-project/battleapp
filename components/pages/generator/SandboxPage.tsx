import LemonScene from 'components/babylon/LemonScene';
import { PropertiesType } from 'lemon';
import { useState } from 'react';
import { a1Traits, sandboxItems, getRandomItems, getRandomTraits, ghostProperties } from 'utils/properties';

export default function SandboxPage() {
  const [properties, setProperties] = useState<PropertiesType>(ghostProperties)
  const [background, setBackground] = useState<string>('');

  const changeProperties = (type: 'traits' | 'items', propkey: string) => (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setProperties({
      ...properties,
      [type]: {
        ...properties[type],
        [propkey]: value || undefined
      }
    })
  };

  const setRandomProperties = () => {
    const props = structuredClone(properties);
    props.traits = getRandomTraits();
    setProperties(props)
  };

  const setRandomItems = () => {
    const props = structuredClone(properties);
    props.items = getRandomItems();
    setProperties(props)
  };

  return (<div className="d-flex align-self-stretch">
    <div className='p-4'>
      {Object.entries(a1Traits).map(([propkey, options]) => {
        return <div key={propkey}>
          {propkey}
          <select className="form-select" onChange={changeProperties('traits', propkey)} value={properties.traits[propkey] || ''}>
            <option value={(ghostProperties.traits as {[key: string]: string})[propkey] || ''}>none</option>
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
      })}
      <button className='btn btn-primary w-100 fs-18 rounded-3 mt-3' onClick={setRandomProperties}>Random</button>
    </div>
    <div className='mx-auto vh-100 w-100' style={{
      background:
        background && background.indexOf('http') > -1
          ? `url(${background})`
          : background,
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
    }}>
      <div className='mx-auto vh-100 w-100 mt-5 pt-5' style={{
        maxWidth: '600px',
        maxHeight: '600px',
        margin: '0 auto'
      }}>
        <LemonScene properties={properties} debug={false} enableY={true} />
      </div>
    </div>
    <div className='p-4'>
      {Object.entries(sandboxItems).map(([propkey, options]) => {
        return <div key={propkey}>
          {propkey}
          <select className="form-select" onChange={changeProperties('items', propkey)} value={properties.items[propkey] || ''}>
            <option value={''}>none</option>
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
      })}

      <span>background</span>
      <input className="form-control" onChange={(e) => setBackground(e.target.value)} value={background} />

      <button className='btn btn-info w-100 fs-18 rounded-3 mt-3' onClick={setRandomItems}>Random</button>
    </div>
  </div>)
}