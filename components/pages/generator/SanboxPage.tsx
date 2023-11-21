import LemonScene from 'components/babylon/LemonScene';
import { PropertiesType, PropertiesList } from 'lemon';
import { useState } from 'react';
import { allTraits, allItems } from 'utils/properties';

const defaultTraits: PropertiesType = {
  eyes: 'Eyes_Ghost',
  exo_top: 'ExoTop_Ghost',
  exo_bot: 'ExoBot_Ghost',
  feet: 'Feet_Ghost',
  hands: 'Hands_Ghost',
  head: 'Head_Ghost',
}

export default function SanboxPage() {
  const [traits, setTraits] = useState<PropertiesType>(defaultTraits)
  const [items, setItems] = useState<PropertiesType>({})

  const changeProperties = (propkey: string) => (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setTraits({
      ...traits,
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
      {Object.entries(allTraits).map(([propkey, options]) => {
        return <div key={propkey}>
          {propkey}
          <select className="form-select" onChange={changeProperties(propkey)} value={traits[propkey] || ''}>
            <option value={defaultTraits[propkey] || ''}>none</option>
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
      })}
    </div>
    <div className='mx-auto vh-100 w-100'>
      <LemonScene traits={traits} items={items} />
    </div>
    <div className='p-4'>
      {Object.entries(allItems).map(([propkey, options]) => {
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