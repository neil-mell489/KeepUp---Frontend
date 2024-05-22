import React, { useState } from "react";

const TaskBox = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  if (!isOpen) return null;

  return (
    <div style={{ background: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ background: 'white', padding: 20 }}>
        <h2>Add Task</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          onSubmit({ title, description, date, time });
        }}>
          <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
          <br />
          <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
          <br />
          <input type="date" value={date} onChange={e => setDate(e.target.value)} />
          <br />
          <input type="time" value={time} onChange={e => setTime(e.target.value)} />
          <br />
          <button type="submit">Submit</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default TaskBox;