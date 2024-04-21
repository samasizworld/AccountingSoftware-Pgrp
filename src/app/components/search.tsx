'use client'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/store';
import FontAwesome from './fontAwesome';
import { faSearchengin } from '@fortawesome/free-brands-svg-icons';
import { getCurrentSession } from '../store/features/authSlice';
import { setQueryParams } from '../store/features/ledgerHeadSlice';

const Search = () => {
    const isAuthenticated = useAppSelector(state => state.auth.authenticated);
    const queryParams = useAppSelector(state => state.ledger.queryParams);
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        dispatch(getCurrentSession())
    }, [])

    const handleSearchFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setQueryParams({ ...queryParams, search: e.target.value }))
    }

    return (
        <>{isAuthenticated ? <li className="hover:cursor-pointer hover:text-gray-400 flex space-x-3 items-center"><FontAwesome icon={faSearchengin} /> <input
            className="w-full outline-none focus:border-gray-500 text-black" type="text" name="search"
            id="search" placeholder="Search" value={queryParams.search} onChange={handleSearchFieldChange} /></li>
            : <></>}</>

    )
}

export default Search