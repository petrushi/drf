import React from 'react';
import { Link } from 'react-router-dom';


const UserItem = ({ user }) => {
    return (
        <tr>
            <td>
                <Link to={`users/${user.id}`}>{user.username}</Link>
            </td>
            <td>
                {user.first_name}
            </td>
            <td>
                {user.last_name}
            </td>
            <td>
                {user.email}
            </td>
        </tr>
    )
}

const UserList = ({ users }) => {
    return (
        <div className='users table'>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => <UserItem user={user} />)}
                </tbody>
            </table>
        </div>
    )
}

export default UserList;
