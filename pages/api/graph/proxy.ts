export const runtime = 'edge'
import type { ProviderData } from 'utils/fetcher';
import { NextRequest, NextResponse } from 'next/server';
import { dnaToItem, dnaToLemonProperties } from 'utils/properties';

interface Hex {
  _hex: string,
  _isBigNumber: true
}

interface LemonsSubqueryData {
  id: string
  params: {
    dna: string
    lemonType: number
    tokenId: Hex | number
    level: Hex | number
    agility: Hex | number 
    speed: Hex | number
    luck: Hex | number
    itemsMetadata?: [
      isActive: boolean,
      itemType: number,
      level: Hex | number,
      agility: Hex | number,
      speed: Hex | number,
      luck: Hex | number,
      owner: string,
      dna: string
    ][]
  }
}


interface ResultLemons {
  id: string
  traits: {
    [key: string]: string | undefined
  }
  items: {
    [key: string]: string | undefined
  }
}

export default async function handler (req: NextRequest) {
  const { method, nextUrl } = req;
  const address = nextUrl.searchParams.get("address");

  const query = `
    query GetNfts {
      nfts(filter: {
        nftType:{equalTo:"battlemon"}
        ownerId:{equalTo:"${address?.toLowerCase()}"}
      }) {
        nodes {
          id
          params
        }
      }
    }
  `
  try {
    const response = await fetch(process.env.PROXIEDGRAPH!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    if (response.status !== 200) {
      return NextResponse.json({ error: await response.text() })
    }
    
    const result = await response.json();
    
    if (!result?.data?.nfts?.nodes) {
      return NextResponse.json({
        error: `Return undefined data`,
      }, {
        status: 500
      })
    }
    //console.log(result.data.nfts.nodes)
    const ownedNfts: ResultLemons[] = []
    result.data.nfts.nodes.forEach(({ id, params }: LemonsSubqueryData) => {
      //if (!params.dna) return;
      const { traits } = dnaToLemonProperties(params.dna)
      const items: { [key: string]: string } = {}
      params.itemsMetadata?.forEach(([,,,,,,,dna]) => {
        if (!dna || dna.length < 5) return
        console.log(dna)
        const { type, itemName } = dnaToItem(dna)
        items[type] = itemName;
      })
      ownedNfts.push({
        id,
        traits,
        items
      })
    })
    
    const data = {
      ownedNfts
    }

    // const data = {"ownedNfts":[{"id":"117_0x9789758018895f8C4aBB142C3536BdDF87e6CF93_59144","traits":{"head":"Head_Charcoal","eyes":"Eyes_Matrix","exo_top":"ExoTop_15","hands":"Hands_21","exo_bot":"ExoBot_01","feet":"Feet_Steel","hair":"Hair_Sakayaki_Gray","teeth":"Teeth_MinusOne","scar":"Scar_Tatoo_01"},"items":{"mask":"Mask_Wrestler_Orange", "fire_arms": "FireArms_Sniper_Rifle", "cold_arms": "ColdArms_Katana", "shoes": "Shoes_Kicks_Red"}},{"id":"118_0x817A3a2E679ABe9ac5C5065E5e5Ca5b699BAa60b_137","traits":{"head":"Head_Disco","eyes":"Eyes_Lila","exo_top":"ExoTop_20","hands":"Hands_21","exo_bot":"ExoBot_25","feet":"Feet_04","hair":"Hair_Dragon_Short_Orange","teeth":"Teeth_Vampire","scar":"Scar_Tatoo_01"},"items":{}},{"id":"119_0x9789758018895f8C4aBB142C3536BdDF87e6CF93_59144","traits":{"head":"Head_Clementine","eyes":"Eyes_BTC","exo_top":"ExoTop_17","hands":"Hands_Yellow_Plastic","exo_bot":"ExoBot_Steel","feet":"Feet_Snowwhite","hair":"Hair_Curly_Gray","teeth":"Teeth_MinusOne","scar":"Scar_Tatoo_04"},"items":{"fire_arms": "FireArms_Assault_Rifle_A", "glasses": "Glasses_Dev_Dream", "cap": "Cap_Baseball_Cap_Red", "platform": "Pod_SkateBoard_B"}}]}

    return NextResponse.json(data)
  } catch(e) {
    const message = e instanceof Error ? e.message + e.stack : String(e);
    return NextResponse.json({
      error: message
    })
  }

};