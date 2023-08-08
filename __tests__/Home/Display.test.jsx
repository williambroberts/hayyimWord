
import RootLayout from "@/app/layout"
import ReactThemeProvider from "@/components/theme/themeReact/reactThemeProvider"
import Display from "@/components/display/display"
import ProgressBible from "@/components/header/progress"
import {render,screen} from "@testing-library/react"
import IsAUserLoggedInProvider from "@/contexts/authContext"
import FireBooksProvider from "@/contexts/fireBooks"
import NotificationProvider from "@/contexts/notificationContext"
import DataProvider from "@/contexts/dataContext"
import BookProvider from "@/contexts/books"
import ThemeLayout from "@/components/theme/themeReact/themelayout"
import Header from "@/components/header/header"
import Footer from "@/components/footer/footer"
// our application works as expected for our users in all scenarios.
//home

describe('display',()=>{
    describe('rendering',()=>{
       it("right turner should be there",()=>{
        render(
       
             <ReactThemeProvider>  
<IsAUserLoggedInProvider>
  <FireBooksProvider>
 <NotificationProvider>        
  <DataProvider>
  <BookProvider> 
   <ThemeLayout>
      <Header/>
    
          <Display/>

      <Footer/>
   </ThemeLayout>
  </BookProvider>
  </DataProvider>
  </NotificationProvider>
  </FireBooksProvider>
</IsAUserLoggedInProvider>
</ReactThemeProvider>
       
        )
        const turnerRight = screen.getByText(/genesis/i)
        expect(turnerRight).toBeInTheDocument()
       })
    })
})