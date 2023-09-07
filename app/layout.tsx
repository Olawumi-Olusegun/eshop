import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Navbar from './components/nav/Navbar'
import Footer from './components/footer/Footer'
import { CartContextProvider } from '@/hooks/useCart'
import { Toaster } from 'react-hot-toast'

const poppins = Poppins({ subsets: ['latin'], weight: ["400", "700"] })

export const metadata: Metadata = {
  title: 'Ecommerce Shop',
  description: 'Online Webshop',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} text-slate-700`}>
        <Toaster toastOptions={{ style: {
          background: "rgb(51, 65, 85)",
          color: 'white',
        } }} />
          <CartContextProvider>
            <div className='flex flex-col min-h-screen'>
                <Navbar />
                  {children}
                <Footer />
            </div>
          </CartContextProvider>
      </body>
    </html>
  )
}
