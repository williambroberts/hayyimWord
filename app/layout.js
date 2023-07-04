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
import ReactThemeProvider from "@/components/theme/themeReact/reactThemeProvider"

import ThemeLayout from "@/components/theme/themeReact/themelayout"
import FireBooksProvider from "@/contexts/fireBooks"
const inter = Inter({ subsets: ['latin'] })
import CloudsImg from "../public/images/clouds.jpg"
import Image from "next/image"
export const metadata = {
  title: 'HayyimWord',
  description: 'A bible read and study web app.',
}

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body className={`${inter.className} body-blur`}>
        <Image src={CloudsImg} className="body-img" alt={"/"} priority/>
        <ReactThemeProvider>

       
       
      <ProviderForTheme>
        <IsAUserLoggedInProvider>
          <FireBooksProvider>

         
          <DataProvider>
          <BookProvider>

           
           <ThemeLayout>
              <Header/>
            {children} 
            <div id="portal" className="portal"></div>
              <Footer/>
             
           </ThemeLayout>

          
          </BookProvider>
          </DataProvider>
          
          </FireBooksProvider>
        </IsAUserLoggedInProvider>
      </ProviderForTheme>
      
        
        </ReactThemeProvider>
        </body>
    </html>
  )
}
