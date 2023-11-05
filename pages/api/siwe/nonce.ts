export const runtime = 'edge'
import { getIronSession } from 'iron-session/edge';
import { NextRequest, NextResponse } from 'next/server';
import { generateNonce } from 'siwe';
import { ironOptions } from 'utils/iron';

const handler = async (req: NextRequest) => {
  const { method } = req;

  if (method == 'GET') {
    const nonce = generateNonce();
    const res = new NextResponse(nonce);
    const session = await getIronSession(req, res, ironOptions);
    session.nonce = nonce;
    await session.save();
    return res;
  }
  
  return NextResponse.json({
    message: `Method ${method} Not Allowed`,
  }, {
    status: 405
  });
};

export default handler;
