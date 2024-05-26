import React, { useState, useEffect } from 'react';
import ContactForm from '../components/ContactForm';
import { useParams } from 'react-router-dom';

const Profile = ({ loggedIn, user }) => {
  const userId = user ? user.id : null;
  // console.log('SECOND PLACE: userId in Profile:', userId); 
  const [contacts, setContacts] = useState([]);
  const [showContactForm, setShowContactForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch(`${URL}/api/contacts/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonResponse = await response.json();
      const contactsData = jsonResponse.data;

      if (Array.isArray(contactsData)) {
        setContacts(contactsData);
      } else {
        console.error('Expected an array of contacts, but got:', contactsData);
        setContacts([]);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setContacts([]);
    }
  };

  const handleCreateContact = () => {
    // console.log('THIRD PLACE userId in handleCreateContact:', userId);
    setShowContactForm(true);
    setEditingContact(null);
  };
  

  const handleEditContact = (contact) => {
    setShowContactForm(true);
    setEditingContact(contact);
  };

  const handleDeleteContact = async (id) => {
    try {
      const response = await fetch(`${URL}/api/contacts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete contact');
      }

      fetchContacts();
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const handleContactFormSubmit = () => {
    fetchContacts();
    setShowContactForm(false);
    setEditingContact(null);
  };

  return (
    <div>
      <h1 className='text-center font-extrabold text-3xl'>KeepUp Contacts</h1>
      <button className="bg-violet-500 hover:bg-violet-600 text-white p-2 rounded-md m-3" onClick={handleCreateContact}>Create Contact</button>
      
      {showContactForm && <ContactForm setShowContactForm={setShowContactForm} onSubmit={handleContactFormSubmit} contact={editingContact} userId={userId} />} 

      <ul>
        {contacts.map((contact) => (
          <li key={contact._id}>
            <div>
              <span>{contact.name}</span>
              <span>{contact.phone}</span>
              <span>{contact.email}</span>
              <span>{contact.address}</span>
              <button onClick={() => handleEditContact(contact)} className="bg-violet-500 hover:bg-violet-600 text-white p-2 rounded-md m-3">Edit</button>
              <button onClick={() => handleDeleteContact(contact._id)} className="bg-violet-500 hover:bg-violet-600 text-white p-2 rounded-md m-3">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
