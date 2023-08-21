
import {  screen,getByRole, getByText,waitFor, act } from "@testing-library/react"
import userEvent from '@testing-library/user-event';
import {render} from "../../app/test-utils"
import user from '@testing-library/user-event'

import SignUpPage from "@/app/signup/page.jsx";

describe('resgister a user tests',()=>{
    describe('rendering tests',()=>{
        xit('should enter correct info',async ()=>{
            // const loginLinkPre = screen.queryByText(/login/i)
            // expect(loginLinkPre).not.toBeInTheDocument()
            let component = null
            await act(async()=>{
                component = render(<SignUpPage/>)
                              
            })
            const LoginLink = component.getByText(/login/i)
            expect(LoginLink).toBeInTheDocument()
            userEvent.setup()
            const emailInput = screen.getByRole('textbox', {
                name: /email/i
              })
            expect(emailInput).toHaveValue("")
            await userEvent.type(emailInput,"abc@gmail.com")
        
            expect(emailInput).toHaveValue("abc@gmail.com")
            expect(emailInput).toBeInTheDocument()
           
          
            
        })
    })
})

describe("reset password",()=>{
    describe('rendering',()=>{
        it("should have a reset password button",async()=>{
            let component = null
            await act(async()=>{
                component = render(<SignUpPage/>)
            })
            let resetButton = screen.getByRole('button', {
                name: /reset password/i
              })
            expect(resetButton).toBeInTheDocument()
            
        })
    })
    describe('bahaviour',()=>{
        it('should display the portal on clicking the button',async()=>{
            let component = null
            await act(async()=>{
                component = render(<SignUpPage/>)
            })
            let resetButton = screen.getByRole('button', {
                name: /reset password/i
              })
            expect(resetButton).toBeInTheDocument()
            user.setup()
            let backButtonBefore = screen.queryByRole('button', {
                name: /back/i
              })
            expect(backButtonBefore).not.toBeInTheDocument()
            await user.click(resetButton)
            let backButtonAfter = screen.queryByRole('button', {
                name: /back/i
              })
            expect(backButtonAfter).toBeInTheDocument()
            await user.click(backButtonAfter)
            expect(backButtonAfter).not.toBeInTheDocument()
        })
    })
    
})