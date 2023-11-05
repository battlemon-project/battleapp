export const runtime = 'edge'
import { getIronSession } from 'iron-session/edge';
import { NextRequest, NextResponse } from 'next/server';
import { ironOptions } from 'utils/iron';

const handler = async (req: NextRequest) => {
  const { method } = req;

  if (method == 'POST') {
    const res = NextResponse.json({ ok: true });
    const session = await getIronSession(req, res, ironOptions);
    session.destroy();
    return res;
  }
  
  return NextResponse.json({
    message: `Method ${method} Not Allowed`,
  }, {
    status: 405
  });
};

export default handler;