'use client'
import React from 'react'
import FontAwesome from './fontAwesome'
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { logout } from '../store/features/authSlice'
import { useAppSelector } from '../store/store'
import { useRouter } from 'next/navigation'

const LogOut = () => {
    const dispatch = useDispatch();
    const router = useRouter()
    const isAuthenticated = useAppSelector(state => state.auth.authenticated);
    const username = useAppSelector(state => state.auth.userName);
    const logOut = () => {
        dispatch(logout())
        router.push('/login')
    }
    return (

        <ul className="flex justify-between items-center space-x-12 mr-12">
            {isAuthenticated ? <li className="hover:cursor-pointer hover:text-gray-400"><FontAwesome icon={faUser} /> {username ? username : ''}</li> : <></>}
            {isAuthenticated ? <li className="hover:cursor-pointer hover:text-gray-400"><button onClick={logOut}><FontAwesome icon={faRightFromBracket} /> Sign Out
            </button>
            </li> : <></>}
        </ul>


    )
}

export default LogOut