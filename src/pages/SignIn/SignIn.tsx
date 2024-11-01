import AuthForm from "../../modules/AuthForm/AuthForm";
import css from './SignIn.module.scss'

const SignIn = () => {
    return (
        <section className={css.signIn}>
            <AuthForm/>
        </section>
    );
};

export default SignIn;