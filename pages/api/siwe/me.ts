export const runtime = 'edge'
import { getIronSession } from 'iron-session/edge';
import { NextRequest, NextResponse } from 'next/server';
import { ironOptions } from 'utils/iron';

const handler = async (req: NextRequest, res: NextResponse) => {
  const { method } = req;

  if (method == 'GET') {
    const session = await getIronSession(req, res, ironOptions);
    return NextResponse.json({ address: session.siwe?.address })
  }
  
  return NextResponse.json({
    message: `Method ${method} Not Allowed`,
  }, {
    status: 405
  });
};

export default handler;
