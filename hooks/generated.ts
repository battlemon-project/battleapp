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
// Box
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const boxABI = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
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
        name: 'buyer',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'boxType',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'requestId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
    ],
    name: 'NewPurchase',
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
      {
        name: 'boxType',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'requestId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
      {
        name: 'winner',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'prizeId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Prize',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'CHEAP_BOX_PRICE',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'GOOD_BOX_PRICE',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'GREAT_BOX_PRICE',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MAX_ITEMS_AMOUNT',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MAX_LEMONS_AMOUNT',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'requestId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: '_buyCheapBoxCallback',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'requestId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: '_buyGoodBoxCallback',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'requestId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: '_buyGreatBoxCallback',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'airnodeAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'airnodeRrp',
    outputs: [
      { name: '', internalType: 'contract IAirnodeRrpV0', type: 'address' },
    ],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [],
    name: 'buyCheapBox',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [],
    name: 'buyGoodBox',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [],
    name: 'buyGreatBox',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'cap',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'endpointIdUint256',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'hoodie',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_airnodeRrp', internalType: 'address', type: 'address' }],
    name: 'initialize',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'items',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'itemsMinted',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'largeAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'lemons',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'lemonsMinted',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'linea',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'mediumAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
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
    inputs: [],
    name: 'pickaxe',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'points',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'referrals',
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
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    name: 'requests',
    outputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'pending', internalType: 'bool', type: 'bool' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_cap', internalType: 'address', type: 'address' }],
    name: 'setCapAddress',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_hoodie', internalType: 'address', type: 'address' }],
    name: 'setHoodieAddress',
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
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_lemons', internalType: 'address', type: 'address' }],
    name: 'setLemonAddress',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_pickaxe', internalType: 'address', type: 'address' }],
    name: 'setPickaxeAddress',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_points', internalType: 'address', type: 'address' }],
    name: 'setPointsAddress',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'ref', internalType: 'address', type: 'address' }],
    name: 'setReferallAddress',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_airnode', internalType: 'address', type: 'address' },
      { name: '_endpointIdUint256', internalType: 'bytes32', type: 'bytes32' },
      { name: '_sponsorWallet', internalType: 'address', type: 'address' },
    ],
    name: 'setRequestParameters',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_shirt', internalType: 'address', type: 'address' }],
    name: 'setShirtAddress',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_stickers', internalType: 'address', type: 'address' }],
    name: 'setStickersAddress',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'shirt',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'smallAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'sponsorWallet',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'stickers',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
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
    inputs: [{ name: 'value', internalType: 'uint256', type: 'uint256' }],
    name: 'withdraw',
    outputs: [],
  },
  { stateMutability: 'payable', type: 'receive' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Cap
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const capABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: 'box_', internalType: 'address', type: 'address' },
      { name: 'uri_', internalType: 'string', type: 'string' },
    ],
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
    name: 'baseURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
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
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'burn',
    outputs: [],
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
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
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
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
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
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Gem
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const gemABI = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  { type: 'error', inputs: [], name: 'InvalidDelegate' },
  { type: 'error', inputs: [], name: 'InvalidEndpointCall' },
  { type: 'error', inputs: [], name: 'LzTokenUnavailable' },
  {
    type: 'error',
    inputs: [{ name: 'eid', internalType: 'uint32', type: 'uint32' }],
    name: 'NoPeer',
  },
  {
    type: 'error',
    inputs: [{ name: 'msgValue', internalType: 'uint256', type: 'uint256' }],
    name: 'NotEnoughNative',
  },
  {
    type: 'error',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'OnlyEndpoint',
  },
  {
    type: 'error',
    inputs: [
      { name: 'eid', internalType: 'uint32', type: 'uint32' },
      { name: 'sender', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'OnlyPeer',
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
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'level', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'CrosschainTransfer',
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
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'level', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'Merged',
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
      { name: 'eid', internalType: 'uint32', type: 'uint32', indexed: false },
      {
        name: 'peer',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
    ],
    name: 'PeerSet',
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
    name: '_itemsAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: '_lemonsAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: '_levels',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: '_maxLevel',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: '_pricePerMerge',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: '_senderWhitelist',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: '_treasuryAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'addSenderToWhitelist',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      {
        name: 'origin',
        internalType: 'struct Origin',
        type: 'tuple',
        components: [
          { name: 'srcEid', internalType: 'uint32', type: 'uint32' },
          { name: 'sender', internalType: 'bytes32', type: 'bytes32' },
          { name: 'nonce', internalType: 'uint64', type: 'uint64' },
        ],
      },
    ],
    name: 'allowInitializePath',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
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
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'gemId', internalType: 'uint256', type: 'uint256' }],
    name: 'burn',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'chance', internalType: 'uint256', type: 'uint256' }],
    name: 'changeMergeChance',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'gemId', internalType: 'uint256', type: 'uint256' },
      { name: 'sender', internalType: 'address', type: 'address' },
    ],
    name: 'checkOwnerOf',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'composeMsgSender',
    outputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'endpoint',
    outputs: [
      {
        name: '',
        internalType: 'contract ILayerZeroEndpointV2',
        type: 'address',
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'pricePerMerge_', internalType: 'uint256', type: 'uint256' },
      { name: 'treasuryAddress_', internalType: 'address', type: 'address' },
      { name: '_endpoint', internalType: 'address', type: 'address' },
      { name: 'startTokenId', internalType: 'uint256', type: 'uint256' },
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
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'isWhitelisted',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'levelOf',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: '_origin',
        internalType: 'struct Origin',
        type: 'tuple',
        components: [
          { name: 'srcEid', internalType: 'uint32', type: 'uint32' },
          { name: 'sender', internalType: 'bytes32', type: 'bytes32' },
          { name: 'nonce', internalType: 'uint64', type: 'uint64' },
        ],
      },
      { name: '_guid', internalType: 'bytes32', type: 'bytes32' },
      { name: '_message', internalType: 'bytes', type: 'bytes' },
      { name: '_executor', internalType: 'address', type: 'address' },
      { name: '_extraData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'lzReceive',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'dstEid', internalType: 'uint32', type: 'uint32' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_options', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'lzSend',
    outputs: [
      {
        name: '',
        internalType: 'struct MessagingReceipt',
        type: 'tuple',
        components: [
          { name: 'guid', internalType: 'bytes32', type: 'bytes32' },
          { name: 'nonce', internalType: 'uint64', type: 'uint64' },
          {
            name: 'fee',
            internalType: 'struct MessagingFee',
            type: 'tuple',
            components: [
              { name: 'nativeFee', internalType: 'uint256', type: 'uint256' },
              { name: 'lzTokenFee', internalType: 'uint256', type: 'uint256' },
            ],
          },
        ],
      },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'firstTokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'secondTokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'merge',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'mergeChance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'level', internalType: 'uint8', type: 'uint8' },
    ],
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
    inputs: [
      { name: '', internalType: 'uint32', type: 'uint32' },
      { name: '', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'nextNonce',
    outputs: [{ name: 'nonce', internalType: 'uint64', type: 'uint64' }],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [],
    name: 'oAppVersion',
    outputs: [
      { name: 'senderVersion', internalType: 'uint64', type: 'uint64' },
      { name: 'receiverVersion', internalType: 'uint64', type: 'uint64' },
    ],
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
    inputs: [{ name: 'eid', internalType: 'uint32', type: 'uint32' }],
    name: 'peers',
    outputs: [{ name: 'peer', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_dstEid', internalType: 'uint32', type: 'uint32' },
      { name: '_message', internalType: 'string', type: 'string' },
      { name: '_options', internalType: 'bytes', type: 'bytes' },
      { name: '_payInLzToken', internalType: 'bool', type: 'bool' },
    ],
    name: 'quote',
    outputs: [
      {
        name: 'fee',
        internalType: 'struct MessagingFee',
        type: 'tuple',
        components: [
          { name: 'nativeFee', internalType: 'uint256', type: 'uint256' },
          { name: 'lzTokenFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'removeSenderFromWhitelist',
    outputs: [],
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
    inputs: [{ name: '_delegate', internalType: 'address', type: 'address' }],
    name: 'setDelegate',
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
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_lemons', internalType: 'address', type: 'address' }],
    name: 'setLemonsAddress',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_eid', internalType: 'uint32', type: 'uint32' },
      { name: '_peer', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'setPeer',
    outputs: [],
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
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
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
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Hoodie
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const hoodieABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: 'box_', internalType: 'address', type: 'address' },
      { name: 'uri_', internalType: 'string', type: 'string' },
    ],
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
    name: 'baseURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
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
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'burn',
    outputs: [],
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
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
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
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
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
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Item
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const itemABI = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  { type: 'error', inputs: [], name: 'InvalidDelegate' },
  { type: 'error', inputs: [], name: 'InvalidEndpointCall' },
  { type: 'error', inputs: [], name: 'LzTokenUnavailable' },
  {
    type: 'error',
    inputs: [{ name: 'eid', internalType: 'uint32', type: 'uint32' }],
    name: 'NoPeer',
  },
  {
    type: 'error',
    inputs: [{ name: 'msgValue', internalType: 'uint256', type: 'uint256' }],
    name: 'NotEnoughNative',
  },
  {
    type: 'error',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'OnlyEndpoint',
  },
  {
    type: 'error',
    inputs: [
      { name: 'eid', internalType: 'uint32', type: 'uint32' },
      { name: 'sender', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'OnlyPeer',
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
    name: 'CrosschainTransfer',
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
      { name: 'eid', internalType: 'uint32', type: 'uint32', indexed: false },
      {
        name: 'peer',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
    ],
    name: 'PeerSet',
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
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'addToWhiteList',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      {
        name: 'origin',
        internalType: 'struct Origin',
        type: 'tuple',
        components: [
          { name: 'srcEid', internalType: 'uint32', type: 'uint32' },
          { name: 'sender', internalType: 'bytes32', type: 'bytes32' },
          { name: 'nonce', internalType: 'uint64', type: 'uint64' },
        ],
      },
    ],
    name: 'allowInitializePath',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
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
    inputs: [{ name: 'newPrefix', internalType: 'uint8', type: 'uint8' }],
    name: 'changeBasePrefix',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'composeMsgSender',
    outputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'endpoint',
    outputs: [
      {
        name: '',
        internalType: 'contract ILayerZeroEndpointV2',
        type: 'address',
      },
    ],
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
      { name: 'uri_', internalType: 'string', type: 'string' },
      { name: '_endpoint', internalType: 'address', type: 'address' },
      { name: 'startTokenId', internalType: 'uint256', type: 'uint256' },
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
    inputs: [
      {
        name: '_origin',
        internalType: 'struct Origin',
        type: 'tuple',
        components: [
          { name: 'srcEid', internalType: 'uint32', type: 'uint32' },
          { name: 'sender', internalType: 'bytes32', type: 'bytes32' },
          { name: 'nonce', internalType: 'uint64', type: 'uint64' },
        ],
      },
      { name: '_guid', internalType: 'bytes32', type: 'bytes32' },
      { name: '_message', internalType: 'bytes', type: 'bytes' },
      { name: '_executor', internalType: 'address', type: 'address' },
      { name: '_extraData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'lzReceive',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'dstEid', internalType: 'uint32', type: 'uint32' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_options', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'lzSend',
    outputs: [
      {
        name: '',
        internalType: 'struct MessagingReceipt',
        type: 'tuple',
        components: [
          { name: 'guid', internalType: 'bytes32', type: 'bytes32' },
          { name: 'nonce', internalType: 'uint64', type: 'uint64' },
          {
            name: 'fee',
            internalType: 'struct MessagingFee',
            type: 'tuple',
            components: [
              { name: 'nativeFee', internalType: 'uint256', type: 'uint256' },
              { name: 'lzTokenFee', internalType: 'uint256', type: 'uint256' },
            ],
          },
        ],
      },
    ],
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
    inputs: [
      { name: '', internalType: 'uint32', type: 'uint32' },
      { name: '', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'nextNonce',
    outputs: [{ name: 'nonce', internalType: 'uint64', type: 'uint64' }],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [],
    name: 'oAppVersion',
    outputs: [
      { name: 'senderVersion', internalType: 'uint64', type: 'uint64' },
      { name: 'receiverVersion', internalType: 'uint64', type: 'uint64' },
    ],
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
    inputs: [{ name: 'eid', internalType: 'uint32', type: 'uint32' }],
    name: 'peers',
    outputs: [{ name: 'peer', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_dstEid', internalType: 'uint32', type: 'uint32' },
      { name: '_message', internalType: 'string', type: 'string' },
      { name: '_options', internalType: 'bytes', type: 'bytes' },
      { name: '_payInLzToken', internalType: 'bool', type: 'bool' },
    ],
    name: 'quote',
    outputs: [
      {
        name: 'fee',
        internalType: 'struct MessagingFee',
        type: 'tuple',
        components: [
          { name: 'nativeFee', internalType: 'uint256', type: 'uint256' },
          { name: 'lzTokenFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'referrals',
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
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'rewardMint',
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
    inputs: [{ name: '_delegate', internalType: 'address', type: 'address' }],
    name: 'setDelegate',
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
      { name: '_eid', internalType: 'uint32', type: 'uint32' },
      { name: '_peer', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'setPeer',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'ref', internalType: 'address', type: 'address' }],
    name: 'setReferallAddress',
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
  { type: 'error', inputs: [], name: 'InvalidDelegate' },
  { type: 'error', inputs: [], name: 'InvalidEndpointCall' },
  { type: 'error', inputs: [], name: 'LzTokenUnavailable' },
  {
    type: 'error',
    inputs: [{ name: 'eid', internalType: 'uint32', type: 'uint32' }],
    name: 'NoPeer',
  },
  {
    type: 'error',
    inputs: [{ name: 'msgValue', internalType: 'uint256', type: 'uint256' }],
    name: 'NotEnoughNative',
  },
  {
    type: 'error',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'OnlyEndpoint',
  },
  {
    type: 'error',
    inputs: [
      { name: 'eid', internalType: 'uint32', type: 'uint32' },
      { name: 'sender', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'OnlyPeer',
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
    name: 'CrosschainTransfer',
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
      { name: 'eid', internalType: 'uint32', type: 'uint32', indexed: false },
      {
        name: 'peer',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
    ],
    name: 'PeerSet',
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
    inputs: [
      {
        name: 'origin',
        internalType: 'struct Origin',
        type: 'tuple',
        components: [
          { name: 'srcEid', internalType: 'uint32', type: 'uint32' },
          { name: 'sender', internalType: 'bytes32', type: 'bytes32' },
          { name: 'nonce', internalType: 'uint64', type: 'uint64' },
        ],
      },
    ],
    name: 'allowInitializePath',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
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
    inputs: [],
    name: 'composeMsgSender',
    outputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'endpoint',
    outputs: [
      {
        name: '',
        internalType: 'contract ILayerZeroEndpointV2',
        type: 'address',
      },
    ],
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
    inputs: [
      { name: 'tresuary_', internalType: 'address', type: 'address' },
      { name: 'uri', internalType: 'string', type: 'string' },
      { name: '_endpoint', internalType: 'address', type: 'address' },
      { name: 'startTokenId', internalType: 'uint256', type: 'uint256' },
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
    inputs: [
      {
        name: '_origin',
        internalType: 'struct Origin',
        type: 'tuple',
        components: [
          { name: 'srcEid', internalType: 'uint32', type: 'uint32' },
          { name: 'sender', internalType: 'bytes32', type: 'bytes32' },
          { name: 'nonce', internalType: 'uint64', type: 'uint64' },
        ],
      },
      { name: '_guid', internalType: 'bytes32', type: 'bytes32' },
      { name: '_message', internalType: 'bytes', type: 'bytes' },
      { name: '_executor', internalType: 'address', type: 'address' },
      { name: '_extraData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'lzReceive',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'dstEid', internalType: 'uint32', type: 'uint32' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_options', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'lzSend',
    outputs: [
      {
        name: '',
        internalType: 'struct MessagingReceipt',
        type: 'tuple',
        components: [
          { name: 'guid', internalType: 'bytes32', type: 'bytes32' },
          { name: 'nonce', internalType: 'uint64', type: 'uint64' },
          {
            name: 'fee',
            internalType: 'struct MessagingFee',
            type: 'tuple',
            components: [
              { name: 'nativeFee', internalType: 'uint256', type: 'uint256' },
              { name: 'lzTokenFee', internalType: 'uint256', type: 'uint256' },
            ],
          },
        ],
      },
    ],
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
    inputs: [
      { name: '', internalType: 'uint32', type: 'uint32' },
      { name: '', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'nextNonce',
    outputs: [{ name: 'nonce', internalType: 'uint64', type: 'uint64' }],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [],
    name: 'oAppVersion',
    outputs: [
      { name: 'senderVersion', internalType: 'uint64', type: 'uint64' },
      { name: 'receiverVersion', internalType: 'uint64', type: 'uint64' },
    ],
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
    inputs: [{ name: 'eid', internalType: 'uint32', type: 'uint32' }],
    name: 'peers',
    outputs: [{ name: 'peer', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'publicMintOpenTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_dstEid', internalType: 'uint32', type: 'uint32' },
      { name: '_message', internalType: 'string', type: 'string' },
      { name: '_options', internalType: 'bytes', type: 'bytes' },
      { name: '_payInLzToken', internalType: 'bool', type: 'bool' },
    ],
    name: 'quote',
    outputs: [
      {
        name: 'fee',
        internalType: 'struct MessagingFee',
        type: 'tuple',
        components: [
          { name: 'nativeFee', internalType: 'uint256', type: 'uint256' },
          { name: 'lzTokenFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'raids',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'referrals',
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
      { name: 'lemonId', internalType: 'uint256', type: 'uint256' },
      { name: 'caller', internalType: 'address', type: 'address' },
    ],
    name: 'sendLemonToRaid',
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
    inputs: [{ name: '_delegate', internalType: 'address', type: 'address' }],
    name: 'setDelegate',
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
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_eid', internalType: 'uint32', type: 'uint32' },
      { name: '_peer', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'setPeer',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'raids_', internalType: 'address', type: 'address' }],
    name: 'setRaidsAddress',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'ref', internalType: 'address', type: 'address' }],
    name: 'setReferallAddress',
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
// PickAxe
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const pickAxeABI = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  { type: 'error', inputs: [], name: 'InvalidDelegate' },
  { type: 'error', inputs: [], name: 'InvalidEndpointCall' },
  { type: 'error', inputs: [], name: 'LzTokenUnavailable' },
  {
    type: 'error',
    inputs: [{ name: 'eid', internalType: 'uint32', type: 'uint32' }],
    name: 'NoPeer',
  },
  {
    type: 'error',
    inputs: [{ name: 'msgValue', internalType: 'uint256', type: 'uint256' }],
    name: 'NotEnoughNative',
  },
  {
    type: 'error',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'OnlyEndpoint',
  },
  {
    type: 'error',
    inputs: [
      { name: 'eid', internalType: 'uint32', type: 'uint32' },
      { name: 'sender', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'OnlyPeer',
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
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'rank',
        internalType: 'enum Pickaxe.Rank',
        type: 'uint8',
        indexed: false,
      },
      {
        name: 'sharpness',
        internalType: 'uint8',
        type: 'uint8',
        indexed: false,
      },
    ],
    name: 'CrosschainTransfer',
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
      { name: 'eid', internalType: 'uint32', type: 'uint32', indexed: false },
      {
        name: 'peer',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
    ],
    name: 'PeerSet',
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
    name: '_box',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: '_chances',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: '_cheapMintPrice',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: '_cheapSharpPrice',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: '_gemAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: '_goodMaxSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: '_goodMintPrice',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: '_goodSharpPrice',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: '_greatMaxSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: '_greatMintPrice',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: '_greatSharpPrice',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: '_ranks',
    outputs: [{ name: '', internalType: 'enum Pickaxe.Rank', type: 'uint8' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: '_sharpness',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: '_stickersAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'enum Pickaxe.Rank', type: 'uint8' }],
    name: '_supply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: '_treasuryAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      {
        name: 'origin',
        internalType: 'struct Origin',
        type: 'tuple',
        components: [
          { name: 'srcEid', internalType: 'uint32', type: 'uint32' },
          { name: 'sender', internalType: 'bytes32', type: 'bytes32' },
          { name: 'nonce', internalType: 'uint64', type: 'uint64' },
        ],
      },
    ],
    name: 'allowInitializePath',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
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
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: '_type', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'boxMint',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'chipOff',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'composeMsgSender',
    outputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'endpoint',
    outputs: [
      {
        name: '',
        internalType: 'contract ILayerZeroEndpointV2',
        type: 'address',
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'cheapMintPrice_', internalType: 'uint256', type: 'uint256' },
      { name: 'goodMintPrice_', internalType: 'uint256', type: 'uint256' },
      { name: 'greatMintPrice_', internalType: 'uint256', type: 'uint256' },
      { name: 'cheapSharpPrice_', internalType: 'uint256', type: 'uint256' },
      { name: 'goodSharpPrice_', internalType: 'uint256', type: 'uint256' },
      { name: 'greatSharpPrice_', internalType: 'uint256', type: 'uint256' },
      { name: 'treasuryAddress_', internalType: 'address', type: 'address' },
      { name: 'uri_', internalType: 'string', type: 'string' },
      { name: '_endpoint', internalType: 'address', type: 'address' },
      { name: 'startTokenId', internalType: 'uint256', type: 'uint256' },
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
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: '_origin',
        internalType: 'struct Origin',
        type: 'tuple',
        components: [
          { name: 'srcEid', internalType: 'uint32', type: 'uint32' },
          { name: 'sender', internalType: 'bytes32', type: 'bytes32' },
          { name: 'nonce', internalType: 'uint64', type: 'uint64' },
        ],
      },
      { name: '_guid', internalType: 'bytes32', type: 'bytes32' },
      { name: '_message', internalType: 'bytes', type: 'bytes' },
      { name: '_executor', internalType: 'address', type: 'address' },
      { name: '_extraData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'lzReceive',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'dstEid', internalType: 'uint32', type: 'uint32' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_options', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'lzSend',
    outputs: [
      {
        name: '',
        internalType: 'struct MessagingReceipt',
        type: 'tuple',
        components: [
          { name: 'guid', internalType: 'bytes32', type: 'bytes32' },
          { name: 'nonce', internalType: 'uint64', type: 'uint64' },
          {
            name: 'fee',
            internalType: 'struct MessagingFee',
            type: 'tuple',
            components: [
              { name: 'nativeFee', internalType: 'uint256', type: 'uint256' },
              { name: 'lzTokenFee', internalType: 'uint256', type: 'uint256' },
            ],
          },
        ],
      },
    ],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'rank', internalType: 'enum Pickaxe.Rank', type: 'uint8' },
    ],
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
    inputs: [
      { name: '', internalType: 'uint32', type: 'uint32' },
      { name: '', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'nextNonce',
    outputs: [{ name: 'nonce', internalType: 'uint64', type: 'uint64' }],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [],
    name: 'oAppVersion',
    outputs: [
      { name: 'senderVersion', internalType: 'uint64', type: 'uint64' },
      { name: 'receiverVersion', internalType: 'uint64', type: 'uint64' },
    ],
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
    inputs: [{ name: 'eid', internalType: 'uint32', type: 'uint32' }],
    name: 'peers',
    outputs: [{ name: 'peer', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_dstEid', internalType: 'uint32', type: 'uint32' },
      { name: '_message', internalType: 'string', type: 'string' },
      { name: '_options', internalType: 'bytes', type: 'bytes' },
      { name: '_payInLzToken', internalType: 'bool', type: 'bool' },
    ],
    name: 'quote',
    outputs: [
      {
        name: 'fee',
        internalType: 'struct MessagingFee',
        type: 'tuple',
        components: [
          { name: 'nativeFee', internalType: 'uint256', type: 'uint256' },
          { name: 'lzTokenFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'rankOf',
    outputs: [{ name: '', internalType: 'enum Pickaxe.Rank', type: 'uint8' }],
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
    inputs: [{ name: '_delegate', internalType: 'address', type: 'address' }],
    name: 'setDelegate',
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
    inputs: [
      { name: '_eid', internalType: 'uint32', type: 'uint32' },
      { name: '_peer', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'setPeer',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'stickers', internalType: 'address', type: 'address' }],
    name: 'setStickersAddress',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'sharp',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'sharpnessOf',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'rank', internalType: 'enum Pickaxe.Rank', type: 'uint8' },
    ],
    name: 'supplyOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
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
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
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
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Point
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const pointABI = [
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
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'addToWhiteList',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'subtractedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'addedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
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
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'removeFromWhiteList',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
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
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Raids
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const raidsABI = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
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
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'raider',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'lemonid',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'pointsAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'stickerDrop',
        internalType: 'bool',
        type: 'bool',
        indexed: false,
      },
      { name: 'itemDrop', internalType: 'bool', type: 'bool', indexed: false },
      {
        name: 'valueAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'RaidFinished',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'requestId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: '_returnLemonCallback',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'airnodeAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'airnodeRrp',
    outputs: [
      { name: '', internalType: 'contract IAirnodeRrpV0', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'basePointsAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'baseValueAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'endpointIdUint256',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'raidDurations_', internalType: 'uint256[]', type: 'uint256[]' },
      {
        name: 'requiredLemonLevels_',
        internalType: 'uint256[]',
        type: 'uint256[]',
      },
      { name: 'requiredValue_', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'tresuary_', internalType: 'address', type: 'address' },
      { name: '_airnodeRrp', internalType: 'address', type: 'address' },
    ],
    name: 'initialize',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'itemDropChance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'items',
    outputs: [{ name: '', internalType: 'contract IItems', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'lemons',
    outputs: [{ name: '', internalType: 'contract Lemons', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'nextRaidId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
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
    inputs: [],
    name: 'points',
    outputs: [{ name: '', internalType: 'contract Points', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'raidDurations',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'raids',
    outputs: [
      { name: 'startTimestamp', internalType: 'uint256', type: 'uint256' },
      { name: 'finishTimestamp', internalType: 'uint256', type: 'uint256' },
      { name: 'lemonId', internalType: 'uint256', type: 'uint256' },
      { name: 'agility', internalType: 'uint256', type: 'uint256' },
      { name: 'speed', internalType: 'uint256', type: 'uint256' },
      { name: 'luck', internalType: 'uint256', type: 'uint256' },
      { name: 'raider', internalType: 'address', type: 'address' },
      { name: 'raidType', internalType: 'uint8', type: 'uint8' },
      { name: 'isRandomRequested', internalType: 'bool', type: 'bool' },
      { name: 'isFinished', internalType: 'bool', type: 'bool' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    name: 'requests',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'requiredLemonLevels',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'requiredValue',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'raidId', internalType: 'uint8', type: 'uint8' }],
    name: 'returnLemon',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: '_lemonId', internalType: 'uint256', type: 'uint256' },
      { name: '_raidType', internalType: 'uint8', type: 'uint8' },
    ],
    name: 'sendToRaid',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_items', internalType: 'address', type: 'address' }],
    name: 'setItemsAddress',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_lemons', internalType: 'address', type: 'address' }],
    name: 'setLemonAddress',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_points', internalType: 'address', type: 'address' }],
    name: 'setPointsAddress',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_airnode', internalType: 'address', type: 'address' },
      { name: '_endpointIdUint256', internalType: 'bytes32', type: 'bytes32' },
      { name: '_sponsorWallet', internalType: 'address', type: 'address' },
    ],
    name: 'setRequestParameters',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_stickers', internalType: 'address', type: 'address' }],
    name: 'setStickersAddress',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'sponsorWallet',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [{ name: 'x', internalType: 'uint256', type: 'uint256' }],
    name: 'sqrt',
    outputs: [{ name: 'y', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'stickerDropChance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'stickers',
    outputs: [{ name: '', internalType: 'contract Stickers', type: 'address' }],
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
    inputs: [],
    name: 'valueDropChance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'withdraw',
    outputs: [],
  },
  { stateMutability: 'payable', type: 'receive' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Referral
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const referralABI = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'ref', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'ReferralSet',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'getUserRef',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'referrals',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'referralsCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'ref', internalType: 'address', type: 'address' }],
    name: 'setReferee',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Shirt
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const shirtABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: 'box_', internalType: 'address', type: 'address' },
      { name: 'uri_', internalType: 'string', type: 'string' },
    ],
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
    name: 'baseURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
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
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'burn',
    outputs: [],
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
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
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
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
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
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Sticker
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const stickerABI = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  { type: 'error', inputs: [], name: 'InvalidDelegate' },
  { type: 'error', inputs: [], name: 'InvalidEndpointCall' },
  { type: 'error', inputs: [], name: 'LzTokenUnavailable' },
  {
    type: 'error',
    inputs: [{ name: 'eid', internalType: 'uint32', type: 'uint32' }],
    name: 'NoPeer',
  },
  {
    type: 'error',
    inputs: [{ name: 'msgValue', internalType: 'uint256', type: 'uint256' }],
    name: 'NotEnoughNative',
  },
  {
    type: 'error',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'OnlyEndpoint',
  },
  {
    type: 'error',
    inputs: [
      { name: 'eid', internalType: 'uint32', type: 'uint32' },
      { name: 'sender', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'OnlyPeer',
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
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'CrosschainTransfer',
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
      { name: 'eid', internalType: 'uint32', type: 'uint32', indexed: false },
      {
        name: 'peer',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
    ],
    name: 'PeerSet',
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
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'address_', internalType: 'address', type: 'address' }],
    name: 'addAddressToWhitelist',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      {
        name: 'origin',
        internalType: 'struct Origin',
        type: 'tuple',
        components: [
          { name: 'srcEid', internalType: 'uint32', type: 'uint32' },
          { name: 'sender', internalType: 'bytes32', type: 'bytes32' },
          { name: 'nonce', internalType: 'uint64', type: 'uint64' },
        ],
      },
    ],
    name: 'allowInitializePath',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
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
    name: 'composeMsgSender',
    outputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'tokenIds', internalType: 'uint256[4]', type: 'uint256[4]' },
    ],
    name: 'craftItem',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'endpoint',
    outputs: [
      {
        name: '',
        internalType: 'contract ILayerZeroEndpointV2',
        type: 'address',
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'uri_', internalType: 'string', type: 'string' },
      { name: '_endpoint', internalType: 'address', type: 'address' },
      { name: 'startTokenId', internalType: 'uint256', type: 'uint256' },
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
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'isWhitelisted',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'itemsAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: '_origin',
        internalType: 'struct Origin',
        type: 'tuple',
        components: [
          { name: 'srcEid', internalType: 'uint32', type: 'uint32' },
          { name: 'sender', internalType: 'bytes32', type: 'bytes32' },
          { name: 'nonce', internalType: 'uint64', type: 'uint64' },
        ],
      },
      { name: '_guid', internalType: 'bytes32', type: 'bytes32' },
      { name: '_message', internalType: 'bytes', type: 'bytes' },
      { name: '_executor', internalType: 'address', type: 'address' },
      { name: '_extraData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'lzReceive',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'dstEid', internalType: 'uint32', type: 'uint32' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_options', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'lzSend',
    outputs: [
      {
        name: '',
        internalType: 'struct MessagingReceipt',
        type: 'tuple',
        components: [
          { name: 'guid', internalType: 'bytes32', type: 'bytes32' },
          { name: 'nonce', internalType: 'uint64', type: 'uint64' },
          {
            name: 'fee',
            internalType: 'struct MessagingFee',
            type: 'tuple',
            components: [
              { name: 'nativeFee', internalType: 'uint256', type: 'uint256' },
              { name: 'lzTokenFee', internalType: 'uint256', type: 'uint256' },
            ],
          },
        ],
      },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
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
    inputs: [
      { name: '', internalType: 'uint32', type: 'uint32' },
      { name: '', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'nextNonce',
    outputs: [{ name: 'nonce', internalType: 'uint64', type: 'uint64' }],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [],
    name: 'oAppVersion',
    outputs: [
      { name: 'senderVersion', internalType: 'uint64', type: 'uint64' },
      { name: 'receiverVersion', internalType: 'uint64', type: 'uint64' },
    ],
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
    inputs: [{ name: 'eid', internalType: 'uint32', type: 'uint32' }],
    name: 'peers',
    outputs: [{ name: 'peer', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_dstEid', internalType: 'uint32', type: 'uint32' },
      { name: '_message', internalType: 'string', type: 'string' },
      { name: '_options', internalType: 'bytes', type: 'bytes' },
      { name: '_payInLzToken', internalType: 'bool', type: 'bool' },
    ],
    name: 'quote',
    outputs: [
      {
        name: 'fee',
        internalType: 'struct MessagingFee',
        type: 'tuple',
        components: [
          { name: 'nativeFee', internalType: 'uint256', type: 'uint256' },
          { name: 'lzTokenFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
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
    inputs: [{ name: '_delegate', internalType: 'address', type: 'address' }],
    name: 'setDelegate',
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
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_eid', internalType: 'uint32', type: 'uint32' },
      { name: '_peer', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'setPeer',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_typesAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setTypesAmount',
    outputs: [],
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
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
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
    name: 'typesAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link boxABI}__.
 */
export function useBoxRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof boxABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({ abi: boxABI, ...config } as UseContractReadConfig<
    typeof boxABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"CHEAP_BOX_PRICE"`.
 */
export function useBoxCheapBoxPrice<
  TFunctionName extends 'CHEAP_BOX_PRICE',
  TSelectData = ReadContractResult<typeof boxABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: boxABI,
    functionName: 'CHEAP_BOX_PRICE',
    ...config,
  } as UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"GOOD_BOX_PRICE"`.
 */
export function useBoxGoodBoxPrice<
  TFunctionName extends 'GOOD_BOX_PRICE',
  TSelectData = ReadContractResult<typeof boxABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: boxABI,
    functionName: 'GOOD_BOX_PRICE',
    ...config,
  } as UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"GREAT_BOX_PRICE"`.
 */
export function useBoxGreatBoxPrice<
  TFunctionName extends 'GREAT_BOX_PRICE',
  TSelectData = ReadContractResult<typeof boxABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: boxABI,
    functionName: 'GREAT_BOX_PRICE',
    ...config,
  } as UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"MAX_ITEMS_AMOUNT"`.
 */
export function useBoxMaxItemsAmount<
  TFunctionName extends 'MAX_ITEMS_AMOUNT',
  TSelectData = ReadContractResult<typeof boxABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: boxABI,
    functionName: 'MAX_ITEMS_AMOUNT',
    ...config,
  } as UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"MAX_LEMONS_AMOUNT"`.
 */
export function useBoxMaxLemonsAmount<
  TFunctionName extends 'MAX_LEMONS_AMOUNT',
  TSelectData = ReadContractResult<typeof boxABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: boxABI,
    functionName: 'MAX_LEMONS_AMOUNT',
    ...config,
  } as UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"airnodeAddress"`.
 */
export function useBoxAirnodeAddress<
  TFunctionName extends 'airnodeAddress',
  TSelectData = ReadContractResult<typeof boxABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: boxABI,
    functionName: 'airnodeAddress',
    ...config,
  } as UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"airnodeRrp"`.
 */
export function useBoxAirnodeRrp<
  TFunctionName extends 'airnodeRrp',
  TSelectData = ReadContractResult<typeof boxABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: boxABI,
    functionName: 'airnodeRrp',
    ...config,
  } as UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"cap"`.
 */
export function useBoxCap<
  TFunctionName extends 'cap',
  TSelectData = ReadContractResult<typeof boxABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: boxABI,
    functionName: 'cap',
    ...config,
  } as UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"endpointIdUint256"`.
 */
export function useBoxEndpointIdUint256<
  TFunctionName extends 'endpointIdUint256',
  TSelectData = ReadContractResult<typeof boxABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: boxABI,
    functionName: 'endpointIdUint256',
    ...config,
  } as UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"hoodie"`.
 */
export function useBoxHoodie<
  TFunctionName extends 'hoodie',
  TSelectData = ReadContractResult<typeof boxABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: boxABI,
    functionName: 'hoodie',
    ...config,
  } as UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"items"`.
 */
export function useBoxItems<
  TFunctionName extends 'items',
  TSelectData = ReadContractResult<typeof boxABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: boxABI,
    functionName: 'items',
    ...config,
  } as UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"itemsMinted"`.
 */
export function useBoxItemsMinted<
  TFunctionName extends 'itemsMinted',
  TSelectData = ReadContractResult<typeof boxABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: boxABI,
    functionName: 'itemsMinted',
    ...config,
  } as UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"largeAmount"`.
 */
export function useBoxLargeAmount<
  TFunctionName extends 'largeAmount',
  TSelectData = ReadContractResult<typeof boxABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: boxABI,
    functionName: 'largeAmount',
    ...config,
  } as UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"lemons"`.
 */
export function useBoxLemons<
  TFunctionName extends 'lemons',
  TSelectData = ReadContractResult<typeof boxABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: boxABI,
    functionName: 'lemons',
    ...config,
  } as UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"lemonsMinted"`.
 */
export function useBoxLemonsMinted<
  TFunctionName extends 'lemonsMinted',
  TSelectData = ReadContractResult<typeof boxABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: boxABI,
    functionName: 'lemonsMinted',
    ...config,
  } as UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"linea"`.
 */
export function useBoxLinea<
  TFunctionName extends 'linea',
  TSelectData = ReadContractResult<typeof boxABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: boxABI,
    functionName: 'linea',
    ...config,
  } as UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"mediumAmount"`.
 */
export function useBoxMediumAmount<
  TFunctionName extends 'mediumAmount',
  TSelectData = ReadContractResult<typeof boxABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: boxABI,
    functionName: 'mediumAmount',
    ...config,
  } as UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"owner"`.
 */
export function useBoxOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof boxABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: boxABI,
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"pickaxe"`.
 */
export function useBoxPickaxe<
  TFunctionName extends 'pickaxe',
  TSelectData = ReadContractResult<typeof boxABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: boxABI,
    functionName: 'pickaxe',
    ...config,
  } as UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"points"`.
 */
export function useBoxPoints<
  TFunctionName extends 'points',
  TSelectData = ReadContractResult<typeof boxABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: boxABI,
    functionName: 'points',
    ...config,
  } as UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"referrals"`.
 */
export function useBoxReferrals<
  TFunctionName extends 'referrals',
  TSelectData = ReadContractResult<typeof boxABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: boxABI,
    functionName: 'referrals',
    ...config,
  } as UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"requests"`.
 */
export function useBoxRequests<
  TFunctionName extends 'requests',
  TSelectData = ReadContractResult<typeof boxABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: boxABI,
    functionName: 'requests',
    ...config,
  } as UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"shirt"`.
 */
export function useBoxShirt<
  TFunctionName extends 'shirt',
  TSelectData = ReadContractResult<typeof boxABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: boxABI,
    functionName: 'shirt',
    ...config,
  } as UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"smallAmount"`.
 */
export function useBoxSmallAmount<
  TFunctionName extends 'smallAmount',
  TSelectData = ReadContractResult<typeof boxABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: boxABI,
    functionName: 'smallAmount',
    ...config,
  } as UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"sponsorWallet"`.
 */
export function useBoxSponsorWallet<
  TFunctionName extends 'sponsorWallet',
  TSelectData = ReadContractResult<typeof boxABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: boxABI,
    functionName: 'sponsorWallet',
    ...config,
  } as UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"stickers"`.
 */
export function useBoxStickers<
  TFunctionName extends 'stickers',
  TSelectData = ReadContractResult<typeof boxABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: boxABI,
    functionName: 'stickers',
    ...config,
  } as UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"tresuary"`.
 */
export function useBoxTresuary<
  TFunctionName extends 'tresuary',
  TSelectData = ReadContractResult<typeof boxABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: boxABI,
    functionName: 'tresuary',
    ...config,
  } as UseContractReadConfig<typeof boxABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link boxABI}__.
 */
export function useBoxWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof boxABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof boxABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof boxABI, TFunctionName, TMode>({
    abi: boxABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"_buyCheapBoxCallback"`.
 */
export function useBoxBuyCheapBoxCallback<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof boxABI,
          '_buyCheapBoxCallback'
        >['request']['abi'],
        '_buyCheapBoxCallback',
        TMode
      > & { functionName?: '_buyCheapBoxCallback' }
    : UseContractWriteConfig<typeof boxABI, '_buyCheapBoxCallback', TMode> & {
        abi?: never
        functionName?: '_buyCheapBoxCallback'
      } = {} as any,
) {
  return useContractWrite<typeof boxABI, '_buyCheapBoxCallback', TMode>({
    abi: boxABI,
    functionName: '_buyCheapBoxCallback',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"_buyGoodBoxCallback"`.
 */
export function useBoxBuyGoodBoxCallback<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof boxABI,
          '_buyGoodBoxCallback'
        >['request']['abi'],
        '_buyGoodBoxCallback',
        TMode
      > & { functionName?: '_buyGoodBoxCallback' }
    : UseContractWriteConfig<typeof boxABI, '_buyGoodBoxCallback', TMode> & {
        abi?: never
        functionName?: '_buyGoodBoxCallback'
      } = {} as any,
) {
  return useContractWrite<typeof boxABI, '_buyGoodBoxCallback', TMode>({
    abi: boxABI,
    functionName: '_buyGoodBoxCallback',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"_buyGreatBoxCallback"`.
 */
export function useBoxBuyGreatBoxCallback<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof boxABI,
          '_buyGreatBoxCallback'
        >['request']['abi'],
        '_buyGreatBoxCallback',
        TMode
      > & { functionName?: '_buyGreatBoxCallback' }
    : UseContractWriteConfig<typeof boxABI, '_buyGreatBoxCallback', TMode> & {
        abi?: never
        functionName?: '_buyGreatBoxCallback'
      } = {} as any,
) {
  return useContractWrite<typeof boxABI, '_buyGreatBoxCallback', TMode>({
    abi: boxABI,
    functionName: '_buyGreatBoxCallback',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"buyCheapBox"`.
 */
export function useBoxBuyCheapBox<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof boxABI,
          'buyCheapBox'
        >['request']['abi'],
        'buyCheapBox',
        TMode
      > & { functionName?: 'buyCheapBox' }
    : UseContractWriteConfig<typeof boxABI, 'buyCheapBox', TMode> & {
        abi?: never
        functionName?: 'buyCheapBox'
      } = {} as any,
) {
  return useContractWrite<typeof boxABI, 'buyCheapBox', TMode>({
    abi: boxABI,
    functionName: 'buyCheapBox',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"buyGoodBox"`.
 */
export function useBoxBuyGoodBox<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof boxABI,
          'buyGoodBox'
        >['request']['abi'],
        'buyGoodBox',
        TMode
      > & { functionName?: 'buyGoodBox' }
    : UseContractWriteConfig<typeof boxABI, 'buyGoodBox', TMode> & {
        abi?: never
        functionName?: 'buyGoodBox'
      } = {} as any,
) {
  return useContractWrite<typeof boxABI, 'buyGoodBox', TMode>({
    abi: boxABI,
    functionName: 'buyGoodBox',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"buyGreatBox"`.
 */
export function useBoxBuyGreatBox<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof boxABI,
          'buyGreatBox'
        >['request']['abi'],
        'buyGreatBox',
        TMode
      > & { functionName?: 'buyGreatBox' }
    : UseContractWriteConfig<typeof boxABI, 'buyGreatBox', TMode> & {
        abi?: never
        functionName?: 'buyGreatBox'
      } = {} as any,
) {
  return useContractWrite<typeof boxABI, 'buyGreatBox', TMode>({
    abi: boxABI,
    functionName: 'buyGreatBox',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"initialize"`.
 */
export function useBoxInitialize<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof boxABI,
          'initialize'
        >['request']['abi'],
        'initialize',
        TMode
      > & { functionName?: 'initialize' }
    : UseContractWriteConfig<typeof boxABI, 'initialize', TMode> & {
        abi?: never
        functionName?: 'initialize'
      } = {} as any,
) {
  return useContractWrite<typeof boxABI, 'initialize', TMode>({
    abi: boxABI,
    functionName: 'initialize',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function useBoxRenounceOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof boxABI,
          'renounceOwnership'
        >['request']['abi'],
        'renounceOwnership',
        TMode
      > & { functionName?: 'renounceOwnership' }
    : UseContractWriteConfig<typeof boxABI, 'renounceOwnership', TMode> & {
        abi?: never
        functionName?: 'renounceOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof boxABI, 'renounceOwnership', TMode>({
    abi: boxABI,
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"setCapAddress"`.
 */
export function useBoxSetCapAddress<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof boxABI,
          'setCapAddress'
        >['request']['abi'],
        'setCapAddress',
        TMode
      > & { functionName?: 'setCapAddress' }
    : UseContractWriteConfig<typeof boxABI, 'setCapAddress', TMode> & {
        abi?: never
        functionName?: 'setCapAddress'
      } = {} as any,
) {
  return useContractWrite<typeof boxABI, 'setCapAddress', TMode>({
    abi: boxABI,
    functionName: 'setCapAddress',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"setHoodieAddress"`.
 */
export function useBoxSetHoodieAddress<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof boxABI,
          'setHoodieAddress'
        >['request']['abi'],
        'setHoodieAddress',
        TMode
      > & { functionName?: 'setHoodieAddress' }
    : UseContractWriteConfig<typeof boxABI, 'setHoodieAddress', TMode> & {
        abi?: never
        functionName?: 'setHoodieAddress'
      } = {} as any,
) {
  return useContractWrite<typeof boxABI, 'setHoodieAddress', TMode>({
    abi: boxABI,
    functionName: 'setHoodieAddress',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"setItemsAddress"`.
 */
export function useBoxSetItemsAddress<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof boxABI,
          'setItemsAddress'
        >['request']['abi'],
        'setItemsAddress',
        TMode
      > & { functionName?: 'setItemsAddress' }
    : UseContractWriteConfig<typeof boxABI, 'setItemsAddress', TMode> & {
        abi?: never
        functionName?: 'setItemsAddress'
      } = {} as any,
) {
  return useContractWrite<typeof boxABI, 'setItemsAddress', TMode>({
    abi: boxABI,
    functionName: 'setItemsAddress',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"setLemonAddress"`.
 */
export function useBoxSetLemonAddress<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof boxABI,
          'setLemonAddress'
        >['request']['abi'],
        'setLemonAddress',
        TMode
      > & { functionName?: 'setLemonAddress' }
    : UseContractWriteConfig<typeof boxABI, 'setLemonAddress', TMode> & {
        abi?: never
        functionName?: 'setLemonAddress'
      } = {} as any,
) {
  return useContractWrite<typeof boxABI, 'setLemonAddress', TMode>({
    abi: boxABI,
    functionName: 'setLemonAddress',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"setPickaxeAddress"`.
 */
export function useBoxSetPickaxeAddress<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof boxABI,
          'setPickaxeAddress'
        >['request']['abi'],
        'setPickaxeAddress',
        TMode
      > & { functionName?: 'setPickaxeAddress' }
    : UseContractWriteConfig<typeof boxABI, 'setPickaxeAddress', TMode> & {
        abi?: never
        functionName?: 'setPickaxeAddress'
      } = {} as any,
) {
  return useContractWrite<typeof boxABI, 'setPickaxeAddress', TMode>({
    abi: boxABI,
    functionName: 'setPickaxeAddress',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"setPointsAddress"`.
 */
export function useBoxSetPointsAddress<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof boxABI,
          'setPointsAddress'
        >['request']['abi'],
        'setPointsAddress',
        TMode
      > & { functionName?: 'setPointsAddress' }
    : UseContractWriteConfig<typeof boxABI, 'setPointsAddress', TMode> & {
        abi?: never
        functionName?: 'setPointsAddress'
      } = {} as any,
) {
  return useContractWrite<typeof boxABI, 'setPointsAddress', TMode>({
    abi: boxABI,
    functionName: 'setPointsAddress',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"setReferallAddress"`.
 */
export function useBoxSetReferallAddress<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof boxABI,
          'setReferallAddress'
        >['request']['abi'],
        'setReferallAddress',
        TMode
      > & { functionName?: 'setReferallAddress' }
    : UseContractWriteConfig<typeof boxABI, 'setReferallAddress', TMode> & {
        abi?: never
        functionName?: 'setReferallAddress'
      } = {} as any,
) {
  return useContractWrite<typeof boxABI, 'setReferallAddress', TMode>({
    abi: boxABI,
    functionName: 'setReferallAddress',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"setRequestParameters"`.
 */
export function useBoxSetRequestParameters<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof boxABI,
          'setRequestParameters'
        >['request']['abi'],
        'setRequestParameters',
        TMode
      > & { functionName?: 'setRequestParameters' }
    : UseContractWriteConfig<typeof boxABI, 'setRequestParameters', TMode> & {
        abi?: never
        functionName?: 'setRequestParameters'
      } = {} as any,
) {
  return useContractWrite<typeof boxABI, 'setRequestParameters', TMode>({
    abi: boxABI,
    functionName: 'setRequestParameters',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"setShirtAddress"`.
 */
export function useBoxSetShirtAddress<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof boxABI,
          'setShirtAddress'
        >['request']['abi'],
        'setShirtAddress',
        TMode
      > & { functionName?: 'setShirtAddress' }
    : UseContractWriteConfig<typeof boxABI, 'setShirtAddress', TMode> & {
        abi?: never
        functionName?: 'setShirtAddress'
      } = {} as any,
) {
  return useContractWrite<typeof boxABI, 'setShirtAddress', TMode>({
    abi: boxABI,
    functionName: 'setShirtAddress',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"setStickersAddress"`.
 */
export function useBoxSetStickersAddress<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof boxABI,
          'setStickersAddress'
        >['request']['abi'],
        'setStickersAddress',
        TMode
      > & { functionName?: 'setStickersAddress' }
    : UseContractWriteConfig<typeof boxABI, 'setStickersAddress', TMode> & {
        abi?: never
        functionName?: 'setStickersAddress'
      } = {} as any,
) {
  return useContractWrite<typeof boxABI, 'setStickersAddress', TMode>({
    abi: boxABI,
    functionName: 'setStickersAddress',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function useBoxTransferOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof boxABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & { functionName?: 'transferOwnership' }
    : UseContractWriteConfig<typeof boxABI, 'transferOwnership', TMode> & {
        abi?: never
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof boxABI, 'transferOwnership', TMode>({
    abi: boxABI,
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"withdraw"`.
 */
export function useBoxWithdraw<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof boxABI, 'withdraw'>['request']['abi'],
        'withdraw',
        TMode
      > & { functionName?: 'withdraw' }
    : UseContractWriteConfig<typeof boxABI, 'withdraw', TMode> & {
        abi?: never
        functionName?: 'withdraw'
      } = {} as any,
) {
  return useContractWrite<typeof boxABI, 'withdraw', TMode>({
    abi: boxABI,
    functionName: 'withdraw',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link boxABI}__.
 */
export function usePrepareBoxWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof boxABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: boxABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof boxABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"_buyCheapBoxCallback"`.
 */
export function usePrepareBoxBuyCheapBoxCallback(
  config: Omit<
    UsePrepareContractWriteConfig<typeof boxABI, '_buyCheapBoxCallback'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: boxABI,
    functionName: '_buyCheapBoxCallback',
    ...config,
  } as UsePrepareContractWriteConfig<typeof boxABI, '_buyCheapBoxCallback'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"_buyGoodBoxCallback"`.
 */
export function usePrepareBoxBuyGoodBoxCallback(
  config: Omit<
    UsePrepareContractWriteConfig<typeof boxABI, '_buyGoodBoxCallback'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: boxABI,
    functionName: '_buyGoodBoxCallback',
    ...config,
  } as UsePrepareContractWriteConfig<typeof boxABI, '_buyGoodBoxCallback'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"_buyGreatBoxCallback"`.
 */
export function usePrepareBoxBuyGreatBoxCallback(
  config: Omit<
    UsePrepareContractWriteConfig<typeof boxABI, '_buyGreatBoxCallback'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: boxABI,
    functionName: '_buyGreatBoxCallback',
    ...config,
  } as UsePrepareContractWriteConfig<typeof boxABI, '_buyGreatBoxCallback'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"buyCheapBox"`.
 */
export function usePrepareBoxBuyCheapBox(
  config: Omit<
    UsePrepareContractWriteConfig<typeof boxABI, 'buyCheapBox'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: boxABI,
    functionName: 'buyCheapBox',
    ...config,
  } as UsePrepareContractWriteConfig<typeof boxABI, 'buyCheapBox'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"buyGoodBox"`.
 */
export function usePrepareBoxBuyGoodBox(
  config: Omit<
    UsePrepareContractWriteConfig<typeof boxABI, 'buyGoodBox'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: boxABI,
    functionName: 'buyGoodBox',
    ...config,
  } as UsePrepareContractWriteConfig<typeof boxABI, 'buyGoodBox'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"buyGreatBox"`.
 */
export function usePrepareBoxBuyGreatBox(
  config: Omit<
    UsePrepareContractWriteConfig<typeof boxABI, 'buyGreatBox'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: boxABI,
    functionName: 'buyGreatBox',
    ...config,
  } as UsePrepareContractWriteConfig<typeof boxABI, 'buyGreatBox'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"initialize"`.
 */
export function usePrepareBoxInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof boxABI, 'initialize'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: boxABI,
    functionName: 'initialize',
    ...config,
  } as UsePrepareContractWriteConfig<typeof boxABI, 'initialize'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function usePrepareBoxRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof boxABI, 'renounceOwnership'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: boxABI,
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof boxABI, 'renounceOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"setCapAddress"`.
 */
export function usePrepareBoxSetCapAddress(
  config: Omit<
    UsePrepareContractWriteConfig<typeof boxABI, 'setCapAddress'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: boxABI,
    functionName: 'setCapAddress',
    ...config,
  } as UsePrepareContractWriteConfig<typeof boxABI, 'setCapAddress'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"setHoodieAddress"`.
 */
export function usePrepareBoxSetHoodieAddress(
  config: Omit<
    UsePrepareContractWriteConfig<typeof boxABI, 'setHoodieAddress'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: boxABI,
    functionName: 'setHoodieAddress',
    ...config,
  } as UsePrepareContractWriteConfig<typeof boxABI, 'setHoodieAddress'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"setItemsAddress"`.
 */
export function usePrepareBoxSetItemsAddress(
  config: Omit<
    UsePrepareContractWriteConfig<typeof boxABI, 'setItemsAddress'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: boxABI,
    functionName: 'setItemsAddress',
    ...config,
  } as UsePrepareContractWriteConfig<typeof boxABI, 'setItemsAddress'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"setLemonAddress"`.
 */
export function usePrepareBoxSetLemonAddress(
  config: Omit<
    UsePrepareContractWriteConfig<typeof boxABI, 'setLemonAddress'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: boxABI,
    functionName: 'setLemonAddress',
    ...config,
  } as UsePrepareContractWriteConfig<typeof boxABI, 'setLemonAddress'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"setPickaxeAddress"`.
 */
export function usePrepareBoxSetPickaxeAddress(
  config: Omit<
    UsePrepareContractWriteConfig<typeof boxABI, 'setPickaxeAddress'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: boxABI,
    functionName: 'setPickaxeAddress',
    ...config,
  } as UsePrepareContractWriteConfig<typeof boxABI, 'setPickaxeAddress'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"setPointsAddress"`.
 */
export function usePrepareBoxSetPointsAddress(
  config: Omit<
    UsePrepareContractWriteConfig<typeof boxABI, 'setPointsAddress'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: boxABI,
    functionName: 'setPointsAddress',
    ...config,
  } as UsePrepareContractWriteConfig<typeof boxABI, 'setPointsAddress'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"setReferallAddress"`.
 */
export function usePrepareBoxSetReferallAddress(
  config: Omit<
    UsePrepareContractWriteConfig<typeof boxABI, 'setReferallAddress'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: boxABI,
    functionName: 'setReferallAddress',
    ...config,
  } as UsePrepareContractWriteConfig<typeof boxABI, 'setReferallAddress'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"setRequestParameters"`.
 */
export function usePrepareBoxSetRequestParameters(
  config: Omit<
    UsePrepareContractWriteConfig<typeof boxABI, 'setRequestParameters'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: boxABI,
    functionName: 'setRequestParameters',
    ...config,
  } as UsePrepareContractWriteConfig<typeof boxABI, 'setRequestParameters'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"setShirtAddress"`.
 */
export function usePrepareBoxSetShirtAddress(
  config: Omit<
    UsePrepareContractWriteConfig<typeof boxABI, 'setShirtAddress'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: boxABI,
    functionName: 'setShirtAddress',
    ...config,
  } as UsePrepareContractWriteConfig<typeof boxABI, 'setShirtAddress'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"setStickersAddress"`.
 */
export function usePrepareBoxSetStickersAddress(
  config: Omit<
    UsePrepareContractWriteConfig<typeof boxABI, 'setStickersAddress'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: boxABI,
    functionName: 'setStickersAddress',
    ...config,
  } as UsePrepareContractWriteConfig<typeof boxABI, 'setStickersAddress'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function usePrepareBoxTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof boxABI, 'transferOwnership'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: boxABI,
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof boxABI, 'transferOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link boxABI}__ and `functionName` set to `"withdraw"`.
 */
export function usePrepareBoxWithdraw(
  config: Omit<
    UsePrepareContractWriteConfig<typeof boxABI, 'withdraw'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: boxABI,
    functionName: 'withdraw',
    ...config,
  } as UsePrepareContractWriteConfig<typeof boxABI, 'withdraw'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link boxABI}__.
 */
export function useBoxEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof boxABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({ abi: boxABI, ...config } as UseContractEventConfig<
    typeof boxABI,
    TEventName
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link boxABI}__ and `eventName` set to `"Initialized"`.
 */
export function useBoxInitializedEvent(
  config: Omit<
    UseContractEventConfig<typeof boxABI, 'Initialized'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: boxABI,
    eventName: 'Initialized',
    ...config,
  } as UseContractEventConfig<typeof boxABI, 'Initialized'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link boxABI}__ and `eventName` set to `"NewPurchase"`.
 */
export function useBoxNewPurchaseEvent(
  config: Omit<
    UseContractEventConfig<typeof boxABI, 'NewPurchase'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: boxABI,
    eventName: 'NewPurchase',
    ...config,
  } as UseContractEventConfig<typeof boxABI, 'NewPurchase'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link boxABI}__ and `eventName` set to `"OwnershipTransferred"`.
 */
export function useBoxOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof boxABI, 'OwnershipTransferred'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: boxABI,
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof boxABI, 'OwnershipTransferred'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link boxABI}__ and `eventName` set to `"Prize"`.
 */
export function useBoxPrizeEvent(
  config: Omit<
    UseContractEventConfig<typeof boxABI, 'Prize'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: boxABI,
    eventName: 'Prize',
    ...config,
  } as UseContractEventConfig<typeof boxABI, 'Prize'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link capABI}__.
 */
export function useCapRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof capABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof capABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({ abi: capABI, ...config } as UseContractReadConfig<
    typeof capABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link capABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useCapBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof capABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof capABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: capABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof capABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link capABI}__ and `functionName` set to `"baseURI"`.
 */
export function useCapBaseUri<
  TFunctionName extends 'baseURI',
  TSelectData = ReadContractResult<typeof capABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof capABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: capABI,
    functionName: 'baseURI',
    ...config,
  } as UseContractReadConfig<typeof capABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link capABI}__ and `functionName` set to `"getApproved"`.
 */
export function useCapGetApproved<
  TFunctionName extends 'getApproved',
  TSelectData = ReadContractResult<typeof capABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof capABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: capABI,
    functionName: 'getApproved',
    ...config,
  } as UseContractReadConfig<typeof capABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link capABI}__ and `functionName` set to `"isApprovedForAll"`.
 */
export function useCapIsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof capABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof capABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: capABI,
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<typeof capABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link capABI}__ and `functionName` set to `"name"`.
 */
export function useCapName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof capABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof capABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: capABI,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof capABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link capABI}__ and `functionName` set to `"ownerOf"`.
 */
export function useCapOwnerOf<
  TFunctionName extends 'ownerOf',
  TSelectData = ReadContractResult<typeof capABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof capABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: capABI,
    functionName: 'ownerOf',
    ...config,
  } as UseContractReadConfig<typeof capABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link capABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useCapSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof capABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof capABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: capABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof capABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link capABI}__ and `functionName` set to `"symbol"`.
 */
export function useCapSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof capABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof capABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: capABI,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof capABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link capABI}__ and `functionName` set to `"tokenURI"`.
 */
export function useCapTokenUri<
  TFunctionName extends 'tokenURI',
  TSelectData = ReadContractResult<typeof capABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof capABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: capABI,
    functionName: 'tokenURI',
    ...config,
  } as UseContractReadConfig<typeof capABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link capABI}__.
 */
export function useCapWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof capABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof capABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof capABI, TFunctionName, TMode>({
    abi: capABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link capABI}__ and `functionName` set to `"approve"`.
 */
export function useCapApprove<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof capABI, 'approve'>['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof capABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof capABI, 'approve', TMode>({
    abi: capABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link capABI}__ and `functionName` set to `"boxMint"`.
 */
export function useCapBoxMint<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof capABI, 'boxMint'>['request']['abi'],
        'boxMint',
        TMode
      > & { functionName?: 'boxMint' }
    : UseContractWriteConfig<typeof capABI, 'boxMint', TMode> & {
        abi?: never
        functionName?: 'boxMint'
      } = {} as any,
) {
  return useContractWrite<typeof capABI, 'boxMint', TMode>({
    abi: capABI,
    functionName: 'boxMint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link capABI}__ and `functionName` set to `"burn"`.
 */
export function useCapBurn<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof capABI, 'burn'>['request']['abi'],
        'burn',
        TMode
      > & { functionName?: 'burn' }
    : UseContractWriteConfig<typeof capABI, 'burn', TMode> & {
        abi?: never
        functionName?: 'burn'
      } = {} as any,
) {
  return useContractWrite<typeof capABI, 'burn', TMode>({
    abi: capABI,
    functionName: 'burn',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link capABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function useCapSafeTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof capABI,
          'safeTransferFrom'
        >['request']['abi'],
        'safeTransferFrom',
        TMode
      > & { functionName?: 'safeTransferFrom' }
    : UseContractWriteConfig<typeof capABI, 'safeTransferFrom', TMode> & {
        abi?: never
        functionName?: 'safeTransferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof capABI, 'safeTransferFrom', TMode>({
    abi: capABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link capABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function useCapSetApprovalForAll<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof capABI,
          'setApprovalForAll'
        >['request']['abi'],
        'setApprovalForAll',
        TMode
      > & { functionName?: 'setApprovalForAll' }
    : UseContractWriteConfig<typeof capABI, 'setApprovalForAll', TMode> & {
        abi?: never
        functionName?: 'setApprovalForAll'
      } = {} as any,
) {
  return useContractWrite<typeof capABI, 'setApprovalForAll', TMode>({
    abi: capABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link capABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useCapTransferFrom<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof capABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof capABI, 'transferFrom', TMode> & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof capABI, 'transferFrom', TMode>({
    abi: capABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link capABI}__.
 */
export function usePrepareCapWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof capABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: capABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof capABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link capABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareCapApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof capABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: capABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof capABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link capABI}__ and `functionName` set to `"boxMint"`.
 */
export function usePrepareCapBoxMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof capABI, 'boxMint'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: capABI,
    functionName: 'boxMint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof capABI, 'boxMint'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link capABI}__ and `functionName` set to `"burn"`.
 */
export function usePrepareCapBurn(
  config: Omit<
    UsePrepareContractWriteConfig<typeof capABI, 'burn'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: capABI,
    functionName: 'burn',
    ...config,
  } as UsePrepareContractWriteConfig<typeof capABI, 'burn'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link capABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePrepareCapSafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof capABI, 'safeTransferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: capABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof capABI, 'safeTransferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link capABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePrepareCapSetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<typeof capABI, 'setApprovalForAll'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: capABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<typeof capABI, 'setApprovalForAll'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link capABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareCapTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof capABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: capABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof capABI, 'transferFrom'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link capABI}__.
 */
export function useCapEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof capABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({ abi: capABI, ...config } as UseContractEventConfig<
    typeof capABI,
    TEventName
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link capABI}__ and `eventName` set to `"Approval"`.
 */
export function useCapApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof capABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: capABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof capABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link capABI}__ and `eventName` set to `"ApprovalForAll"`.
 */
export function useCapApprovalForAllEvent(
  config: Omit<
    UseContractEventConfig<typeof capABI, 'ApprovalForAll'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: capABI,
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof capABI, 'ApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link capABI}__ and `eventName` set to `"Transfer"`.
 */
export function useCapTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof capABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: capABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof capABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link gemABI}__.
 */
export function useGemRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof gemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({ abi: gemABI, ...config } as UseContractReadConfig<
    typeof gemABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"_itemsAddress"`.
 */
export function useGemItemsAddress<
  TFunctionName extends '_itemsAddress',
  TSelectData = ReadContractResult<typeof gemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: gemABI,
    functionName: '_itemsAddress',
    ...config,
  } as UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"_lemonsAddress"`.
 */
export function useGemLemonsAddress<
  TFunctionName extends '_lemonsAddress',
  TSelectData = ReadContractResult<typeof gemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: gemABI,
    functionName: '_lemonsAddress',
    ...config,
  } as UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"_levels"`.
 */
export function useGemLevels<
  TFunctionName extends '_levels',
  TSelectData = ReadContractResult<typeof gemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: gemABI,
    functionName: '_levels',
    ...config,
  } as UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"_maxLevel"`.
 */
export function useGemMaxLevel<
  TFunctionName extends '_maxLevel',
  TSelectData = ReadContractResult<typeof gemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: gemABI,
    functionName: '_maxLevel',
    ...config,
  } as UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"_pricePerMerge"`.
 */
export function useGemPricePerMerge<
  TFunctionName extends '_pricePerMerge',
  TSelectData = ReadContractResult<typeof gemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: gemABI,
    functionName: '_pricePerMerge',
    ...config,
  } as UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"_senderWhitelist"`.
 */
export function useGemSenderWhitelist<
  TFunctionName extends '_senderWhitelist',
  TSelectData = ReadContractResult<typeof gemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: gemABI,
    functionName: '_senderWhitelist',
    ...config,
  } as UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"_treasuryAddress"`.
 */
export function useGemTreasuryAddress<
  TFunctionName extends '_treasuryAddress',
  TSelectData = ReadContractResult<typeof gemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: gemABI,
    functionName: '_treasuryAddress',
    ...config,
  } as UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"allowInitializePath"`.
 */
export function useGemAllowInitializePath<
  TFunctionName extends 'allowInitializePath',
  TSelectData = ReadContractResult<typeof gemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: gemABI,
    functionName: 'allowInitializePath',
    ...config,
  } as UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useGemBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof gemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: gemABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"checkOwnerOf"`.
 */
export function useGemCheckOwnerOf<
  TFunctionName extends 'checkOwnerOf',
  TSelectData = ReadContractResult<typeof gemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: gemABI,
    functionName: 'checkOwnerOf',
    ...config,
  } as UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"composeMsgSender"`.
 */
export function useGemComposeMsgSender<
  TFunctionName extends 'composeMsgSender',
  TSelectData = ReadContractResult<typeof gemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: gemABI,
    functionName: 'composeMsgSender',
    ...config,
  } as UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"endpoint"`.
 */
export function useGemEndpoint<
  TFunctionName extends 'endpoint',
  TSelectData = ReadContractResult<typeof gemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: gemABI,
    functionName: 'endpoint',
    ...config,
  } as UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"getApproved"`.
 */
export function useGemGetApproved<
  TFunctionName extends 'getApproved',
  TSelectData = ReadContractResult<typeof gemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: gemABI,
    functionName: 'getApproved',
    ...config,
  } as UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"isApprovedForAll"`.
 */
export function useGemIsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof gemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: gemABI,
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"isWhitelisted"`.
 */
export function useGemIsWhitelisted<
  TFunctionName extends 'isWhitelisted',
  TSelectData = ReadContractResult<typeof gemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: gemABI,
    functionName: 'isWhitelisted',
    ...config,
  } as UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"levelOf"`.
 */
export function useGemLevelOf<
  TFunctionName extends 'levelOf',
  TSelectData = ReadContractResult<typeof gemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: gemABI,
    functionName: 'levelOf',
    ...config,
  } as UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"mergeChance"`.
 */
export function useGemMergeChance<
  TFunctionName extends 'mergeChance',
  TSelectData = ReadContractResult<typeof gemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: gemABI,
    functionName: 'mergeChance',
    ...config,
  } as UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"name"`.
 */
export function useGemName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof gemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: gemABI,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"nextNonce"`.
 */
export function useGemNextNonce<
  TFunctionName extends 'nextNonce',
  TSelectData = ReadContractResult<typeof gemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: gemABI,
    functionName: 'nextNonce',
    ...config,
  } as UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"oAppVersion"`.
 */
export function useGemOAppVersion<
  TFunctionName extends 'oAppVersion',
  TSelectData = ReadContractResult<typeof gemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: gemABI,
    functionName: 'oAppVersion',
    ...config,
  } as UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"owner"`.
 */
export function useGemOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof gemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: gemABI,
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"ownerOf"`.
 */
export function useGemOwnerOf<
  TFunctionName extends 'ownerOf',
  TSelectData = ReadContractResult<typeof gemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: gemABI,
    functionName: 'ownerOf',
    ...config,
  } as UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"peers"`.
 */
export function useGemPeers<
  TFunctionName extends 'peers',
  TSelectData = ReadContractResult<typeof gemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: gemABI,
    functionName: 'peers',
    ...config,
  } as UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"quote"`.
 */
export function useGemQuote<
  TFunctionName extends 'quote',
  TSelectData = ReadContractResult<typeof gemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: gemABI,
    functionName: 'quote',
    ...config,
  } as UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useGemSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof gemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: gemABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"symbol"`.
 */
export function useGemSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof gemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: gemABI,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"tokenURI"`.
 */
export function useGemTokenUri<
  TFunctionName extends 'tokenURI',
  TSelectData = ReadContractResult<typeof gemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: gemABI,
    functionName: 'tokenURI',
    ...config,
  } as UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link gemABI}__.
 */
export function useGemWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof gemABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof gemABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof gemABI, TFunctionName, TMode>({
    abi: gemABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"addSenderToWhitelist"`.
 */
export function useGemAddSenderToWhitelist<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof gemABI,
          'addSenderToWhitelist'
        >['request']['abi'],
        'addSenderToWhitelist',
        TMode
      > & { functionName?: 'addSenderToWhitelist' }
    : UseContractWriteConfig<typeof gemABI, 'addSenderToWhitelist', TMode> & {
        abi?: never
        functionName?: 'addSenderToWhitelist'
      } = {} as any,
) {
  return useContractWrite<typeof gemABI, 'addSenderToWhitelist', TMode>({
    abi: gemABI,
    functionName: 'addSenderToWhitelist',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"approve"`.
 */
export function useGemApprove<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof gemABI, 'approve'>['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof gemABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof gemABI, 'approve', TMode>({
    abi: gemABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"burn"`.
 */
export function useGemBurn<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof gemABI, 'burn'>['request']['abi'],
        'burn',
        TMode
      > & { functionName?: 'burn' }
    : UseContractWriteConfig<typeof gemABI, 'burn', TMode> & {
        abi?: never
        functionName?: 'burn'
      } = {} as any,
) {
  return useContractWrite<typeof gemABI, 'burn', TMode>({
    abi: gemABI,
    functionName: 'burn',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"changeMergeChance"`.
 */
export function useGemChangeMergeChance<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof gemABI,
          'changeMergeChance'
        >['request']['abi'],
        'changeMergeChance',
        TMode
      > & { functionName?: 'changeMergeChance' }
    : UseContractWriteConfig<typeof gemABI, 'changeMergeChance', TMode> & {
        abi?: never
        functionName?: 'changeMergeChance'
      } = {} as any,
) {
  return useContractWrite<typeof gemABI, 'changeMergeChance', TMode>({
    abi: gemABI,
    functionName: 'changeMergeChance',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"initialize"`.
 */
export function useGemInitialize<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof gemABI,
          'initialize'
        >['request']['abi'],
        'initialize',
        TMode
      > & { functionName?: 'initialize' }
    : UseContractWriteConfig<typeof gemABI, 'initialize', TMode> & {
        abi?: never
        functionName?: 'initialize'
      } = {} as any,
) {
  return useContractWrite<typeof gemABI, 'initialize', TMode>({
    abi: gemABI,
    functionName: 'initialize',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"lzReceive"`.
 */
export function useGemLzReceive<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof gemABI,
          'lzReceive'
        >['request']['abi'],
        'lzReceive',
        TMode
      > & { functionName?: 'lzReceive' }
    : UseContractWriteConfig<typeof gemABI, 'lzReceive', TMode> & {
        abi?: never
        functionName?: 'lzReceive'
      } = {} as any,
) {
  return useContractWrite<typeof gemABI, 'lzReceive', TMode>({
    abi: gemABI,
    functionName: 'lzReceive',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"lzSend"`.
 */
export function useGemLzSend<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof gemABI, 'lzSend'>['request']['abi'],
        'lzSend',
        TMode
      > & { functionName?: 'lzSend' }
    : UseContractWriteConfig<typeof gemABI, 'lzSend', TMode> & {
        abi?: never
        functionName?: 'lzSend'
      } = {} as any,
) {
  return useContractWrite<typeof gemABI, 'lzSend', TMode>({
    abi: gemABI,
    functionName: 'lzSend',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"merge"`.
 */
export function useGemMerge<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof gemABI, 'merge'>['request']['abi'],
        'merge',
        TMode
      > & { functionName?: 'merge' }
    : UseContractWriteConfig<typeof gemABI, 'merge', TMode> & {
        abi?: never
        functionName?: 'merge'
      } = {} as any,
) {
  return useContractWrite<typeof gemABI, 'merge', TMode>({
    abi: gemABI,
    functionName: 'merge',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"mint"`.
 */
export function useGemMint<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof gemABI, 'mint'>['request']['abi'],
        'mint',
        TMode
      > & { functionName?: 'mint' }
    : UseContractWriteConfig<typeof gemABI, 'mint', TMode> & {
        abi?: never
        functionName?: 'mint'
      } = {} as any,
) {
  return useContractWrite<typeof gemABI, 'mint', TMode>({
    abi: gemABI,
    functionName: 'mint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"removeSenderFromWhitelist"`.
 */
export function useGemRemoveSenderFromWhitelist<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof gemABI,
          'removeSenderFromWhitelist'
        >['request']['abi'],
        'removeSenderFromWhitelist',
        TMode
      > & { functionName?: 'removeSenderFromWhitelist' }
    : UseContractWriteConfig<
        typeof gemABI,
        'removeSenderFromWhitelist',
        TMode
      > & {
        abi?: never
        functionName?: 'removeSenderFromWhitelist'
      } = {} as any,
) {
  return useContractWrite<typeof gemABI, 'removeSenderFromWhitelist', TMode>({
    abi: gemABI,
    functionName: 'removeSenderFromWhitelist',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function useGemRenounceOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof gemABI,
          'renounceOwnership'
        >['request']['abi'],
        'renounceOwnership',
        TMode
      > & { functionName?: 'renounceOwnership' }
    : UseContractWriteConfig<typeof gemABI, 'renounceOwnership', TMode> & {
        abi?: never
        functionName?: 'renounceOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof gemABI, 'renounceOwnership', TMode>({
    abi: gemABI,
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function useGemSafeTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof gemABI,
          'safeTransferFrom'
        >['request']['abi'],
        'safeTransferFrom',
        TMode
      > & { functionName?: 'safeTransferFrom' }
    : UseContractWriteConfig<typeof gemABI, 'safeTransferFrom', TMode> & {
        abi?: never
        functionName?: 'safeTransferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof gemABI, 'safeTransferFrom', TMode>({
    abi: gemABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function useGemSetApprovalForAll<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof gemABI,
          'setApprovalForAll'
        >['request']['abi'],
        'setApprovalForAll',
        TMode
      > & { functionName?: 'setApprovalForAll' }
    : UseContractWriteConfig<typeof gemABI, 'setApprovalForAll', TMode> & {
        abi?: never
        functionName?: 'setApprovalForAll'
      } = {} as any,
) {
  return useContractWrite<typeof gemABI, 'setApprovalForAll', TMode>({
    abi: gemABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"setDelegate"`.
 */
export function useGemSetDelegate<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof gemABI,
          'setDelegate'
        >['request']['abi'],
        'setDelegate',
        TMode
      > & { functionName?: 'setDelegate' }
    : UseContractWriteConfig<typeof gemABI, 'setDelegate', TMode> & {
        abi?: never
        functionName?: 'setDelegate'
      } = {} as any,
) {
  return useContractWrite<typeof gemABI, 'setDelegate', TMode>({
    abi: gemABI,
    functionName: 'setDelegate',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"setItemsAddress"`.
 */
export function useGemSetItemsAddress<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof gemABI,
          'setItemsAddress'
        >['request']['abi'],
        'setItemsAddress',
        TMode
      > & { functionName?: 'setItemsAddress' }
    : UseContractWriteConfig<typeof gemABI, 'setItemsAddress', TMode> & {
        abi?: never
        functionName?: 'setItemsAddress'
      } = {} as any,
) {
  return useContractWrite<typeof gemABI, 'setItemsAddress', TMode>({
    abi: gemABI,
    functionName: 'setItemsAddress',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"setLemonsAddress"`.
 */
export function useGemSetLemonsAddress<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof gemABI,
          'setLemonsAddress'
        >['request']['abi'],
        'setLemonsAddress',
        TMode
      > & { functionName?: 'setLemonsAddress' }
    : UseContractWriteConfig<typeof gemABI, 'setLemonsAddress', TMode> & {
        abi?: never
        functionName?: 'setLemonsAddress'
      } = {} as any,
) {
  return useContractWrite<typeof gemABI, 'setLemonsAddress', TMode>({
    abi: gemABI,
    functionName: 'setLemonsAddress',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"setPeer"`.
 */
export function useGemSetPeer<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof gemABI, 'setPeer'>['request']['abi'],
        'setPeer',
        TMode
      > & { functionName?: 'setPeer' }
    : UseContractWriteConfig<typeof gemABI, 'setPeer', TMode> & {
        abi?: never
        functionName?: 'setPeer'
      } = {} as any,
) {
  return useContractWrite<typeof gemABI, 'setPeer', TMode>({
    abi: gemABI,
    functionName: 'setPeer',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useGemTransferFrom<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof gemABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof gemABI, 'transferFrom', TMode> & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof gemABI, 'transferFrom', TMode>({
    abi: gemABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function useGemTransferOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof gemABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & { functionName?: 'transferOwnership' }
    : UseContractWriteConfig<typeof gemABI, 'transferOwnership', TMode> & {
        abi?: never
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof gemABI, 'transferOwnership', TMode>({
    abi: gemABI,
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link gemABI}__.
 */
export function usePrepareGemWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof gemABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: gemABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof gemABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"addSenderToWhitelist"`.
 */
export function usePrepareGemAddSenderToWhitelist(
  config: Omit<
    UsePrepareContractWriteConfig<typeof gemABI, 'addSenderToWhitelist'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: gemABI,
    functionName: 'addSenderToWhitelist',
    ...config,
  } as UsePrepareContractWriteConfig<typeof gemABI, 'addSenderToWhitelist'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareGemApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof gemABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: gemABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof gemABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"burn"`.
 */
export function usePrepareGemBurn(
  config: Omit<
    UsePrepareContractWriteConfig<typeof gemABI, 'burn'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: gemABI,
    functionName: 'burn',
    ...config,
  } as UsePrepareContractWriteConfig<typeof gemABI, 'burn'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"changeMergeChance"`.
 */
export function usePrepareGemChangeMergeChance(
  config: Omit<
    UsePrepareContractWriteConfig<typeof gemABI, 'changeMergeChance'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: gemABI,
    functionName: 'changeMergeChance',
    ...config,
  } as UsePrepareContractWriteConfig<typeof gemABI, 'changeMergeChance'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"initialize"`.
 */
export function usePrepareGemInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof gemABI, 'initialize'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: gemABI,
    functionName: 'initialize',
    ...config,
  } as UsePrepareContractWriteConfig<typeof gemABI, 'initialize'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"lzReceive"`.
 */
export function usePrepareGemLzReceive(
  config: Omit<
    UsePrepareContractWriteConfig<typeof gemABI, 'lzReceive'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: gemABI,
    functionName: 'lzReceive',
    ...config,
  } as UsePrepareContractWriteConfig<typeof gemABI, 'lzReceive'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"lzSend"`.
 */
export function usePrepareGemLzSend(
  config: Omit<
    UsePrepareContractWriteConfig<typeof gemABI, 'lzSend'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: gemABI,
    functionName: 'lzSend',
    ...config,
  } as UsePrepareContractWriteConfig<typeof gemABI, 'lzSend'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"merge"`.
 */
export function usePrepareGemMerge(
  config: Omit<
    UsePrepareContractWriteConfig<typeof gemABI, 'merge'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: gemABI,
    functionName: 'merge',
    ...config,
  } as UsePrepareContractWriteConfig<typeof gemABI, 'merge'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"mint"`.
 */
export function usePrepareGemMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof gemABI, 'mint'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: gemABI,
    functionName: 'mint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof gemABI, 'mint'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"removeSenderFromWhitelist"`.
 */
export function usePrepareGemRemoveSenderFromWhitelist(
  config: Omit<
    UsePrepareContractWriteConfig<typeof gemABI, 'removeSenderFromWhitelist'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: gemABI,
    functionName: 'removeSenderFromWhitelist',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof gemABI,
    'removeSenderFromWhitelist'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function usePrepareGemRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof gemABI, 'renounceOwnership'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: gemABI,
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof gemABI, 'renounceOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePrepareGemSafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof gemABI, 'safeTransferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: gemABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof gemABI, 'safeTransferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePrepareGemSetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<typeof gemABI, 'setApprovalForAll'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: gemABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<typeof gemABI, 'setApprovalForAll'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"setDelegate"`.
 */
export function usePrepareGemSetDelegate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof gemABI, 'setDelegate'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: gemABI,
    functionName: 'setDelegate',
    ...config,
  } as UsePrepareContractWriteConfig<typeof gemABI, 'setDelegate'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"setItemsAddress"`.
 */
export function usePrepareGemSetItemsAddress(
  config: Omit<
    UsePrepareContractWriteConfig<typeof gemABI, 'setItemsAddress'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: gemABI,
    functionName: 'setItemsAddress',
    ...config,
  } as UsePrepareContractWriteConfig<typeof gemABI, 'setItemsAddress'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"setLemonsAddress"`.
 */
export function usePrepareGemSetLemonsAddress(
  config: Omit<
    UsePrepareContractWriteConfig<typeof gemABI, 'setLemonsAddress'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: gemABI,
    functionName: 'setLemonsAddress',
    ...config,
  } as UsePrepareContractWriteConfig<typeof gemABI, 'setLemonsAddress'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"setPeer"`.
 */
export function usePrepareGemSetPeer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof gemABI, 'setPeer'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: gemABI,
    functionName: 'setPeer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof gemABI, 'setPeer'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareGemTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof gemABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: gemABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof gemABI, 'transferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function usePrepareGemTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof gemABI, 'transferOwnership'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: gemABI,
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof gemABI, 'transferOwnership'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link gemABI}__.
 */
export function useGemEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof gemABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({ abi: gemABI, ...config } as UseContractEventConfig<
    typeof gemABI,
    TEventName
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link gemABI}__ and `eventName` set to `"Approval"`.
 */
export function useGemApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof gemABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: gemABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof gemABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link gemABI}__ and `eventName` set to `"ApprovalForAll"`.
 */
export function useGemApprovalForAllEvent(
  config: Omit<
    UseContractEventConfig<typeof gemABI, 'ApprovalForAll'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: gemABI,
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof gemABI, 'ApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link gemABI}__ and `eventName` set to `"CrosschainTransfer"`.
 */
export function useGemCrosschainTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof gemABI, 'CrosschainTransfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: gemABI,
    eventName: 'CrosschainTransfer',
    ...config,
  } as UseContractEventConfig<typeof gemABI, 'CrosschainTransfer'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link gemABI}__ and `eventName` set to `"Initialized"`.
 */
export function useGemInitializedEvent(
  config: Omit<
    UseContractEventConfig<typeof gemABI, 'Initialized'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: gemABI,
    eventName: 'Initialized',
    ...config,
  } as UseContractEventConfig<typeof gemABI, 'Initialized'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link gemABI}__ and `eventName` set to `"Merged"`.
 */
export function useGemMergedEvent(
  config: Omit<
    UseContractEventConfig<typeof gemABI, 'Merged'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: gemABI,
    eventName: 'Merged',
    ...config,
  } as UseContractEventConfig<typeof gemABI, 'Merged'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link gemABI}__ and `eventName` set to `"OwnershipTransferred"`.
 */
export function useGemOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof gemABI, 'OwnershipTransferred'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: gemABI,
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof gemABI, 'OwnershipTransferred'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link gemABI}__ and `eventName` set to `"PeerSet"`.
 */
export function useGemPeerSetEvent(
  config: Omit<
    UseContractEventConfig<typeof gemABI, 'PeerSet'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: gemABI,
    eventName: 'PeerSet',
    ...config,
  } as UseContractEventConfig<typeof gemABI, 'PeerSet'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link gemABI}__ and `eventName` set to `"Transfer"`.
 */
export function useGemTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof gemABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: gemABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof gemABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link hoodieABI}__.
 */
export function useHoodieRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof hoodieABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof hoodieABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({ abi: hoodieABI, ...config } as UseContractReadConfig<
    typeof hoodieABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link hoodieABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useHoodieBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof hoodieABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof hoodieABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: hoodieABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof hoodieABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link hoodieABI}__ and `functionName` set to `"baseURI"`.
 */
export function useHoodieBaseUri<
  TFunctionName extends 'baseURI',
  TSelectData = ReadContractResult<typeof hoodieABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof hoodieABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: hoodieABI,
    functionName: 'baseURI',
    ...config,
  } as UseContractReadConfig<typeof hoodieABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link hoodieABI}__ and `functionName` set to `"getApproved"`.
 */
export function useHoodieGetApproved<
  TFunctionName extends 'getApproved',
  TSelectData = ReadContractResult<typeof hoodieABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof hoodieABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: hoodieABI,
    functionName: 'getApproved',
    ...config,
  } as UseContractReadConfig<typeof hoodieABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link hoodieABI}__ and `functionName` set to `"isApprovedForAll"`.
 */
export function useHoodieIsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof hoodieABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof hoodieABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: hoodieABI,
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<typeof hoodieABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link hoodieABI}__ and `functionName` set to `"name"`.
 */
export function useHoodieName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof hoodieABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof hoodieABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: hoodieABI,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof hoodieABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link hoodieABI}__ and `functionName` set to `"ownerOf"`.
 */
export function useHoodieOwnerOf<
  TFunctionName extends 'ownerOf',
  TSelectData = ReadContractResult<typeof hoodieABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof hoodieABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: hoodieABI,
    functionName: 'ownerOf',
    ...config,
  } as UseContractReadConfig<typeof hoodieABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link hoodieABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useHoodieSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof hoodieABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof hoodieABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: hoodieABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof hoodieABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link hoodieABI}__ and `functionName` set to `"symbol"`.
 */
export function useHoodieSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof hoodieABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof hoodieABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: hoodieABI,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof hoodieABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link hoodieABI}__ and `functionName` set to `"tokenURI"`.
 */
export function useHoodieTokenUri<
  TFunctionName extends 'tokenURI',
  TSelectData = ReadContractResult<typeof hoodieABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof hoodieABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: hoodieABI,
    functionName: 'tokenURI',
    ...config,
  } as UseContractReadConfig<typeof hoodieABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link hoodieABI}__.
 */
export function useHoodieWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof hoodieABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof hoodieABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof hoodieABI, TFunctionName, TMode>({
    abi: hoodieABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link hoodieABI}__ and `functionName` set to `"approve"`.
 */
export function useHoodieApprove<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof hoodieABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof hoodieABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof hoodieABI, 'approve', TMode>({
    abi: hoodieABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link hoodieABI}__ and `functionName` set to `"boxMint"`.
 */
export function useHoodieBoxMint<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof hoodieABI,
          'boxMint'
        >['request']['abi'],
        'boxMint',
        TMode
      > & { functionName?: 'boxMint' }
    : UseContractWriteConfig<typeof hoodieABI, 'boxMint', TMode> & {
        abi?: never
        functionName?: 'boxMint'
      } = {} as any,
) {
  return useContractWrite<typeof hoodieABI, 'boxMint', TMode>({
    abi: hoodieABI,
    functionName: 'boxMint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link hoodieABI}__ and `functionName` set to `"burn"`.
 */
export function useHoodieBurn<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof hoodieABI, 'burn'>['request']['abi'],
        'burn',
        TMode
      > & { functionName?: 'burn' }
    : UseContractWriteConfig<typeof hoodieABI, 'burn', TMode> & {
        abi?: never
        functionName?: 'burn'
      } = {} as any,
) {
  return useContractWrite<typeof hoodieABI, 'burn', TMode>({
    abi: hoodieABI,
    functionName: 'burn',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link hoodieABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function useHoodieSafeTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof hoodieABI,
          'safeTransferFrom'
        >['request']['abi'],
        'safeTransferFrom',
        TMode
      > & { functionName?: 'safeTransferFrom' }
    : UseContractWriteConfig<typeof hoodieABI, 'safeTransferFrom', TMode> & {
        abi?: never
        functionName?: 'safeTransferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof hoodieABI, 'safeTransferFrom', TMode>({
    abi: hoodieABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link hoodieABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function useHoodieSetApprovalForAll<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof hoodieABI,
          'setApprovalForAll'
        >['request']['abi'],
        'setApprovalForAll',
        TMode
      > & { functionName?: 'setApprovalForAll' }
    : UseContractWriteConfig<typeof hoodieABI, 'setApprovalForAll', TMode> & {
        abi?: never
        functionName?: 'setApprovalForAll'
      } = {} as any,
) {
  return useContractWrite<typeof hoodieABI, 'setApprovalForAll', TMode>({
    abi: hoodieABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link hoodieABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useHoodieTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof hoodieABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof hoodieABI, 'transferFrom', TMode> & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof hoodieABI, 'transferFrom', TMode>({
    abi: hoodieABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link hoodieABI}__.
 */
export function usePrepareHoodieWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof hoodieABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: hoodieABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof hoodieABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link hoodieABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareHoodieApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof hoodieABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: hoodieABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof hoodieABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link hoodieABI}__ and `functionName` set to `"boxMint"`.
 */
export function usePrepareHoodieBoxMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof hoodieABI, 'boxMint'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: hoodieABI,
    functionName: 'boxMint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof hoodieABI, 'boxMint'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link hoodieABI}__ and `functionName` set to `"burn"`.
 */
export function usePrepareHoodieBurn(
  config: Omit<
    UsePrepareContractWriteConfig<typeof hoodieABI, 'burn'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: hoodieABI,
    functionName: 'burn',
    ...config,
  } as UsePrepareContractWriteConfig<typeof hoodieABI, 'burn'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link hoodieABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePrepareHoodieSafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof hoodieABI, 'safeTransferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: hoodieABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof hoodieABI, 'safeTransferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link hoodieABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePrepareHoodieSetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<typeof hoodieABI, 'setApprovalForAll'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: hoodieABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<typeof hoodieABI, 'setApprovalForAll'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link hoodieABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareHoodieTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof hoodieABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: hoodieABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof hoodieABI, 'transferFrom'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link hoodieABI}__.
 */
export function useHoodieEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof hoodieABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: hoodieABI,
    ...config,
  } as UseContractEventConfig<typeof hoodieABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link hoodieABI}__ and `eventName` set to `"Approval"`.
 */
export function useHoodieApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof hoodieABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: hoodieABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof hoodieABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link hoodieABI}__ and `eventName` set to `"ApprovalForAll"`.
 */
export function useHoodieApprovalForAllEvent(
  config: Omit<
    UseContractEventConfig<typeof hoodieABI, 'ApprovalForAll'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: hoodieABI,
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof hoodieABI, 'ApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link hoodieABI}__ and `eventName` set to `"Transfer"`.
 */
export function useHoodieTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof hoodieABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: hoodieABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof hoodieABI, 'Transfer'>)
}

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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"allowInitializePath"`.
 */
export function useItemAllowInitializePath<
  TFunctionName extends 'allowInitializePath',
  TSelectData = ReadContractResult<typeof itemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itemABI,
    functionName: 'allowInitializePath',
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"composeMsgSender"`.
 */
export function useItemComposeMsgSender<
  TFunctionName extends 'composeMsgSender',
  TSelectData = ReadContractResult<typeof itemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itemABI,
    functionName: 'composeMsgSender',
    ...config,
  } as UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"endpoint"`.
 */
export function useItemEndpoint<
  TFunctionName extends 'endpoint',
  TSelectData = ReadContractResult<typeof itemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itemABI,
    functionName: 'endpoint',
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"nextNonce"`.
 */
export function useItemNextNonce<
  TFunctionName extends 'nextNonce',
  TSelectData = ReadContractResult<typeof itemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itemABI,
    functionName: 'nextNonce',
    ...config,
  } as UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"oAppVersion"`.
 */
export function useItemOAppVersion<
  TFunctionName extends 'oAppVersion',
  TSelectData = ReadContractResult<typeof itemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itemABI,
    functionName: 'oAppVersion',
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"peers"`.
 */
export function useItemPeers<
  TFunctionName extends 'peers',
  TSelectData = ReadContractResult<typeof itemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itemABI,
    functionName: 'peers',
    ...config,
  } as UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"quote"`.
 */
export function useItemQuote<
  TFunctionName extends 'quote',
  TSelectData = ReadContractResult<typeof itemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itemABI,
    functionName: 'quote',
    ...config,
  } as UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"referrals"`.
 */
export function useItemReferrals<
  TFunctionName extends 'referrals',
  TSelectData = ReadContractResult<typeof itemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itemABI,
    functionName: 'referrals',
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
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"addToWhiteList"`.
 */
export function useItemAddToWhiteList<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof itemABI,
          'addToWhiteList'
        >['request']['abi'],
        'addToWhiteList',
        TMode
      > & { functionName?: 'addToWhiteList' }
    : UseContractWriteConfig<typeof itemABI, 'addToWhiteList', TMode> & {
        abi?: never
        functionName?: 'addToWhiteList'
      } = {} as any,
) {
  return useContractWrite<typeof itemABI, 'addToWhiteList', TMode>({
    abi: itemABI,
    functionName: 'addToWhiteList',
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
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"lzReceive"`.
 */
export function useItemLzReceive<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof itemABI,
          'lzReceive'
        >['request']['abi'],
        'lzReceive',
        TMode
      > & { functionName?: 'lzReceive' }
    : UseContractWriteConfig<typeof itemABI, 'lzReceive', TMode> & {
        abi?: never
        functionName?: 'lzReceive'
      } = {} as any,
) {
  return useContractWrite<typeof itemABI, 'lzReceive', TMode>({
    abi: itemABI,
    functionName: 'lzReceive',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"lzSend"`.
 */
export function useItemLzSend<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof itemABI, 'lzSend'>['request']['abi'],
        'lzSend',
        TMode
      > & { functionName?: 'lzSend' }
    : UseContractWriteConfig<typeof itemABI, 'lzSend', TMode> & {
        abi?: never
        functionName?: 'lzSend'
      } = {} as any,
) {
  return useContractWrite<typeof itemABI, 'lzSend', TMode>({
    abi: itemABI,
    functionName: 'lzSend',
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
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"rewardMint"`.
 */
export function useItemRewardMint<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof itemABI,
          'rewardMint'
        >['request']['abi'],
        'rewardMint',
        TMode
      > & { functionName?: 'rewardMint' }
    : UseContractWriteConfig<typeof itemABI, 'rewardMint', TMode> & {
        abi?: never
        functionName?: 'rewardMint'
      } = {} as any,
) {
  return useContractWrite<typeof itemABI, 'rewardMint', TMode>({
    abi: itemABI,
    functionName: 'rewardMint',
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
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"setDelegate"`.
 */
export function useItemSetDelegate<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof itemABI,
          'setDelegate'
        >['request']['abi'],
        'setDelegate',
        TMode
      > & { functionName?: 'setDelegate' }
    : UseContractWriteConfig<typeof itemABI, 'setDelegate', TMode> & {
        abi?: never
        functionName?: 'setDelegate'
      } = {} as any,
) {
  return useContractWrite<typeof itemABI, 'setDelegate', TMode>({
    abi: itemABI,
    functionName: 'setDelegate',
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
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"setPeer"`.
 */
export function useItemSetPeer<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof itemABI, 'setPeer'>['request']['abi'],
        'setPeer',
        TMode
      > & { functionName?: 'setPeer' }
    : UseContractWriteConfig<typeof itemABI, 'setPeer', TMode> & {
        abi?: never
        functionName?: 'setPeer'
      } = {} as any,
) {
  return useContractWrite<typeof itemABI, 'setPeer', TMode>({
    abi: itemABI,
    functionName: 'setPeer',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"setReferallAddress"`.
 */
export function useItemSetReferallAddress<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof itemABI,
          'setReferallAddress'
        >['request']['abi'],
        'setReferallAddress',
        TMode
      > & { functionName?: 'setReferallAddress' }
    : UseContractWriteConfig<typeof itemABI, 'setReferallAddress', TMode> & {
        abi?: never
        functionName?: 'setReferallAddress'
      } = {} as any,
) {
  return useContractWrite<typeof itemABI, 'setReferallAddress', TMode>({
    abi: itemABI,
    functionName: 'setReferallAddress',
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"addToWhiteList"`.
 */
export function usePrepareItemAddToWhiteList(
  config: Omit<
    UsePrepareContractWriteConfig<typeof itemABI, 'addToWhiteList'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: itemABI,
    functionName: 'addToWhiteList',
    ...config,
  } as UsePrepareContractWriteConfig<typeof itemABI, 'addToWhiteList'>)
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"lzReceive"`.
 */
export function usePrepareItemLzReceive(
  config: Omit<
    UsePrepareContractWriteConfig<typeof itemABI, 'lzReceive'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: itemABI,
    functionName: 'lzReceive',
    ...config,
  } as UsePrepareContractWriteConfig<typeof itemABI, 'lzReceive'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"lzSend"`.
 */
export function usePrepareItemLzSend(
  config: Omit<
    UsePrepareContractWriteConfig<typeof itemABI, 'lzSend'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: itemABI,
    functionName: 'lzSend',
    ...config,
  } as UsePrepareContractWriteConfig<typeof itemABI, 'lzSend'>)
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"rewardMint"`.
 */
export function usePrepareItemRewardMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof itemABI, 'rewardMint'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: itemABI,
    functionName: 'rewardMint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof itemABI, 'rewardMint'>)
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"setDelegate"`.
 */
export function usePrepareItemSetDelegate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof itemABI, 'setDelegate'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: itemABI,
    functionName: 'setDelegate',
    ...config,
  } as UsePrepareContractWriteConfig<typeof itemABI, 'setDelegate'>)
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"setPeer"`.
 */
export function usePrepareItemSetPeer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof itemABI, 'setPeer'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: itemABI,
    functionName: 'setPeer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof itemABI, 'setPeer'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"setReferallAddress"`.
 */
export function usePrepareItemSetReferallAddress(
  config: Omit<
    UsePrepareContractWriteConfig<typeof itemABI, 'setReferallAddress'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: itemABI,
    functionName: 'setReferallAddress',
    ...config,
  } as UsePrepareContractWriteConfig<typeof itemABI, 'setReferallAddress'>)
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
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link itemABI}__ and `eventName` set to `"CrosschainTransfer"`.
 */
export function useItemCrosschainTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof itemABI, 'CrosschainTransfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: itemABI,
    eventName: 'CrosschainTransfer',
    ...config,
  } as UseContractEventConfig<typeof itemABI, 'CrosschainTransfer'>)
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
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link itemABI}__ and `eventName` set to `"PeerSet"`.
 */
export function useItemPeerSetEvent(
  config: Omit<
    UseContractEventConfig<typeof itemABI, 'PeerSet'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: itemABI,
    eventName: 'PeerSet',
    ...config,
  } as UseContractEventConfig<typeof itemABI, 'PeerSet'>)
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"allowInitializePath"`.
 */
export function useLemonAllowInitializePath<
  TFunctionName extends 'allowInitializePath',
  TSelectData = ReadContractResult<typeof lemonABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lemonABI,
    functionName: 'allowInitializePath',
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"composeMsgSender"`.
 */
export function useLemonComposeMsgSender<
  TFunctionName extends 'composeMsgSender',
  TSelectData = ReadContractResult<typeof lemonABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lemonABI,
    functionName: 'composeMsgSender',
    ...config,
  } as UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"endpoint"`.
 */
export function useLemonEndpoint<
  TFunctionName extends 'endpoint',
  TSelectData = ReadContractResult<typeof lemonABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lemonABI,
    functionName: 'endpoint',
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"nextNonce"`.
 */
export function useLemonNextNonce<
  TFunctionName extends 'nextNonce',
  TSelectData = ReadContractResult<typeof lemonABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lemonABI,
    functionName: 'nextNonce',
    ...config,
  } as UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"oAppVersion"`.
 */
export function useLemonOAppVersion<
  TFunctionName extends 'oAppVersion',
  TSelectData = ReadContractResult<typeof lemonABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lemonABI,
    functionName: 'oAppVersion',
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"peers"`.
 */
export function useLemonPeers<
  TFunctionName extends 'peers',
  TSelectData = ReadContractResult<typeof lemonABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lemonABI,
    functionName: 'peers',
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"quote"`.
 */
export function useLemonQuote<
  TFunctionName extends 'quote',
  TSelectData = ReadContractResult<typeof lemonABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lemonABI,
    functionName: 'quote',
    ...config,
  } as UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"raids"`.
 */
export function useLemonRaids<
  TFunctionName extends 'raids',
  TSelectData = ReadContractResult<typeof lemonABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lemonABI,
    functionName: 'raids',
    ...config,
  } as UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"referrals"`.
 */
export function useLemonReferrals<
  TFunctionName extends 'referrals',
  TSelectData = ReadContractResult<typeof lemonABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lemonABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lemonABI,
    functionName: 'referrals',
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
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"lzReceive"`.
 */
export function useLemonLzReceive<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lemonABI,
          'lzReceive'
        >['request']['abi'],
        'lzReceive',
        TMode
      > & { functionName?: 'lzReceive' }
    : UseContractWriteConfig<typeof lemonABI, 'lzReceive', TMode> & {
        abi?: never
        functionName?: 'lzReceive'
      } = {} as any,
) {
  return useContractWrite<typeof lemonABI, 'lzReceive', TMode>({
    abi: lemonABI,
    functionName: 'lzReceive',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"lzSend"`.
 */
export function useLemonLzSend<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof lemonABI, 'lzSend'>['request']['abi'],
        'lzSend',
        TMode
      > & { functionName?: 'lzSend' }
    : UseContractWriteConfig<typeof lemonABI, 'lzSend', TMode> & {
        abi?: never
        functionName?: 'lzSend'
      } = {} as any,
) {
  return useContractWrite<typeof lemonABI, 'lzSend', TMode>({
    abi: lemonABI,
    functionName: 'lzSend',
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
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"sendLemonToRaid"`.
 */
export function useLemonSendLemonToRaid<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lemonABI,
          'sendLemonToRaid'
        >['request']['abi'],
        'sendLemonToRaid',
        TMode
      > & { functionName?: 'sendLemonToRaid' }
    : UseContractWriteConfig<typeof lemonABI, 'sendLemonToRaid', TMode> & {
        abi?: never
        functionName?: 'sendLemonToRaid'
      } = {} as any,
) {
  return useContractWrite<typeof lemonABI, 'sendLemonToRaid', TMode>({
    abi: lemonABI,
    functionName: 'sendLemonToRaid',
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
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"setDelegate"`.
 */
export function useLemonSetDelegate<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lemonABI,
          'setDelegate'
        >['request']['abi'],
        'setDelegate',
        TMode
      > & { functionName?: 'setDelegate' }
    : UseContractWriteConfig<typeof lemonABI, 'setDelegate', TMode> & {
        abi?: never
        functionName?: 'setDelegate'
      } = {} as any,
) {
  return useContractWrite<typeof lemonABI, 'setDelegate', TMode>({
    abi: lemonABI,
    functionName: 'setDelegate',
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
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"setPeer"`.
 */
export function useLemonSetPeer<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lemonABI,
          'setPeer'
        >['request']['abi'],
        'setPeer',
        TMode
      > & { functionName?: 'setPeer' }
    : UseContractWriteConfig<typeof lemonABI, 'setPeer', TMode> & {
        abi?: never
        functionName?: 'setPeer'
      } = {} as any,
) {
  return useContractWrite<typeof lemonABI, 'setPeer', TMode>({
    abi: lemonABI,
    functionName: 'setPeer',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"setRaidsAddress"`.
 */
export function useLemonSetRaidsAddress<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lemonABI,
          'setRaidsAddress'
        >['request']['abi'],
        'setRaidsAddress',
        TMode
      > & { functionName?: 'setRaidsAddress' }
    : UseContractWriteConfig<typeof lemonABI, 'setRaidsAddress', TMode> & {
        abi?: never
        functionName?: 'setRaidsAddress'
      } = {} as any,
) {
  return useContractWrite<typeof lemonABI, 'setRaidsAddress', TMode>({
    abi: lemonABI,
    functionName: 'setRaidsAddress',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"setReferallAddress"`.
 */
export function useLemonSetReferallAddress<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lemonABI,
          'setReferallAddress'
        >['request']['abi'],
        'setReferallAddress',
        TMode
      > & { functionName?: 'setReferallAddress' }
    : UseContractWriteConfig<typeof lemonABI, 'setReferallAddress', TMode> & {
        abi?: never
        functionName?: 'setReferallAddress'
      } = {} as any,
) {
  return useContractWrite<typeof lemonABI, 'setReferallAddress', TMode>({
    abi: lemonABI,
    functionName: 'setReferallAddress',
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"lzReceive"`.
 */
export function usePrepareLemonLzReceive(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lemonABI, 'lzReceive'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lemonABI,
    functionName: 'lzReceive',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lemonABI, 'lzReceive'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"lzSend"`.
 */
export function usePrepareLemonLzSend(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lemonABI, 'lzSend'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lemonABI,
    functionName: 'lzSend',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lemonABI, 'lzSend'>)
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"sendLemonToRaid"`.
 */
export function usePrepareLemonSendLemonToRaid(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lemonABI, 'sendLemonToRaid'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lemonABI,
    functionName: 'sendLemonToRaid',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lemonABI, 'sendLemonToRaid'>)
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"setDelegate"`.
 */
export function usePrepareLemonSetDelegate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lemonABI, 'setDelegate'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lemonABI,
    functionName: 'setDelegate',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lemonABI, 'setDelegate'>)
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"setPeer"`.
 */
export function usePrepareLemonSetPeer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lemonABI, 'setPeer'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lemonABI,
    functionName: 'setPeer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lemonABI, 'setPeer'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"setRaidsAddress"`.
 */
export function usePrepareLemonSetRaidsAddress(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lemonABI, 'setRaidsAddress'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lemonABI,
    functionName: 'setRaidsAddress',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lemonABI, 'setRaidsAddress'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"setReferallAddress"`.
 */
export function usePrepareLemonSetReferallAddress(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lemonABI, 'setReferallAddress'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lemonABI,
    functionName: 'setReferallAddress',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lemonABI, 'setReferallAddress'>)
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
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lemonABI}__ and `eventName` set to `"CrosschainTransfer"`.
 */
export function useLemonCrosschainTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof lemonABI, 'CrosschainTransfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: lemonABI,
    eventName: 'CrosschainTransfer',
    ...config,
  } as UseContractEventConfig<typeof lemonABI, 'CrosschainTransfer'>)
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
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lemonABI}__ and `eventName` set to `"PeerSet"`.
 */
export function useLemonPeerSetEvent(
  config: Omit<
    UseContractEventConfig<typeof lemonABI, 'PeerSet'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: lemonABI,
    eventName: 'PeerSet',
    ...config,
  } as UseContractEventConfig<typeof lemonABI, 'PeerSet'>)
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

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pickAxeABI}__.
 */
export function usePickAxeRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof pickAxeABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: pickAxeABI,
    ...config,
  } as UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"_box"`.
 */
export function usePickAxeBox<
  TFunctionName extends '_box',
  TSelectData = ReadContractResult<typeof pickAxeABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pickAxeABI,
    functionName: '_box',
    ...config,
  } as UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"_chances"`.
 */
export function usePickAxeChances<
  TFunctionName extends '_chances',
  TSelectData = ReadContractResult<typeof pickAxeABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pickAxeABI,
    functionName: '_chances',
    ...config,
  } as UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"_cheapMintPrice"`.
 */
export function usePickAxeCheapMintPrice<
  TFunctionName extends '_cheapMintPrice',
  TSelectData = ReadContractResult<typeof pickAxeABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pickAxeABI,
    functionName: '_cheapMintPrice',
    ...config,
  } as UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"_cheapSharpPrice"`.
 */
export function usePickAxeCheapSharpPrice<
  TFunctionName extends '_cheapSharpPrice',
  TSelectData = ReadContractResult<typeof pickAxeABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pickAxeABI,
    functionName: '_cheapSharpPrice',
    ...config,
  } as UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"_gemAddress"`.
 */
export function usePickAxeGemAddress<
  TFunctionName extends '_gemAddress',
  TSelectData = ReadContractResult<typeof pickAxeABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pickAxeABI,
    functionName: '_gemAddress',
    ...config,
  } as UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"_goodMaxSupply"`.
 */
export function usePickAxeGoodMaxSupply<
  TFunctionName extends '_goodMaxSupply',
  TSelectData = ReadContractResult<typeof pickAxeABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pickAxeABI,
    functionName: '_goodMaxSupply',
    ...config,
  } as UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"_goodMintPrice"`.
 */
export function usePickAxeGoodMintPrice<
  TFunctionName extends '_goodMintPrice',
  TSelectData = ReadContractResult<typeof pickAxeABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pickAxeABI,
    functionName: '_goodMintPrice',
    ...config,
  } as UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"_goodSharpPrice"`.
 */
export function usePickAxeGoodSharpPrice<
  TFunctionName extends '_goodSharpPrice',
  TSelectData = ReadContractResult<typeof pickAxeABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pickAxeABI,
    functionName: '_goodSharpPrice',
    ...config,
  } as UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"_greatMaxSupply"`.
 */
export function usePickAxeGreatMaxSupply<
  TFunctionName extends '_greatMaxSupply',
  TSelectData = ReadContractResult<typeof pickAxeABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pickAxeABI,
    functionName: '_greatMaxSupply',
    ...config,
  } as UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"_greatMintPrice"`.
 */
export function usePickAxeGreatMintPrice<
  TFunctionName extends '_greatMintPrice',
  TSelectData = ReadContractResult<typeof pickAxeABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pickAxeABI,
    functionName: '_greatMintPrice',
    ...config,
  } as UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"_greatSharpPrice"`.
 */
export function usePickAxeGreatSharpPrice<
  TFunctionName extends '_greatSharpPrice',
  TSelectData = ReadContractResult<typeof pickAxeABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pickAxeABI,
    functionName: '_greatSharpPrice',
    ...config,
  } as UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"_ranks"`.
 */
export function usePickAxeRanks<
  TFunctionName extends '_ranks',
  TSelectData = ReadContractResult<typeof pickAxeABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pickAxeABI,
    functionName: '_ranks',
    ...config,
  } as UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"_sharpness"`.
 */
export function usePickAxeSharpness<
  TFunctionName extends '_sharpness',
  TSelectData = ReadContractResult<typeof pickAxeABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pickAxeABI,
    functionName: '_sharpness',
    ...config,
  } as UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"_stickersAddress"`.
 */
export function usePickAxeStickersAddress<
  TFunctionName extends '_stickersAddress',
  TSelectData = ReadContractResult<typeof pickAxeABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pickAxeABI,
    functionName: '_stickersAddress',
    ...config,
  } as UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"_supply"`.
 */
export function usePickAxeSupply<
  TFunctionName extends '_supply',
  TSelectData = ReadContractResult<typeof pickAxeABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pickAxeABI,
    functionName: '_supply',
    ...config,
  } as UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"_treasuryAddress"`.
 */
export function usePickAxeTreasuryAddress<
  TFunctionName extends '_treasuryAddress',
  TSelectData = ReadContractResult<typeof pickAxeABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pickAxeABI,
    functionName: '_treasuryAddress',
    ...config,
  } as UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"allowInitializePath"`.
 */
export function usePickAxeAllowInitializePath<
  TFunctionName extends 'allowInitializePath',
  TSelectData = ReadContractResult<typeof pickAxeABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pickAxeABI,
    functionName: 'allowInitializePath',
    ...config,
  } as UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"balanceOf"`.
 */
export function usePickAxeBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof pickAxeABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pickAxeABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"composeMsgSender"`.
 */
export function usePickAxeComposeMsgSender<
  TFunctionName extends 'composeMsgSender',
  TSelectData = ReadContractResult<typeof pickAxeABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pickAxeABI,
    functionName: 'composeMsgSender',
    ...config,
  } as UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"endpoint"`.
 */
export function usePickAxeEndpoint<
  TFunctionName extends 'endpoint',
  TSelectData = ReadContractResult<typeof pickAxeABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pickAxeABI,
    functionName: 'endpoint',
    ...config,
  } as UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"getApproved"`.
 */
export function usePickAxeGetApproved<
  TFunctionName extends 'getApproved',
  TSelectData = ReadContractResult<typeof pickAxeABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pickAxeABI,
    functionName: 'getApproved',
    ...config,
  } as UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"isApprovedForAll"`.
 */
export function usePickAxeIsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof pickAxeABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pickAxeABI,
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"name"`.
 */
export function usePickAxeName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof pickAxeABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pickAxeABI,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"nextNonce"`.
 */
export function usePickAxeNextNonce<
  TFunctionName extends 'nextNonce',
  TSelectData = ReadContractResult<typeof pickAxeABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pickAxeABI,
    functionName: 'nextNonce',
    ...config,
  } as UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"oAppVersion"`.
 */
export function usePickAxeOAppVersion<
  TFunctionName extends 'oAppVersion',
  TSelectData = ReadContractResult<typeof pickAxeABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pickAxeABI,
    functionName: 'oAppVersion',
    ...config,
  } as UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"owner"`.
 */
export function usePickAxeOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof pickAxeABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pickAxeABI,
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"ownerOf"`.
 */
export function usePickAxeOwnerOf<
  TFunctionName extends 'ownerOf',
  TSelectData = ReadContractResult<typeof pickAxeABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pickAxeABI,
    functionName: 'ownerOf',
    ...config,
  } as UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"peers"`.
 */
export function usePickAxePeers<
  TFunctionName extends 'peers',
  TSelectData = ReadContractResult<typeof pickAxeABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pickAxeABI,
    functionName: 'peers',
    ...config,
  } as UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"quote"`.
 */
export function usePickAxeQuote<
  TFunctionName extends 'quote',
  TSelectData = ReadContractResult<typeof pickAxeABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pickAxeABI,
    functionName: 'quote',
    ...config,
  } as UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"rankOf"`.
 */
export function usePickAxeRankOf<
  TFunctionName extends 'rankOf',
  TSelectData = ReadContractResult<typeof pickAxeABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pickAxeABI,
    functionName: 'rankOf',
    ...config,
  } as UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"sharpnessOf"`.
 */
export function usePickAxeSharpnessOf<
  TFunctionName extends 'sharpnessOf',
  TSelectData = ReadContractResult<typeof pickAxeABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pickAxeABI,
    functionName: 'sharpnessOf',
    ...config,
  } as UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"supplyOf"`.
 */
export function usePickAxeSupplyOf<
  TFunctionName extends 'supplyOf',
  TSelectData = ReadContractResult<typeof pickAxeABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pickAxeABI,
    functionName: 'supplyOf',
    ...config,
  } as UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function usePickAxeSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof pickAxeABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pickAxeABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"symbol"`.
 */
export function usePickAxeSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof pickAxeABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pickAxeABI,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"tokenURI"`.
 */
export function usePickAxeTokenUri<
  TFunctionName extends 'tokenURI',
  TSelectData = ReadContractResult<typeof pickAxeABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pickAxeABI,
    functionName: 'tokenURI',
    ...config,
  } as UseContractReadConfig<typeof pickAxeABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link pickAxeABI}__.
 */
export function usePickAxeWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof pickAxeABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof pickAxeABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof pickAxeABI, TFunctionName, TMode>({
    abi: pickAxeABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"approve"`.
 */
export function usePickAxeApprove<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof pickAxeABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof pickAxeABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof pickAxeABI, 'approve', TMode>({
    abi: pickAxeABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"boxMint"`.
 */
export function usePickAxeBoxMint<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof pickAxeABI,
          'boxMint'
        >['request']['abi'],
        'boxMint',
        TMode
      > & { functionName?: 'boxMint' }
    : UseContractWriteConfig<typeof pickAxeABI, 'boxMint', TMode> & {
        abi?: never
        functionName?: 'boxMint'
      } = {} as any,
) {
  return useContractWrite<typeof pickAxeABI, 'boxMint', TMode>({
    abi: pickAxeABI,
    functionName: 'boxMint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"chipOff"`.
 */
export function usePickAxeChipOff<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof pickAxeABI,
          'chipOff'
        >['request']['abi'],
        'chipOff',
        TMode
      > & { functionName?: 'chipOff' }
    : UseContractWriteConfig<typeof pickAxeABI, 'chipOff', TMode> & {
        abi?: never
        functionName?: 'chipOff'
      } = {} as any,
) {
  return useContractWrite<typeof pickAxeABI, 'chipOff', TMode>({
    abi: pickAxeABI,
    functionName: 'chipOff',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"initialize"`.
 */
export function usePickAxeInitialize<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof pickAxeABI,
          'initialize'
        >['request']['abi'],
        'initialize',
        TMode
      > & { functionName?: 'initialize' }
    : UseContractWriteConfig<typeof pickAxeABI, 'initialize', TMode> & {
        abi?: never
        functionName?: 'initialize'
      } = {} as any,
) {
  return useContractWrite<typeof pickAxeABI, 'initialize', TMode>({
    abi: pickAxeABI,
    functionName: 'initialize',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"lzReceive"`.
 */
export function usePickAxeLzReceive<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof pickAxeABI,
          'lzReceive'
        >['request']['abi'],
        'lzReceive',
        TMode
      > & { functionName?: 'lzReceive' }
    : UseContractWriteConfig<typeof pickAxeABI, 'lzReceive', TMode> & {
        abi?: never
        functionName?: 'lzReceive'
      } = {} as any,
) {
  return useContractWrite<typeof pickAxeABI, 'lzReceive', TMode>({
    abi: pickAxeABI,
    functionName: 'lzReceive',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"lzSend"`.
 */
export function usePickAxeLzSend<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof pickAxeABI,
          'lzSend'
        >['request']['abi'],
        'lzSend',
        TMode
      > & { functionName?: 'lzSend' }
    : UseContractWriteConfig<typeof pickAxeABI, 'lzSend', TMode> & {
        abi?: never
        functionName?: 'lzSend'
      } = {} as any,
) {
  return useContractWrite<typeof pickAxeABI, 'lzSend', TMode>({
    abi: pickAxeABI,
    functionName: 'lzSend',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"mint"`.
 */
export function usePickAxeMint<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof pickAxeABI, 'mint'>['request']['abi'],
        'mint',
        TMode
      > & { functionName?: 'mint' }
    : UseContractWriteConfig<typeof pickAxeABI, 'mint', TMode> & {
        abi?: never
        functionName?: 'mint'
      } = {} as any,
) {
  return useContractWrite<typeof pickAxeABI, 'mint', TMode>({
    abi: pickAxeABI,
    functionName: 'mint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function usePickAxeRenounceOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof pickAxeABI,
          'renounceOwnership'
        >['request']['abi'],
        'renounceOwnership',
        TMode
      > & { functionName?: 'renounceOwnership' }
    : UseContractWriteConfig<typeof pickAxeABI, 'renounceOwnership', TMode> & {
        abi?: never
        functionName?: 'renounceOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof pickAxeABI, 'renounceOwnership', TMode>({
    abi: pickAxeABI,
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePickAxeSafeTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof pickAxeABI,
          'safeTransferFrom'
        >['request']['abi'],
        'safeTransferFrom',
        TMode
      > & { functionName?: 'safeTransferFrom' }
    : UseContractWriteConfig<typeof pickAxeABI, 'safeTransferFrom', TMode> & {
        abi?: never
        functionName?: 'safeTransferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof pickAxeABI, 'safeTransferFrom', TMode>({
    abi: pickAxeABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePickAxeSetApprovalForAll<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof pickAxeABI,
          'setApprovalForAll'
        >['request']['abi'],
        'setApprovalForAll',
        TMode
      > & { functionName?: 'setApprovalForAll' }
    : UseContractWriteConfig<typeof pickAxeABI, 'setApprovalForAll', TMode> & {
        abi?: never
        functionName?: 'setApprovalForAll'
      } = {} as any,
) {
  return useContractWrite<typeof pickAxeABI, 'setApprovalForAll', TMode>({
    abi: pickAxeABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"setBaseURI"`.
 */
export function usePickAxeSetBaseUri<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof pickAxeABI,
          'setBaseURI'
        >['request']['abi'],
        'setBaseURI',
        TMode
      > & { functionName?: 'setBaseURI' }
    : UseContractWriteConfig<typeof pickAxeABI, 'setBaseURI', TMode> & {
        abi?: never
        functionName?: 'setBaseURI'
      } = {} as any,
) {
  return useContractWrite<typeof pickAxeABI, 'setBaseURI', TMode>({
    abi: pickAxeABI,
    functionName: 'setBaseURI',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"setBoxAddress"`.
 */
export function usePickAxeSetBoxAddress<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof pickAxeABI,
          'setBoxAddress'
        >['request']['abi'],
        'setBoxAddress',
        TMode
      > & { functionName?: 'setBoxAddress' }
    : UseContractWriteConfig<typeof pickAxeABI, 'setBoxAddress', TMode> & {
        abi?: never
        functionName?: 'setBoxAddress'
      } = {} as any,
) {
  return useContractWrite<typeof pickAxeABI, 'setBoxAddress', TMode>({
    abi: pickAxeABI,
    functionName: 'setBoxAddress',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"setDelegate"`.
 */
export function usePickAxeSetDelegate<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof pickAxeABI,
          'setDelegate'
        >['request']['abi'],
        'setDelegate',
        TMode
      > & { functionName?: 'setDelegate' }
    : UseContractWriteConfig<typeof pickAxeABI, 'setDelegate', TMode> & {
        abi?: never
        functionName?: 'setDelegate'
      } = {} as any,
) {
  return useContractWrite<typeof pickAxeABI, 'setDelegate', TMode>({
    abi: pickAxeABI,
    functionName: 'setDelegate',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"setGemsAddress"`.
 */
export function usePickAxeSetGemsAddress<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof pickAxeABI,
          'setGemsAddress'
        >['request']['abi'],
        'setGemsAddress',
        TMode
      > & { functionName?: 'setGemsAddress' }
    : UseContractWriteConfig<typeof pickAxeABI, 'setGemsAddress', TMode> & {
        abi?: never
        functionName?: 'setGemsAddress'
      } = {} as any,
) {
  return useContractWrite<typeof pickAxeABI, 'setGemsAddress', TMode>({
    abi: pickAxeABI,
    functionName: 'setGemsAddress',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"setPeer"`.
 */
export function usePickAxeSetPeer<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof pickAxeABI,
          'setPeer'
        >['request']['abi'],
        'setPeer',
        TMode
      > & { functionName?: 'setPeer' }
    : UseContractWriteConfig<typeof pickAxeABI, 'setPeer', TMode> & {
        abi?: never
        functionName?: 'setPeer'
      } = {} as any,
) {
  return useContractWrite<typeof pickAxeABI, 'setPeer', TMode>({
    abi: pickAxeABI,
    functionName: 'setPeer',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"setStickersAddress"`.
 */
export function usePickAxeSetStickersAddress<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof pickAxeABI,
          'setStickersAddress'
        >['request']['abi'],
        'setStickersAddress',
        TMode
      > & { functionName?: 'setStickersAddress' }
    : UseContractWriteConfig<typeof pickAxeABI, 'setStickersAddress', TMode> & {
        abi?: never
        functionName?: 'setStickersAddress'
      } = {} as any,
) {
  return useContractWrite<typeof pickAxeABI, 'setStickersAddress', TMode>({
    abi: pickAxeABI,
    functionName: 'setStickersAddress',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"sharp"`.
 */
export function usePickAxeSharp<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof pickAxeABI,
          'sharp'
        >['request']['abi'],
        'sharp',
        TMode
      > & { functionName?: 'sharp' }
    : UseContractWriteConfig<typeof pickAxeABI, 'sharp', TMode> & {
        abi?: never
        functionName?: 'sharp'
      } = {} as any,
) {
  return useContractWrite<typeof pickAxeABI, 'sharp', TMode>({
    abi: pickAxeABI,
    functionName: 'sharp',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePickAxeTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof pickAxeABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof pickAxeABI, 'transferFrom', TMode> & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof pickAxeABI, 'transferFrom', TMode>({
    abi: pickAxeABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function usePickAxeTransferOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof pickAxeABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & { functionName?: 'transferOwnership' }
    : UseContractWriteConfig<typeof pickAxeABI, 'transferOwnership', TMode> & {
        abi?: never
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof pickAxeABI, 'transferOwnership', TMode>({
    abi: pickAxeABI,
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link pickAxeABI}__.
 */
export function usePreparePickAxeWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof pickAxeABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: pickAxeABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof pickAxeABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"approve"`.
 */
export function usePreparePickAxeApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof pickAxeABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: pickAxeABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof pickAxeABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"boxMint"`.
 */
export function usePreparePickAxeBoxMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof pickAxeABI, 'boxMint'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: pickAxeABI,
    functionName: 'boxMint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof pickAxeABI, 'boxMint'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"chipOff"`.
 */
export function usePreparePickAxeChipOff(
  config: Omit<
    UsePrepareContractWriteConfig<typeof pickAxeABI, 'chipOff'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: pickAxeABI,
    functionName: 'chipOff',
    ...config,
  } as UsePrepareContractWriteConfig<typeof pickAxeABI, 'chipOff'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"initialize"`.
 */
export function usePreparePickAxeInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof pickAxeABI, 'initialize'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: pickAxeABI,
    functionName: 'initialize',
    ...config,
  } as UsePrepareContractWriteConfig<typeof pickAxeABI, 'initialize'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"lzReceive"`.
 */
export function usePreparePickAxeLzReceive(
  config: Omit<
    UsePrepareContractWriteConfig<typeof pickAxeABI, 'lzReceive'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: pickAxeABI,
    functionName: 'lzReceive',
    ...config,
  } as UsePrepareContractWriteConfig<typeof pickAxeABI, 'lzReceive'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"lzSend"`.
 */
export function usePreparePickAxeLzSend(
  config: Omit<
    UsePrepareContractWriteConfig<typeof pickAxeABI, 'lzSend'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: pickAxeABI,
    functionName: 'lzSend',
    ...config,
  } as UsePrepareContractWriteConfig<typeof pickAxeABI, 'lzSend'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"mint"`.
 */
export function usePreparePickAxeMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof pickAxeABI, 'mint'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: pickAxeABI,
    functionName: 'mint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof pickAxeABI, 'mint'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function usePreparePickAxeRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof pickAxeABI, 'renounceOwnership'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: pickAxeABI,
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof pickAxeABI, 'renounceOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePreparePickAxeSafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof pickAxeABI, 'safeTransferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: pickAxeABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof pickAxeABI, 'safeTransferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePreparePickAxeSetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<typeof pickAxeABI, 'setApprovalForAll'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: pickAxeABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<typeof pickAxeABI, 'setApprovalForAll'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"setBaseURI"`.
 */
export function usePreparePickAxeSetBaseUri(
  config: Omit<
    UsePrepareContractWriteConfig<typeof pickAxeABI, 'setBaseURI'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: pickAxeABI,
    functionName: 'setBaseURI',
    ...config,
  } as UsePrepareContractWriteConfig<typeof pickAxeABI, 'setBaseURI'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"setBoxAddress"`.
 */
export function usePreparePickAxeSetBoxAddress(
  config: Omit<
    UsePrepareContractWriteConfig<typeof pickAxeABI, 'setBoxAddress'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: pickAxeABI,
    functionName: 'setBoxAddress',
    ...config,
  } as UsePrepareContractWriteConfig<typeof pickAxeABI, 'setBoxAddress'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"setDelegate"`.
 */
export function usePreparePickAxeSetDelegate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof pickAxeABI, 'setDelegate'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: pickAxeABI,
    functionName: 'setDelegate',
    ...config,
  } as UsePrepareContractWriteConfig<typeof pickAxeABI, 'setDelegate'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"setGemsAddress"`.
 */
export function usePreparePickAxeSetGemsAddress(
  config: Omit<
    UsePrepareContractWriteConfig<typeof pickAxeABI, 'setGemsAddress'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: pickAxeABI,
    functionName: 'setGemsAddress',
    ...config,
  } as UsePrepareContractWriteConfig<typeof pickAxeABI, 'setGemsAddress'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"setPeer"`.
 */
export function usePreparePickAxeSetPeer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof pickAxeABI, 'setPeer'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: pickAxeABI,
    functionName: 'setPeer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof pickAxeABI, 'setPeer'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"setStickersAddress"`.
 */
export function usePreparePickAxeSetStickersAddress(
  config: Omit<
    UsePrepareContractWriteConfig<typeof pickAxeABI, 'setStickersAddress'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: pickAxeABI,
    functionName: 'setStickersAddress',
    ...config,
  } as UsePrepareContractWriteConfig<typeof pickAxeABI, 'setStickersAddress'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"sharp"`.
 */
export function usePreparePickAxeSharp(
  config: Omit<
    UsePrepareContractWriteConfig<typeof pickAxeABI, 'sharp'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: pickAxeABI,
    functionName: 'sharp',
    ...config,
  } as UsePrepareContractWriteConfig<typeof pickAxeABI, 'sharp'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePreparePickAxeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof pickAxeABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: pickAxeABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof pickAxeABI, 'transferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link pickAxeABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function usePreparePickAxeTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof pickAxeABI, 'transferOwnership'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: pickAxeABI,
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof pickAxeABI, 'transferOwnership'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link pickAxeABI}__.
 */
export function usePickAxeEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof pickAxeABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: pickAxeABI,
    ...config,
  } as UseContractEventConfig<typeof pickAxeABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link pickAxeABI}__ and `eventName` set to `"Approval"`.
 */
export function usePickAxeApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof pickAxeABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: pickAxeABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof pickAxeABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link pickAxeABI}__ and `eventName` set to `"ApprovalForAll"`.
 */
export function usePickAxeApprovalForAllEvent(
  config: Omit<
    UseContractEventConfig<typeof pickAxeABI, 'ApprovalForAll'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: pickAxeABI,
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof pickAxeABI, 'ApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link pickAxeABI}__ and `eventName` set to `"CrosschainTransfer"`.
 */
export function usePickAxeCrosschainTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof pickAxeABI, 'CrosschainTransfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: pickAxeABI,
    eventName: 'CrosschainTransfer',
    ...config,
  } as UseContractEventConfig<typeof pickAxeABI, 'CrosschainTransfer'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link pickAxeABI}__ and `eventName` set to `"Initialized"`.
 */
export function usePickAxeInitializedEvent(
  config: Omit<
    UseContractEventConfig<typeof pickAxeABI, 'Initialized'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: pickAxeABI,
    eventName: 'Initialized',
    ...config,
  } as UseContractEventConfig<typeof pickAxeABI, 'Initialized'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link pickAxeABI}__ and `eventName` set to `"OwnershipTransferred"`.
 */
export function usePickAxeOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof pickAxeABI, 'OwnershipTransferred'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: pickAxeABI,
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof pickAxeABI, 'OwnershipTransferred'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link pickAxeABI}__ and `eventName` set to `"PeerSet"`.
 */
export function usePickAxePeerSetEvent(
  config: Omit<
    UseContractEventConfig<typeof pickAxeABI, 'PeerSet'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: pickAxeABI,
    eventName: 'PeerSet',
    ...config,
  } as UseContractEventConfig<typeof pickAxeABI, 'PeerSet'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link pickAxeABI}__ and `eventName` set to `"Transfer"`.
 */
export function usePickAxeTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof pickAxeABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: pickAxeABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof pickAxeABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pointABI}__.
 */
export function usePointRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof pointABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pointABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({ abi: pointABI, ...config } as UseContractReadConfig<
    typeof pointABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pointABI}__ and `functionName` set to `"allowance"`.
 */
export function usePointAllowance<
  TFunctionName extends 'allowance',
  TSelectData = ReadContractResult<typeof pointABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pointABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pointABI,
    functionName: 'allowance',
    ...config,
  } as UseContractReadConfig<typeof pointABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pointABI}__ and `functionName` set to `"balanceOf"`.
 */
export function usePointBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof pointABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pointABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pointABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof pointABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pointABI}__ and `functionName` set to `"decimals"`.
 */
export function usePointDecimals<
  TFunctionName extends 'decimals',
  TSelectData = ReadContractResult<typeof pointABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pointABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pointABI,
    functionName: 'decimals',
    ...config,
  } as UseContractReadConfig<typeof pointABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pointABI}__ and `functionName` set to `"name"`.
 */
export function usePointName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof pointABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pointABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pointABI,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof pointABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pointABI}__ and `functionName` set to `"symbol"`.
 */
export function usePointSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof pointABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pointABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pointABI,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof pointABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pointABI}__ and `functionName` set to `"totalSupply"`.
 */
export function usePointTotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof pointABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pointABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pointABI,
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<typeof pointABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link pointABI}__.
 */
export function usePointWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof pointABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof pointABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof pointABI, TFunctionName, TMode>({
    abi: pointABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link pointABI}__ and `functionName` set to `"addToWhiteList"`.
 */
export function usePointAddToWhiteList<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof pointABI,
          'addToWhiteList'
        >['request']['abi'],
        'addToWhiteList',
        TMode
      > & { functionName?: 'addToWhiteList' }
    : UseContractWriteConfig<typeof pointABI, 'addToWhiteList', TMode> & {
        abi?: never
        functionName?: 'addToWhiteList'
      } = {} as any,
) {
  return useContractWrite<typeof pointABI, 'addToWhiteList', TMode>({
    abi: pointABI,
    functionName: 'addToWhiteList',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link pointABI}__ and `functionName` set to `"approve"`.
 */
export function usePointApprove<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof pointABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof pointABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof pointABI, 'approve', TMode>({
    abi: pointABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link pointABI}__ and `functionName` set to `"decreaseAllowance"`.
 */
export function usePointDecreaseAllowance<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof pointABI,
          'decreaseAllowance'
        >['request']['abi'],
        'decreaseAllowance',
        TMode
      > & { functionName?: 'decreaseAllowance' }
    : UseContractWriteConfig<typeof pointABI, 'decreaseAllowance', TMode> & {
        abi?: never
        functionName?: 'decreaseAllowance'
      } = {} as any,
) {
  return useContractWrite<typeof pointABI, 'decreaseAllowance', TMode>({
    abi: pointABI,
    functionName: 'decreaseAllowance',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link pointABI}__ and `functionName` set to `"increaseAllowance"`.
 */
export function usePointIncreaseAllowance<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof pointABI,
          'increaseAllowance'
        >['request']['abi'],
        'increaseAllowance',
        TMode
      > & { functionName?: 'increaseAllowance' }
    : UseContractWriteConfig<typeof pointABI, 'increaseAllowance', TMode> & {
        abi?: never
        functionName?: 'increaseAllowance'
      } = {} as any,
) {
  return useContractWrite<typeof pointABI, 'increaseAllowance', TMode>({
    abi: pointABI,
    functionName: 'increaseAllowance',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link pointABI}__ and `functionName` set to `"mint"`.
 */
export function usePointMint<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof pointABI, 'mint'>['request']['abi'],
        'mint',
        TMode
      > & { functionName?: 'mint' }
    : UseContractWriteConfig<typeof pointABI, 'mint', TMode> & {
        abi?: never
        functionName?: 'mint'
      } = {} as any,
) {
  return useContractWrite<typeof pointABI, 'mint', TMode>({
    abi: pointABI,
    functionName: 'mint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link pointABI}__ and `functionName` set to `"removeFromWhiteList"`.
 */
export function usePointRemoveFromWhiteList<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof pointABI,
          'removeFromWhiteList'
        >['request']['abi'],
        'removeFromWhiteList',
        TMode
      > & { functionName?: 'removeFromWhiteList' }
    : UseContractWriteConfig<typeof pointABI, 'removeFromWhiteList', TMode> & {
        abi?: never
        functionName?: 'removeFromWhiteList'
      } = {} as any,
) {
  return useContractWrite<typeof pointABI, 'removeFromWhiteList', TMode>({
    abi: pointABI,
    functionName: 'removeFromWhiteList',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link pointABI}__ and `functionName` set to `"transfer"`.
 */
export function usePointTransfer<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof pointABI,
          'transfer'
        >['request']['abi'],
        'transfer',
        TMode
      > & { functionName?: 'transfer' }
    : UseContractWriteConfig<typeof pointABI, 'transfer', TMode> & {
        abi?: never
        functionName?: 'transfer'
      } = {} as any,
) {
  return useContractWrite<typeof pointABI, 'transfer', TMode>({
    abi: pointABI,
    functionName: 'transfer',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link pointABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePointTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof pointABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof pointABI, 'transferFrom', TMode> & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof pointABI, 'transferFrom', TMode>({
    abi: pointABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link pointABI}__.
 */
export function usePreparePointWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof pointABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: pointABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof pointABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link pointABI}__ and `functionName` set to `"addToWhiteList"`.
 */
export function usePreparePointAddToWhiteList(
  config: Omit<
    UsePrepareContractWriteConfig<typeof pointABI, 'addToWhiteList'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: pointABI,
    functionName: 'addToWhiteList',
    ...config,
  } as UsePrepareContractWriteConfig<typeof pointABI, 'addToWhiteList'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link pointABI}__ and `functionName` set to `"approve"`.
 */
export function usePreparePointApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof pointABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: pointABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof pointABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link pointABI}__ and `functionName` set to `"decreaseAllowance"`.
 */
export function usePreparePointDecreaseAllowance(
  config: Omit<
    UsePrepareContractWriteConfig<typeof pointABI, 'decreaseAllowance'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: pointABI,
    functionName: 'decreaseAllowance',
    ...config,
  } as UsePrepareContractWriteConfig<typeof pointABI, 'decreaseAllowance'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link pointABI}__ and `functionName` set to `"increaseAllowance"`.
 */
export function usePreparePointIncreaseAllowance(
  config: Omit<
    UsePrepareContractWriteConfig<typeof pointABI, 'increaseAllowance'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: pointABI,
    functionName: 'increaseAllowance',
    ...config,
  } as UsePrepareContractWriteConfig<typeof pointABI, 'increaseAllowance'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link pointABI}__ and `functionName` set to `"mint"`.
 */
export function usePreparePointMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof pointABI, 'mint'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: pointABI,
    functionName: 'mint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof pointABI, 'mint'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link pointABI}__ and `functionName` set to `"removeFromWhiteList"`.
 */
export function usePreparePointRemoveFromWhiteList(
  config: Omit<
    UsePrepareContractWriteConfig<typeof pointABI, 'removeFromWhiteList'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: pointABI,
    functionName: 'removeFromWhiteList',
    ...config,
  } as UsePrepareContractWriteConfig<typeof pointABI, 'removeFromWhiteList'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link pointABI}__ and `functionName` set to `"transfer"`.
 */
export function usePreparePointTransfer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof pointABI, 'transfer'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: pointABI,
    functionName: 'transfer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof pointABI, 'transfer'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link pointABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePreparePointTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof pointABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: pointABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof pointABI, 'transferFrom'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link pointABI}__.
 */
export function usePointEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof pointABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: pointABI,
    ...config,
  } as UseContractEventConfig<typeof pointABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link pointABI}__ and `eventName` set to `"Approval"`.
 */
export function usePointApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof pointABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: pointABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof pointABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link pointABI}__ and `eventName` set to `"Transfer"`.
 */
export function usePointTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof pointABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: pointABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof pointABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link raidsABI}__.
 */
export function useRaidsRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof raidsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof raidsABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({ abi: raidsABI, ...config } as UseContractReadConfig<
    typeof raidsABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link raidsABI}__ and `functionName` set to `"airnodeAddress"`.
 */
export function useRaidsAirnodeAddress<
  TFunctionName extends 'airnodeAddress',
  TSelectData = ReadContractResult<typeof raidsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof raidsABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: raidsABI,
    functionName: 'airnodeAddress',
    ...config,
  } as UseContractReadConfig<typeof raidsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link raidsABI}__ and `functionName` set to `"airnodeRrp"`.
 */
export function useRaidsAirnodeRrp<
  TFunctionName extends 'airnodeRrp',
  TSelectData = ReadContractResult<typeof raidsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof raidsABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: raidsABI,
    functionName: 'airnodeRrp',
    ...config,
  } as UseContractReadConfig<typeof raidsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link raidsABI}__ and `functionName` set to `"basePointsAmount"`.
 */
export function useRaidsBasePointsAmount<
  TFunctionName extends 'basePointsAmount',
  TSelectData = ReadContractResult<typeof raidsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof raidsABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: raidsABI,
    functionName: 'basePointsAmount',
    ...config,
  } as UseContractReadConfig<typeof raidsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link raidsABI}__ and `functionName` set to `"baseValueAmount"`.
 */
export function useRaidsBaseValueAmount<
  TFunctionName extends 'baseValueAmount',
  TSelectData = ReadContractResult<typeof raidsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof raidsABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: raidsABI,
    functionName: 'baseValueAmount',
    ...config,
  } as UseContractReadConfig<typeof raidsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link raidsABI}__ and `functionName` set to `"endpointIdUint256"`.
 */
export function useRaidsEndpointIdUint256<
  TFunctionName extends 'endpointIdUint256',
  TSelectData = ReadContractResult<typeof raidsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof raidsABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: raidsABI,
    functionName: 'endpointIdUint256',
    ...config,
  } as UseContractReadConfig<typeof raidsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link raidsABI}__ and `functionName` set to `"itemDropChance"`.
 */
export function useRaidsItemDropChance<
  TFunctionName extends 'itemDropChance',
  TSelectData = ReadContractResult<typeof raidsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof raidsABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: raidsABI,
    functionName: 'itemDropChance',
    ...config,
  } as UseContractReadConfig<typeof raidsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link raidsABI}__ and `functionName` set to `"items"`.
 */
export function useRaidsItems<
  TFunctionName extends 'items',
  TSelectData = ReadContractResult<typeof raidsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof raidsABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: raidsABI,
    functionName: 'items',
    ...config,
  } as UseContractReadConfig<typeof raidsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link raidsABI}__ and `functionName` set to `"lemons"`.
 */
export function useRaidsLemons<
  TFunctionName extends 'lemons',
  TSelectData = ReadContractResult<typeof raidsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof raidsABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: raidsABI,
    functionName: 'lemons',
    ...config,
  } as UseContractReadConfig<typeof raidsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link raidsABI}__ and `functionName` set to `"nextRaidId"`.
 */
export function useRaidsNextRaidId<
  TFunctionName extends 'nextRaidId',
  TSelectData = ReadContractResult<typeof raidsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof raidsABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: raidsABI,
    functionName: 'nextRaidId',
    ...config,
  } as UseContractReadConfig<typeof raidsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link raidsABI}__ and `functionName` set to `"owner"`.
 */
export function useRaidsOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof raidsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof raidsABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: raidsABI,
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof raidsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link raidsABI}__ and `functionName` set to `"points"`.
 */
export function useRaidsPoints<
  TFunctionName extends 'points',
  TSelectData = ReadContractResult<typeof raidsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof raidsABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: raidsABI,
    functionName: 'points',
    ...config,
  } as UseContractReadConfig<typeof raidsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link raidsABI}__ and `functionName` set to `"raidDurations"`.
 */
export function useRaidsRaidDurations<
  TFunctionName extends 'raidDurations',
  TSelectData = ReadContractResult<typeof raidsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof raidsABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: raidsABI,
    functionName: 'raidDurations',
    ...config,
  } as UseContractReadConfig<typeof raidsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link raidsABI}__ and `functionName` set to `"raids"`.
 */
export function useRaidsRaids<
  TFunctionName extends 'raids',
  TSelectData = ReadContractResult<typeof raidsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof raidsABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: raidsABI,
    functionName: 'raids',
    ...config,
  } as UseContractReadConfig<typeof raidsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link raidsABI}__ and `functionName` set to `"requests"`.
 */
export function useRaidsRequests<
  TFunctionName extends 'requests',
  TSelectData = ReadContractResult<typeof raidsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof raidsABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: raidsABI,
    functionName: 'requests',
    ...config,
  } as UseContractReadConfig<typeof raidsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link raidsABI}__ and `functionName` set to `"requiredLemonLevels"`.
 */
export function useRaidsRequiredLemonLevels<
  TFunctionName extends 'requiredLemonLevels',
  TSelectData = ReadContractResult<typeof raidsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof raidsABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: raidsABI,
    functionName: 'requiredLemonLevels',
    ...config,
  } as UseContractReadConfig<typeof raidsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link raidsABI}__ and `functionName` set to `"requiredValue"`.
 */
export function useRaidsRequiredValue<
  TFunctionName extends 'requiredValue',
  TSelectData = ReadContractResult<typeof raidsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof raidsABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: raidsABI,
    functionName: 'requiredValue',
    ...config,
  } as UseContractReadConfig<typeof raidsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link raidsABI}__ and `functionName` set to `"sponsorWallet"`.
 */
export function useRaidsSponsorWallet<
  TFunctionName extends 'sponsorWallet',
  TSelectData = ReadContractResult<typeof raidsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof raidsABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: raidsABI,
    functionName: 'sponsorWallet',
    ...config,
  } as UseContractReadConfig<typeof raidsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link raidsABI}__ and `functionName` set to `"sqrt"`.
 */
export function useRaidsSqrt<
  TFunctionName extends 'sqrt',
  TSelectData = ReadContractResult<typeof raidsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof raidsABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: raidsABI,
    functionName: 'sqrt',
    ...config,
  } as UseContractReadConfig<typeof raidsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link raidsABI}__ and `functionName` set to `"stickerDropChance"`.
 */
export function useRaidsStickerDropChance<
  TFunctionName extends 'stickerDropChance',
  TSelectData = ReadContractResult<typeof raidsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof raidsABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: raidsABI,
    functionName: 'stickerDropChance',
    ...config,
  } as UseContractReadConfig<typeof raidsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link raidsABI}__ and `functionName` set to `"stickers"`.
 */
export function useRaidsStickers<
  TFunctionName extends 'stickers',
  TSelectData = ReadContractResult<typeof raidsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof raidsABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: raidsABI,
    functionName: 'stickers',
    ...config,
  } as UseContractReadConfig<typeof raidsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link raidsABI}__ and `functionName` set to `"tresuary"`.
 */
export function useRaidsTresuary<
  TFunctionName extends 'tresuary',
  TSelectData = ReadContractResult<typeof raidsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof raidsABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: raidsABI,
    functionName: 'tresuary',
    ...config,
  } as UseContractReadConfig<typeof raidsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link raidsABI}__ and `functionName` set to `"valueDropChance"`.
 */
export function useRaidsValueDropChance<
  TFunctionName extends 'valueDropChance',
  TSelectData = ReadContractResult<typeof raidsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof raidsABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: raidsABI,
    functionName: 'valueDropChance',
    ...config,
  } as UseContractReadConfig<typeof raidsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link raidsABI}__.
 */
export function useRaidsWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof raidsABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof raidsABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof raidsABI, TFunctionName, TMode>({
    abi: raidsABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link raidsABI}__ and `functionName` set to `"_returnLemonCallback"`.
 */
export function useRaidsReturnLemonCallback<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof raidsABI,
          '_returnLemonCallback'
        >['request']['abi'],
        '_returnLemonCallback',
        TMode
      > & { functionName?: '_returnLemonCallback' }
    : UseContractWriteConfig<typeof raidsABI, '_returnLemonCallback', TMode> & {
        abi?: never
        functionName?: '_returnLemonCallback'
      } = {} as any,
) {
  return useContractWrite<typeof raidsABI, '_returnLemonCallback', TMode>({
    abi: raidsABI,
    functionName: '_returnLemonCallback',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link raidsABI}__ and `functionName` set to `"initialize"`.
 */
export function useRaidsInitialize<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof raidsABI,
          'initialize'
        >['request']['abi'],
        'initialize',
        TMode
      > & { functionName?: 'initialize' }
    : UseContractWriteConfig<typeof raidsABI, 'initialize', TMode> & {
        abi?: never
        functionName?: 'initialize'
      } = {} as any,
) {
  return useContractWrite<typeof raidsABI, 'initialize', TMode>({
    abi: raidsABI,
    functionName: 'initialize',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link raidsABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function useRaidsRenounceOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof raidsABI,
          'renounceOwnership'
        >['request']['abi'],
        'renounceOwnership',
        TMode
      > & { functionName?: 'renounceOwnership' }
    : UseContractWriteConfig<typeof raidsABI, 'renounceOwnership', TMode> & {
        abi?: never
        functionName?: 'renounceOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof raidsABI, 'renounceOwnership', TMode>({
    abi: raidsABI,
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link raidsABI}__ and `functionName` set to `"returnLemon"`.
 */
export function useRaidsReturnLemon<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof raidsABI,
          'returnLemon'
        >['request']['abi'],
        'returnLemon',
        TMode
      > & { functionName?: 'returnLemon' }
    : UseContractWriteConfig<typeof raidsABI, 'returnLemon', TMode> & {
        abi?: never
        functionName?: 'returnLemon'
      } = {} as any,
) {
  return useContractWrite<typeof raidsABI, 'returnLemon', TMode>({
    abi: raidsABI,
    functionName: 'returnLemon',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link raidsABI}__ and `functionName` set to `"sendToRaid"`.
 */
export function useRaidsSendToRaid<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof raidsABI,
          'sendToRaid'
        >['request']['abi'],
        'sendToRaid',
        TMode
      > & { functionName?: 'sendToRaid' }
    : UseContractWriteConfig<typeof raidsABI, 'sendToRaid', TMode> & {
        abi?: never
        functionName?: 'sendToRaid'
      } = {} as any,
) {
  return useContractWrite<typeof raidsABI, 'sendToRaid', TMode>({
    abi: raidsABI,
    functionName: 'sendToRaid',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link raidsABI}__ and `functionName` set to `"setItemsAddress"`.
 */
export function useRaidsSetItemsAddress<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof raidsABI,
          'setItemsAddress'
        >['request']['abi'],
        'setItemsAddress',
        TMode
      > & { functionName?: 'setItemsAddress' }
    : UseContractWriteConfig<typeof raidsABI, 'setItemsAddress', TMode> & {
        abi?: never
        functionName?: 'setItemsAddress'
      } = {} as any,
) {
  return useContractWrite<typeof raidsABI, 'setItemsAddress', TMode>({
    abi: raidsABI,
    functionName: 'setItemsAddress',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link raidsABI}__ and `functionName` set to `"setLemonAddress"`.
 */
export function useRaidsSetLemonAddress<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof raidsABI,
          'setLemonAddress'
        >['request']['abi'],
        'setLemonAddress',
        TMode
      > & { functionName?: 'setLemonAddress' }
    : UseContractWriteConfig<typeof raidsABI, 'setLemonAddress', TMode> & {
        abi?: never
        functionName?: 'setLemonAddress'
      } = {} as any,
) {
  return useContractWrite<typeof raidsABI, 'setLemonAddress', TMode>({
    abi: raidsABI,
    functionName: 'setLemonAddress',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link raidsABI}__ and `functionName` set to `"setPointsAddress"`.
 */
export function useRaidsSetPointsAddress<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof raidsABI,
          'setPointsAddress'
        >['request']['abi'],
        'setPointsAddress',
        TMode
      > & { functionName?: 'setPointsAddress' }
    : UseContractWriteConfig<typeof raidsABI, 'setPointsAddress', TMode> & {
        abi?: never
        functionName?: 'setPointsAddress'
      } = {} as any,
) {
  return useContractWrite<typeof raidsABI, 'setPointsAddress', TMode>({
    abi: raidsABI,
    functionName: 'setPointsAddress',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link raidsABI}__ and `functionName` set to `"setRequestParameters"`.
 */
export function useRaidsSetRequestParameters<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof raidsABI,
          'setRequestParameters'
        >['request']['abi'],
        'setRequestParameters',
        TMode
      > & { functionName?: 'setRequestParameters' }
    : UseContractWriteConfig<typeof raidsABI, 'setRequestParameters', TMode> & {
        abi?: never
        functionName?: 'setRequestParameters'
      } = {} as any,
) {
  return useContractWrite<typeof raidsABI, 'setRequestParameters', TMode>({
    abi: raidsABI,
    functionName: 'setRequestParameters',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link raidsABI}__ and `functionName` set to `"setStickersAddress"`.
 */
export function useRaidsSetStickersAddress<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof raidsABI,
          'setStickersAddress'
        >['request']['abi'],
        'setStickersAddress',
        TMode
      > & { functionName?: 'setStickersAddress' }
    : UseContractWriteConfig<typeof raidsABI, 'setStickersAddress', TMode> & {
        abi?: never
        functionName?: 'setStickersAddress'
      } = {} as any,
) {
  return useContractWrite<typeof raidsABI, 'setStickersAddress', TMode>({
    abi: raidsABI,
    functionName: 'setStickersAddress',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link raidsABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function useRaidsTransferOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof raidsABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & { functionName?: 'transferOwnership' }
    : UseContractWriteConfig<typeof raidsABI, 'transferOwnership', TMode> & {
        abi?: never
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof raidsABI, 'transferOwnership', TMode>({
    abi: raidsABI,
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link raidsABI}__ and `functionName` set to `"withdraw"`.
 */
export function useRaidsWithdraw<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof raidsABI,
          'withdraw'
        >['request']['abi'],
        'withdraw',
        TMode
      > & { functionName?: 'withdraw' }
    : UseContractWriteConfig<typeof raidsABI, 'withdraw', TMode> & {
        abi?: never
        functionName?: 'withdraw'
      } = {} as any,
) {
  return useContractWrite<typeof raidsABI, 'withdraw', TMode>({
    abi: raidsABI,
    functionName: 'withdraw',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link raidsABI}__.
 */
export function usePrepareRaidsWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof raidsABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: raidsABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof raidsABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link raidsABI}__ and `functionName` set to `"_returnLemonCallback"`.
 */
export function usePrepareRaidsReturnLemonCallback(
  config: Omit<
    UsePrepareContractWriteConfig<typeof raidsABI, '_returnLemonCallback'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: raidsABI,
    functionName: '_returnLemonCallback',
    ...config,
  } as UsePrepareContractWriteConfig<typeof raidsABI, '_returnLemonCallback'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link raidsABI}__ and `functionName` set to `"initialize"`.
 */
export function usePrepareRaidsInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof raidsABI, 'initialize'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: raidsABI,
    functionName: 'initialize',
    ...config,
  } as UsePrepareContractWriteConfig<typeof raidsABI, 'initialize'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link raidsABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function usePrepareRaidsRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof raidsABI, 'renounceOwnership'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: raidsABI,
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof raidsABI, 'renounceOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link raidsABI}__ and `functionName` set to `"returnLemon"`.
 */
export function usePrepareRaidsReturnLemon(
  config: Omit<
    UsePrepareContractWriteConfig<typeof raidsABI, 'returnLemon'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: raidsABI,
    functionName: 'returnLemon',
    ...config,
  } as UsePrepareContractWriteConfig<typeof raidsABI, 'returnLemon'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link raidsABI}__ and `functionName` set to `"sendToRaid"`.
 */
export function usePrepareRaidsSendToRaid(
  config: Omit<
    UsePrepareContractWriteConfig<typeof raidsABI, 'sendToRaid'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: raidsABI,
    functionName: 'sendToRaid',
    ...config,
  } as UsePrepareContractWriteConfig<typeof raidsABI, 'sendToRaid'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link raidsABI}__ and `functionName` set to `"setItemsAddress"`.
 */
export function usePrepareRaidsSetItemsAddress(
  config: Omit<
    UsePrepareContractWriteConfig<typeof raidsABI, 'setItemsAddress'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: raidsABI,
    functionName: 'setItemsAddress',
    ...config,
  } as UsePrepareContractWriteConfig<typeof raidsABI, 'setItemsAddress'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link raidsABI}__ and `functionName` set to `"setLemonAddress"`.
 */
export function usePrepareRaidsSetLemonAddress(
  config: Omit<
    UsePrepareContractWriteConfig<typeof raidsABI, 'setLemonAddress'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: raidsABI,
    functionName: 'setLemonAddress',
    ...config,
  } as UsePrepareContractWriteConfig<typeof raidsABI, 'setLemonAddress'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link raidsABI}__ and `functionName` set to `"setPointsAddress"`.
 */
export function usePrepareRaidsSetPointsAddress(
  config: Omit<
    UsePrepareContractWriteConfig<typeof raidsABI, 'setPointsAddress'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: raidsABI,
    functionName: 'setPointsAddress',
    ...config,
  } as UsePrepareContractWriteConfig<typeof raidsABI, 'setPointsAddress'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link raidsABI}__ and `functionName` set to `"setRequestParameters"`.
 */
export function usePrepareRaidsSetRequestParameters(
  config: Omit<
    UsePrepareContractWriteConfig<typeof raidsABI, 'setRequestParameters'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: raidsABI,
    functionName: 'setRequestParameters',
    ...config,
  } as UsePrepareContractWriteConfig<typeof raidsABI, 'setRequestParameters'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link raidsABI}__ and `functionName` set to `"setStickersAddress"`.
 */
export function usePrepareRaidsSetStickersAddress(
  config: Omit<
    UsePrepareContractWriteConfig<typeof raidsABI, 'setStickersAddress'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: raidsABI,
    functionName: 'setStickersAddress',
    ...config,
  } as UsePrepareContractWriteConfig<typeof raidsABI, 'setStickersAddress'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link raidsABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function usePrepareRaidsTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof raidsABI, 'transferOwnership'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: raidsABI,
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof raidsABI, 'transferOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link raidsABI}__ and `functionName` set to `"withdraw"`.
 */
export function usePrepareRaidsWithdraw(
  config: Omit<
    UsePrepareContractWriteConfig<typeof raidsABI, 'withdraw'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: raidsABI,
    functionName: 'withdraw',
    ...config,
  } as UsePrepareContractWriteConfig<typeof raidsABI, 'withdraw'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link raidsABI}__.
 */
export function useRaidsEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof raidsABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: raidsABI,
    ...config,
  } as UseContractEventConfig<typeof raidsABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link raidsABI}__ and `eventName` set to `"Initialized"`.
 */
export function useRaidsInitializedEvent(
  config: Omit<
    UseContractEventConfig<typeof raidsABI, 'Initialized'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: raidsABI,
    eventName: 'Initialized',
    ...config,
  } as UseContractEventConfig<typeof raidsABI, 'Initialized'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link raidsABI}__ and `eventName` set to `"OwnershipTransferred"`.
 */
export function useRaidsOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof raidsABI, 'OwnershipTransferred'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: raidsABI,
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof raidsABI, 'OwnershipTransferred'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link raidsABI}__ and `eventName` set to `"RaidFinished"`.
 */
export function useRaidsRaidFinishedEvent(
  config: Omit<
    UseContractEventConfig<typeof raidsABI, 'RaidFinished'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: raidsABI,
    eventName: 'RaidFinished',
    ...config,
  } as UseContractEventConfig<typeof raidsABI, 'RaidFinished'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link referralABI}__.
 */
export function useReferralRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof referralABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof referralABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: referralABI,
    ...config,
  } as UseContractReadConfig<typeof referralABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link referralABI}__ and `functionName` set to `"getUserRef"`.
 */
export function useReferralGetUserRef<
  TFunctionName extends 'getUserRef',
  TSelectData = ReadContractResult<typeof referralABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof referralABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: referralABI,
    functionName: 'getUserRef',
    ...config,
  } as UseContractReadConfig<typeof referralABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link referralABI}__ and `functionName` set to `"referrals"`.
 */
export function useReferralReferrals<
  TFunctionName extends 'referrals',
  TSelectData = ReadContractResult<typeof referralABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof referralABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: referralABI,
    functionName: 'referrals',
    ...config,
  } as UseContractReadConfig<typeof referralABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link referralABI}__ and `functionName` set to `"referralsCount"`.
 */
export function useReferralReferralsCount<
  TFunctionName extends 'referralsCount',
  TSelectData = ReadContractResult<typeof referralABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof referralABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: referralABI,
    functionName: 'referralsCount',
    ...config,
  } as UseContractReadConfig<typeof referralABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link referralABI}__.
 */
export function useReferralWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof referralABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof referralABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof referralABI, TFunctionName, TMode>({
    abi: referralABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link referralABI}__ and `functionName` set to `"setReferee"`.
 */
export function useReferralSetReferee<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof referralABI,
          'setReferee'
        >['request']['abi'],
        'setReferee',
        TMode
      > & { functionName?: 'setReferee' }
    : UseContractWriteConfig<typeof referralABI, 'setReferee', TMode> & {
        abi?: never
        functionName?: 'setReferee'
      } = {} as any,
) {
  return useContractWrite<typeof referralABI, 'setReferee', TMode>({
    abi: referralABI,
    functionName: 'setReferee',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link referralABI}__.
 */
export function usePrepareReferralWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof referralABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: referralABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof referralABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link referralABI}__ and `functionName` set to `"setReferee"`.
 */
export function usePrepareReferralSetReferee(
  config: Omit<
    UsePrepareContractWriteConfig<typeof referralABI, 'setReferee'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: referralABI,
    functionName: 'setReferee',
    ...config,
  } as UsePrepareContractWriteConfig<typeof referralABI, 'setReferee'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link referralABI}__.
 */
export function useReferralEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof referralABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: referralABI,
    ...config,
  } as UseContractEventConfig<typeof referralABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link referralABI}__ and `eventName` set to `"ReferralSet"`.
 */
export function useReferralReferralSetEvent(
  config: Omit<
    UseContractEventConfig<typeof referralABI, 'ReferralSet'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: referralABI,
    eventName: 'ReferralSet',
    ...config,
  } as UseContractEventConfig<typeof referralABI, 'ReferralSet'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link shirtABI}__.
 */
export function useShirtRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof shirtABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof shirtABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({ abi: shirtABI, ...config } as UseContractReadConfig<
    typeof shirtABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link shirtABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useShirtBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof shirtABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof shirtABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: shirtABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof shirtABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link shirtABI}__ and `functionName` set to `"baseURI"`.
 */
export function useShirtBaseUri<
  TFunctionName extends 'baseURI',
  TSelectData = ReadContractResult<typeof shirtABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof shirtABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: shirtABI,
    functionName: 'baseURI',
    ...config,
  } as UseContractReadConfig<typeof shirtABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link shirtABI}__ and `functionName` set to `"getApproved"`.
 */
export function useShirtGetApproved<
  TFunctionName extends 'getApproved',
  TSelectData = ReadContractResult<typeof shirtABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof shirtABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: shirtABI,
    functionName: 'getApproved',
    ...config,
  } as UseContractReadConfig<typeof shirtABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link shirtABI}__ and `functionName` set to `"isApprovedForAll"`.
 */
export function useShirtIsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof shirtABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof shirtABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: shirtABI,
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<typeof shirtABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link shirtABI}__ and `functionName` set to `"name"`.
 */
export function useShirtName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof shirtABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof shirtABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: shirtABI,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof shirtABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link shirtABI}__ and `functionName` set to `"ownerOf"`.
 */
export function useShirtOwnerOf<
  TFunctionName extends 'ownerOf',
  TSelectData = ReadContractResult<typeof shirtABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof shirtABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: shirtABI,
    functionName: 'ownerOf',
    ...config,
  } as UseContractReadConfig<typeof shirtABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link shirtABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useShirtSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof shirtABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof shirtABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: shirtABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof shirtABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link shirtABI}__ and `functionName` set to `"symbol"`.
 */
export function useShirtSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof shirtABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof shirtABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: shirtABI,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof shirtABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link shirtABI}__ and `functionName` set to `"tokenURI"`.
 */
export function useShirtTokenUri<
  TFunctionName extends 'tokenURI',
  TSelectData = ReadContractResult<typeof shirtABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof shirtABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: shirtABI,
    functionName: 'tokenURI',
    ...config,
  } as UseContractReadConfig<typeof shirtABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link shirtABI}__.
 */
export function useShirtWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof shirtABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof shirtABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof shirtABI, TFunctionName, TMode>({
    abi: shirtABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link shirtABI}__ and `functionName` set to `"approve"`.
 */
export function useShirtApprove<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof shirtABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof shirtABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof shirtABI, 'approve', TMode>({
    abi: shirtABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link shirtABI}__ and `functionName` set to `"boxMint"`.
 */
export function useShirtBoxMint<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof shirtABI,
          'boxMint'
        >['request']['abi'],
        'boxMint',
        TMode
      > & { functionName?: 'boxMint' }
    : UseContractWriteConfig<typeof shirtABI, 'boxMint', TMode> & {
        abi?: never
        functionName?: 'boxMint'
      } = {} as any,
) {
  return useContractWrite<typeof shirtABI, 'boxMint', TMode>({
    abi: shirtABI,
    functionName: 'boxMint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link shirtABI}__ and `functionName` set to `"burn"`.
 */
export function useShirtBurn<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof shirtABI, 'burn'>['request']['abi'],
        'burn',
        TMode
      > & { functionName?: 'burn' }
    : UseContractWriteConfig<typeof shirtABI, 'burn', TMode> & {
        abi?: never
        functionName?: 'burn'
      } = {} as any,
) {
  return useContractWrite<typeof shirtABI, 'burn', TMode>({
    abi: shirtABI,
    functionName: 'burn',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link shirtABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function useShirtSafeTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof shirtABI,
          'safeTransferFrom'
        >['request']['abi'],
        'safeTransferFrom',
        TMode
      > & { functionName?: 'safeTransferFrom' }
    : UseContractWriteConfig<typeof shirtABI, 'safeTransferFrom', TMode> & {
        abi?: never
        functionName?: 'safeTransferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof shirtABI, 'safeTransferFrom', TMode>({
    abi: shirtABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link shirtABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function useShirtSetApprovalForAll<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof shirtABI,
          'setApprovalForAll'
        >['request']['abi'],
        'setApprovalForAll',
        TMode
      > & { functionName?: 'setApprovalForAll' }
    : UseContractWriteConfig<typeof shirtABI, 'setApprovalForAll', TMode> & {
        abi?: never
        functionName?: 'setApprovalForAll'
      } = {} as any,
) {
  return useContractWrite<typeof shirtABI, 'setApprovalForAll', TMode>({
    abi: shirtABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link shirtABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useShirtTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof shirtABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof shirtABI, 'transferFrom', TMode> & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof shirtABI, 'transferFrom', TMode>({
    abi: shirtABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link shirtABI}__.
 */
export function usePrepareShirtWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof shirtABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: shirtABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof shirtABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link shirtABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareShirtApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof shirtABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: shirtABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof shirtABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link shirtABI}__ and `functionName` set to `"boxMint"`.
 */
export function usePrepareShirtBoxMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof shirtABI, 'boxMint'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: shirtABI,
    functionName: 'boxMint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof shirtABI, 'boxMint'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link shirtABI}__ and `functionName` set to `"burn"`.
 */
export function usePrepareShirtBurn(
  config: Omit<
    UsePrepareContractWriteConfig<typeof shirtABI, 'burn'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: shirtABI,
    functionName: 'burn',
    ...config,
  } as UsePrepareContractWriteConfig<typeof shirtABI, 'burn'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link shirtABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePrepareShirtSafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof shirtABI, 'safeTransferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: shirtABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof shirtABI, 'safeTransferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link shirtABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePrepareShirtSetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<typeof shirtABI, 'setApprovalForAll'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: shirtABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<typeof shirtABI, 'setApprovalForAll'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link shirtABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareShirtTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof shirtABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: shirtABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof shirtABI, 'transferFrom'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link shirtABI}__.
 */
export function useShirtEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof shirtABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: shirtABI,
    ...config,
  } as UseContractEventConfig<typeof shirtABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link shirtABI}__ and `eventName` set to `"Approval"`.
 */
export function useShirtApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof shirtABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: shirtABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof shirtABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link shirtABI}__ and `eventName` set to `"ApprovalForAll"`.
 */
export function useShirtApprovalForAllEvent(
  config: Omit<
    UseContractEventConfig<typeof shirtABI, 'ApprovalForAll'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: shirtABI,
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof shirtABI, 'ApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link shirtABI}__ and `eventName` set to `"Transfer"`.
 */
export function useShirtTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof shirtABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: shirtABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof shirtABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link stickerABI}__.
 */
export function useStickerRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof stickerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof stickerABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: stickerABI,
    ...config,
  } as UseContractReadConfig<typeof stickerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link stickerABI}__ and `functionName` set to `"allowInitializePath"`.
 */
export function useStickerAllowInitializePath<
  TFunctionName extends 'allowInitializePath',
  TSelectData = ReadContractResult<typeof stickerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof stickerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: stickerABI,
    functionName: 'allowInitializePath',
    ...config,
  } as UseContractReadConfig<typeof stickerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link stickerABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useStickerBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof stickerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof stickerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: stickerABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof stickerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link stickerABI}__ and `functionName` set to `"composeMsgSender"`.
 */
export function useStickerComposeMsgSender<
  TFunctionName extends 'composeMsgSender',
  TSelectData = ReadContractResult<typeof stickerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof stickerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: stickerABI,
    functionName: 'composeMsgSender',
    ...config,
  } as UseContractReadConfig<typeof stickerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link stickerABI}__ and `functionName` set to `"endpoint"`.
 */
export function useStickerEndpoint<
  TFunctionName extends 'endpoint',
  TSelectData = ReadContractResult<typeof stickerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof stickerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: stickerABI,
    functionName: 'endpoint',
    ...config,
  } as UseContractReadConfig<typeof stickerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link stickerABI}__ and `functionName` set to `"getApproved"`.
 */
export function useStickerGetApproved<
  TFunctionName extends 'getApproved',
  TSelectData = ReadContractResult<typeof stickerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof stickerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: stickerABI,
    functionName: 'getApproved',
    ...config,
  } as UseContractReadConfig<typeof stickerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link stickerABI}__ and `functionName` set to `"isApprovedForAll"`.
 */
export function useStickerIsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof stickerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof stickerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: stickerABI,
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<typeof stickerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link stickerABI}__ and `functionName` set to `"isWhitelisted"`.
 */
export function useStickerIsWhitelisted<
  TFunctionName extends 'isWhitelisted',
  TSelectData = ReadContractResult<typeof stickerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof stickerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: stickerABI,
    functionName: 'isWhitelisted',
    ...config,
  } as UseContractReadConfig<typeof stickerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link stickerABI}__ and `functionName` set to `"itemsAddress"`.
 */
export function useStickerItemsAddress<
  TFunctionName extends 'itemsAddress',
  TSelectData = ReadContractResult<typeof stickerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof stickerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: stickerABI,
    functionName: 'itemsAddress',
    ...config,
  } as UseContractReadConfig<typeof stickerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link stickerABI}__ and `functionName` set to `"name"`.
 */
export function useStickerName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof stickerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof stickerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: stickerABI,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof stickerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link stickerABI}__ and `functionName` set to `"nextNonce"`.
 */
export function useStickerNextNonce<
  TFunctionName extends 'nextNonce',
  TSelectData = ReadContractResult<typeof stickerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof stickerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: stickerABI,
    functionName: 'nextNonce',
    ...config,
  } as UseContractReadConfig<typeof stickerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link stickerABI}__ and `functionName` set to `"oAppVersion"`.
 */
export function useStickerOAppVersion<
  TFunctionName extends 'oAppVersion',
  TSelectData = ReadContractResult<typeof stickerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof stickerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: stickerABI,
    functionName: 'oAppVersion',
    ...config,
  } as UseContractReadConfig<typeof stickerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link stickerABI}__ and `functionName` set to `"owner"`.
 */
export function useStickerOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof stickerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof stickerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: stickerABI,
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof stickerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link stickerABI}__ and `functionName` set to `"ownerOf"`.
 */
export function useStickerOwnerOf<
  TFunctionName extends 'ownerOf',
  TSelectData = ReadContractResult<typeof stickerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof stickerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: stickerABI,
    functionName: 'ownerOf',
    ...config,
  } as UseContractReadConfig<typeof stickerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link stickerABI}__ and `functionName` set to `"peers"`.
 */
export function useStickerPeers<
  TFunctionName extends 'peers',
  TSelectData = ReadContractResult<typeof stickerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof stickerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: stickerABI,
    functionName: 'peers',
    ...config,
  } as UseContractReadConfig<typeof stickerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link stickerABI}__ and `functionName` set to `"quote"`.
 */
export function useStickerQuote<
  TFunctionName extends 'quote',
  TSelectData = ReadContractResult<typeof stickerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof stickerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: stickerABI,
    functionName: 'quote',
    ...config,
  } as UseContractReadConfig<typeof stickerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link stickerABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useStickerSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof stickerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof stickerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: stickerABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof stickerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link stickerABI}__ and `functionName` set to `"symbol"`.
 */
export function useStickerSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof stickerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof stickerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: stickerABI,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof stickerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link stickerABI}__ and `functionName` set to `"tokenURI"`.
 */
export function useStickerTokenUri<
  TFunctionName extends 'tokenURI',
  TSelectData = ReadContractResult<typeof stickerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof stickerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: stickerABI,
    functionName: 'tokenURI',
    ...config,
  } as UseContractReadConfig<typeof stickerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link stickerABI}__ and `functionName` set to `"typesAmount"`.
 */
export function useStickerTypesAmount<
  TFunctionName extends 'typesAmount',
  TSelectData = ReadContractResult<typeof stickerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof stickerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: stickerABI,
    functionName: 'typesAmount',
    ...config,
  } as UseContractReadConfig<typeof stickerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link stickerABI}__.
 */
export function useStickerWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof stickerABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof stickerABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof stickerABI, TFunctionName, TMode>({
    abi: stickerABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link stickerABI}__ and `functionName` set to `"addAddressToWhitelist"`.
 */
export function useStickerAddAddressToWhitelist<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof stickerABI,
          'addAddressToWhitelist'
        >['request']['abi'],
        'addAddressToWhitelist',
        TMode
      > & { functionName?: 'addAddressToWhitelist' }
    : UseContractWriteConfig<
        typeof stickerABI,
        'addAddressToWhitelist',
        TMode
      > & {
        abi?: never
        functionName?: 'addAddressToWhitelist'
      } = {} as any,
) {
  return useContractWrite<typeof stickerABI, 'addAddressToWhitelist', TMode>({
    abi: stickerABI,
    functionName: 'addAddressToWhitelist',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link stickerABI}__ and `functionName` set to `"approve"`.
 */
export function useStickerApprove<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof stickerABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof stickerABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof stickerABI, 'approve', TMode>({
    abi: stickerABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link stickerABI}__ and `functionName` set to `"craftItem"`.
 */
export function useStickerCraftItem<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof stickerABI,
          'craftItem'
        >['request']['abi'],
        'craftItem',
        TMode
      > & { functionName?: 'craftItem' }
    : UseContractWriteConfig<typeof stickerABI, 'craftItem', TMode> & {
        abi?: never
        functionName?: 'craftItem'
      } = {} as any,
) {
  return useContractWrite<typeof stickerABI, 'craftItem', TMode>({
    abi: stickerABI,
    functionName: 'craftItem',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link stickerABI}__ and `functionName` set to `"initialize"`.
 */
export function useStickerInitialize<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof stickerABI,
          'initialize'
        >['request']['abi'],
        'initialize',
        TMode
      > & { functionName?: 'initialize' }
    : UseContractWriteConfig<typeof stickerABI, 'initialize', TMode> & {
        abi?: never
        functionName?: 'initialize'
      } = {} as any,
) {
  return useContractWrite<typeof stickerABI, 'initialize', TMode>({
    abi: stickerABI,
    functionName: 'initialize',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link stickerABI}__ and `functionName` set to `"lzReceive"`.
 */
export function useStickerLzReceive<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof stickerABI,
          'lzReceive'
        >['request']['abi'],
        'lzReceive',
        TMode
      > & { functionName?: 'lzReceive' }
    : UseContractWriteConfig<typeof stickerABI, 'lzReceive', TMode> & {
        abi?: never
        functionName?: 'lzReceive'
      } = {} as any,
) {
  return useContractWrite<typeof stickerABI, 'lzReceive', TMode>({
    abi: stickerABI,
    functionName: 'lzReceive',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link stickerABI}__ and `functionName` set to `"lzSend"`.
 */
export function useStickerLzSend<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof stickerABI,
          'lzSend'
        >['request']['abi'],
        'lzSend',
        TMode
      > & { functionName?: 'lzSend' }
    : UseContractWriteConfig<typeof stickerABI, 'lzSend', TMode> & {
        abi?: never
        functionName?: 'lzSend'
      } = {} as any,
) {
  return useContractWrite<typeof stickerABI, 'lzSend', TMode>({
    abi: stickerABI,
    functionName: 'lzSend',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link stickerABI}__ and `functionName` set to `"mint"`.
 */
export function useStickerMint<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof stickerABI, 'mint'>['request']['abi'],
        'mint',
        TMode
      > & { functionName?: 'mint' }
    : UseContractWriteConfig<typeof stickerABI, 'mint', TMode> & {
        abi?: never
        functionName?: 'mint'
      } = {} as any,
) {
  return useContractWrite<typeof stickerABI, 'mint', TMode>({
    abi: stickerABI,
    functionName: 'mint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link stickerABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function useStickerRenounceOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof stickerABI,
          'renounceOwnership'
        >['request']['abi'],
        'renounceOwnership',
        TMode
      > & { functionName?: 'renounceOwnership' }
    : UseContractWriteConfig<typeof stickerABI, 'renounceOwnership', TMode> & {
        abi?: never
        functionName?: 'renounceOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof stickerABI, 'renounceOwnership', TMode>({
    abi: stickerABI,
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link stickerABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function useStickerSafeTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof stickerABI,
          'safeTransferFrom'
        >['request']['abi'],
        'safeTransferFrom',
        TMode
      > & { functionName?: 'safeTransferFrom' }
    : UseContractWriteConfig<typeof stickerABI, 'safeTransferFrom', TMode> & {
        abi?: never
        functionName?: 'safeTransferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof stickerABI, 'safeTransferFrom', TMode>({
    abi: stickerABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link stickerABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function useStickerSetApprovalForAll<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof stickerABI,
          'setApprovalForAll'
        >['request']['abi'],
        'setApprovalForAll',
        TMode
      > & { functionName?: 'setApprovalForAll' }
    : UseContractWriteConfig<typeof stickerABI, 'setApprovalForAll', TMode> & {
        abi?: never
        functionName?: 'setApprovalForAll'
      } = {} as any,
) {
  return useContractWrite<typeof stickerABI, 'setApprovalForAll', TMode>({
    abi: stickerABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link stickerABI}__ and `functionName` set to `"setBaseURI"`.
 */
export function useStickerSetBaseUri<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof stickerABI,
          'setBaseURI'
        >['request']['abi'],
        'setBaseURI',
        TMode
      > & { functionName?: 'setBaseURI' }
    : UseContractWriteConfig<typeof stickerABI, 'setBaseURI', TMode> & {
        abi?: never
        functionName?: 'setBaseURI'
      } = {} as any,
) {
  return useContractWrite<typeof stickerABI, 'setBaseURI', TMode>({
    abi: stickerABI,
    functionName: 'setBaseURI',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link stickerABI}__ and `functionName` set to `"setDelegate"`.
 */
export function useStickerSetDelegate<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof stickerABI,
          'setDelegate'
        >['request']['abi'],
        'setDelegate',
        TMode
      > & { functionName?: 'setDelegate' }
    : UseContractWriteConfig<typeof stickerABI, 'setDelegate', TMode> & {
        abi?: never
        functionName?: 'setDelegate'
      } = {} as any,
) {
  return useContractWrite<typeof stickerABI, 'setDelegate', TMode>({
    abi: stickerABI,
    functionName: 'setDelegate',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link stickerABI}__ and `functionName` set to `"setItemsAddress"`.
 */
export function useStickerSetItemsAddress<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof stickerABI,
          'setItemsAddress'
        >['request']['abi'],
        'setItemsAddress',
        TMode
      > & { functionName?: 'setItemsAddress' }
    : UseContractWriteConfig<typeof stickerABI, 'setItemsAddress', TMode> & {
        abi?: never
        functionName?: 'setItemsAddress'
      } = {} as any,
) {
  return useContractWrite<typeof stickerABI, 'setItemsAddress', TMode>({
    abi: stickerABI,
    functionName: 'setItemsAddress',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link stickerABI}__ and `functionName` set to `"setPeer"`.
 */
export function useStickerSetPeer<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof stickerABI,
          'setPeer'
        >['request']['abi'],
        'setPeer',
        TMode
      > & { functionName?: 'setPeer' }
    : UseContractWriteConfig<typeof stickerABI, 'setPeer', TMode> & {
        abi?: never
        functionName?: 'setPeer'
      } = {} as any,
) {
  return useContractWrite<typeof stickerABI, 'setPeer', TMode>({
    abi: stickerABI,
    functionName: 'setPeer',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link stickerABI}__ and `functionName` set to `"setTypesAmount"`.
 */
export function useStickerSetTypesAmount<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof stickerABI,
          'setTypesAmount'
        >['request']['abi'],
        'setTypesAmount',
        TMode
      > & { functionName?: 'setTypesAmount' }
    : UseContractWriteConfig<typeof stickerABI, 'setTypesAmount', TMode> & {
        abi?: never
        functionName?: 'setTypesAmount'
      } = {} as any,
) {
  return useContractWrite<typeof stickerABI, 'setTypesAmount', TMode>({
    abi: stickerABI,
    functionName: 'setTypesAmount',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link stickerABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useStickerTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof stickerABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof stickerABI, 'transferFrom', TMode> & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof stickerABI, 'transferFrom', TMode>({
    abi: stickerABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link stickerABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function useStickerTransferOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof stickerABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & { functionName?: 'transferOwnership' }
    : UseContractWriteConfig<typeof stickerABI, 'transferOwnership', TMode> & {
        abi?: never
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof stickerABI, 'transferOwnership', TMode>({
    abi: stickerABI,
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link stickerABI}__.
 */
export function usePrepareStickerWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof stickerABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: stickerABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof stickerABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link stickerABI}__ and `functionName` set to `"addAddressToWhitelist"`.
 */
export function usePrepareStickerAddAddressToWhitelist(
  config: Omit<
    UsePrepareContractWriteConfig<typeof stickerABI, 'addAddressToWhitelist'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: stickerABI,
    functionName: 'addAddressToWhitelist',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof stickerABI,
    'addAddressToWhitelist'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link stickerABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareStickerApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof stickerABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: stickerABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof stickerABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link stickerABI}__ and `functionName` set to `"craftItem"`.
 */
export function usePrepareStickerCraftItem(
  config: Omit<
    UsePrepareContractWriteConfig<typeof stickerABI, 'craftItem'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: stickerABI,
    functionName: 'craftItem',
    ...config,
  } as UsePrepareContractWriteConfig<typeof stickerABI, 'craftItem'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link stickerABI}__ and `functionName` set to `"initialize"`.
 */
export function usePrepareStickerInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof stickerABI, 'initialize'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: stickerABI,
    functionName: 'initialize',
    ...config,
  } as UsePrepareContractWriteConfig<typeof stickerABI, 'initialize'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link stickerABI}__ and `functionName` set to `"lzReceive"`.
 */
export function usePrepareStickerLzReceive(
  config: Omit<
    UsePrepareContractWriteConfig<typeof stickerABI, 'lzReceive'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: stickerABI,
    functionName: 'lzReceive',
    ...config,
  } as UsePrepareContractWriteConfig<typeof stickerABI, 'lzReceive'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link stickerABI}__ and `functionName` set to `"lzSend"`.
 */
export function usePrepareStickerLzSend(
  config: Omit<
    UsePrepareContractWriteConfig<typeof stickerABI, 'lzSend'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: stickerABI,
    functionName: 'lzSend',
    ...config,
  } as UsePrepareContractWriteConfig<typeof stickerABI, 'lzSend'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link stickerABI}__ and `functionName` set to `"mint"`.
 */
export function usePrepareStickerMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof stickerABI, 'mint'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: stickerABI,
    functionName: 'mint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof stickerABI, 'mint'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link stickerABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function usePrepareStickerRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof stickerABI, 'renounceOwnership'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: stickerABI,
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof stickerABI, 'renounceOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link stickerABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePrepareStickerSafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof stickerABI, 'safeTransferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: stickerABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof stickerABI, 'safeTransferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link stickerABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePrepareStickerSetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<typeof stickerABI, 'setApprovalForAll'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: stickerABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<typeof stickerABI, 'setApprovalForAll'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link stickerABI}__ and `functionName` set to `"setBaseURI"`.
 */
export function usePrepareStickerSetBaseUri(
  config: Omit<
    UsePrepareContractWriteConfig<typeof stickerABI, 'setBaseURI'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: stickerABI,
    functionName: 'setBaseURI',
    ...config,
  } as UsePrepareContractWriteConfig<typeof stickerABI, 'setBaseURI'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link stickerABI}__ and `functionName` set to `"setDelegate"`.
 */
export function usePrepareStickerSetDelegate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof stickerABI, 'setDelegate'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: stickerABI,
    functionName: 'setDelegate',
    ...config,
  } as UsePrepareContractWriteConfig<typeof stickerABI, 'setDelegate'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link stickerABI}__ and `functionName` set to `"setItemsAddress"`.
 */
export function usePrepareStickerSetItemsAddress(
  config: Omit<
    UsePrepareContractWriteConfig<typeof stickerABI, 'setItemsAddress'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: stickerABI,
    functionName: 'setItemsAddress',
    ...config,
  } as UsePrepareContractWriteConfig<typeof stickerABI, 'setItemsAddress'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link stickerABI}__ and `functionName` set to `"setPeer"`.
 */
export function usePrepareStickerSetPeer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof stickerABI, 'setPeer'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: stickerABI,
    functionName: 'setPeer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof stickerABI, 'setPeer'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link stickerABI}__ and `functionName` set to `"setTypesAmount"`.
 */
export function usePrepareStickerSetTypesAmount(
  config: Omit<
    UsePrepareContractWriteConfig<typeof stickerABI, 'setTypesAmount'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: stickerABI,
    functionName: 'setTypesAmount',
    ...config,
  } as UsePrepareContractWriteConfig<typeof stickerABI, 'setTypesAmount'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link stickerABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareStickerTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof stickerABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: stickerABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof stickerABI, 'transferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link stickerABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function usePrepareStickerTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof stickerABI, 'transferOwnership'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: stickerABI,
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof stickerABI, 'transferOwnership'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link stickerABI}__.
 */
export function useStickerEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof stickerABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: stickerABI,
    ...config,
  } as UseContractEventConfig<typeof stickerABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link stickerABI}__ and `eventName` set to `"Approval"`.
 */
export function useStickerApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof stickerABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: stickerABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof stickerABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link stickerABI}__ and `eventName` set to `"ApprovalForAll"`.
 */
export function useStickerApprovalForAllEvent(
  config: Omit<
    UseContractEventConfig<typeof stickerABI, 'ApprovalForAll'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: stickerABI,
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof stickerABI, 'ApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link stickerABI}__ and `eventName` set to `"CrosschainTransfer"`.
 */
export function useStickerCrosschainTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof stickerABI, 'CrosschainTransfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: stickerABI,
    eventName: 'CrosschainTransfer',
    ...config,
  } as UseContractEventConfig<typeof stickerABI, 'CrosschainTransfer'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link stickerABI}__ and `eventName` set to `"Initialized"`.
 */
export function useStickerInitializedEvent(
  config: Omit<
    UseContractEventConfig<typeof stickerABI, 'Initialized'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: stickerABI,
    eventName: 'Initialized',
    ...config,
  } as UseContractEventConfig<typeof stickerABI, 'Initialized'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link stickerABI}__ and `eventName` set to `"OwnershipTransferred"`.
 */
export function useStickerOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof stickerABI, 'OwnershipTransferred'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: stickerABI,
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof stickerABI, 'OwnershipTransferred'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link stickerABI}__ and `eventName` set to `"PeerSet"`.
 */
export function useStickerPeerSetEvent(
  config: Omit<
    UseContractEventConfig<typeof stickerABI, 'PeerSet'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: stickerABI,
    eventName: 'PeerSet',
    ...config,
  } as UseContractEventConfig<typeof stickerABI, 'PeerSet'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link stickerABI}__ and `eventName` set to `"Transfer"`.
 */
export function useStickerTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof stickerABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: stickerABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof stickerABI, 'Transfer'>)
}
