import { DressedItemData, NftMetaData, PropertiesList, PropertiesType } from "lemon"

export const a1Traits: PropertiesList = {
  head: [
    'Head_Charcoal',
    'Head_Clementine',
    'Head_Crispy_Gold',
    'Head_Crispy_Silver',
    'Head_Disco',
    'Head_Fresh_Lemon',
    'Head_Lava',
    'Head_Lime',
    'Head_Pink',
    'Head_Zombie',
  ],
  eyes: [
    'Eyes_Alien',
    'Eyes_Amber',
    'Eyes_Blue',
    'Eyes_Brown',
    'Eyes_BTC',
    'Eyes_BTC_Etherium',
    'Eyes_Code',
    'Eyes_Etherium',
    'Eyes_Green',
    'Eyes_Laser',
    'Eyes_Lila',
    'Eyes_Matrix',
    'Eyes_Zombie',
  ],
  exo_top: [
    'ExoTop_01',
    'ExoTop_04',
    'ExoTop_05',
    'ExoTop_15',
    'ExoTop_17',
    'ExoTop_19',
    'ExoTop_20',
    'ExoTop_21',
    'ExoTop_24',
    'ExoTop_25',
    'ExoTop_Golden',
    'ExoTop_Snowwhite',
    'ExoTop_Steel',
  ],
  hands: [
    'Hands_01',
    'Hands_04',
    'Hands_05',
    'Hands_15',
    'Hands_17',
    'Hands_19',
    'Hands_20',
    'Hands_21',
    'Hands_24',
    'Hands_25',
    'Hands_Golden',
    'Hands_Snowwhite',
    'Hands_Steel',
    'Hands_Yellow_Plastic',
  ],
  exo_bot: [
    'ExoBot_01',
    'ExoBot_04',
    'ExoBot_05',
    'ExoBot_15',
    'ExoBot_17',
    'ExoBot_19',
    'ExoBot_20',
    'ExoBot_21',
    'ExoBot_24',
    'ExoBot_25',
    'ExoBot_Golden',
    'ExoBot_Snowwhite',
    'ExoBot_Steel',
  ],
  feet: [
    'Feet_01',
    'Feet_04',
    'Feet_05',
    'Feet_15',
    'Feet_17',
    'Feet_19',
    'Feet_20',
    'Feet_21',
    'Feet_24',
    'Feet_25',
    'Feet_Golden',
    'Feet_Snowwhite',
    'Feet_Steel',
  ],
  hair: [
    'Hair_Dragon_Short_Orange',
    'Hair_Dragon_Red',
    'Hair_Hedgehog_Neon_Red',
    'Hair_Dreadlocks_Brown',
    'Hair_Ponytail_Gray',
    'Hair_Curly_Gray',
    'Hair_Mohawk_Purple',
    'Hair_Fitness_Blue',
    'Hair_Box_Gray',
    'Hair_Topknot_Blue',
    'Hair_Mizura_Marine',
    'Hair_Sakayaki_Gray',
    'Hair_Leftover_Blue',
    'Hair_Disco_Iroquois_Lime',
    'Hair_Fauxhawk_Green_Orange',
    'Hair_Spikes_Gray',
  ],
  teeth: [
    'Teeth_Grga',
    'Teeth_Grillz_Silver',
    'Teeth_Hollywood',
    'Teeth_MinusOne',
    'Teeth_Oldstyle',
    'Teeth_Sharp',
    'Teeth_Vampire',
  ],
  scar: [
    'Scar_Spartan_R',
    'Scar_Gaul_R',
    'Scar_Barbarian_R',
    'Scar_Samurai_R',
    'Scar_Macedonian_R',    
  ]
}

const b1Traits: PropertiesList = {
  head: [
    'Head_Fresh_Lemon',
    'Head_Zombie',
    'Head_Clementine',
    'Head_Lime',
  ],
  eyes: [
    'Eyes_Blue',
    'Eyes_Green',
    'Eyes_Alien',
    'Eyes_Zombie',
  ],
  exo_top: [
    'ExoTop_Steel'
  ],
  hands: [
    'Hands_Steel'
  ],
  exo_bot: [
    'ExoBot_Steel'
  ],
  feet: [
    'Feet_Steel'
  ],
}

export const c1Items: PropertiesList = {
  back: [
    'Back_Insecticide_Bottle',
    'Back_Bomb_Barrel',
    'Back_Tactical_Backpack',
    'Back_Adventurer_Backpack',
  ],
  cap: [
    'Cap_Baseball_Cap_Red',
    'Cap_Ladle',
    'Cap_Cheef_Hat',
    'Cap_Cone_Armored_Hat',
    'Cap_Cowboy_Hat',
    'Cap_Sheriff_Hat',
    'Cap_Military_Cap',
    'Cap_Special_Forces_Beret',
    'Cap_Tank_Helmet',
    'Cap_Military_Helmet',
    'Cap_Metallic_Cone_Hat',
    'Cap_Assault_Helmet',
    'Cap_Cane_Cone_Hat',
    'Cap_Cocked_Hat',
    'Cap_Pirate_Bandana',    
  ],
  belt: [
    'Belt_Cheef_Sash',
    'Belt_Eastern_Armor_Belt',
    'Belt_Ninja_Waistband',
    'Belt_Bandolier',
    'Belt_Skull_Belt',
    'Belt_Chain_Gold',    
  ],
  glasses: [
    'Glasses_Sunglasses',
    'Glasses_Visor_VR',
    'Glasses_Cheezee_Squeeze',
    'Glasses_Deep_Blue',
    'Glasses_Dev_Dream',
    'Glasses_Fizz_Visor_Pro',
    'Glasses_Flamingo_Blink',
    'Glasses_Green_Five',
    'Glasses_Spiky_Punky',
    'Glasses_Techno_A',
    'Glasses_Visor_AR',    
  ],
  mask: [
    'Mask_Cowboy_Scarf'
  ],
  fire_arms: [
    'FireArms_Sniper_Rifle',
    'FireArms_Revolver',
    'FireArms_Grenade_Launcher',
    'FireArms_Handgun_SMG',
    'FireArms_Assault_Rifle_A',
    'FireArms_Assault_Rifle_M',    
  ],
  cold_arms: [
    'ColdArms_Bottle_Rose',
    'ColdArms_Grappling_Hook',
    'ColdArms_Chopper_Knife',
    'ColdArms_Katana',
  ],
  shoes: [
    'Shoes_Kicks_Red',
    'Shoes_Kicks_Green',    
  ],
  // cloth: [
  //   'Cloth_Poncho'
  // ],
}

export const dressedItemsToNftMetaData = (data: DressedItemData | undefined): NftMetaData[] => {
  let tokens: NftMetaData[] = [];
  if (!data) return tokens;
  Object.entries(data).forEach(([type, data]) => {
    tokens.push({
      tokenId: data.tokenId,
      image: `${process.env.NEXT_PUBLIC_STORAGE_URL}/v1/items/${type}/${data.itemName}.png`,
      properties: {
        dna: data.dna,
        type: type,
        traits: {},
        items: {},
        dress: [],
        name: data.itemName
      }
    })
  })
  return tokens;
}

// const itemsSet = () => {
//   const rand = Math.floor(Math.random() * 2)
//   return [
//     Object.assign({}, ...Object.entries(c1Items).map(([k, p]) => ({[k]: p[(Math.floor(Math.random() * p.length))]}))),
//     Object.assign({}, ...Object.entries(c1Items).filter(([k]) => k !== 'mask').map(([k, p]) => ({[k]: p[(Math.floor(Math.random() * p.length))]})))
//   ][rand]
// }


export const getRandomPropertiesWithItems = (): PropertiesType => {
  return {
    dna: '',
    name: 'random',
    type: 'omega',
    traits: Object.assign({}, ...Object.entries(a1Traits).map(([k, p]) => ({[k]: p[(Math.floor(Math.random() * p.length))]}))),
    items: Object.assign({}, ...Object.entries(c1Items).map(([k, p]) => ({[k]: p[(Math.floor(Math.random() * p.length))]}))),
    dress: []
  }
}

export const getRandomProperties = (): PropertiesType => {
  return {
    dna: '',
    name: 'random',
    type: 'omega',
    traits: Object.assign({}, ...Object.entries(a1Traits).map(([k, p]) => ({[k]: p[(Math.floor(Math.random() * p.length))]}))),
    items: {},
    dress: []
  }
}

export const ghostProperties = {
  name: 'ghost',
  dna: '',
  type: 'omega',
  traits: {
    eyes: 'Eyes_Ghost',
    exo_top: 'ExoTop_Ghost',
    exo_bot: 'ExoBot_Ghost',
    feet: 'Feet_Ghost',
    hands: 'Hands_Ghost',
    head: 'Head_Ghost'
  },
  items: {},
  dress: []
}

const a1Places = [
  'head',
  'eyes',
  'exo_top',
  'hands',
  'exo_bot',
  'feet',
  'hair',
  'teeth',
  'scar'
]

const b1Places = [
  'head',
  'eyes',
  'exo_top',
  'hands',
  'exo_bot',
  'feet'
]

const c1Places = [
  'back',
  'cap',
  'belt',
  'glasses',
  'mask',
  'fire_arms',
  'cold_arms',
  'shoes'
]

const c2Places = [
  'back',
  'cap',
  'belt',
  'glasses',
  'mask',
  'fire_arms',
  'cold_arms',
  'shoes',
  'wrist',
  'platform'
]

const itemsToArray = (selectedItems: (NftMetaData | undefined)[]) => {
  const array: (NftMetaData | undefined)[] = [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined]
  selectedItems.forEach(data => {
    if (!data) return;
    const index = c2Places.indexOf(data?.properties.type)
    array[index] = data;
  })
  return array
}

export const addItemsToArray = (selectedItems: (NftMetaData | undefined)[], token: NftMetaData, type: string) => {
  const items = itemsToArray(selectedItems)
  if (type && token) {
    items[c1Places.indexOf(type)] = token;
  }
  return items
}

export const removeItemsFromArray = (selectedItems: (NftMetaData | undefined)[], token: NftMetaData, type: string) => {
  const items = itemsToArray(selectedItems)
  if (type && token) {
    items[c1Places.indexOf(type)] = undefined;
  }
  return items
}


const versionItems: { [key: string]: PropertiesList } = {
  '0xc1': c1Items
}

export const versionItemsPlaces: { [key: string]: string[] } = {
  '0xa1': c1Places,
  '0xb1': c1Places,
  '0xc1': c1Places,
  '0xc2': c2Places
}

const versionTraits: { [key: string]: PropertiesList } = {
  '0xa1': a1Traits,
  '0xb1': b1Traits
}

const versionTraitsPlaces: { [key: string]: string[] } = {
  '0xa1': a1Places,
  '0xb1': b1Places
}

const versionLemonTypes: { [key: string]: string } = {
  '0xa1': 'alfa',
  '0xb1': 'omega'
}

export const getVersion = (dna: string) => {
  return dna.substr(0, 4);
}

export const betterName = (type: string) => {
  const parts = type.split('_').map(part => {
    const capitalized = part.charAt(0).toUpperCase() + part.slice(1)
    return capitalized
  })
  return parts.join(' ');
}

export const dnaToItem = (dna: string) => {
  const version = getVersion(dna);
  const itemsObj = versionItems[version];
  const itemPlaces = versionItemsPlaces[version];
  const typeId = (parseInt(dna.substr(4, 2)) || 0) % itemPlaces.length;
  const type = itemPlaces[typeId];
  const items = itemsObj[type];
  const dnaString = dna.substr(-4, 4)
  const dnaNumber = parseInt(dnaString, 16)
  const itemName = items[dnaNumber % items.length]
  return {
    type: type,
    itemName
  }
}

export const dnaToLemonProperties = (dna: string) => {
  const version = getVersion(dna);
  const traits = versionTraits[version];
  const traitsPlaces = versionTraitsPlaces[version];
  const dnaArray = dna.substr(4, 24).match(/.{1,2}/g) || []
  const _traits: { [key: string]: string } = {}
  dnaArray.forEach((hex, idx) => {
    const type = traitsPlaces[idx]
    const num = parseInt(hex, 16)
    if (traits[type]?.length) {
      const traitIdx = num % traits[type]?.length;
      _traits[type] = traits[type][traitIdx];
    }
  })
  return {
    type: versionLemonTypes[version],
    traits: _traits
  };
}

// console.log(dnaToLemonProperties('0xa17361582ceb65e0ebce9c244d'))