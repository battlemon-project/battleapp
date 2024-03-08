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
    process.env.NEXT_PUBLIC_CONTRACT_POLYGON_LEMONS!,
    process.env.NEXT_PUBLIC_CONTRACT_LINEA_LEMONS!
  ]
  const siwe = req.cookies.get('siwe')?.value
  const { address }  = await unsealData(siwe || '', ironOptions)

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
          contract: {equalTo: "${contract}"},
          chainId: { equalTo: "${chainId}" }
          or: [
            { ownerId: { equalTo: "${address}" }}
            { dungeonSenderId: {equalTo: "${address}"}}
          ]
        }) {
          nodes {
            tokenId
            dungeonSenderId
            tokenUri
            contract
            chainId
            owner {
              id
            }
          }
        }
      }
    `

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
      const ownedNfts = result.data.nfts.nodes.map(({ tokenId, tokenUri, dungeonSenderId }: { tokenId: number, tokenUri: string, dungeonSenderId?: string }) => {
        return { tokenId, tokenUri, dungeonSenderId }
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