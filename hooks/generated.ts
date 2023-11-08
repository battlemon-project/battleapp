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
// Gem
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const gemABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: 'pricePerMerge_', internalType: 'uint256', type: 'uint256' },
      {
        name: 'referralContractAddress_',
        internalType: 'address',
        type: 'address',
      },
      {
        name: 'referralPricePerMerge_',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: 'referralReward_', internalType: 'uint256', type: 'uint256' },
      { name: 'prizePoolReward_', internalType: 'uint256', type: 'uint256' },
      { name: 'withdrawalDelay_', internalType: 'uint256', type: 'uint256' },
      { name: 'treasuryAddress_', internalType: 'address', type: 'address' },
      { name: 'gemAddress', internalType: 'address', type: 'address' },
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
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'addSenderToWhitelist',
    outputs: [],
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
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'breakDown',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'completeEvent',
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
    inputs: [{ name: 'from', internalType: 'address', type: 'address' }],
    name: 'getNonce',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
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
      { name: 'firstTokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'secondTokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'merge',
    outputs: [],
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
    inputs: [
      {
        name: 'req',
        internalType: 'struct Gem.MintRequest',
        type: 'tuple',
        components: [
          { name: 'sender', internalType: 'address', type: 'address' },
          { name: 'proxy', internalType: 'address', type: 'address' },
          { name: 'level', internalType: 'uint8', type: 'uint8' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'proxyMint',
    outputs: [],
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
    inputs: [
      {
        name: 'req',
        internalType: 'struct Gem.MintRequest',
        type: 'tuple',
        components: [
          { name: 'sender', internalType: 'address', type: 'address' },
          { name: 'proxy', internalType: 'address', type: 'address' },
          { name: 'level', internalType: 'uint8', type: 'uint8' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'verify',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Item
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const itemABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: 'maxTypeIds', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'typeNames', internalType: 'string[]', type: 'string[]' },
      { name: 'name_', internalType: 'string', type: 'string' },
      { name: 'symbol_', internalType: 'string', type: 'string' },
    ],
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
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'typeName',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'itemId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
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
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'ids',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
      {
        name: 'values',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'TransferBatch',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TransferSingle',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'value', internalType: 'string', type: 'string', indexed: false },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'URI',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'accounts', internalType: 'address[]', type: 'address[]' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'balanceOfBatch',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
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
    inputs: [
      { name: '_itemType', internalType: 'uint256', type: 'uint256' },
      { name: '_itemId', internalType: 'uint256', type: 'uint256' },
      { name: 'sender', internalType: 'address', type: 'address' },
    ],
    name: 'equipItem',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'itemsInType',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'lemonsAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
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
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeBatchTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
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
    inputs: [
      { name: 'lemonsAddress_', internalType: 'address', type: 'address' },
    ],
    name: 'setLemonAddress',
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
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newuri', internalType: 'string', type: 'string' }],
    name: 'setURI',
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
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'typeToName',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_itemType', internalType: 'uint256', type: 'uint256' },
      { name: '_itemId', internalType: 'uint256', type: 'uint256' },
      { name: 'sender', internalType: 'address', type: 'address' },
    ],
    name: 'unequipItem',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'id_', internalType: 'uint256', type: 'uint256' }],
    name: 'uri',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Lemon
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const lemonABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: 'itemsContract_', internalType: 'address', type: 'address' },
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
      { name: '_lemonId', internalType: 'uint256', type: 'uint256' },
      { name: 'itemIds', internalType: 'int256[]', type: 'int256[]' },
    ],
    name: 'changeEquipmentBatch',
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
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getAllEquipment',
    outputs: [{ name: '', internalType: 'int256[9]', type: 'int256[9]' }],
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
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
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
    inputs: [{ name: 'to', internalType: 'address', type: 'address' }],
    name: 'safeMint',
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
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"getNonce"`.
 */
export function useGemGetNonce<
  TFunctionName extends 'getNonce',
  TSelectData = ReadContractResult<typeof gemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: gemABI,
    functionName: 'getNonce',
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"verify"`.
 */
export function useGemVerify<
  TFunctionName extends 'verify',
  TSelectData = ReadContractResult<typeof gemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof gemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: gemABI,
    functionName: 'verify',
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
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"breakDown"`.
 */
export function useGemBreakDown<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof gemABI,
          'breakDown'
        >['request']['abi'],
        'breakDown',
        TMode
      > & { functionName?: 'breakDown' }
    : UseContractWriteConfig<typeof gemABI, 'breakDown', TMode> & {
        abi?: never
        functionName?: 'breakDown'
      } = {} as any,
) {
  return useContractWrite<typeof gemABI, 'breakDown', TMode>({
    abi: gemABI,
    functionName: 'breakDown',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"completeEvent"`.
 */
export function useGemCompleteEvent<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof gemABI,
          'completeEvent'
        >['request']['abi'],
        'completeEvent',
        TMode
      > & { functionName?: 'completeEvent' }
    : UseContractWriteConfig<typeof gemABI, 'completeEvent', TMode> & {
        abi?: never
        functionName?: 'completeEvent'
      } = {} as any,
) {
  return useContractWrite<typeof gemABI, 'completeEvent', TMode>({
    abi: gemABI,
    functionName: 'completeEvent',
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
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"proxyMint"`.
 */
export function useGemProxyMint<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof gemABI,
          'proxyMint'
        >['request']['abi'],
        'proxyMint',
        TMode
      > & { functionName?: 'proxyMint' }
    : UseContractWriteConfig<typeof gemABI, 'proxyMint', TMode> & {
        abi?: never
        functionName?: 'proxyMint'
      } = {} as any,
) {
  return useContractWrite<typeof gemABI, 'proxyMint', TMode>({
    abi: gemABI,
    functionName: 'proxyMint',
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"breakDown"`.
 */
export function usePrepareGemBreakDown(
  config: Omit<
    UsePrepareContractWriteConfig<typeof gemABI, 'breakDown'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: gemABI,
    functionName: 'breakDown',
    ...config,
  } as UsePrepareContractWriteConfig<typeof gemABI, 'breakDown'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"completeEvent"`.
 */
export function usePrepareGemCompleteEvent(
  config: Omit<
    UsePrepareContractWriteConfig<typeof gemABI, 'completeEvent'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: gemABI,
    functionName: 'completeEvent',
    ...config,
  } as UsePrepareContractWriteConfig<typeof gemABI, 'completeEvent'>)
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link gemABI}__ and `functionName` set to `"proxyMint"`.
 */
export function usePrepareGemProxyMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof gemABI, 'proxyMint'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: gemABI,
    functionName: 'proxyMint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof gemABI, 'proxyMint'>)
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"balanceOfBatch"`.
 */
export function useItemBalanceOfBatch<
  TFunctionName extends 'balanceOfBatch',
  TSelectData = ReadContractResult<typeof itemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itemABI,
    functionName: 'balanceOfBatch',
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"itemsInType"`.
 */
export function useItemItemsInType<
  TFunctionName extends 'itemsInType',
  TSelectData = ReadContractResult<typeof itemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itemABI,
    functionName: 'itemsInType',
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"typeToName"`.
 */
export function useItemTypeToName<
  TFunctionName extends 'typeToName',
  TSelectData = ReadContractResult<typeof itemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itemABI,
    functionName: 'typeToName',
    ...config,
  } as UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"uri"`.
 */
export function useItemUri<
  TFunctionName extends 'uri',
  TSelectData = ReadContractResult<typeof itemABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itemABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itemABI,
    functionName: 'uri',
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
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"safeBatchTransferFrom"`.
 */
export function useItemSafeBatchTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof itemABI,
          'safeBatchTransferFrom'
        >['request']['abi'],
        'safeBatchTransferFrom',
        TMode
      > & { functionName?: 'safeBatchTransferFrom' }
    : UseContractWriteConfig<typeof itemABI, 'safeBatchTransferFrom', TMode> & {
        abi?: never
        functionName?: 'safeBatchTransferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof itemABI, 'safeBatchTransferFrom', TMode>({
    abi: itemABI,
    functionName: 'safeBatchTransferFrom',
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
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"setURI"`.
 */
export function useItemSetUri<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof itemABI, 'setURI'>['request']['abi'],
        'setURI',
        TMode
      > & { functionName?: 'setURI' }
    : UseContractWriteConfig<typeof itemABI, 'setURI', TMode> & {
        abi?: never
        functionName?: 'setURI'
      } = {} as any,
) {
  return useContractWrite<typeof itemABI, 'setURI', TMode>({
    abi: itemABI,
    functionName: 'setURI',
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"safeBatchTransferFrom"`.
 */
export function usePrepareItemSafeBatchTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof itemABI, 'safeBatchTransferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: itemABI,
    functionName: 'safeBatchTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof itemABI, 'safeBatchTransferFrom'>)
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link itemABI}__ and `functionName` set to `"setURI"`.
 */
export function usePrepareItemSetUri(
  config: Omit<
    UsePrepareContractWriteConfig<typeof itemABI, 'setURI'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: itemABI,
    functionName: 'setURI',
    ...config,
  } as UsePrepareContractWriteConfig<typeof itemABI, 'setURI'>)
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
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link itemABI}__ and `eventName` set to `"TransferBatch"`.
 */
export function useItemTransferBatchEvent(
  config: Omit<
    UseContractEventConfig<typeof itemABI, 'TransferBatch'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: itemABI,
    eventName: 'TransferBatch',
    ...config,
  } as UseContractEventConfig<typeof itemABI, 'TransferBatch'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link itemABI}__ and `eventName` set to `"TransferSingle"`.
 */
export function useItemTransferSingleEvent(
  config: Omit<
    UseContractEventConfig<typeof itemABI, 'TransferSingle'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: itemABI,
    eventName: 'TransferSingle',
    ...config,
  } as UseContractEventConfig<typeof itemABI, 'TransferSingle'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link itemABI}__ and `eventName` set to `"URI"`.
 */
export function useItemUriEvent(
  config: Omit<
    UseContractEventConfig<typeof itemABI, 'URI'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: itemABI,
    eventName: 'URI',
    ...config,
  } as UseContractEventConfig<typeof itemABI, 'URI'>)
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
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"safeMint"`.
 */
export function useLemonSafeMint<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lemonABI,
          'safeMint'
        >['request']['abi'],
        'safeMint',
        TMode
      > & { functionName?: 'safeMint' }
    : UseContractWriteConfig<typeof lemonABI, 'safeMint', TMode> & {
        abi?: never
        functionName?: 'safeMint'
      } = {} as any,
) {
  return useContractWrite<typeof lemonABI, 'safeMint', TMode>({
    abi: lemonABI,
    functionName: 'safeMint',
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lemonABI}__ and `functionName` set to `"safeMint"`.
 */
export function usePrepareLemonSafeMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lemonABI, 'safeMint'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lemonABI,
    functionName: 'safeMint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lemonABI, 'safeMint'>)
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
