

import SignUpForm from "../../component/sign-up/sign-up.form.componenet";
import SignInForm from "../../component/sign-in-form/sign-in-form.componenet";
import './authentication.styles.scss'

const Authentication = () => {


    return (
        <div className="authentication-container">
            <SignInForm />
            <SignUpForm />
        </div>
    )
}

export default Authentication;