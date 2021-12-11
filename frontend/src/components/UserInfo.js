import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const UserInfo = ({ todos, projects }) => {
    let { id } = useParams();
    let filteredTodos = todos.filter(todo => todo.author.toString().includes(id))
    let filteredProjects = projects.filter(project => project.users.toString().includes(id))
    return (
        <div className='todos table'>
            <h2> User {id} activity </h2>
            <table>
                <thead>
                    <tr>
                        <th>Projects</th>
                        <th>Todos</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            {filteredProjects.map(project => {
                                return (
                                    <Link to={`/projects/${project.id}`}>
                                        {project.name}
                                    </Link>
                                )
                            }).reduce((prev, curr) => [prev, ' ', curr], '')}
                        </td>
                        <td>{filteredTodos.map(todo => {
                            return (
                                <div>{todo.text}</div>
                            )
                        })}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default UserInfo;