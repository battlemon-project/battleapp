export const runtime = 'edge'
import { TokenType } from 'lemon';
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

    const response = await fetch(process.env.THEGRAPH + '/item', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `{
            user(id: "${address.toLocaleLowerCase()}") {
              tokens {
                id
                tokenId: tokenID
              }
            }
          }`,
      }),
    });

    const result = await response.json();

    if (!result?.data?.user?.tokens) {
      return NextResponse.json({
        error: `Return undefined data`,
      }, {
        status: 500
      })
    }

    const tokens = result?.data?.user?.tokens.map((token: any) => {
      return token;
    })

    return NextResponse.json({ tokens: tokens as TokenType[] })
  }
  
  return NextResponse.json({
    error: `Method ${method} Not Allowed`
  }, {
    status: 405
  });
};