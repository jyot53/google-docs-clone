import Button from "@material-tailwind/react/Button";
import {signIn} from 'next-auth/client'
import Image from 'next/image'
const Login = () => {
    
    return (
        <div className="flex flex-col justify-center items-center min-h-screen py-8">
            <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Google_Docs_2020_Logo.svg/1200px-Google_Docs_2020_Logo.svg.png"
             height="200"
             width="450"
             objectFit="contain"
             />        
             <h1 className="py-5 text-2xl italic font-bold" >Google Docs Clone</h1>
            <Button
                className="w-44 mt-10"
                color="blue"
                buttonType="filled"
                ripple="light"
                onClick={signIn}
            >
                Login
            </Button>
        </div>
    )
}

export default Login
