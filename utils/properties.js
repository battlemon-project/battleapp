const allTraits = {
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
    'ExoTop_Snowwhite',
    'ExoTop_Steel',
    'ExoTop_Hacky',
    'ExoTop_Golden',
  ],
  hands: [
    'Hands_Snowwhite',
    'Hands_Steel',
    'Hands_Yellow_Plastic',
    'Hands_Golden',
  ],
  exo_bot: [
    'ExoBot_Snowwhite',
    'ExoBot_Steel',
    'ExoBot_Hacky',
    'ExoBot_Golden',
  ],
  feet: [
    'Feet_Snowwhite',
    'Feet_Steel',
    'Feet_Military',
    'Feet_Golden',
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
    'Teeth_Hollywood',
    'Teeth_Oldstyle',
    'Teeth_Sharp',
    'Teeth_Grillz_Silver'
  ],
  scar: [
    'Scar_Spartan_R',
    'Scar_Gaul_R',
    'Scar_Barbarian_R',
    'Scar_Samurai_R',
    'Scar_Macedonian_R',    
  ]
}

const allItems = {
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

const itemsSet = () => {
  return [
    Object.assign({}, ...Object.entries(allItems).map(([k, p]) => ({[k]: p[(Math.floor(Math.random() * p.length))]}))),
    Object.assign({}, ...Object.entries(allItems).filter(([k]) => k !== 'mask').map(([k, p]) => ({[k]: p[(Math.floor(Math.random() * p.length))]})))
  ]
}

const getRandomProperties = () => {
  const rand = Math.floor(Math.random() * 2)
  return {
    traits: Object.assign({}, ...Object.entries(allTraits).map(([k, p]) => ({[k]: p[(Math.floor(Math.random() * p.length))]}))),
    items: itemsSet()[rand]
  }
}

const ghostProperties = {
  traits: {
    eyes: 'Eyes_Ghost',
    exo_top: 'ExoTop_Ghost',
    exo_bot: 'ExoBot_Ghost',
    feet: 'Feet_Ghost',
    hands: 'Hands_Ghost',
    head: 'Head_Ghost'
  },
  items: {}
}

module.exports = {
  allTraits,
  allItems,
  ghostProperties,
  getRandomProperties
}