import React from 'react'
import {render} from '@testing-library/react'
import ReactThemeProvider from '@/components/theme/themeReact/reactThemeProvider'
import IsAUserLoggedInProvider from '@/contexts/authContext'
import FireBooksProvider from '@/contexts/fireBooks'
import NotificationProvider from '@/contexts/notificationContext'
import DataProvider from '@/contexts/dataContext'
import BookProvider from '@/contexts/books'
import ThemeLayout from '@/components/theme/themeReact/themelayout'
import Header from '@/components/header/header'
import Footer from '@/components/footer/footer'


const AllTheProviders = ({children}) => {
  return (
    <ReactThemeProvider>
        <IsAUserLoggedInProvider>
          <FireBooksProvider>
         <NotificationProvider>        
          <DataProvider>
          <BookProvider>
           <ThemeLayout>
              {/* <Header/> */}
           {children}
            <div id="portal" className="portal"></div> 
              <Footer/>   
           </ThemeLayout>
          </BookProvider>
          </DataProvider>
          </NotificationProvider>
          </FireBooksProvider>
        </IsAUserLoggedInProvider> 
        </ReactThemeProvider>
  )
}

const customRender = (ui, options) =>
  render(ui, {wrapper: AllTheProviders, ...options})

// re-export everything
export * from '@testing-library/react'

// override render method
export {customRender as render}