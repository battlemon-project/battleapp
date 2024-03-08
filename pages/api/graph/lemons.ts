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
        users(filter: {
          id: {equalTo: "${address}"}
          nfts: {
            every: {
              chainId: { equalTo: "${chainId}" }
              contract: { equalTo: "${contract}" }
            }
          }
        }) {
          nodes {
            id
            nfts {
              nodes {
                id
                tokenId
                contract
                chainId
                tokenUri
              }
            }
            inDungeon {
              nodes {
                id
                tokenId
                contract
                chainId
                tokenUri
              }
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
      if (!result?.data?.users?.nodes) {
        return NextResponse.json({
          error: `Return undefined data`,
        }, {
          status: 500
        })
      }
      console.log(query)
      console.log(result.data.users.nodes)
      const ownedNfts = result.data.users.nodes[0]?.nfts?.nodes?.map(({ tokenId, tokenUri }: { tokenId: number, tokenUri: string }) => {
        return { tokenId, tokenUri }
      }) || []
      const dungeonNfts = result.data.users.nodes[0]?.inDungeon?.nodes?.map(({ tokenId, tokenUri }: { tokenId: number, tokenUri: string }) => {
        return { tokenId, tokenUri, inDungeon: true }
      }) || []
      
      const data: ProviderData = {
        ownedNfts: [
          ...ownedNfts,
          ...dungeonNfts
        ],
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