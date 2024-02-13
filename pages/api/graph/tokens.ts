export const runtime = 'edge'
import { NftMetaData } from 'lemon';
import { NextRequest, NextResponse } from 'next/server';

export default async function handler (req: NextRequest) {
  const { method, nextUrl } = req;
  const address = nextUrl.searchParams.get("address");

  if (method == 'GET') {
    if (!address) {
      return NextResponse.json({
        message: `Request without address`
      }, {
        status: 500
      })
    }

    const response = await fetch(process.env.THEGRAPH!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query GetNfts {
            nfts(first: 10, filter: {
              contract: {equalTo: "${process.env.NEXT_PUBLIC_CONTRACT_GEMS}"},
              owner: {id: {equalTo: "${address}"}}
            }) {
              nodes {
                id
                contract
                network
                owner {
                  id
                }
              }
            }
          }
          `,
      }),
    });
    const result = await response.json();
    if (!result?.data?.nfts?.nodes) {
      return NextResponse.json({
        error: `Return undefined data`,
      }, {
        status: 500
      })
    }

    const tokens = result?.data?.nfts?.nodes.map((token: any) => {
      return token;
    })

    return NextResponse.json(tokens as NftMetaData[])
  }
  
  return NextResponse.json({
    error: `Method ${method} Not Allowed`
  }, {
    status: 405
  });
};