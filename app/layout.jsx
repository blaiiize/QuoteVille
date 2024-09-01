import '../styles/globals.css';

import Nav from '../components/Nav';
import Provider from '../components/Provider';

export const metadata = {
    title: 'QuoteVille',
    description: 'Create, Share, and Discover Quotes'
}

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
        <body>
            <Provider>
                {/* main layout with a gradient background */}
                <div className='main'>
                    <div className='gradient' />
                </div>

                {/* main application area containing the navigation and children components */}
                <main className='app'>
                    <Nav />
                    {children}
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout;