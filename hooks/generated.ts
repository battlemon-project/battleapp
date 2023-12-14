import {
  useContractRead,
  UseContractReadConfig,
  useContractWrite,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
  useContractEvent,
  UseContractEventConfig,
} from 'wagmi'
import {
  ReadContractResult,
  WriteContractMode,
  PrepareWriteContractResult,
} from 'wagmi/actions'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Item
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const itemABI = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'to', internalType: 'address', type: 'address', indexed: false },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'itemType',
        internalType: 'uint8',
        type: 'uint8',
        indexed: false,
      },
      {
        name: 'agility',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'speed',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'luck',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'dna', internalType: 'bytes', type: 'bytes', indexed: false },
      {
        name: 'level',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Create',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'version', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'itemId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'newLvl',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'agility',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'speed',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'luck',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Lvlup',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'itemId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'itemName',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
    ],
    name: 'MintRandom',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'EQUIP_TEMP_HOLDER',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'ITEM_PRICE',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MAX_BUY_SUPPLY',
    outputs: [{ name: '', internalType: 'uint24', type: 'uint24' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'basePrefix',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'baseURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'boxAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'to', internalType: 'address', type: 'address' }],
    name: 'boxMint',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newPrefix', internalType: 'uint8', type: 'uint8' }],
    name: 'changeBasePrefix',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'sender', internalType: 'address', type: 'address' },
    ],
    name: 'equipItem',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'gemsAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getItemData',
    outputs: [
      {
        name: '',
        internalType: 'struct IItems.Metadata',
        type: 'tuple',
        components: [
          { name: 'isEquipped', internalType: 'bool', type: 'bool' },
          { name: 'itemType', internalType: 'uint8', type: 'uint8' },
          { name: 'level', internalType: 'uint8', type: 'uint8' },
          { name: 'agility', internalType: 'uint256', type: 'uint256' },
          { name: 'speed', internalType: 'uint256', type: 'uint256' },
          { name: 'luck', internalType: 'uint256', type: 'uint256' },
          { name: 'actualOwner', internalType: 'address', type: 'address' },
          { name: 'dna', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'symbol', internalType: 'string', type: 'string' },
      { name: 'tresuary_', internalType: 'address', type: 'address' },
    ],
    name: 'initialize',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'lemonsAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'levelOf',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'itemId', internalType: 'uint256', type: 'uint256' },
      { name: 'gemId', internalType: 'uint256', type: 'uint256' },
      { name: 'stat', internalType: 'uint8', type: 'uint8' },
    ],
    name: 'levelUp',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'itemId', internalType: 'uint256', type: 'uint256' },
      { name: 'gemId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'levelUpFree',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint16', type: 'uint16' }],
    name: 'mint',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'to', internalType: 'address', type: 'address' }],
    name: 'mintRandom',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newURI', internalType: 'string', type: 'string' }],
    name: 'setBaseURI',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'box', internalType: 'address', type: 'address' }],
    name: 'setBoxAddress',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'gems', internalType: 'address', type: 'address' }],
    name: 'setGemsAddress',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'lemonsAddress_', internalType: 'address', type: 'address' },
    ],
    name: 'setLemonAddress',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'setLvlUpPrice',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'setMaxItemTypes',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'stickersAddress_', internalType: 'address', type: 'address' },
    ],
    name: 'setStickersAddress',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'stickersAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [{ name: 'x', internalType: 'uint8', type: 'uint8' }],
    name: 'toBytes',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalBuySupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferEquippedItem',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'tresuary',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'sender', internalType: 'address', type: 'address' },
    ],
    name: 'unequipItem',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'withdraw',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Lemon
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const lemonABI = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'lemonType',
        internalType: 'uint8',
        type: 'uint8',
        indexed: true,
      },
      {
        name: 'agility',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'speed',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'luck',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'dna', internalType: 'bytes', type: 'bytes', indexed: false },
      {
        name: 'level',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Create',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'lemonId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'lemonData',
        internalType: 'struct Lemons.Metadata',
        type: 'tuple',
        components: [
          { name: 'level', internalType: 'uint8', type: 'uint8' },
          { name: 'lemonType', internalType: 'uint8', type: 'uint8' },
          { name: 'dna', internalType: 'bytes', type: 'bytes' },
          { name: 'agility', internalType: 'uint256', type: 'uint256' },
          { name: 'speed', internalType: 'uint256', type: 'uint256' },
          { name: 'luck', internalType: 'uint256', type: 'uint256' },
        ],
        indexed: false,
      },
      {
        name: 'itemsIds',
        internalType: 'int256[]',
        type: 'int256[]',
        indexed: false,
      },
      {
        name: 'itemsMetadata',
        internalType: 'struct IItems.Metadata[10]',
        type: 'tuple[10]',
        components: [
          { name: 'isEquipped', internalType: 'bool', type: 'bool' },
          { name: 'itemType', internalType: 'uint8', type: 'uint8' },
          { name: 'level', internalType: 'uint8', type: 'uint8' },
          { name: 'agility', internalType: 'uint256', type: 'uint256' },
          { name: 'speed', internalType: 'uint256', type: 'uint256' },
          { name: 'luck', internalType: 'uint256', type: 'uint256' },
          { name: 'actualOwner', internalType: 'address', type: 'address' },
          { name: 'dna', internalType: 'bytes', type: 'bytes' },
        ],
        indexed: false,
      },
    ],
    name: 'EquipmentChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'version', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'lemonId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'newLvl',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Lvlup',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'LEMON_PRICE',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MAX_ALPHA_LEMON_BUY_SUPPLY',
    outputs: [{ name: '', internalType: 'uint16', type: 'uint16' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MAX_ALPHA_LEMON_SUPPLY',
    outputs: [{ name: '', internalType: 'uint16', type: 'uint16' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'WHITELIST_AMOUNT',
    outputs: [{ name: '', internalType: 'uint16', type: 'uint16' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: '_nextTokenId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'users', internalType: 'address[]', type: 'address[]' }],
    name: 'addToWhitelist',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'alphaPrefix',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'boxAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'to', internalType: 'address', type: 'address' }],
    name: 'boxMint',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newPrefix', internalType: 'uint8', type: 'uint8' }],
    name: 'changeAlphaPrefix',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_lemonId', internalType: 'uint256', type: 'uint256' },
      { name: 'items', internalType: 'int256[]', type: 'int256[]' },
    ],
    name: 'changeEquipmentBatch',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newPrefix', internalType: 'uint8', type: 'uint8' }],
    name: 'changeOmegaPrefix',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'equipment',
    outputs: [
      { name: 'itemId', internalType: 'uint256', type: 'uint256' },
      { name: 'equipped', internalType: 'bool', type: 'bool' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'gemId', internalType: 'uint256', type: 'uint256' }],
    name: 'exchangeGem10',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'gemsAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getAllEquipment',
    outputs: [{ name: '', internalType: 'int256[10]', type: 'int256[10]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'itemType', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getEquipment',
    outputs: [{ name: '', internalType: 'int256', type: 'int256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'tresuary_', internalType: 'address', type: 'address' }],
    name: 'initialize',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'itemsContract',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'lemonData',
    outputs: [
      { name: 'level', internalType: 'uint8', type: 'uint8' },
      { name: 'lemonType', internalType: 'uint8', type: 'uint8' },
      { name: 'dna', internalType: 'bytes', type: 'bytes' },
      { name: 'agility', internalType: 'uint256', type: 'uint256' },
      { name: 'speed', internalType: 'uint256', type: 'uint256' },
      { name: 'luck', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'lemonLvl',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'levelOf',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'lemonId', internalType: 'uint256', type: 'uint256' },
      { name: 'gemId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'levelUp',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint16', type: 'uint16' }],
    name: 'mint',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'omegaPrefix',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'publicMintOpenTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newURI', internalType: 'string', type: 'string' }],
    name: 'setBaseURI',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_box', internalType: 'address', type: 'address' }],
    name: 'setBoxAddress',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_gems', internalType: 'address', type: 'address' }],
    name: 'setGemsAddress',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_items', internalType: 'address', type: 'address' }],
    name: 'setItemsAddress',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'itemType', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'slotEquipped',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [{ name: 'x', internalType: 'uint8', type: 'uint8' }],
    name: 'toBytes',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalBasicSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalBuySupply',
    outputs: [{ name: '', internalType: 'uint16', type: 'uint16' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalUniqueSupply',
    outputs: [{ name: '', internalType: 'uint16', type: 'uint16' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'tresuary',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'whitelist',
    outputs: [
      { name: 'amount', internalType: 'uint16', type: 'uint16' },
      { name: 'whitelisted', internalType: 'bool', type: 'bool' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'withdraw',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itemABI}__.
 */
export function useItemRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof itemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({ abi: itemABI, ...config } as UseContractReadConfig<
    typeof itemABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"EQUIP_TEMP_HOLDER"`.
 */
export function useItemEquipTempHolder<
  TFunctionName extends 'EQUIP_TEMP_HOLDER',
  TSelectData = ReadContractResult<typeof itemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itemABI,
    functionName: 'EQUIP_TEMP_HOLDER',
    ...config,
  } as UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"ITEM_PRICE"`.
 */
export function useItemItemPrice<
  TFunctionName extends 'ITEM_PRICE',
  TSelectData = ReadContractResult<typeof itemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itemABI,
    functionName: 'ITEM_PRICE',
    ...config,
  } as UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"MAX_BUY_SUPPLY"`.
 */
export function useItemMaxBuySupply<
  TFunctionName extends 'MAX_BUY_SUPPLY',
  TSelectData = ReadContractResult<typeof itemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itemABI,
    functionName: 'MAX_BUY_SUPPLY',
    ...config,
  } as UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useItemBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof itemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itemABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"basePrefix"`.
 */
export function useItemBasePrefix<
  TFunctionName extends 'basePrefix',
  TSelectData = ReadContractResult<typeof itemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itemABI,
    functionName: 'basePrefix',
    ...config,
  } as UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"baseURI"`.
 */
export function useItemBaseUri<
  TFunctionName extends 'baseURI',
  TSelectData = ReadContractResult<typeof itemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itemABI,
    functionName: 'baseURI',
    ...config,
  } as UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"boxAddress"`.
 */
export function useItemBoxAddress<
  TFunctionName extends 'boxAddress',
  TSelectData = ReadContractResult<typeof itemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itemABI,
    functionName: 'boxAddress',
    ...config,
  } as UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"gemsAddress"`.
 */
export function useItemGemsAddress<
  TFunctionName extends 'gemsAddress',
  TSelectData = ReadContractResult<typeof itemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itemABI,
    functionName: 'gemsAddress',
    ...config,
  } as UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"getApproved"`.
 */
export function useItemGetApproved<
  TFunctionName extends 'getApproved',
  TSelectData = ReadContractResult<typeof itemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itemABI,
    functionName: 'getApproved',
    ...config,
  } as UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"getItemData"`.
 */
export function useItemGetItemData<
  TFunctionName extends 'getItemData',
  TSelectData = ReadContractResult<typeof itemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itemABI,
    functionName: 'getItemData',
    ...config,
  } as UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"isApprovedForAll"`.
 */
export function useItemIsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof itemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itemABI,
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"lemonsAddress"`.
 */
export function useItemLemonsAddress<
  TFunctionName extends 'lemonsAddress',
  TSelectData = ReadContractResult<typeof itemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itemABI,
    functionName: 'lemonsAddress',
    ...config,
  } as UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"levelOf"`.
 */
export function useItemLevelOf<
  TFunctionName extends 'levelOf',
  TSelectData = ReadContractResult<typeof itemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itemABI,
    functionName: 'levelOf',
    ...config,
  } as UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"name"`.
 */
export function useItemName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof itemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itemABI,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"owner"`.
 */
export function useItemOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof itemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itemABI,
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"ownerOf"`.
 */
export function useItemOwnerOf<
  TFunctionName extends 'ownerOf',
  TSelectData = ReadContractResult<typeof itemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itemABI,
    functionName: 'ownerOf',
    ...config,
  } as UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"stickersAddress"`.
 */
export function useItemStickersAddress<
  TFunctionName extends 'stickersAddress',
  TSelectData = ReadContractResult<typeof itemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itemABI,
    functionName: 'stickersAddress',
    ...config,
  } as UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useItemSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof itemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itemABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"symbol"`.
 */
export function useItemSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof itemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itemABI,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"toBytes"`.
 */
export function useItemToBytes<
  TFunctionName extends 'toBytes',
  TSelectData = ReadContractResult<typeof itemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itemABI,
    functionName: 'toBytes',
    ...config,
  } as UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"tokenURI"`.
 */
export function useItemTokenUri<
  TFunctionName extends 'tokenURI',
  TSelectData = ReadContractResult<typeof itemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itemABI,
    functionName: 'tokenURI',
    ...config,
  } as UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"totalBuySupply"`.
 */
export function useItemTotalBuySupply<
  TFunctionName extends 'totalBuySupply',
  TSelectData = ReadContractResult<typeof itemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itemABI,
    functionName: 'totalBuySupply',
    ...config,
  } as UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"totalSupply"`.
 */
export function useItemTotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof itemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itemABI,
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"tresuary"`.
 */
export function useItemTresuary<
  TFunctionName extends 'tresuary',
  TSelectData = ReadContractResult<typeof itemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itemABI,
    functionName: 'tresuary',
    ...config,
  } as UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link itemABI}__.
 */
export function useItemWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof itemABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof itemABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof itemABI, TFunctionName, TMode>({
    abi: itemABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"approve"`.
 */
export function useItemApprove<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof itemABI, 'approve'>['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof itemABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof itemABI, 'approve', TMode>({
    abi: itemABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"boxMint"`.
 */
export function useItemBoxMint<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof itemABI, 'boxMint'>['request']['abi'],
        'boxMint',
        TMode
      > & { functionName?: 'boxMint' }
    : UseContractWriteConfig<typeof itemABI, 'boxMint', TMode> & {
        abi?: never
        functionName?: 'boxMint'
      } = {} as any,
) {
  return useContractWrite<typeof itemABI, 'boxMint', TMode>({
    abi: itemABI,
    functionName: 'boxMint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"changeBasePrefix"`.
 */
export function useItemChangeBasePrefix<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof itemABI,
          'changeBasePrefix'
        >['request']['abi'],
        'changeBasePrefix',
        TMode
      > & { functionName?: 'changeBasePrefix' }
    : UseContractWriteConfig<typeof itemABI, 'changeBasePrefix', TMode> & {
        abi?: never
        functionName?: 'changeBasePrefix'
      } = {} as any,
) {
  return useContractWrite<typeof itemABI, 'changeBasePrefix', TMode>({
    abi: itemABI,
    functionName: 'changeBasePrefix',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"equipItem"`.
 */
export function useItemEquipItem<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof itemABI,
          'equipItem'
        >['request']['abi'],
        'equipItem',
        TMode
      > & { functionName?: 'equipItem' }
    : UseContractWriteConfig<typeof itemABI, 'equipItem', TMode> & {
        abi?: never
        functionName?: 'equipItem'
      } = {} as any,
) {
  return useContractWrite<typeof itemABI, 'equipItem', TMode>({
    abi: itemABI,
    functionName: 'equipItem',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"initialize"`.
 */
export function useItemInitialize<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof itemABI,
          'initialize'
        >['request']['abi'],
        'initialize',
        TMode
      > & { functionName?: 'initialize' }
    : UseContractWriteConfig<typeof itemABI, 'initialize', TMode> & {
        abi?: never
        functionName?: 'initialize'
      } = {} as any,
) {
  return useContractWrite<typeof itemABI, 'initialize', TMode>({
    abi: itemABI,
    functionName: 'initialize',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"levelUp"`.
 */
export function useItemLevelUp<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof itemABI, 'levelUp'>['request']['abi'],
        'levelUp',
        TMode
      > & { functionName?: 'levelUp' }
    : UseContractWriteConfig<typeof itemABI, 'levelUp', TMode> & {
        abi?: never
        functionName?: 'levelUp'
      } = {} as any,
) {
  return useContractWrite<typeof itemABI, 'levelUp', TMode>({
    abi: itemABI,
    functionName: 'levelUp',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"levelUpFree"`.
 */
export function useItemLevelUpFree<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof itemABI,
          'levelUpFree'
        >['request']['abi'],
        'levelUpFree',
        TMode
      > & { functionName?: 'levelUpFree' }
    : UseContractWriteConfig<typeof itemABI, 'levelUpFree', TMode> & {
        abi?: never
        functionName?: 'levelUpFree'
      } = {} as any,
) {
  return useContractWrite<typeof itemABI, 'levelUpFree', TMode>({
    abi: itemABI,
    functionName: 'levelUpFree',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"mint"`.
 */
export function useItemMint<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof itemABI, 'mint'>['request']['abi'],
        'mint',
        TMode
      > & { functionName?: 'mint' }
    : UseContractWriteConfig<typeof itemABI, 'mint', TMode> & {
        abi?: never
        functionName?: 'mint'
      } = {} as any,
) {
  return useContractWrite<typeof itemABI, 'mint', TMode>({
    abi: itemABI,
    functionName: 'mint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"mintRandom"`.
 */
export function useItemMintRandom<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof itemABI,
          'mintRandom'
        >['request']['abi'],
        'mintRandom',
        TMode
      > & { functionName?: 'mintRandom' }
    : UseContractWriteConfig<typeof itemABI, 'mintRandom', TMode> & {
        abi?: never
        functionName?: 'mintRandom'
      } = {} as any,
) {
  return useContractWrite<typeof itemABI, 'mintRandom', TMode>({
    abi: itemABI,
    functionName: 'mintRandom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function useItemRenounceOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof itemABI,
          'renounceOwnership'
        >['request']['abi'],
        'renounceOwnership',
        TMode
      > & { functionName?: 'renounceOwnership' }
    : UseContractWriteConfig<typeof itemABI, 'renounceOwnership', TMode> & {
        abi?: never
        functionName?: 'renounceOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof itemABI, 'renounceOwnership', TMode>({
    abi: itemABI,
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function useItemSafeTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof itemABI,
          'safeTransferFrom'
        >['request']['abi'],
        'safeTransferFrom',
        TMode
      > & { functionName?: 'safeTransferFrom' }
    : UseContractWriteConfig<typeof itemABI, 'safeTransferFrom', TMode> & {
        abi?: never
        functionName?: 'safeTransferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof itemABI, 'safeTransferFrom', TMode>({
    abi: itemABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function useItemSetApprovalForAll<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof itemABI,
          'setApprovalForAll'
        >['request']['abi'],
        'setApprovalForAll',
        TMode
      > & { functionName?: 'setApprovalForAll' }
    : UseContractWriteConfig<typeof itemABI, 'setApprovalForAll', TMode> & {
        abi?: never
        functionName?: 'setApprovalForAll'
      } = {} as any,
) {
  return useContractWrite<typeof itemABI, 'setApprovalForAll', TMode>({
    abi: itemABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"setBaseURI"`.
 */
export function useItemSetBaseUri<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof itemABI,
          'setBaseURI'
        >['request']['abi'],
        'setBaseURI',
        TMode
      > & { functionName?: 'setBaseURI' }
    : UseContractWriteConfig<typeof itemABI, 'setBaseURI', TMode> & {
        abi?: never
        functionName?: 'setBaseURI'
      } = {} as any,
) {
  return useContractWrite<typeof itemABI, 'setBaseURI', TMode>({
    abi: itemABI,
    functionName: 'setBaseURI',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"setBoxAddress"`.
 */
export function useItemSetBoxAddress<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof itemABI,
          'setBoxAddress'
        >['request']['abi'],
        'setBoxAddress',
        TMode
      > & { functionName?: 'setBoxAddress' }
    : UseContractWriteConfig<typeof itemABI, 'setBoxAddress', TMode> & {
        abi?: never
        functionName?: 'setBoxAddress'
      } = {} as any,
) {
  return useContractWrite<typeof itemABI, 'setBoxAddress', TMode>({
    abi: itemABI,
    functionName: 'setBoxAddress',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"setGemsAddress"`.
 */
export function useItemSetGemsAddress<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof itemABI,
          'setGemsAddress'
        >['request']['abi'],
        'setGemsAddress',
        TMode
      > & { functionName?: 'setGemsAddress' }
    : UseContractWriteConfig<typeof itemABI, 'setGemsAddress', TMode> & {
        abi?: never
        functionName?: 'setGemsAddress'
      } = {} as any,
) {
  return useContractWrite<typeof itemABI, 'setGemsAddress', TMode>({
    abi: itemABI,
    functionName: 'setGemsAddress',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"setLemonAddress"`.
 */
export function useItemSetLemonAddress<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof itemABI,
          'setLemonAddress'
        >['request']['abi'],
        'setLemonAddress',
        TMode
      > & { functionName?: 'setLemonAddress' }
    : UseContractWriteConfig<typeof itemABI, 'setLemonAddress', TMode> & {
        abi?: never
        functionName?: 'setLemonAddress'
      } = {} as any,
) {
  return useContractWrite<typeof itemABI, 'setLemonAddress', TMode>({
    abi: itemABI,
    functionName: 'setLemonAddress',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"setLvlUpPrice"`.
 */
export function useItemSetLvlUpPrice<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof itemABI,
          'setLvlUpPrice'
        >['request']['abi'],
        'setLvlUpPrice',
        TMode
      > & { functionName?: 'setLvlUpPrice' }
    : UseContractWriteConfig<typeof itemABI, 'setLvlUpPrice', TMode> & {
        abi?: never
        functionName?: 'setLvlUpPrice'
      } = {} as any,
) {
  return useContractWrite<typeof itemABI, 'setLvlUpPrice', TMode>({
    abi: itemABI,
    functionName: 'setLvlUpPrice',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"setMaxItemTypes"`.
 */
export function useItemSetMaxItemTypes<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof itemABI,
          'setMaxItemTypes'
        >['request']['abi'],
        'setMaxItemTypes',
        TMode
      > & { functionName?: 'setMaxItemTypes' }
    : UseContractWriteConfig<typeof itemABI, 'setMaxItemTypes', TMode> & {
        abi?: never
        functionName?: 'setMaxItemTypes'
      } = {} as any,
) {
  return useContractWrite<typeof itemABI, 'setMaxItemTypes', TMode>({
    abi: itemABI,
    functionName: 'setMaxItemTypes',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"setStickersAddress"`.
 */
export function useItemSetStickersAddress<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof itemABI,
          'setStickersAddress'
        >['request']['abi'],
        'setStickersAddress',
        TMode
      > & { functionName?: 'setStickersAddress' }
    : UseContractWriteConfig<typeof itemABI, 'setStickersAddress', TMode> & {
        abi?: never
        functionName?: 'setStickersAddress'
      } = {} as any,
) {
  return useContractWrite<typeof itemABI, 'setStickersAddress', TMode>({
    abi: itemABI,
    functionName: 'setStickersAddress',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"transferEquippedItem"`.
 */
export function useItemTransferEquippedItem<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof itemABI,
          'transferEquippedItem'
        >['request']['abi'],
        'transferEquippedItem',
        TMode
      > & { functionName?: 'transferEquippedItem' }
    : UseContractWriteConfig<typeof itemABI, 'transferEquippedItem', TMode> & {
        abi?: never
        functionName?: 'transferEquippedItem'
      } = {} as any,
) {
  return useContractWrite<typeof itemABI, 'transferEquippedItem', TMode>({
    abi: itemABI,
    functionName: 'transferEquippedItem',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useItemTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof itemABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof itemABI, 'transferFrom', TMode> & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof itemABI, 'transferFrom', TMode>({
    abi: itemABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function useItemTransferOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof itemABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & { functionName?: 'transferOwnership' }
    : UseContractWriteConfig<typeof itemABI, 'transferOwnership', TMode> & {
        abi?: never
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof itemABI, 'transferOwnership', TMode>({
    abi: itemABI,
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"unequipItem"`.
 */
export function useItemUnequipItem<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof itemABI,
          'unequipItem'
        >['request']['abi'],
        'unequipItem',
        TMode
      > & { functionName?: 'unequipItem' }
    : UseContractWriteConfig<typeof itemABI, 'unequipItem', TMode> & {
        abi?: never
        functionName?: 'unequipItem'
      } = {} as any,
) {
  return useContractWrite<typeof itemABI, 'unequipItem', TMode>({
    abi: itemABI,
    functionName: 'unequipItem',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"withdraw"`.
 */
export function useItemWithdraw<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof itemABI,
          'withdraw'
        >['request']['abi'],
        'withdraw',
        TMode
      > & { functionName?: 'withdraw' }
    : UseContractWriteConfig<typeof itemABI, 'withdraw', TMode> & {
        abi?: never
        functionName?: 'withdraw'
      } = {} as any,
) {
  return useContractWrite<typeof itemABI, 'withdraw', TMode>({
    abi: itemABI,
    functionName: 'withdraw',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link itemABI}__.
 */
export function usePrepareItemWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof itemABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: itemABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof itemABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareItemApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof itemABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: itemABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof itemABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"boxMint"`.
 */
export function usePrepareItemBoxMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof itemABI, 'boxMint'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: itemABI,
    functionName: 'boxMint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof itemABI, 'boxMint'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"changeBasePrefix"`.
 */
export function usePrepareItemChangeBasePrefix(
  config: Omit<
    UsePrepareContractWriteConfig<typeof itemABI, 'changeBasePrefix'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: itemABI,
    functionName: 'changeBasePrefix',
    ...config,
  } as UsePrepareContractWriteConfig<typeof itemABI, 'changeBasePrefix'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"equipItem"`.
 */
export function usePrepareItemEquipItem(
  config: Omit<
    UsePrepareContractWriteConfig<typeof itemABI, 'equipItem'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: itemABI,
    functionName: 'equipItem',
    ...config,
  } as UsePrepareContractWriteConfig<typeof itemABI, 'equipItem'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"initialize"`.
 */
export function usePrepareItemInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof itemABI, 'initialize'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: itemABI,
    functionName: 'initialize',
    ...config,
  } as UsePrepareContractWriteConfig<typeof itemABI, 'initialize'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"levelUp"`.
 */
export function usePrepareItemLevelUp(
  config: Omit<
    UsePrepareContractWriteConfig<typeof itemABI, 'levelUp'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: itemABI,
    functionName: 'levelUp',
    ...config,
  } as UsePrepareContractWriteConfig<typeof itemABI, 'levelUp'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"levelUpFree"`.
 */
export function usePrepareItemLevelUpFree(
  config: Omit<
    UsePrepareContractWriteConfig<typeof itemABI, 'levelUpFree'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: itemABI,
    functionName: 'levelUpFree',
    ...config,
  } as UsePrepareContractWriteConfig<typeof itemABI, 'levelUpFree'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"mint"`.
 */
export function usePrepareItemMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof itemABI, 'mint'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: itemABI,
    functionName: 'mint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof itemABI, 'mint'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"mintRandom"`.
 */
export function usePrepareItemMintRandom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof itemABI, 'mintRandom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: itemABI,
    functionName: 'mintRandom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof itemABI, 'mintRandom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function usePrepareItemRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof itemABI, 'renounceOwnership'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: itemABI,
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof itemABI, 'renounceOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePrepareItemSafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof itemABI, 'safeTransferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: itemABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof itemABI, 'safeTransferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePrepareItemSetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<typeof itemABI, 'setApprovalForAll'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: itemABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<typeof itemABI, 'setApprovalForAll'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"setBaseURI"`.
 */
export function usePrepareItemSetBaseUri(
  config: Omit<
    UsePrepareContractWriteConfig<typeof itemABI, 'setBaseURI'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: itemABI,
    functionName: 'setBaseURI',
    ...config,
  } as UsePrepareContractWriteConfig<typeof itemABI, 'setBaseURI'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"setBoxAddress"`.
 */
export function usePrepareItemSetBoxAddress(
  config: Omit<
    UsePrepareContractWriteConfig<typeof itemABI, 'setBoxAddress'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: itemABI,
    functionName: 'setBoxAddress',
    ...config,
  } as UsePrepareContractWriteConfig<typeof itemABI, 'setBoxAddress'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"setGemsAddress"`.
 */
export function usePrepareItemSetGemsAddress(
  config: Omit<
    UsePrepareContractWriteConfig<typeof itemABI, 'setGemsAddress'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: itemABI,
    functionName: 'setGemsAddress',
    ...config,
  } as UsePrepareContractWriteConfig<typeof itemABI, 'setGemsAddress'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"setLemonAddress"`.
 */
export function usePrepareItemSetLemonAddress(
  config: Omit<
    UsePrepareContractWriteConfig<typeof itemABI, 'setLemonAddress'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: itemABI,
    functionName: 'setLemonAddress',
    ...config,
  } as UsePrepareContractWriteConfig<typeof itemABI, 'setLemonAddress'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"setLvlUpPrice"`.
 */
export function usePrepareItemSetLvlUpPrice(
  config: Omit<
    UsePrepareContractWriteConfig<typeof itemABI, 'setLvlUpPrice'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: itemABI,
    functionName: 'setLvlUpPrice',
    ...config,
  } as UsePrepareContractWriteConfig<typeof itemABI, 'setLvlUpPrice'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"setMaxItemTypes"`.
 */
export function usePrepareItemSetMaxItemTypes(
  config: Omit<
    UsePrepareContractWriteConfig<typeof itemABI, 'setMaxItemTypes'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: itemABI,
    functionName: 'setMaxItemTypes',
    ...config,
  } as UsePrepareContractWriteConfig<typeof itemABI, 'setMaxItemTypes'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"setStickersAddress"`.
 */
export function usePrepareItemSetStickersAddress(
  config: Omit<
    UsePrepareContractWriteConfig<typeof itemABI, 'setStickersAddress'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: itemABI,
    functionName: 'setStickersAddress',
    ...config,
  } as UsePrepareContractWriteConfig<typeof itemABI, 'setStickersAddress'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"transferEquippedItem"`.
 */
export function usePrepareItemTransferEquippedItem(
  config: Omit<
    UsePrepareContractWriteConfig<typeof itemABI, 'transferEquippedItem'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: itemABI,
    functionName: 'transferEquippedItem',
    ...config,
  } as UsePrepareContractWriteConfig<typeof itemABI, 'transferEquippedItem'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareItemTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof itemABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: itemABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof itemABI, 'transferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function usePrepareItemTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof itemABI, 'transferOwnership'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: itemABI,
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof itemABI, 'transferOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"unequipItem"`.
 */
export function usePrepareItemUnequipItem(
  config: Omit<
    UsePrepareContractWriteConfig<typeof itemABI, 'unequipItem'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: itemABI,
    functionName: 'unequipItem',
    ...config,
  } as UsePrepareContractWriteConfig<typeof itemABI, 'unequipItem'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"withdraw"`.
 */
export function usePrepareItemWithdraw(
  config: Omit<
    UsePrepareContractWriteConfig<typeof itemABI, 'withdraw'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: itemABI,
    functionName: 'withdraw',
    ...config,
  } as UsePrepareContractWriteConfig<typeof itemABI, 'withdraw'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link itemABI}__.
 */
export function useItemEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof itemABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({ abi: itemABI, ...config } as UseContractEventConfig<
    typeof itemABI,
    TEventName
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link itemABI}__ and `eventName` set to `"Approval"`.
 */
export function useItemApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof itemABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: itemABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof itemABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link itemABI}__ and `eventName` set to `"ApprovalForAll"`.
 */
export function useItemApprovalForAllEvent(
  config: Omit<
    UseContractEventConfig<typeof itemABI, 'ApprovalForAll'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: itemABI,
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof itemABI, 'ApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link itemABI}__ and `eventName` set to `"Create"`.
 */
export function useItemCreateEvent(
  config: Omit<
    UseContractEventConfig<typeof itemABI, 'Create'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: itemABI,
    eventName: 'Create',
    ...config,
  } as UseContractEventConfig<typeof itemABI, 'Create'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link itemABI}__ and `eventName` set to `"Initialized"`.
 */
export function useItemInitializedEvent(
  config: Omit<
    UseContractEventConfig<typeof itemABI, 'Initialized'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: itemABI,
    eventName: 'Initialized',
    ...config,
  } as UseContractEventConfig<typeof itemABI, 'Initialized'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link itemABI}__ and `eventName` set to `"Lvlup"`.
 */
export function useItemLvlupEvent(
  config: Omit<
    UseContractEventConfig<typeof itemABI, 'Lvlup'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: itemABI,
    eventName: 'Lvlup',
    ...config,
  } as UseContractEventConfig<typeof itemABI, 'Lvlup'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link itemABI}__ and `eventName` set to `"MintRandom"`.
 */
export function useItemMintRandomEvent(
  config: Omit<
    UseContractEventConfig<typeof itemABI, 'MintRandom'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: itemABI,
    eventName: 'MintRandom',
    ...config,
  } as UseContractEventConfig<typeof itemABI, 'MintRandom'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link itemABI}__ and `eventName` set to `"OwnershipTransferred"`.
 */
export function useItemOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof itemABI, 'OwnershipTransferred'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: itemABI,
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof itemABI, 'OwnershipTransferred'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link itemABI}__ and `eventName` set to `"Transfer"`.
 */
export function useItemTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof itemABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: itemABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof itemABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lemonABI}__.
 */
export function useLemonRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof lemonABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({ abi: lemonABI, ...config } as UseContractReadConfig<
    typeof lemonABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"LEMON_PRICE"`.
 */
export function useLemonLemonPrice<
  TFunctionName extends 'LEMON_PRICE',
  TSelectData = ReadContractResult<typeof lemonABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lemonABI,
    functionName: 'LEMON_PRICE',
    ...config,
  } as UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"MAX_ALPHA_LEMON_BUY_SUPPLY"`.
 */
export function useLemonMaxAlphaLemonBuySupply<
  TFunctionName extends 'MAX_ALPHA_LEMON_BUY_SUPPLY',
  TSelectData = ReadContractResult<typeof lemonABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lemonABI,
    functionName: 'MAX_ALPHA_LEMON_BUY_SUPPLY',
    ...config,
  } as UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"MAX_ALPHA_LEMON_SUPPLY"`.
 */
export function useLemonMaxAlphaLemonSupply<
  TFunctionName extends 'MAX_ALPHA_LEMON_SUPPLY',
  TSelectData = ReadContractResult<typeof lemonABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lemonABI,
    functionName: 'MAX_ALPHA_LEMON_SUPPLY',
    ...config,
  } as UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"WHITELIST_AMOUNT"`.
 */
export function useLemonWhitelistAmount<
  TFunctionName extends 'WHITELIST_AMOUNT',
  TSelectData = ReadContractResult<typeof lemonABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lemonABI,
    functionName: 'WHITELIST_AMOUNT',
    ...config,
  } as UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"_nextTokenId"`.
 */
export function useLemonNextTokenId<
  TFunctionName extends '_nextTokenId',
  TSelectData = ReadContractResult<typeof lemonABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lemonABI,
    functionName: '_nextTokenId',
    ...config,
  } as UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"alphaPrefix"`.
 */
export function useLemonAlphaPrefix<
  TFunctionName extends 'alphaPrefix',
  TSelectData = ReadContractResult<typeof lemonABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lemonABI,
    functionName: 'alphaPrefix',
    ...config,
  } as UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useLemonBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof lemonABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lemonABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"boxAddress"`.
 */
export function useLemonBoxAddress<
  TFunctionName extends 'boxAddress',
  TSelectData = ReadContractResult<typeof lemonABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lemonABI,
    functionName: 'boxAddress',
    ...config,
  } as UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"equipment"`.
 */
export function useLemonEquipment<
  TFunctionName extends 'equipment',
  TSelectData = ReadContractResult<typeof lemonABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lemonABI,
    functionName: 'equipment',
    ...config,
  } as UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"gemsAddress"`.
 */
export function useLemonGemsAddress<
  TFunctionName extends 'gemsAddress',
  TSelectData = ReadContractResult<typeof lemonABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lemonABI,
    functionName: 'gemsAddress',
    ...config,
  } as UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"getAllEquipment"`.
 */
export function useLemonGetAllEquipment<
  TFunctionName extends 'getAllEquipment',
  TSelectData = ReadContractResult<typeof lemonABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lemonABI,
    functionName: 'getAllEquipment',
    ...config,
  } as UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"getApproved"`.
 */
export function useLemonGetApproved<
  TFunctionName extends 'getApproved',
  TSelectData = ReadContractResult<typeof lemonABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lemonABI,
    functionName: 'getApproved',
    ...config,
  } as UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"getEquipment"`.
 */
export function useLemonGetEquipment<
  TFunctionName extends 'getEquipment',
  TSelectData = ReadContractResult<typeof lemonABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lemonABI,
    functionName: 'getEquipment',
    ...config,
  } as UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"isApprovedForAll"`.
 */
export function useLemonIsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof lemonABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lemonABI,
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"itemsContract"`.
 */
export function useLemonItemsContract<
  TFunctionName extends 'itemsContract',
  TSelectData = ReadContractResult<typeof lemonABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lemonABI,
    functionName: 'itemsContract',
    ...config,
  } as UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"lemonData"`.
 */
export function useLemonLemonData<
  TFunctionName extends 'lemonData',
  TSelectData = ReadContractResult<typeof lemonABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lemonABI,
    functionName: 'lemonData',
    ...config,
  } as UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"lemonLvl"`.
 */
export function useLemonLemonLvl<
  TFunctionName extends 'lemonLvl',
  TSelectData = ReadContractResult<typeof lemonABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lemonABI,
    functionName: 'lemonLvl',
    ...config,
  } as UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"levelOf"`.
 */
export function useLemonLevelOf<
  TFunctionName extends 'levelOf',
  TSelectData = ReadContractResult<typeof lemonABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lemonABI,
    functionName: 'levelOf',
    ...config,
  } as UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"name"`.
 */
export function useLemonName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof lemonABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lemonABI,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"omegaPrefix"`.
 */
export function useLemonOmegaPrefix<
  TFunctionName extends 'omegaPrefix',
  TSelectData = ReadContractResult<typeof lemonABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lemonABI,
    functionName: 'omegaPrefix',
    ...config,
  } as UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"owner"`.
 */
export function useLemonOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof lemonABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lemonABI,
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"ownerOf"`.
 */
export function useLemonOwnerOf<
  TFunctionName extends 'ownerOf',
  TSelectData = ReadContractResult<typeof lemonABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lemonABI,
    functionName: 'ownerOf',
    ...config,
  } as UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"publicMintOpenTime"`.
 */
export function useLemonPublicMintOpenTime<
  TFunctionName extends 'publicMintOpenTime',
  TSelectData = ReadContractResult<typeof lemonABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lemonABI,
    functionName: 'publicMintOpenTime',
    ...config,
  } as UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"slotEquipped"`.
 */
export function useLemonSlotEquipped<
  TFunctionName extends 'slotEquipped',
  TSelectData = ReadContractResult<typeof lemonABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lemonABI,
    functionName: 'slotEquipped',
    ...config,
  } as UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useLemonSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof lemonABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lemonABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"symbol"`.
 */
export function useLemonSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof lemonABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lemonABI,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"toBytes"`.
 */
export function useLemonToBytes<
  TFunctionName extends 'toBytes',
  TSelectData = ReadContractResult<typeof lemonABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lemonABI,
    functionName: 'toBytes',
    ...config,
  } as UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"tokenURI"`.
 */
export function useLemonTokenUri<
  TFunctionName extends 'tokenURI',
  TSelectData = ReadContractResult<typeof lemonABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lemonABI,
    functionName: 'tokenURI',
    ...config,
  } as UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"totalBasicSupply"`.
 */
export function useLemonTotalBasicSupply<
  TFunctionName extends 'totalBasicSupply',
  TSelectData = ReadContractResult<typeof lemonABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lemonABI,
    functionName: 'totalBasicSupply',
    ...config,
  } as UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"totalBuySupply"`.
 */
export function useLemonTotalBuySupply<
  TFunctionName extends 'totalBuySupply',
  TSelectData = ReadContractResult<typeof lemonABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lemonABI,
    functionName: 'totalBuySupply',
    ...config,
  } as UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"totalUniqueSupply"`.
 */
export function useLemonTotalUniqueSupply<
  TFunctionName extends 'totalUniqueSupply',
  TSelectData = ReadContractResult<typeof lemonABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lemonABI,
    functionName: 'totalUniqueSupply',
    ...config,
  } as UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"tresuary"`.
 */
export function useLemonTresuary<
  TFunctionName extends 'tresuary',
  TSelectData = ReadContractResult<typeof lemonABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lemonABI,
    functionName: 'tresuary',
    ...config,
  } as UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"whitelist"`.
 */
export function useLemonWhitelist<
  TFunctionName extends 'whitelist',
  TSelectData = ReadContractResult<typeof lemonABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lemonABI,
    functionName: 'whitelist',
    ...config,
  } as UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lemonABI}__.
 */
export function useLemonWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof lemonABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof lemonABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof lemonABI, TFunctionName, TMode>({
    abi: lemonABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"addToWhitelist"`.
 */
export function useLemonAddToWhitelist<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lemonABI,
          'addToWhitelist'
        >['request']['abi'],
        'addToWhitelist',
        TMode
      > & { functionName?: 'addToWhitelist' }
    : UseContractWriteConfig<typeof lemonABI, 'addToWhitelist', TMode> & {
        abi?: never
        functionName?: 'addToWhitelist'
      } = {} as any,
) {
  return useContractWrite<typeof lemonABI, 'addToWhitelist', TMode>({
    abi: lemonABI,
    functionName: 'addToWhitelist',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"approve"`.
 */
export function useLemonApprove<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lemonABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof lemonABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof lemonABI, 'approve', TMode>({
    abi: lemonABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"boxMint"`.
 */
export function useLemonBoxMint<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lemonABI,
          'boxMint'
        >['request']['abi'],
        'boxMint',
        TMode
      > & { functionName?: 'boxMint' }
    : UseContractWriteConfig<typeof lemonABI, 'boxMint', TMode> & {
        abi?: never
        functionName?: 'boxMint'
      } = {} as any,
) {
  return useContractWrite<typeof lemonABI, 'boxMint', TMode>({
    abi: lemonABI,
    functionName: 'boxMint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"changeAlphaPrefix"`.
 */
export function useLemonChangeAlphaPrefix<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lemonABI,
          'changeAlphaPrefix'
        >['request']['abi'],
        'changeAlphaPrefix',
        TMode
      > & { functionName?: 'changeAlphaPrefix' }
    : UseContractWriteConfig<typeof lemonABI, 'changeAlphaPrefix', TMode> & {
        abi?: never
        functionName?: 'changeAlphaPrefix'
      } = {} as any,
) {
  return useContractWrite<typeof lemonABI, 'changeAlphaPrefix', TMode>({
    abi: lemonABI,
    functionName: 'changeAlphaPrefix',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"changeEquipmentBatch"`.
 */
export function useLemonChangeEquipmentBatch<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lemonABI,
          'changeEquipmentBatch'
        >['request']['abi'],
        'changeEquipmentBatch',
        TMode
      > & { functionName?: 'changeEquipmentBatch' }
    : UseContractWriteConfig<typeof lemonABI, 'changeEquipmentBatch', TMode> & {
        abi?: never
        functionName?: 'changeEquipmentBatch'
      } = {} as any,
) {
  return useContractWrite<typeof lemonABI, 'changeEquipmentBatch', TMode>({
    abi: lemonABI,
    functionName: 'changeEquipmentBatch',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"changeOmegaPrefix"`.
 */
export function useLemonChangeOmegaPrefix<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lemonABI,
          'changeOmegaPrefix'
        >['request']['abi'],
        'changeOmegaPrefix',
        TMode
      > & { functionName?: 'changeOmegaPrefix' }
    : UseContractWriteConfig<typeof lemonABI, 'changeOmegaPrefix', TMode> & {
        abi?: never
        functionName?: 'changeOmegaPrefix'
      } = {} as any,
) {
  return useContractWrite<typeof lemonABI, 'changeOmegaPrefix', TMode>({
    abi: lemonABI,
    functionName: 'changeOmegaPrefix',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"exchangeGem10"`.
 */
export function useLemonExchangeGem10<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lemonABI,
          'exchangeGem10'
        >['request']['abi'],
        'exchangeGem10',
        TMode
      > & { functionName?: 'exchangeGem10' }
    : UseContractWriteConfig<typeof lemonABI, 'exchangeGem10', TMode> & {
        abi?: never
        functionName?: 'exchangeGem10'
      } = {} as any,
) {
  return useContractWrite<typeof lemonABI, 'exchangeGem10', TMode>({
    abi: lemonABI,
    functionName: 'exchangeGem10',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"initialize"`.
 */
export function useLemonInitialize<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lemonABI,
          'initialize'
        >['request']['abi'],
        'initialize',
        TMode
      > & { functionName?: 'initialize' }
    : UseContractWriteConfig<typeof lemonABI, 'initialize', TMode> & {
        abi?: never
        functionName?: 'initialize'
      } = {} as any,
) {
  return useContractWrite<typeof lemonABI, 'initialize', TMode>({
    abi: lemonABI,
    functionName: 'initialize',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"levelUp"`.
 */
export function useLemonLevelUp<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lemonABI,
          'levelUp'
        >['request']['abi'],
        'levelUp',
        TMode
      > & { functionName?: 'levelUp' }
    : UseContractWriteConfig<typeof lemonABI, 'levelUp', TMode> & {
        abi?: never
        functionName?: 'levelUp'
      } = {} as any,
) {
  return useContractWrite<typeof lemonABI, 'levelUp', TMode>({
    abi: lemonABI,
    functionName: 'levelUp',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"mint"`.
 */
export function useLemonMint<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof lemonABI, 'mint'>['request']['abi'],
        'mint',
        TMode
      > & { functionName?: 'mint' }
    : UseContractWriteConfig<typeof lemonABI, 'mint', TMode> & {
        abi?: never
        functionName?: 'mint'
      } = {} as any,
) {
  return useContractWrite<typeof lemonABI, 'mint', TMode>({
    abi: lemonABI,
    functionName: 'mint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function useLemonRenounceOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lemonABI,
          'renounceOwnership'
        >['request']['abi'],
        'renounceOwnership',
        TMode
      > & { functionName?: 'renounceOwnership' }
    : UseContractWriteConfig<typeof lemonABI, 'renounceOwnership', TMode> & {
        abi?: never
        functionName?: 'renounceOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof lemonABI, 'renounceOwnership', TMode>({
    abi: lemonABI,
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function useLemonSafeTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lemonABI,
          'safeTransferFrom'
        >['request']['abi'],
        'safeTransferFrom',
        TMode
      > & { functionName?: 'safeTransferFrom' }
    : UseContractWriteConfig<typeof lemonABI, 'safeTransferFrom', TMode> & {
        abi?: never
        functionName?: 'safeTransferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof lemonABI, 'safeTransferFrom', TMode>({
    abi: lemonABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function useLemonSetApprovalForAll<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lemonABI,
          'setApprovalForAll'
        >['request']['abi'],
        'setApprovalForAll',
        TMode
      > & { functionName?: 'setApprovalForAll' }
    : UseContractWriteConfig<typeof lemonABI, 'setApprovalForAll', TMode> & {
        abi?: never
        functionName?: 'setApprovalForAll'
      } = {} as any,
) {
  return useContractWrite<typeof lemonABI, 'setApprovalForAll', TMode>({
    abi: lemonABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"setBaseURI"`.
 */
export function useLemonSetBaseUri<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lemonABI,
          'setBaseURI'
        >['request']['abi'],
        'setBaseURI',
        TMode
      > & { functionName?: 'setBaseURI' }
    : UseContractWriteConfig<typeof lemonABI, 'setBaseURI', TMode> & {
        abi?: never
        functionName?: 'setBaseURI'
      } = {} as any,
) {
  return useContractWrite<typeof lemonABI, 'setBaseURI', TMode>({
    abi: lemonABI,
    functionName: 'setBaseURI',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"setBoxAddress"`.
 */
export function useLemonSetBoxAddress<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lemonABI,
          'setBoxAddress'
        >['request']['abi'],
        'setBoxAddress',
        TMode
      > & { functionName?: 'setBoxAddress' }
    : UseContractWriteConfig<typeof lemonABI, 'setBoxAddress', TMode> & {
        abi?: never
        functionName?: 'setBoxAddress'
      } = {} as any,
) {
  return useContractWrite<typeof lemonABI, 'setBoxAddress', TMode>({
    abi: lemonABI,
    functionName: 'setBoxAddress',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"setGemsAddress"`.
 */
export function useLemonSetGemsAddress<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lemonABI,
          'setGemsAddress'
        >['request']['abi'],
        'setGemsAddress',
        TMode
      > & { functionName?: 'setGemsAddress' }
    : UseContractWriteConfig<typeof lemonABI, 'setGemsAddress', TMode> & {
        abi?: never
        functionName?: 'setGemsAddress'
      } = {} as any,
) {
  return useContractWrite<typeof lemonABI, 'setGemsAddress', TMode>({
    abi: lemonABI,
    functionName: 'setGemsAddress',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"setItemsAddress"`.
 */
export function useLemonSetItemsAddress<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lemonABI,
          'setItemsAddress'
        >['request']['abi'],
        'setItemsAddress',
        TMode
      > & { functionName?: 'setItemsAddress' }
    : UseContractWriteConfig<typeof lemonABI, 'setItemsAddress', TMode> & {
        abi?: never
        functionName?: 'setItemsAddress'
      } = {} as any,
) {
  return useContractWrite<typeof lemonABI, 'setItemsAddress', TMode>({
    abi: lemonABI,
    functionName: 'setItemsAddress',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useLemonTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lemonABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof lemonABI, 'transferFrom', TMode> & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof lemonABI, 'transferFrom', TMode>({
    abi: lemonABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function useLemonTransferOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lemonABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & { functionName?: 'transferOwnership' }
    : UseContractWriteConfig<typeof lemonABI, 'transferOwnership', TMode> & {
        abi?: never
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof lemonABI, 'transferOwnership', TMode>({
    abi: lemonABI,
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"withdraw"`.
 */
export function useLemonWithdraw<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lemonABI,
          'withdraw'
        >['request']['abi'],
        'withdraw',
        TMode
      > & { functionName?: 'withdraw' }
    : UseContractWriteConfig<typeof lemonABI, 'withdraw', TMode> & {
        abi?: never
        functionName?: 'withdraw'
      } = {} as any,
) {
  return useContractWrite<typeof lemonABI, 'withdraw', TMode>({
    abi: lemonABI,
    functionName: 'withdraw',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lemonABI}__.
 */
export function usePrepareLemonWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lemonABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lemonABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof lemonABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"addToWhitelist"`.
 */
export function usePrepareLemonAddToWhitelist(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lemonABI, 'addToWhitelist'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lemonABI,
    functionName: 'addToWhitelist',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lemonABI, 'addToWhitelist'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareLemonApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lemonABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lemonABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lemonABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"boxMint"`.
 */
export function usePrepareLemonBoxMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lemonABI, 'boxMint'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lemonABI,
    functionName: 'boxMint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lemonABI, 'boxMint'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"changeAlphaPrefix"`.
 */
export function usePrepareLemonChangeAlphaPrefix(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lemonABI, 'changeAlphaPrefix'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lemonABI,
    functionName: 'changeAlphaPrefix',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lemonABI, 'changeAlphaPrefix'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"changeEquipmentBatch"`.
 */
export function usePrepareLemonChangeEquipmentBatch(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lemonABI, 'changeEquipmentBatch'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lemonABI,
    functionName: 'changeEquipmentBatch',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lemonABI, 'changeEquipmentBatch'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"changeOmegaPrefix"`.
 */
export function usePrepareLemonChangeOmegaPrefix(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lemonABI, 'changeOmegaPrefix'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lemonABI,
    functionName: 'changeOmegaPrefix',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lemonABI, 'changeOmegaPrefix'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"exchangeGem10"`.
 */
export function usePrepareLemonExchangeGem10(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lemonABI, 'exchangeGem10'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lemonABI,
    functionName: 'exchangeGem10',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lemonABI, 'exchangeGem10'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"initialize"`.
 */
export function usePrepareLemonInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lemonABI, 'initialize'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lemonABI,
    functionName: 'initialize',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lemonABI, 'initialize'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"levelUp"`.
 */
export function usePrepareLemonLevelUp(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lemonABI, 'levelUp'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lemonABI,
    functionName: 'levelUp',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lemonABI, 'levelUp'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"mint"`.
 */
export function usePrepareLemonMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lemonABI, 'mint'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lemonABI,
    functionName: 'mint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lemonABI, 'mint'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function usePrepareLemonRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lemonABI, 'renounceOwnership'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lemonABI,
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lemonABI, 'renounceOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePrepareLemonSafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lemonABI, 'safeTransferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lemonABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lemonABI, 'safeTransferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePrepareLemonSetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lemonABI, 'setApprovalForAll'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lemonABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lemonABI, 'setApprovalForAll'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"setBaseURI"`.
 */
export function usePrepareLemonSetBaseUri(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lemonABI, 'setBaseURI'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lemonABI,
    functionName: 'setBaseURI',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lemonABI, 'setBaseURI'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"setBoxAddress"`.
 */
export function usePrepareLemonSetBoxAddress(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lemonABI, 'setBoxAddress'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lemonABI,
    functionName: 'setBoxAddress',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lemonABI, 'setBoxAddress'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"setGemsAddress"`.
 */
export function usePrepareLemonSetGemsAddress(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lemonABI, 'setGemsAddress'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lemonABI,
    functionName: 'setGemsAddress',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lemonABI, 'setGemsAddress'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"setItemsAddress"`.
 */
export function usePrepareLemonSetItemsAddress(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lemonABI, 'setItemsAddress'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lemonABI,
    functionName: 'setItemsAddress',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lemonABI, 'setItemsAddress'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareLemonTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lemonABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lemonABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lemonABI, 'transferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function usePrepareLemonTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lemonABI, 'transferOwnership'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lemonABI,
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lemonABI, 'transferOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"withdraw"`.
 */
export function usePrepareLemonWithdraw(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lemonABI, 'withdraw'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lemonABI,
    functionName: 'withdraw',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lemonABI, 'withdraw'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lemonABI}__.
 */
export function useLemonEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof lemonABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: lemonABI,
    ...config,
  } as UseContractEventConfig<typeof lemonABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lemonABI}__ and `eventName` set to `"Approval"`.
 */
export function useLemonApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof lemonABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: lemonABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof lemonABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lemonABI}__ and `eventName` set to `"ApprovalForAll"`.
 */
export function useLemonApprovalForAllEvent(
  config: Omit<
    UseContractEventConfig<typeof lemonABI, 'ApprovalForAll'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: lemonABI,
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof lemonABI, 'ApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lemonABI}__ and `eventName` set to `"Create"`.
 */
export function useLemonCreateEvent(
  config: Omit<
    UseContractEventConfig<typeof lemonABI, 'Create'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: lemonABI,
    eventName: 'Create',
    ...config,
  } as UseContractEventConfig<typeof lemonABI, 'Create'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lemonABI}__ and `eventName` set to `"EquipmentChanged"`.
 */
export function useLemonEquipmentChangedEvent(
  config: Omit<
    UseContractEventConfig<typeof lemonABI, 'EquipmentChanged'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: lemonABI,
    eventName: 'EquipmentChanged',
    ...config,
  } as UseContractEventConfig<typeof lemonABI, 'EquipmentChanged'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lemonABI}__ and `eventName` set to `"Initialized"`.
 */
export function useLemonInitializedEvent(
  config: Omit<
    UseContractEventConfig<typeof lemonABI, 'Initialized'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: lemonABI,
    eventName: 'Initialized',
    ...config,
  } as UseContractEventConfig<typeof lemonABI, 'Initialized'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lemonABI}__ and `eventName` set to `"Lvlup"`.
 */
export function useLemonLvlupEvent(
  config: Omit<
    UseContractEventConfig<typeof lemonABI, 'Lvlup'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: lemonABI,
    eventName: 'Lvlup',
    ...config,
  } as UseContractEventConfig<typeof lemonABI, 'Lvlup'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lemonABI}__ and `eventName` set to `"OwnershipTransferred"`.
 */
export function useLemonOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof lemonABI, 'OwnershipTransferred'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: lemonABI,
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof lemonABI, 'OwnershipTransferred'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lemonABI}__ and `eventName` set to `"Transfer"`.
 */
export function useLemonTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof lemonABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: lemonABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof lemonABI, 'Transfer'>)
}
