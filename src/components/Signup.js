import { useState } from "react";

const Signup = (props) => {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Pass the form data to the parent component for handling sign-up
        props.handleSignUp(form);
    };

    const handleChange = (e) => {
        // Update the form state when input fields change
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className="form-container flex flex-col m-10 items-center">
            <h1 className="pb-10 text-2xl">Register Your Account</h1>
            <form onSubmit={handleSubmit}>
                <div className="pb-2">
                    <label htmlFor="username">Username: </label>
                    <input type="text" name="username" value={form.username} onChange={handleChange} placeholder="Enter Username" />
                </div>
                <div className="pb-2">
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter Email" />
                </div>
                <div className="pb-2">
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" autoComplete="true" value={form.password} onChange={handleChange} placeholder="Enter Password" />
                </div>
                <div className="flex justify-center">
                    <input type="submit" className="bg-violet-500 hover:bg-violet-600 text-white p-2 rounded-md m-3" value="Next" />
                </div>
            </form>
        </div>
    );
};

export default Signup;
