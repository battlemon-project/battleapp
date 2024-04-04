export const runtime = 'edge'
import type { ProviderData } from 'utils/fetcher';
import { unsealData } from 'iron-session/edge';
import { NextRequest, NextResponse } from 'next/server';
import { ironOptions } from 'utils/iron';

export default async function handler (req: NextRequest) {
  const { method, nextUrl } = req;
  const contract = nextUrl.searchParams.get("contract");
  const contracts: string[] = [
    process.env.NEXT_PUBLIC_CONTRACT_LINEA_PARK!
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


    const url =  `https://lineaapi.nftscan.com/api/v2/account/own/${address}?erc_type=erc721&show_attribute=false&contract_address=${contract}&limit=3`
    const options = {method: 'GET', headers: {'x-api-key': process.env.NEXT_PUBLIC_NFT_SCAN_API_KEY!, accept: 'application/json' }};

    try {
      const response = await fetch(url, options)
      if (response.status !== 200) {
        return NextResponse.json({ error: await response.text() })
      }
      
      const _result = await response.json();
      if (!_result?.data?.content) {
        return NextResponse.json({
          error: `Return undefined data`,
        }, {
          status: 500
        })
      }
  
      console.log(_result?.data)
      const result: ProviderData = {
        ownedNfts: _result.data.content.map((nft: { token_id: string, token_uri: string }) => {
          return { tokenId: Number(nft.token_id), tokenUri: nft.token_uri }
        }),
        pageKey: undefined, 
        totalCount: _result.data.total
      }
      
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