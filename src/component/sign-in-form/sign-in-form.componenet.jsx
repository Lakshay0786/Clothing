import { useState } from "react";
import Button from "../button/button.component";
import './sign-in-form.style.scss'
import FormInput from "../form-input/form-input.component.jsx";
import {
    CreateUserWithEmailAndPassword, signInWithGooglePopup, createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";
const defaultformFields = {
    email: '',
    password: '',
}
const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultformFields);

    console.log(formFields)

    const { email, password } = formFields;

    const resetFormField = () => {
        setFormFields(defaultformFields)

    }

    const signInwithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();


        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);

            resetFormField();
        }
        catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('incorrect Password')
                    break;
                case 'auth/user-not-found':
                    alert('No User associated with This Email');
                    break;
                default:
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
            <h2>Already have an account?</h2>
            <span>Sign In with your email and password</span>
            <form onSubmit={handleSubmit}>



                <FormInput
                    label='Email'
                    type='email' required onChange={handleChange} name='email' value={email} />


                <FormInput
                    label='password'
                    type='password' required onChange={handleChange} name='password' value={password} />


                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type='button' buttonType='google' onClick={signInwithGoogle}>Google sign in</Button>
                </div>

            </form>

        </div>
    )
}

export default SignInForm;