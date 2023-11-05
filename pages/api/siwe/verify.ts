export const runtime = 'edge'
import { getIronSession } from 'iron-session/edge';
import { NextResponse, NextRequest } from "next/server";
import { SiweMessage } from 'siwe';
import { ironOptions } from 'utils/iron';

const handler = async (req: NextRequest) => {
  const { method } = req;

  if (method == 'POST') {
    try {
      const res = NextResponse.json({ ok: true });
      const session = await getIronSession(req, res, ironOptions);
      const { message, signature } = await req.json();
      const siweMessage = new SiweMessage(message);
      const { success, error, data } = await siweMessage.verify({
        signature,
      });

      if (!success) throw error;
      
      if (data.nonce !== session.nonce)
        return NextResponse.json({
          message: 'Invalid nonce',
        }, { 
          status: 422 
        });

      session.siwe = data;
      await session.save();

      return res;
    } catch (_error) {
      return NextResponse.json({ ok: false })
    }
  }

  return NextResponse.json({
    message: `Method ${method} Not Allowed`,
  }, {
    status: 405
  });
};

export default handler;
