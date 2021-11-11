import React from 'react';

import TodoItem from './Todo.js'

const ProjectTodos = ({todos}) =>{
    return (
        <table>
            <th>
                Id
            </th>
            <th>
                Name
            </th>
            <th>
                User
            </th>
            {todos.map((todo)=> <TodoItem todo={todo}/>)}
        </table>
    )
}

export default ProjectTodos;