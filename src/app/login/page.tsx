'use client'
import React, { useState } from 'react'
import FontAwesome from '../components/fontAwesome'
// for solid icons
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons"
import { useAppDispatch } from '../store/store'
import { IloginCred, login } from '../store/features/authSlice'
import { useRouter } from 'next/navigation';

const Login = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [loginCred, setLoginCred] = useState<IloginCred>({});
    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(login(loginCred))
        router.push('/ledgers')
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginCred((prevState) => {
            return { ...prevState, [e.target.name]: e.target.value }
        });


    }
    return (
        <div className="login flex items-center justify-center h-[90vh] space-x-12">
            <div className="left flex flex-col justify-center h-1/2 space-y-2">
                <h2 className="font-bold text-xl">Accounting Software</h2>
                <p className="text-sm">This will change your daily accounting experience</p>
            </div>
            <div className="right flex flex-col justify-center items-center h-1/2 w-1/4 bg-gray-200 shadow-2xl rounded-sm">
                <h1 className="py-[30px] font-bold text-xl text-gray-900">Login to our Accounting Software</h1>
                <form className="w-full flex flex-col space-y-6" onSubmit={handleSubmit}>

                    <div className="flex items-center space-x-3 space-y-1">
                        <label className="!ml-[12px]" htmlFor="username"><FontAwesome icon={faUser} size={'2x'} /></label>
                        <input className="w-full !mr-[20px] py-[9px] outline-none focus:border-gray-500" name="Username"
                            type="email" placeholder="Username" onChange={handleChange} value={loginCred?.Username || ''} />
                    </div>
                    <div className="flex items-center space-x-3 space-y-1">
                        <label className="!ml-[12px]" htmlFor="password"><FontAwesome icon={faLock} size={'2x'} /></label>
                        <input className="w-full !mr-[20px] py-[9px] outline-none focus:border-gray-500" name="Password"
                            type="password" placeholder="Password" onChange={handleChange} value={loginCred?.Password || ''} />
                    </div>
                    <div className="w-full">
                        <input
                            className="bg-gray-600 w-full py-[9px] border border-radius-300 text-white rounded-sm hover:cursor-pointer hover:bg-gray-400"
                            type="submit" value="Sign In" />
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Login

