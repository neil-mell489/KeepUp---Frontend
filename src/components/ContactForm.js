import React, { useState } from 'react';

const ContactForm = ({ userId }) => {
    const [contactData, setContactData] = useState({
        firstName: '',
        lastName: '',
        company: '',
        mobilePhone: '',
        workPhone: '',
        email: '',
        address: '',
        socialMedia: '',
        birthday: '',
        note: '',
        createdBy: userId 
    });

    const handleChange = (event) => {
        setContactData({
            ...contactData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('http://localhost:4000/api/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Send the token in the correct format
                },
                body: JSON.stringify(contactData)
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            console.log('Contact created:', data);
        } catch (error) {
            console.error('Error creating contact:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="firstName" onChange={handleChange} placeholder="First Name" />
            <input type="text" name="lastName" onChange={handleChange} placeholder="Last Name" />
            <input type="text" name="company" onChange={handleChange} placeholder="Company" />
            <input type="text" name="mobilePhone" onChange={handleChange} placeholder="Mobile Phone" />
            <input type="text" name="workPhone" onChange={handleChange} placeholder="Work Phone" />
            <input type="email" name="email" onChange={handleChange} placeholder="Email" />
            <input type="text" name="address" onChange={handleChange} placeholder="Address" />
            <input type="text" name="socialMedia" onChange={handleChange} placeholder="Social Media" />
            <input type="text" name="birthday" onChange={handleChange} placeholder="Birthday" />
            <input type="text" name="note" onChange={handleChange} placeholder="Note" />
     
            <input type="hidden" name="createdBy" value={userId} />
            <button type="submit">Create Contact</button>
        </form>
    );
};

export default ContactForm;
