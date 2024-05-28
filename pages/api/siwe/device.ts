export const runtime = 'edge'
import { unsealData } from 'iron-session/edge';
import { NextRequest, NextResponse } from 'next/server';
import { ironOptions } from 'utils/iron';
import { getRequestContext } from '@cloudflare/next-on-pages'

const handler = async (req: NextRequest) => {
  const { method } = req;
  const url = new URL(req.url);
  const device_id = url.searchParams.get('id');

  if (method == 'GET') {
    if (!device_id) {
      return NextResponse.json({ message: `Wrong Device ID` }, { status: 502 });
    }
    const siwe = req.cookies.get('siwe')?.value
    const { address }  = await unsealData(siwe || '', ironOptions)
    if (!address) {
      return NextResponse.json({ message: `Wrong Auth` }, { status: 502 });
    }
    const myKv = getRequestContext().env.MY_KV

    // get a value from the namespace
    await myKv.put(device_id, address as string);
    //return new Response(`The value of kvTest in MY_KV is: ${kvValue}`)

    return NextResponse.json({ address, device_id })
  }
  
  if (method == 'POST') {
    if (!device_id) {
      return NextResponse.json({ message: `Wrong Device ID` }, { status: 502 });
    }
    const myKv = getRequestContext().env.MY_KV

    // get a value from the namespace
    const address  = await myKv.get(device_id);
    //return new Response(`The value of kvTest in MY_KV is: ${kvValue}`)

    if (address) {
      return NextResponse.json({ result: true, address, device_id })
    }

    return NextResponse.json({ result: false })
  };

  return NextResponse.json({
    message: `Method ${method} Not Allowed`,
  }, {
    status: 405
  });
};

export default handler;