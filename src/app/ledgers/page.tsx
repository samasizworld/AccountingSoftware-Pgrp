'use client'
import React, { useEffect, useState } from 'react'
import FontAwesome from '../components/fontAwesome'
// for solid icons
import { faRightLong, faLeftLong, faCaretDown, faCaretUp, faEye, faTrash, IconDefinition } from "@fortawesome/free-solid-svg-icons"
import { useAppDispatch, useAppSelector } from '../store/store'
import { listLedgers, setQueryParams } from '../store/features/ledgerHeadSlice'
const LedgerHead = () => {
    const dispatch = useAppDispatch()
    const ledgers = useAppSelector(state => state.ledger.ledgers)
    const [caretIcon, toggleCaretIcon] = useState<IconDefinition>(faCaretDown)
    const [caretIcon1, toggleCaretIcon1] = useState<IconDefinition>(faCaretDown)
    const [caretIcon2, toggleCaretIcon2] = useState<IconDefinition>(faCaretDown)
    const queryParams = useAppSelector(state => state.ledger.queryParams);

    const toggleCaret = () => {
        toggleCaretIcon((prevCaretIcon) => {
            dispatch(setQueryParams({ ...queryParams, orderBy: 'name', orderDir: prevCaretIcon.iconName == 'caret-down' ? 'DESC' : 'ASC' }))
            return prevCaretIcon.iconName == 'caret-down' ? faCaretUp : faCaretDown
        })

    }

    const toggleCaret1 = () => {
        toggleCaretIcon1((prevCaretIcon) => {
            dispatch(setQueryParams({ ...queryParams, orderBy: 'ledgerheadtype', orderDir: prevCaretIcon.iconName == 'caret-down' ? 'DESC' : 'ASC' }))
            return prevCaretIcon.iconName == 'caret-down' ? faCaretUp : faCaretDown
        })

    }

    const toggleCaret2 = () => {
        toggleCaretIcon2((prevCaretIcon) => {
            dispatch(setQueryParams({ ...queryParams, orderBy: 'datecreated', orderDir: prevCaretIcon.iconName == 'caret-down' ? 'DESC' : 'ASC' }))
            return prevCaretIcon.iconName == 'caret-down' ? faCaretUp : faCaretDown
        })

    }

    const changePage = (page: number) => {
        dispatch(setQueryParams({ ...queryParams, page: page }))
    }
    useEffect(() => {
        dispatch(listLedgers(queryParams))
    }, [queryParams])



    const totalPageToShow = Math.ceil(queryParams.page / queryParams.pageSize)
    const arr = [];
    for (let i = queryParams.page; i <= totalPageToShow; i++) {
        arr.push(i)
    }

    return (
        <div className="container m-auto flex flex-col justify-center">
            <table className="w-[100%] border-collapse">
                <thead>
                    <tr className="bg-gray-600 text-white text-center border border-gray-500">
                        <th
                            className="uppercase p-[12px]">
                            Name
                            <button className='ml-2' onClick={toggleCaret}><FontAwesome icon={caretIcon} /></button>
                        </th>
                        <th
                            className="uppercase p-[12px]">
                            LedgerHeadType
                            <button className='ml-2' onClick={toggleCaret1}><FontAwesome icon={caretIcon1} /></button>
                        </th>

                        <th
                            className="uppercase p-[12px]">
                            Date
                            <button className='ml-2' onClick={toggleCaret2}><FontAwesome icon={caretIcon2} /></button>
                        </th>
                        <th
                            className="uppercase p-[12px]">
                        </th>
                    </tr>
                </thead>

                {ledgers?.map((lht, index) => (
                    <tbody key={index}>
                        <tr className="text-left hover:bg-gray-300">
                            <td className={`border border-gray-500 p-[12px]`}>{lht.LedgerName}</td>
                            <td className={`border border-gray-500 p-[12px]`}>{lht.LedgerHeadType}</td>
                            <td className={`border border-gray-500 p-[12px]`}>{lht.DateCreated}</td>
                            <td className={`border border-gray-500 p-[12px] text-center`}>
                                <span
                                    className="bg-gray-600 text-white rounded-sm p-[5px] hover:cursor-pointer hover:bg-gray-500">
                                    <FontAwesome icon={faEye} />
                                    View</span>
                                <span
                                    className="bg-gray-600 text-white rounded-sm p-[5px] hover:cursor-pointer hover:bg-gray-500 ml-[10px]"><FontAwesome icon={faTrash} /><input type="button" value=" Delete" /></span>
                            </td>
                        </tr>
                    </tbody>))}
            </table>
            {ledgers?.length > 0 ? (<div className="pagination flex justify-center my-[20px]">
                {queryParams.page - 1 >= 1 ? <span className="border border-gray-600 px-[5px] hover:cursor-pointer hover:bg-gray-600" onClick={() => changePage(queryParams.page - 1)}>
                    <FontAwesome icon={faLeftLong} />
                </span> : <></>}
                <ul className="flex justify-evenly space-x-1">
                    {queryParams.page - 1 >= 1 ? <li className="px-[5px] text-center">...</li> : <></>}
                    {arr.map((num) => (<li key={num} className={`border border-gray-600 px-[5px] hover:cursor-pointer hover:bg-gray-600 ${queryParams.page == num ? "bg-gray-600" : ""}`} onClick={() => changePage(num)}>{num}</li>))}
                    {queryParams.page + 1 <= totalPageToShow ? <li className="px-[5px] text-center">...</li> : <></>}
                </ul>
                {queryParams.page + 1 <= totalPageToShow ? <span className="border border-gray-600 px-[5px] hover:cursor-pointer hover:bg-gray-600" onClick={() => changePage(queryParams.page + 1)}>
                    <FontAwesome icon={faRightLong} />
                </span> : <></>}
            </div>) : <></>
            }
        </div>
    )
}

export default LedgerHead