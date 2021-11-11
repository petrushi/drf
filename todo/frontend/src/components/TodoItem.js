
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
                {todo.createdAt}
            </td>
            <td>
                {todo.isActive.toString()}
            </td>
        </tr>
    )
}

export default TodoItem;