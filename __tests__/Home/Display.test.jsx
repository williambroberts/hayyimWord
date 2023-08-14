import Display from "@/components/display/display"
import {render} from "../../app/test-utils"
import {screen} from "@testing-library/react"

// our application works as expected for our users in all scenarios.
//home

describe('display',()=>{
    describe('rendering',()=>{
       xit("right turner should be there",()=>{
        render(<Display/>)
 
        const turnerRight = screen.getByText(/genesis/i)
        expect(turnerRight).toBeInTheDocument()
       })
    })
})