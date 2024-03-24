import { useState } from "react"
import { Link } from "react-router-dom"

export const AuthSignup=()=>{
    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    const [username,setUsername]=useState("")

    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
            <div>
            <div className="text-3xl font-bold">
                Create an Account
            </div>
            <div className="text-slate-400">
                Already have an Account?  
                <Link className="pl-2 underline"to={"/signin"}>Login</Link>
            </div>
        </div>
        <br></br>
        <div>
        <InputBox label="Name" placeholder="Enter the name" onChange={(e)=>{
            setName(e.target.value)
            console.log(name);
        }}></InputBox>
        <br></br>
        <InputBox label="Username" placeholder="Enter the username" onChange={(e)=>{
            setUsername(e.target.value)
            console.log(username);
        }}></InputBox>
        <br></br>
        <InputBox label="Password" placeholder="Enter the password" onChange={(e)=>{
            setPassword(e.target.value)
            console.log(password);
        }}></InputBox>
        </div>
        <br></br>
        <Button label="Signup" onClick={HandleSignup}></Button>
        </div>
        </div>
        </div>
}

export const AuthSignin=()=>{
   
    const [password,setPassword]=useState("");
    const [username,setUsername]=useState("")

    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
            <div>
            <div className="text-3xl font-bold">
                Welcome Back!
            </div>
            <div className="text-slate-400">
                Dont have an account?  
                <Link className="pl-2 underline"to={"/signup"}>Signup</Link>
            </div>
        </div>
        <br></br>
        <div>
        
        <br></br>
        <InputBox label="Username" placeholder="Enter the username" onChange={(e)=>{
            setUsername(e.target.value)
            console.log(username);
        }}></InputBox>
        <br></br>
        <InputBox label="Password" placeholder="Enter the password" onChange={(e)=>{
            setPassword(e.target.value)
            console.log(password);
        }}></InputBox>
        </div>
        <br></br>
        <Button label="Signin" onClick={HandleSignin}></Button>
        </div>
        </div>
        </div>
}


function InputBox({label, placeholder, onChange}){
    return <div>
        
            <label class="block mb-2 text-sm font-medium ">{label}</label>
            <input onChange={onChange} type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />

    </div>

}

function Button({label, onClick}){
    return <div>
        <button type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 w-full py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={onClick}>{label}</button>

    </div>
}

function HandleSignup(){
    

}

function HandleSignin(){

}
