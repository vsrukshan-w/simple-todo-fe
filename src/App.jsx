import React, {useEffect, useState} from 'react';
import TodoList from './components/TodoList';

function App() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/todos');
                const data = await response.json();
                setTodos(data);
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
        };

        fetchTodos();
    }, []);

    const addTodo = async () => {
        if (newTodo.trim() !== '') {
            try {
                const response = await fetch('http://localhost:8080/api/todos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ text: newTodo, completed: false }),
                });
                const data = await response.json();
                setTodos([...todos, data]);
                setNewTodo('');
            } catch (error) {
                console.error('Error adding todo:', error);
            }
        }
    };

    const updateTodo = (id, updatedTodo) => {
        const updatedTodoList = todos.map((todo) =>
            todo.id === id ? updatedTodo : todo
        );
        setTodos(updatedTodoList);
    };

    const deleteTodo = (id) => {
        const updatedTodoList = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodoList);
    };

    return (
        <div className="container mt-4">
            <h1 style={{ color: 'green' }}>Todo App</h1>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="New Todo"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <div className="input-group-append">
                    <button className="btn btn-success" onClick={addTodo}>
                        Add
                    </button>
                </div>
            </div>
            <TodoList todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
        </div>
    );
}

export default App;
