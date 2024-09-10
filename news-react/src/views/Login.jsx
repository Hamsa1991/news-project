import { useRef, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

export default function Login(){


    const emailRef = useRef();
    const passwordRef = useRef();

    const {setUser, setToken} = useStateContext();
    const [errors, setErrors] = useState(null);

    const onSubmit = (event) =>{
        event.preventDefault();

        const payLoad = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

        axiosClient.post("/login", payLoad).then(({data}) => {
            setUser(data.user);
            setToken(data.token)
        }).catch((error)=> {
            const res = error.response;
            if(res.status == 422)//validation error
            if(res.data.errors){
                setErrors(res.data.errors)
            }else{
                setErrors({email:[response.data.message]})
            }
        })

    }

    return (
         <form onSubmit={onSubmit} className="animated fadeInDown">
                <h1 className="title">Login to your account</h1>

                <input ref={emailRef} type="email" placeholder="Email" className='form-control'/>
                <input ref={passwordRef} type="password" placeholder="Password" className='form-control'/>
                <button className="btn btn-block">Login</button>
                <p className="message">
                    Not Registered? <a href="/signup" >Create an account</a>
                </p>
            </form>

    );
}
