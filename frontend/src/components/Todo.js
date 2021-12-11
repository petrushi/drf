import React from 'react';
import TodoItem from './TodoItem';
import { Link } from 'react-router-dom';

const TodoList = ({ todos, deleteTodo }) => {
    return (
        <div className='todos table'>
            <table>
                <thead>
                    <tr>
                        <th>Text</th>
                        <th>Author</th>
                        <th>Project</th>
                        <th>Created date</th>
                        <th>Is active</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo) => <TodoItem todo={todo}  deleteTodo={(id) => deleteTodo(id)}/>)}
                </tbody>
            </table>
            <div>
                <Link to='todos/create'>Create ToDo</Link>
            </div>
        </div>
    )
}

export default TodoList;
