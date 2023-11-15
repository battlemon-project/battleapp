import type { PropertiesList, PropertiesType } from "lemon";

export const allProperties: PropertiesList = {
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

export const getRandomProps = (): PropertiesType => {
  return Object.assign({}, ...Object.entries(allProperties).map(([k, p]) => ({[k]: p[(Math.floor(Math.random() * p.length))]})))
}
