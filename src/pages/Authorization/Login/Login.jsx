import classes from './Login.module.scss'

import {useEffect, useState} from 'react'
import {Link, useHistory, useLocation} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {useForm, Controller} from "react-hook-form";

import PhoneNumberInput from '../../../components/Input/PhoneNumberInput';
import Input from '../../../components/Input/Input';

import banner from '../../../assets/img/authorization_banner.png'
import logo from '../../../assets/logo.svg'

import {cleanError, getLogin} from "../../../redux/profileReducer";
import {useTranslation} from "react-i18next";

const Login = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();

    let {from} = location.state || {from: {pathname: ''}};

    const {control, handleSubmit} = useForm();

    let token = useSelector(state => state.profilePage.login.token);
    let loginErrorState = useSelector(state => state.profilePage.error);

    const [loginError, setLoginError] = useState(null);
    const [username, setUsername] = useState('');
    const {t} = useTranslation();
    useEffect(() => {
        if (token) {
            if (from.pathname !== '') {
                history.push(from);
            } else {
                history.length > 2 ? history.goBack() : history.push('/');
            }
        }
    }, [history, from, token])

    useEffect(() => {
        if (loginErrorState && loginErrorState.non_field_errors && loginErrorState.non_field_errors[0] === 'User account is disabled.') {
            history.push({
                pathname: '/signup/confirm',
                state: {username: username}
            })
        }
        setLoginError(loginErrorState);
    }, [history, loginErrorState, username])

    useEffect(() => {
        return () => {
            dispatch(cleanError());
        }
    }, [dispatch])

    const onSubmit = (data) => {
        if (data.username.charAt(0) === '+') {
            data.username = data.username.slice(1);
        }
        setUsername(data.username);
        dispatch(getLogin(data));
    }

    return (
        <div className={classes.loginPage}>
            <div className={classes.bannerWrapper}>
                <div className={classes.banner} style={{backgroundImage: `url(${banner})`}}/>
            </div>
            <div className={classes.loginWrapper}>
                <div className={classes.loginContainer}>
                    <div className={classes.title}>
                        <h2>{t("login")}</h2>
                        <Link to='/'>
                            <img src={logo} className='user-select-none user-drag-none'  alt="Logo"/>
                        </Link>
                    </div>

                    <div className={classes.loginForm}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Controller
                                render={({field, fieldState: {error}, ref}) =>
                                    <PhoneNumberInput
                                        borderRadius='2'
                                        error={error}
                                        label={t("forms:phone")}
                                        type='tel'
                                        inputRef={ref}
                                        parentClassName={`${classes.inputContainer} ${loginError ? 'input-error' : ''}`} {...field} />
                                }
                                name={'username'}
                                control={control}
                                rules={{required: true}}
                            />
                            <Controller
                                render={({field, fieldState: {error}, ref}) =>
                                    <Input
                                        noShadow
                                        borderRadius='2'
                                        error={error ? error : loginError}
                                        type='password'
                                        parentClassName={classes.inputContainer}
                                        inputRef={ref}
                                        {...field}
                                        label={
                                            <>
                                                {t("forms:password")}<Link
                                                to='/reset-password'>{t("forms:forgotPassword")}</Link>
                                            </>
                                        }
                                    />
                                }
                                name={'password'}
                                control={control}
                                rules={{required: true}}
                            />
                            <button type='submit'>{t("forms:signIn")}</button>
                            <div className={classes.signup}>
                                <Link to='/signup'>
                                    <p>{t("forms:noAcc")}</p>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
