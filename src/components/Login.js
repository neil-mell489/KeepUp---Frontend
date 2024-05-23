import { useState } from "react";

const Login = (props) => {
    const [form, setForm] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        // log the user in on submit
        let submission = await props.handleLogin(form);
        if (submission) {
            setErrorMsg(submission.error);
        }
    };

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    return (
        <div className="form-container flex flex-col m-10 items-center">
            <h1 className="pb-10 text-2xl">Welcome Back! (to KeepUp)</h1>
            <form onSubmit={handleSubmit}>
                <div className="pb-2">
                    <span>
                        <label htmlFor="username">Username: </label>
                        <input type="text" name="username" onChange={handleChange} placeholder="Enter Username"/>
                    </span>
                </div>
                <div className="pb-2">
                    <span>                
                        <label htmlFor="email">Email: </label>
                        <input type="email" name="email" onChange={handleChange} placeholder="Enter Email"/>
                    </span>
                </div>
                <div className="pb-2">
                    <span>                
                        <label htmlFor="password">Password: </label>
                        <input type="password" name="password" onChange={handleChange} placeholder="Enter Password"/>
                    </span>
                </div>
                <div className="flex justify-center">
                <button type="submit" className="bg-violet-500 hover:bg-violet-600 text-white p-2 rounded-md m-3">Login</button>                    
                </div>

            </form>
            {/* inside the form div display the error message in red */}
            {errorMsg ? <h4 style={{color: "red"}}>{errorMsg}</h4> : ""}
        </div>
    );
};

export default Login;