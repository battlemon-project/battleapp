import LemonScene from 'components/babylon/LemonScene';
import {  PropertiesType } from 'lemon';
import { FormEvent, useState } from 'react';
import { allProperties } from 'utils/properties';

export default function SanboxPage() {
  const [properties, setProperties] = useState<PropertiesType>({
    teeth: 'Teeth_Ghost',
    eyes: 'Eyes_Ghost',
    exo_top: 'ExoTop_Ghost',
    exo_bot: 'ExoBot_Ghost',
    feet: 'Feet_Ghost',
    hands: 'Hands_Ghost',
    head: 'Head_Ghost',
  })

  const changeProperties = (e: FormEvent<HTMLSelectElement>) => {
    console.log(e.target)
    setProperties({
      ...properties,
      exo_top: 'ExoTop_Snowwhite'
    })
  }

  return (<div className="d-flex">
    <div>
      {Object.keys(allProperties).map((propkey) => {
        const options: string[] = allProperties[propkey]
        return <div key={propkey}>
          {propkey}: {properties[propkey]}
          <select className="form-select" onChange={changeProperties} value={properties[propkey]}>
            <option value={undefined}>none</option>
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          </div>
      })}
    </div>

    <LemonScene properties={properties} />
  </div>)
}