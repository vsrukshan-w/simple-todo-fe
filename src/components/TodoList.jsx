import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ todos, updateTodo, deleteTodo }) => {
    // Separate todos into Pending and Completed sections
    const pendingTodos = todos.filter((todo) => !todo.completed);
    const completedTodos = todos.filter((todo) => todo.completed);

    return (
        <div>
            <h2>Pending</h2>
            <ul className="list-group">
                {pendingTodos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        updateTodo={updateTodo}
                        deleteTodo={deleteTodo}
                    />
                ))}
            </ul>

            <h2 className="mt-4">Completed</h2>
            <ul className="list-group">
                {completedTodos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        updateTodo={updateTodo}
                        deleteTodo={deleteTodo}
                    />
                ))}
            </ul>
        </div>
    );
};

TodoList.propTypes = {
    todos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            text: PropTypes.string.isRequired,
            completed: PropTypes.bool.isRequired,
        })
    ).isRequired,
    updateTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
};

export default TodoList;
