import LemonScene from 'components/babylon/LemonScene';
import { useState } from 'react';
import { a1Traits, c1Items, PropertiesType, getRandomProperties, ghostProperties } from 'utils/properties';

export default function SanboxPage() {
  const [properties, setProperties] = useState<PropertiesType>(ghostProperties)

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
    setProperties(getRandomProperties())
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
    <div className='mx-auto vh-100 w-100'>
      <LemonScene properties={properties} />
    </div>
    <div className='p-4'>
      {Object.entries(c1Items).map(([propkey, options]) => {
        return <div key={propkey}>
          {propkey}
          <select className="form-select" onChange={changeProperties('items', propkey)} value={properties.items[propkey] || ''}>
            <option value={''}>none</option>
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
      })}
    </div>
  </div>)
}