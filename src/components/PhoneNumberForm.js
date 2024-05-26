import { useState } from "react";
import PhoneNumberForm from "./PhoneNumberForm";

const Signup = (props) => {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        phoneNumber: ""
    });
    const [step, setStep] = useState(1);

    const handleSignUp = async (formData) => {
        // Logic for handling sign-up with username, email, and password
        // For example, send a request to your backend API to create the user account
        // You can use fetch or any HTTP client library for this
        console.log("Signing up with:", formData);
        try {
            const response = await fetch("/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                console.log("Sign up successful!");
                setStep(2); // Proceed to the next step
            } else {
                console.error("Sign up failed!");
                // Handle sign-up failure, e.g., display error message to the user
            }
        } catch (error) {
            console.error("Error during sign up:", error);
            // Handle error, e.g., display error message to the user
        }
    };

    const handlePhoneNumberSubmit = async (phoneNumber) => {
        // Logic for handling submission of phone number
        // For example, send a request to your backend API to send a confirmation code to the phone number
        // You can use fetch or any HTTP client library for this
        console.log("Submitting phone number:", phoneNumber);
        try {
            const response = await fetch("/api/sendConfirmationCode", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ phoneNumber })
            });
            if (response.ok) {
                console.log("Confirmation code sent successfully!");
                setStep(3); // Proceed to the next step
            } else {
                console.error("Failed to send confirmation code!");
                // Handle failure to send confirmation code, e.g., display error message to the user
            }
        } catch (error) {
            console.error("Error sending confirmation code:", error);
            // Handle error, e.g., display error message to the user
        }
    };

    const handleConfirmationCodeSubmit = async (code) => {
        // Logic for handling submission of confirmation code
        // For example, send a request to your backend API to verify the confirmation code
        // You can use fetch or any HTTP client library for this
        console.log("Submitting confirmation code:", code);
        try {
            const response = await fetch("/api/verifyConfirmationCode", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ code })
            });
            if (response.ok) {
                console.log("Confirmation code verified successfully!");
                console.log("Logged in successfully!");
                // Proceed with automatic login after confirmation code verification
            } else {
                console.error("Failed to verify confirmation code!");
                // Handle failure to verify confirmation code, e.g., display error message to the user
            }
        } catch (error) {
            console.error("Error verifying confirmation code:", error);
            // Handle error, e.g., display error message to the user
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className="form-container flex flex-col m-10 items-center">
            {step === 1 && (
                <>
                    <h1 className="pb-10 text-2xl">Register Your Account</h1>
                    <form onSubmit={(e) => { e.preventDefault(); handleSignUp(form); }}>
                        <div className="pb-2">
                            <label htmlFor="username">Username: </label>
                            <input type="text" name="username" onChange={handleChange} placeholder="Enter Username" />
                        </div>
                        <div className="pb-2">
                            <label htmlFor="email">Email: </label>
                            <input type="email" name="email" onChange={handleChange} placeholder="Enter Email" />
                        </div>
                        <div className="pb-2">
                            <label htmlFor="password">Password: </label>
                            <input type="password" name="password" autoComplete="true" onChange={handleChange} placeholder="Enter Password" />
                        </div>
                        <div className="flex justify-center">
                            <input type="submit" className="bg-violet-500 hover:bg-violet-600 text-white p-2 rounded-md m-3" value="Sign Up" />
                        </div>
                    </form>
                </>
            )}
            {step === 2 && (
                <PhoneNumberForm handlePhoneNumberSubmit={handlePhoneNumberSubmit} />
            )}
            {step === 3 && (
                <>
                    <h1 className="pb-10 text-2xl">Enter Confirmation Code</h1>
                    {/* Add confirmation code input form here */}
                </>
            )}
        </div>
    );
}

export default Signup;
