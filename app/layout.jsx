import '@styles/global.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';

export const metadata = {
    title: 'Promptopia',
    description: 'Discover and share AI promts'
}

const ROOTLAYOUT = ({children}) => {
  return (
    <>

        <html lang='en'>
        <head>
            <link
                rel="icon"
                href="/assets/images/logo.svg"
            />
        </head>
        <body>
            <Provider>
                <div className="main">
                    <div className="gradient" />
                </div>

                <main className="app">
                    <Nav />
                    {children}
                </main>
            </Provider>
        </body>
        </html>
    </>

  )
}

export default ROOTLAYOUT