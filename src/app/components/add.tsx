'use client'
import React from 'react'
import FontAwesome from './fontAwesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useAppSelector } from '../store/store';

const AddButton = () => {
    const isAuthenticated = useAppSelector(state => state.auth.authenticated);
    return (
        <>{isAuthenticated ? <li className="hover:cursor-pointer hover:text-gray-400"><FontAwesome icon={faPlus} /></li> : <></>}</>
    )
}

export default AddButton