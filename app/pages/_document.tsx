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
          <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBcoj9Zb5Tmvsc1NSqELAMTfADhOOxXplM&libraries=places"></script>
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
