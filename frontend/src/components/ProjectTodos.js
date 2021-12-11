import TodoItem from "./TodoItem";
import { useParams } from 'react-router-dom';


const ProjectTodoList = ({ todos }) => {
    let { id } = useParams();
    let filteredTodos = todos.filter(todo => todo.project.toString().includes(id))
    return (
        <div className='todos table'>
            <h2>List of ToDos for Project {id}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Text</th>
                        <th>Author</th>
                        <th>Project</th>
                        <th>Created at</th>
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

export default ProjectTodoList;
