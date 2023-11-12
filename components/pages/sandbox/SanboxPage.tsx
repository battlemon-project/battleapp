import LemonScene from 'components/babylon/LemonScene';
import {  PropertiesType } from 'lemon';
import { useState } from 'react';
import { allProperties } from 'utils/properties';

const defaultProps: PropertiesType = {
  eyes: 'Eyes_Ghost',
  exo_top: 'ExoTop_Ghost',
  exo_bot: 'ExoBot_Ghost',
  feet: 'Feet_Ghost',
  hands: 'Hands_Ghost',
  head: 'Head_Ghost',
}

export default function SanboxPage() {
  const [properties, setProperties] = useState<PropertiesType>(defaultProps)


  const changeProperties = (propkey: string) => (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setProperties({
      ...properties,
      [propkey]: value
    })
  };

  return (<div className="d-flex">
    <div>
      {Object.keys(allProperties).map((propkey) => {
        const options: string[] = allProperties[propkey]
        return <div key={propkey}>
          {propkey}
          <select className="form-select" onChange={changeProperties(propkey)} value={properties[propkey]}>
            <option value={defaultProps[propkey]}>none</option>
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          </div>
      })}
    </div>

    <LemonScene properties={properties} />
  </div>)
}