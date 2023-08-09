
import { screen,render, getByRole, getByText,waitFor, act } from "@testing-library/react"
import userEvent from '@testing-library/user-event';
import ReactThemeProvider from "@/components/theme/themeReact/reactThemeProvider"
import IsAUserLoggedInProvider from "@/contexts/authContext"
import FireBooksProvider from "@/contexts/fireBooks"
import NotificationProvider from "@/contexts/notificationContext"
import DataProvider from "@/contexts/dataContext"
import BookProvider from "@/contexts/books"
import ThemeLayout from "@/components/theme/themeReact/themelayout"
import Header from "@/components/header/header"
import Footer from "@/components/footer/footer"
import LoginPage from "@/app/login/page";
import RootLayout from "@/app/layout";
import SignUpPage from "@/app/signup/page";
describe('resgister a user tests',()=>{
    describe('rendering tests',()=>{
        it('should enter correct info',async ()=>{
            
            let component = null
            await act(async()=>{
                component = render( 
                  
                    <ReactThemeProvider>  
                    <IsAUserLoggedInProvider>
                      <FireBooksProvider>
                     <NotificationProvider>        
                      <DataProvider>
                      <BookProvider> 
                       <ThemeLayout>
                          {/* <Header/> */}
                        
                              <SignUpPage/>
                    
                          <Footer/>
                       </ThemeLayout>
                      </BookProvider>
                      </DataProvider>
                      </NotificationProvider>
                      </FireBooksProvider>
                    </IsAUserLoggedInProvider>
                    </ReactThemeProvider>
                             
                    
                         
                    )
            })
            const LoginLink = component.getByText(/login/i)
            expect(LoginLink).toBeInTheDocument()
        //    await userEvent.type(screen.getByLabelText(/email/i),"abc@gmail.com")
        //    expect(screen.getByText(/abc/i)).toBeInTheDocument()
           
          
            
        })
    })
})