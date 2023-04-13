import { Html, Head, Main, NextScript } from 'next/document'
export default function Document () {
  return (<Html>
        <Head>
            <meta name="Twitter Dev" content="Clon Twitter"/>
            <link rel="icon" href="/twitter-logo-6.png"/>
            <title>TwitterDev</title>
        </Head>
        <body className="font-fontConfort overflow-hidden">
            <Main />
            <NextScript/>
        </body>
    </Html>
  )
}
