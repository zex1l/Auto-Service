import AuthForm from "../../modules/AuthForm/AuthForm";
import css from './SignUp.module.scss'

const SignIn = () => {
    return (
        <section className={css.signIn}>
            <AuthForm type="sign-up"/>
        </section>
    );
};

export default SignIn;