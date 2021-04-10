import React from 'react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

type Props = Record<string, unknown>

class MyDocument extends NextDocument<Props> {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="description"
            content="Weather service is a real-time forecast app."
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
