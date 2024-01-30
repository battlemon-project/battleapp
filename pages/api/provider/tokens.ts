export const runtime = 'edge'
import type { ProviderData } from 'utils/fetcher';
import { unsealData } from 'iron-session/edge';
import { NextRequest, NextResponse } from 'next/server';
import { ironOptions } from 'utils/iron';

export default async function handler (req: NextRequest) {
  const { method, nextUrl } = req;
  const contract = nextUrl.searchParams.get("contract");
  const pageSize = nextUrl.searchParams.get("pageSize");
  const pageKey = nextUrl.searchParams.get("pageKey");
  const withMetadata = nextUrl.searchParams.get("withMetadata") || 'false';
  const contracts: string[] = [
    process.env.NEXT_PUBLIC_CONTRACT_ITEMS!,
    process.env.NEXT_PUBLIC_CONTRACT_LEMONS!,
    process.env.NEXT_PUBLIC_CONTRACT_PICKAXES!,
    process.env.NEXT_PUBLIC_CONTRACT_GEMS!,
    process.env.NEXT_PUBLIC_CONTRACT_POINTS!,
    process.env.NEXT_PUBLIC_CONTRACT_STICKERS!
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

    const options = {method: 'GET', headers: {accept: 'application/json'}};
    let url = `${process.env.PROVIDER_URL}/getNFTsForOwner?owner=${address}&contractAddresses[]=${contract}&withMetadata=${withMetadata}&pageSize=${pageSize}`;
    if (pageKey?.length) {
      url += '&pageKey=' + pageKey
    }

    try {
      const response = await fetch(url, options)
      if (response.status !== 200) {
        return NextResponse.json({ error: await response.text() })
      }
      
      const result: ProviderData = await response.json();
      
      if (!result?.ownedNfts) {
        return NextResponse.json({
          error: `Return undefined data`,
        }, {
          status: 500
        })
      }
  
      result.ownedNfts = result.ownedNfts.map(({ tokenId, tokenUri }) => {
        return { tokenId: Number(tokenId), tokenUri }
      })
      
      return NextResponse.json(result)
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