import React from 'react';

const TodoItem = ({ todo }) => {
    return (
        <tr>
            <td>
                {todo.text}
            </td>
            <td>
                {todo.project}
            </td>
            <td>
                {todo.created_at}
            </td>
            <td>
                {todo.is_active}
            </td>
        </tr>
    )
}

const TodoList = ({ todos }) => {
    return (
        <div className='todos table'>
            <table>
                <thead>
                    <tr>
                        <th>Text</th>
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
