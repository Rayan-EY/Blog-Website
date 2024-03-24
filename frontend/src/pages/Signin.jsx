import {AuthSignin } from "../components/Auth"
import { Quote } from "../components/Quote"

export const Signin=()=>{
    return (
        <div className="grid grid-cols-2">
            <div>
                <AuthSignin />
            </div>
            <div className="invisible lg:visible">
                <Quote />
                </div>
        
        </div>
    )
}