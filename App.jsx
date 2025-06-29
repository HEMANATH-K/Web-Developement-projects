import { useState } from 'react';
import './App.css';


export default function App() {
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');
  const [time, setTime] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState('');
  const [tasks, setTasks] = useState([]);

  function handleClick() {
    if (input.toLowerCase() === "add") {
      setShowForm(true);
      setStatus("Task form opened");
    } else {
      setShowForm(false);
      setStatus("Enter a valid task");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (message && time) {
      setTasks([...tasks, { message, time }]);
      alert(`Your task "${message}" at "${time}" added successfully`);
      setMessage('');
      setTime('');
      setShowForm(false);
      setStatus('');
    } else {
      alert("Enter a valid task & time");
    }
  }

  function deleteTask(indexToDelete) {
    const newTasks = tasks.filter((_, index) => index !== indexToDelete);
    setTasks(newTasks);
  }

  return (
   <>
    <div  className='header'>
      <h1><center>To-do project using react</center></h1>
    </div>
    <div className='to-do' style={{ padding: '20px' }}>

       <h1><center>Task tool</center></h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Enter an option (type 'Add')"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="button" onClick={handleClick}>Submit</button>
      </form>

      {status && <h3>{status}</h3>}

      {showForm && (
        <div className='add' style={{ marginTop: '20px' }}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter a task"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            <button type="submit">Add</button>
          </form>
        </div>
      )}

      {tasks.length > 0 && (
        <div className='task-list' style={{ marginTop: '30px' }}>
          <h3>Tasks:</h3>
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>
                📝 {task.message} ⏰ {task.time}
                <button onClick={() => deleteTask(index)} style={{ marginLeft: '10px' }}>
                   Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </>
  );
}
