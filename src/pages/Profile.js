import React, { useState, useEffect } from 'react';
import EventForm from '../components/EventForm';
import Calendar from 'react-calendar';
import '../assets/css/styles.css';
import { useParams } from 'react-router-dom';

const URL = process.env.REACT_APP_URL;

const Profile = ({ loggedIn, user }) => {
  const [showEventForm, setShowEventForm] = useState(false);
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState(new Date());
  const [editingEvent, setEditingEvent] = useState(null);
  const { id } = useParams();


  useEffect(() => {
    fetchEvents(); // Fetch events when component mounts
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${URL}/api/events/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonResponse = await response.json();
      const eventsData = jsonResponse.data;

      if (Array.isArray(eventsData)) {
        setEvents(eventsData);
      } else {
        console.error('Expected an array of events, but got:', eventsData);
        setEvents([]);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      setEvents([]);
    }
  };

  const handleCreateEvent = async () => {
    setShowEventForm(true);
    setEditingEvent(null);
  };

  const handleEditEvent = (event) => {
    setShowEventForm(true);
    setEditingEvent(event);
  };

  const handleDeleteEvent = async (id) => {
    try {
      const response = await fetch(`${URL}/api/events/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }

      // Refetch events after deleting an event
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleEventFormSubmit = () => {
    fetchEvents();
    setShowEventForm(false);
    setEditingEvent(null);
  };

  const convertTo12HourTime = (time24) => {
    const [hours, minutes] = time24.split(':');
    const period = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    return `${hours12}:${minutes} ${period}`;
  };

  return (
    <div>
      <h1 className='text-center font-extrabold text-3xl'>TASKFLOW CALENDAR</h1>
      <button className="bg-violet-500 hover:bg-violet-600 text-white p-2 rounded-md m-3" onClick={handleCreateEvent}>Create Event</button>
      {showEventForm && <EventForm setShowEventForm={setShowEventForm} onSubmit={handleEventFormSubmit} event={editingEvent} user={user} />}
      <Calendar
        onChange={setDate}
        value={date}
        tileContent={({ date, view }) => {
          const offset = date.getTimezoneOffset() * 60000; // Get offset in milliseconds
          const dayEvents = events?.filter(event =>
            new Date(event.date).getTime() + offset >= date.getTime() && // Adjust for timezone offset
            new Date(event.date).getTime() + offset < date.getTime() + 86400000 // 86400000 milliseconds = 1 day
          );
          return (
            <ul>
              {dayEvents.map((event, index) => (
                <li key={index}>
                  <div>
                    <span className='text-wrap'>{event.eventName}</span>
                    <div className='text-wrap'>{convertTo12HourTime(event.time)}</div>
                    <span className='text-pretty'>{event.description}</span>                      
                    <div className="flex flex-wrap justify-center">
                      <button onClick={() => handleEditEvent(event)} className="bg-violet-500 hover:bg-violet-600 text-white p-2 rounded-md m-3">Edit</button>
                      <button onClick={() => handleDeleteEvent(event._id)} className="bg-violet-500 hover:bg-violet-600 text-white p-2 rounded-md m-3">Delete</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          );
        }}
      />
    </div>
  );
};

export default Profile;
