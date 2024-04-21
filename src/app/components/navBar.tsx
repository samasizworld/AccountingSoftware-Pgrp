import React from 'react'
import FontAwesome from './fontAwesome'
// for solid icons
import { faReceipt, faHouse, faA, faAddressBook } from "@fortawesome/free-solid-svg-icons"
import LogOut from './logOut';
import AddButton from './add';
import Search from './search';
const NavBar = () => {
    return (

        <nav className="flex items-center justify-between bg-gray-600 h-[10vh] sticky top-0 text-white">
            <h1 className="hover:cursor-pointer hover:text-gray-400 ml-12"> <FontAwesome icon={faReceipt} /> Accounting
                Software</h1>
            <ul className="flex justify-between items-center space-x-12">
                <li className="hover:cursor-pointer hover:text-gray-400"><FontAwesome icon={faHouse} /> Home</li>
                <li className="hover:cursor-pointer hover:text-gray-400"><FontAwesome icon={faA} /> About</li>
                <li className="hover:cursor-pointer hover:text-gray-400"><FontAwesome icon={faAddressBook} /> Contact</li>
                <Search />
                <AddButton />
            </ul>
            <LogOut />
        </nav>
    )
}

export default NavBar