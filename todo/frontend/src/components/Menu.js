import React from 'react';
import { Link } from 'react-router-dom';


const Menu = () => {
    return (
        <nav className='menu'>
            <li><Link to='/'>Users</Link></li>
            <li><Link to='/projects'>Projects</Link></li>
            <li><Link to='/todos'>Todos</Link></li>
        </nav>
    )
}

export default Menu;