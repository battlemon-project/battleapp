import Head from "next/head";

export default function OgHead() {
  return (<Head>
    <title>Battlemon GameFi Hub</title>
    <meta
      name="description"
      content="Battlemon - To the last drop of juice"
    />
    <link rel="icon" href="/favicon.ico" />
    <meta property="og:site_name" content="Battlemon" />
    <meta property="og:title" content="Battlemon GameFi Hub" />
    <meta property="og:description" content="To the last drop of juice" />
    <meta
      property="og:image"
      content={`${process.env.NEXT_PUBLIC_BATTLEMON_URL}/images/preview.png`}
    />
    <meta
      property="og:url"
      content={`${process.env.NEXT_PUBLIC_BATTLEMON_URL}/images/preview.png`}
    />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@BATTLEM0N" />
    <meta name="twitter:creator" content="@BATTLEM0N" />
    <meta name="twitter:title" content="Battlemon GameFi Hub" />
    <meta name="twitter:description" content="To the last drop of juice" />
    <meta
      name="twitter:image"
      content={`${process.env.NEXT_PUBLIC_BATTLEMON_URL}/images/preview.png`}
    />
  </Head>)
}