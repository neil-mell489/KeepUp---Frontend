import { useState } from "react"

const Signup = (props) => {
    const [form, setForm] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        props.handleSignUp(form)
    }

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    return(
        <div className="form-container flex flex-col m-10 items-center">
            <h1 className="pb-10 text-2xl">Register Your Account</h1>
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
                    <input type="password" name="password" autoComplete="true" onChange={handleChange} placeholder="Enter Password"/>
                </span>                    
                </div>
                <div className="flex justify-center">
                <input type="submit" className="bg-violet-500 hover:bg-violet-600 text-white p-2 rounded-md m-3" value="Sign Up"/>                    
                </div>

            </form>
        </div>

    )
}

export default Signup