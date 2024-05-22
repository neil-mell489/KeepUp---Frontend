import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EventForm = ({ setShowEventForm, event, onSubmit, user }) => {
  const [formData, setFormData] = useState({
    eventName: event ? event.eventName : '',
    description: event ? event.description : '',
    date: event ? event.date : '',
    time: event ? event.time : '',
  });
  const { id } = useParams();
  const URL = process.env.REACT_APP_URL;

  useEffect(() => {
    // Update form data when the event prop changes
    if (event) {
      setFormData({
        eventName: event.eventName,
        description: event.description,
        date: event.date,
        time: event.time,
      });
    }
  }, [event]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        event
          ? `${URL}/api/events/${event._id}`
          : `${URL}/api/events`,
        {
          method: event ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...formData, createdBy: id }),
        }
      );
      if (!response.ok) {
        throw new Error(
          `Failed to ${event ? 'edit' : 'create'} event: ${response.statusText}`
        );
      }
      // If successful, close the form
      setShowEventForm(false);
      console.log(`${event ? 'Event edited' : 'Event created'} successfully!`);
      // Call the onSubmit function passed from the parent component to handle updates in the parent component
      onSubmit();
    } catch (error) {
      console.error(`Failed to ${event ? 'edit' : 'create'} event:`, error.message);
    }
  };

  // Function to handle cancel button click
  const handleCancel = () => {
    window.location.reload();
  };

  return (
    <div className="bg-violet-300 flex flex-col items-center">
      <h2 className="text-xl font-semibold pb-5 pt-5">
        {event ? 'Edit Event' : 'Create Event'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="pb-4">
          <label>Title: </label>
          <input
            type="text"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
            placeholder="Enter Title"
          />
        </div>
        <div className="pb-4">
          <label>Description: </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter Description"
          />
        </div>
        <div className="pb-4">
          <label>Date </label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} />
        </div>
        <div className="pb-4">
          <label>Time: </label>
          <input type="time" name="time" value={formData.time} onChange={handleChange} />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-violet-500 hover:bg-violet-600 text-white p-2 rounded-md m-3"
          >
            {event ? 'Edit' : 'Create'} Event
          </button>
        <div>
          <button onClick={handleCancel} className="bg-violet-500 hover:bg-violet-600 text-white p-2 rounded-md m-3">Cancel</button>
        </div>          
        </div>

      </form>
      {/* View button */}
      {/* <button className="view-button" onClick={handleViewEvent}>View Event</button> */}
    </div>
  );
};

export default EventForm;
