import React from 'react';
import { Link } from 'react-router-dom';


class Menu extends React.Component {

    logout() {
        this.props.setToken('')
    }

    render() {
        return (
            <nav className='menu'>
                <li><Link to='/'>Users</Link></li>
                <li><Link to='/projects'>Projects</Link></li>
                <li><Link to='/todos'>Todos</Link></li>
                {this.props.isAuthed ?
                    <div>
                        <span>{this.props.username}</span><br></br>
                        <button onClick={() => this.logout()}> Logout</button>
                    </div> :
                    <li style={{ 'backgroundColor': 'red' }}><Link to='/login'>Login</Link></li>}
            </nav>
        )
    }
}

export default Menu;