import axios from "axios";
import {useRef, useState} from "react"
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Signup(){

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfigurationRef = useRef();

    const {setUser, setToken} = useStateContext();
    const [errors, setErrors] = useState();


    const onSubmit = (ev) => {
        ev.preventDefault();
        setErrors(null);
        const payLoad = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfigurationRef.current.value,
        }

        axiosClient.post('/signup', payLoad)
        .then(({data}) => {
            setUser(data.user),
            setToken(data.token)
        })
        .catch(err => {
            const response = err.response;
            if(response && response.status === 422){//validation error
                setErrors(response.data.errors)
            }
        })
    }

    return (

            <form onSubmit={onSubmit} className="animated fadeInDown">
                <h1 className="title">Signup</h1>
                {
                    errors && <div className="alert">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                }
                <input ref={nameRef} type="text" placeholder="Full Name" className='form-control'/>
                <input ref={emailRef} type="email" placeholder="Email Address" className='form-control'/>
                <input ref={passwordRef} type="password" placeholder="Password" className='form-control'/>
                <input ref={passwordConfigurationRef} type="password" placeholder="Password Confirmation" className='form-control'/>
                <button className="btn btn-block">Signup</button>
                <p className="message">
                    Already Registered? <a href="/login" >Login</a>
                </p>
            </form>

    )


}
