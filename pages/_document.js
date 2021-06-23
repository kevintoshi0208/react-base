import React from 'react'
import Document, {Html, Head, Main, NextScript} from 'next/document'

class MyDocument extends Document {

    render() {
        return (
            <Html lang="中文">
                <Head>
                    <meta charSet="utf-8"/>
                    <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
                    />

                    <link
                        rel="shortcut icon"
                    />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
                    />
                    <link
                        rel="stylesheet"
                        href="https://cdnjs.cloudflare.com/ajax/libs/dropzone/5.5.1/min/dropzone.min.css"
                    />
                    <link
                        rel="stylesheet"
                        type="text/css"
                        href="/css/fontawesome.css"
                    />
                    <title>Next js</title>
                    <style jsx global>
                        {`
                            html,
                            body {
                                height: 100%;
                                width: 100%;
                            }
                            *,
                            *:after,
                            *:before {
                                box-sizing: border-box;
                            }
                            body {
                                font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
                                font-size: 1rem;
                                margin: 0;
                            }
                        `}
                    </style>
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }

}

MyDocument.getInitialProps = async ctx => {
    const originalRenderPage = ctx.renderPage
    ctx.renderPage = () =>
        originalRenderPage({
            // useful for wrapping the whole react tree
            enhanceApp: (App) => App,
            // useful for wrapping in a per-page basis
            enhanceComponent: (Component) => Component,
        })

    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
}

export default MyDocument