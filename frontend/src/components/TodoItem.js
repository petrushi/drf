import { Link } from 'react-router-dom';


const TodoItem = ({ todo, deleteTodo }) => {
    return (
        <tr>
            <td>
                {todo.text}
            </td>
            <td>
                <Link to={`/users/${todo.author}`}>
                    {todo.author}
                </Link>
            </td>
            <td>
                <Link to={`/projects/${todo.project}`}>
                    {todo.project}
                </Link>
            </td>
            <td>
                {todo.createdAt}
            </td>
            <td>
                {todo.isActive.toString()}
            </td>
            <td>
                <button onClick={() => deleteTodo(todo.id)} type='button'>Delete</button>
            </td>
        </tr>
    )
}

export default TodoItem;