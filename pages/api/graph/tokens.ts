export const runtime = 'edge'
import type { ProviderData } from 'utils/fetcher';
import { unsealData } from 'iron-session/edge';
import { NextRequest, NextResponse } from 'next/server';
import { ironOptions } from 'utils/iron';

export default async function handler (req: NextRequest) {
  const { method, nextUrl } = req;
  const contract = nextUrl.searchParams.get("contract");
  const chainId = nextUrl.searchParams.get("chainId");
  const pageSize = nextUrl.searchParams.get("pageSize");
  const pageKey = nextUrl.searchParams.get("pageKey");
  const contracts: string[] = [
    process.env.NEXT_PUBLIC_CONTRACT_POLYGON_GEMS!,
    process.env.NEXT_PUBLIC_CONTRACT_POLYGON_STICKERS!,
    process.env.NEXT_PUBLIC_CONTRACT_POLYGON_ITEMS!,
    process.env.NEXT_PUBLIC_CONTRACT_POLYGON_LEMONS!,
    process.env.NEXT_PUBLIC_CONTRACT_POLYGON_POINTS!,
    process.env.NEXT_PUBLIC_CONTRACT_POLYGON_PICKAXES!,
    process.env.NEXT_PUBLIC_CONTRACT_POLYGON_REFERRAL!,
    process.env.NEXT_PUBLIC_CONTRACT_POLYGON_RAIDS!,
    process.env.NEXT_PUBLIC_CONTRACT_POLYGON_PARK!,
    process.env.NEXT_PUBLIC_CONTRACT_POLYGON_KEY!,
    process.env.NEXT_PUBLIC_CONTRACT_LINEA_GEMS!,
    process.env.NEXT_PUBLIC_CONTRACT_LINEA_STICKERS!,
    process.env.NEXT_PUBLIC_CONTRACT_LINEA_ITEMS!,
    process.env.NEXT_PUBLIC_CONTRACT_LINEA_LEMONS!,
    process.env.NEXT_PUBLIC_CONTRACT_LINEA_POINTS!,
    process.env.NEXT_PUBLIC_CONTRACT_LINEA_PICKAXES!,
    process.env.NEXT_PUBLIC_CONTRACT_LINEA_REFERRAL!,
    process.env.NEXT_PUBLIC_CONTRACT_LINEA_RAIDS!,
    process.env.NEXT_PUBLIC_CONTRACT_LINEA_PARK!,
    process.env.NEXT_PUBLIC_CONTRACT_LINEA_KEY!,
  ]
  const siwe = req.cookies.get('siwe')?.value
  const { address }: { address: string }  = await unsealData(siwe || '', ironOptions) 

  if (method == 'GET') {
    if (!contract || !contracts.includes(contract)) {
      return NextResponse.json({
        message: `Request with wrong contract`
      }, {
        status: 500
      })
    }

    const query = `
      query GetNfts {
        nfts(filter: {
          chainId: {equalTo: "${chainId}"}
          contract: {equalTo: "${contract.toLocaleLowerCase()}"},
          owner: {id: {equalTo: "${address.toLocaleLowerCase()}"}}
        }) {
          nodes {
            tokenId
            tokenUri
            contract
            chainId
            owner {
              id
            }
          }
        }
      }
    `;

    try {
      const response = await fetch(process.env.THEGRAPH!, {
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
      console.log(query)
      console.log(result.data.nfts.nodes)
      const ownedNfts = result.data.nfts.nodes.map(({ tokenId, tokenUri }: { tokenId: number, tokenUri: string }) => {
        return { tokenId, tokenUri }
      })
      
      const data: ProviderData = {
        ownedNfts,
        pageKey: undefined,
        totalCount: ownedNfts.length
      }

      return NextResponse.json(data)
    } catch(e) {
      const message = e instanceof Error ? e.message + e.stack : String(e);
      return NextResponse.json({
        error: message
      })
    }
  }
  
  return NextResponse.json({
    error: `Method ${method} Not Allowed`
  }, {
    status: 405
  });
};