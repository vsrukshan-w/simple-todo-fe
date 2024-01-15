import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Dropdown, FormControl} from 'react-bootstrap';

const TodoItem = ({ todo, updateTodo, deleteTodo }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedText, setUpdatedText] = useState(todo.text);

    const handleToggle = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/todos/${todo.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: todo.text, completed: !todo.completed }),
            });

            const updatedTodo = await response.json();

            // Immediately update the local state without waiting for the API response
            updateTodo(todo.id, updatedTodo);
        } catch (error) {
            console.error('Error toggling todo:', error);
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/todos/${todo.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: updatedText, completed: todo.completed }),
            });

            const updatedTodo = await response.json();

            // Immediately update the local state without waiting for the API response
            updateTodo(todo.id, updatedTodo);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setUpdatedText(todo.text); // Reset to the original text
    };

    const handleDelete = async () => {
        try {
            await fetch(`http://localhost:8080/api/todos/${todo.id}`, {
                method: 'DELETE',
            });

            deleteTodo(todo.id);
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        checked={todo.completed}
                        onChange={handleToggle}
                        style={{ width: '20px', height: '20px', marginRight: '10px' }}
                    />
                </div>
                {isEditing ? (
                    <FormControl
                        type="text"
                        value={updatedText}
                        onChange={(e) => setUpdatedText(e.target.value)}
                    />
                ) : (
                    <span
                        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                    >
            {todo.text}
          </span>
                )}
            </div>
            <div>
                {isEditing ? (
                    <>
                        <Button variant="success" size="sm" onClick={handleUpdate}>
                            Save
                        </Button>
                        <Button variant="secondary" size="sm" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </>
                ) : (
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary" size="sm" id="dropdown-basic">
                            ...
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={handleEditClick}>Update</Dropdown.Item>
                            <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                )}
            </div>
        </li>
    );
};

TodoItem.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
    }).isRequired,
    updateTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
};

export default TodoItem;
