export const runtime = 'edge'
import { getIronSession, unsealData } from 'iron-session/edge';
import { NextResponse, NextRequest } from "next/server";
import { SiweMessage } from 'siwe';
import { ironOptions } from 'utils/iron';

const handler = async (req: NextRequest) => {
  const { method } = req;

  if (method == 'POST') {
    try {
      const res = NextResponse.json({ ok: true });
      const seal = req.cookies.get('siwe')?.value

      if (!seal) return NextResponse.json({
        message: `Invalid session`,
      }, { status: 422 });

      const { nonce }  = await unsealData(seal, ironOptions)
      const { message, signature } = await req.json();
      const siweMessage = new SiweMessage(message);
      const { success, error, data } = await siweMessage.verify({
        signature,
      });

      if (!success) throw error;

      if (data.nonce !== nonce) return NextResponse.json({
        message: `Invalid nonce`,
      }, { status: 422 });

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
