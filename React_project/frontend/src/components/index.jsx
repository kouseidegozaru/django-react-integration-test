import React, { useEffect, useState } from 'react';
import getToDoList, { postCreateTodo, patchCheckTodo, deleteTodo } from '../api/todo';

const Top = () => {
  const [todoList, setTodoList] = useState([]);
  const [todo, setTodo] = useState('');

  useEffect(() => {
    (async () => {
      const list = await getToDoList();
      setTodoList(list);
    })();
  }, []);

  const handleCreate = async () => {
    if (todo === '' || todoList.some(value => todo === value.name)) return;
    const createTodoResponse = await postCreateTodo(todo);
    setTodoList(todoList.concat(createTodoResponse));
    setTodo('');
  };

  const handleSetTodo = (e) => {
    setTodo(e.target.value);
  };

  const handleCheck = (e) => {
    const todoId = e.target.value;
    const checked = e.target.checked;
    const list = todoList.map((value) => {
      if (value.id.toString() === todoId) {
        value.checked = checked;
      }
      return value;
    });
    setTodoList(list);
    patchCheckTodo(todoId, checked);
  };

  const handleDelete = (e) => {
    const todoId = e.currentTarget.dataset.id;
    const list = todoList.filter(value => value.id.toString() !== todoId);
    setTodoList(list);
    deleteTodo(todoId);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <input 
          type="text" 
          value={todo}
          placeholder="やること" 
          onChange={handleSetTodo} 
          style={{ flex: 1, marginRight: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} 
        />
        <button onClick={handleCreate} style={{ padding: '10px 20px', border: 'none', borderRadius: '4px', background: '#007bff', color: '#fff' }}>
          作成
        </button>
      </div>
      <div>
        {todoList.map((todo, index) => (
          <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', alignItems: 'center' }}>
            <label>
              <input 
                type="checkbox" 
                checked={todo.checked} 
                onChange={handleCheck} 
                value={todo.id} 
                style={{ marginRight: '10px' }} 
              />
              {todo.name}
            </label>
            <button 
              data-id={todo.id} 
              onClick={handleDelete} 
              style={{ padding: '5px 10px', border: 'none', borderRadius: '4px', background: '#dc3545', color: '#fff' }}>
              削除
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Top;
