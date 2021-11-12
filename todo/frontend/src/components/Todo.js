import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos }) => {
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
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo) => <TodoItem todo={todo} />)}
                </tbody>
            </table>
        </div>
    )
}

export default TodoList;
