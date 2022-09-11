import { useState, useContext } from "react";
import Button from "../button/button.component";
import './sign-up-form.style.scss'
import FormInput from "../form-input/form-input.component.jsx";
import { CreateUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import { UserContext } from "../../contexts/user.component";
const defaultformFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}
const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultformFields);

    const { setCurrentUser } = useContext(UserContext)

    console.log(formFields)

    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormField = () => {
        setFormFields(defaultformFields)

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('password Do not Match');
            return;
        }

        try {
            const { user } = await CreateUserWithEmailAndPassword(email, password);

            setCurrentUser(user);
            await createUserDocumentFromAuth(user, { displayName })
            resetFormField();
        }
        catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create, email is already used')
            } else {
                console.log(error)

            }
        }

    }

    const handleChange = (event) => {

        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })

    }
    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign Up with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput
                    label='Display Name'
                    type='text' required onChange={handleChange} name='displayName' value={displayName} />

                <FormInput
                    label='Email'
                    type='email' required onChange={handleChange} name='email' value={email} />


                <FormInput
                    label='password'
                    type='password' required onChange={handleChange} name='password' value={password} />

                <FormInput
                    label='Confirm Password' type='password' required onChange={handleChange} name='confirmPassword' value={confirmPassword} />

                <Button type="submit">Sign Up</Button>
            </form>

        </div>
    )
}

export default SignUpForm;