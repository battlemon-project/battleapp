import LemonScene from 'components/babylon/LemonScene';
import {  PropertiesType } from 'lemon';
import { useState } from 'react';
import { allProperties } from 'utils/properties';
import { allItems } from 'utils/items';

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
  const [items, setItems] = useState<PropertiesType>({})

  const changeProperties = (propkey: string) => (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setProperties({
      ...properties,
      [propkey]: value || undefined
    })
  };
  
  const changeItems = (propkey: string) => (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setItems({
      ...items,
      [propkey]: value || undefined
    })
  };


  return (<div className="d-flex align-self-stretch">
    <div className='p-4'>
      {Object.keys(allProperties).map((propkey) => {
        const options: string[] = allProperties[propkey]
        return <div key={propkey}>
          {propkey}
          <select className="form-select" onChange={changeProperties(propkey)} value={properties[propkey] || ''}>
            <option value={defaultProps[propkey] || ''}>none</option>
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
      })}
    </div>
    <div className='mx-auto vh-100 w-100'>
      <LemonScene properties={properties} items={items} />
    </div>
    <div className='p-4'>
      {Object.keys(allItems).map((propkey) => {
        const options: string[] = allItems[propkey]
        return <div key={propkey}>
          {propkey}
          <select className="form-select" onChange={changeItems(propkey)} value={items[propkey] || ''}>
            <option value={''}>none</option>
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
      })}
    </div>
  </div>)
}