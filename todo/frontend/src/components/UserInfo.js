import { useParams } from 'react-router-dom';

const UserInfo = ({ todos,projects }) => {
    let { id } = useParams();
    let filteredTodos = todos.filter(todo => todo.author.toString().includes(id))
    let filteredProjects = projects.filter(project => project.users.toString().includes(id))
    return (
        <div className='todos table'>
            <h2>List of ToDos for Project {id}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Text</th>
                        <th>Author</th>
                        <th>Is active</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTodos.map((todo) => <TodoItem todo={todo} />)}
                </tbody>
            </table>
        </div>
    )
}

export default UserInfo;