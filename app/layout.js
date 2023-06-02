import ProviderForTheme from "@/components/theme/themeProvider"
import "../styles/globals.css"
import "../styles/home.css"
import "../styles/auth.css"
import "../styles/misc.css"
import "../styles/footer.css"
import "../styles/header.css"
import "../styles/data.css"
import "../styles/animation.css"
import { Inter } from 'next/font/google'
import IsAUserLoggedInProvider from "@/contexts/authContext"
import Header from "@/components/header/header"
import Footer from "@/components/footer/footer"
import BookProvider from "@/contexts/books"
import DataProvider from "@/contexts/dataContext"
import ReactThemeProvider, { ReactThemeContext } from "@/components/theme/themeReact/reactThemeProvider"
import { useContext } from "react"
import ThemeLayout from "@/components/theme/themeReact/themelayout"
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'HayyimWord',
  description: 'A bible read and study web app.',
}

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactThemeProvider>

       
       
      <ProviderForTheme>
        <IsAUserLoggedInProvider>
          <DataProvider>
          <BookProvider>

           
           <ThemeLayout>
              <Header/>
            {children}
              <Footer/>
           </ThemeLayout>

          
          </BookProvider>
          </DataProvider>
        </IsAUserLoggedInProvider>
      </ProviderForTheme>
      
        
        </ReactThemeProvider>
        </body>
    </html>
  )
}
