import classes from './SignUp.module.scss';

import { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import banner from '../../../assets/img/signup_banner1.png'
import logo from '../../../assets/logo.svg'

import Checkbox from "../../../components/Checkbox/Checkbox";
import PhoneNumberInput from '../../../components/Input/PhoneNumberInput';
import Input from '../../../components/Input/Input';
import DatePicker from '../../../components/Input/DatePicker';

import { registerAcc } from "../../../redux/profileReducer";
import Select from '../../../components/Select/Select';
import { useTranslation } from "react-i18next";

const SignUp = () => {
    const dispatch = useDispatch()
    const history = useHistory();
    const location = useLocation()
    const { t } = useTranslation();

    const { control, formState: { errors }, handleSubmit, watch, setValue } = useForm();

    let { from } = location.state || { from: { pathname: '' } };

    let token = useSelector(state => state.profilePage.login.token);

    const [errorReg, setErrorReg] = useState('');

    const onSubmit = data => {
        if (data && data.username.charAt(0) === '+') {
            data.username = data.username.slice(1);
        }
        const date = new Date(data.dob);
        const offset = date.getTimezoneOffset();
        data.dob = new Date(date.getTime() - (offset * 60 * 1000)).toISOString().split('T')[0];
        dispatch(registerAcc(data)).then(({ data: regData, error }) => {
            if (regData) {
                history.push({
                    pathname: '/signup/confirm',
                    state: { username: data.username }
                });
            }
            if (error) {
                setErrorReg(error);
            }
        })
    }

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
        setValue('gender', 'man')
        setValue('last_name', '');
    }, [setValue]);

    return (
        <div className={classes.loginPage}>
            <div className={classes.bannerWrapper}>
                <div className={classes.banner} style={{ backgroundImage: `url(${banner})` }} />
            </div>
            <div className={classes.loginWrapper}>
                <div className={classes.loginContainer}>
                    <div className={classes.title}>
                        <h2>{t("registration")}</h2>
                        <Link to='/'>
                            <img src={logo} className='user-select-none user-drag-none' alt="Logo" />
                        </Link>
                    </div>
                    <div className={classes.loginForm}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Controller
                                render={({ field, fieldState: { error } }) =>
                                    <Input type='text' noShadow borderRadius='2' error={error}
                                        parentClassName={classes.inputContainer} {...field}
                                        label={t("forms:name")}
                                    />
                                }
                                name={'first_name'}
                                control={control}
                                rules={{ required: true }}
                            />
                            {/* <label>
                                <h3>Фамилия:</h3>
                                <input className={errors.last_name && classes.error}
                                    {...register("last_name", { required: true })} />
                                <span className={classes.error}>
                                    {errors.last_name && errors.last_name.type === 'required' && 'Пожалуйста заполните это поле'}
                                </span>
                            </label> */}
                            <Controller
                                render={({ field: { value, onChange }, fieldState: { error } }) => (
                                    <DatePicker
                                        noShadow
                                        borderRadius='3'
                                        label={t("forms:dateBirth")}
                                        name={'dob'}
                                        error={error}
                                        defaultValue={value ? value : false}
                                        parentClassName={classes.inputContainer}
                                        onChange={onChange}
                                        disabledDate='future'
                                    />
                                )}
                                name={'dob'}
                                control={control}
                                rules={{ required: true }}
                            />

                            <Controller
                                render={({ field, fieldState: { error } }) =>
                                    <PhoneNumberInput
                                        borderRadius='2'
                                        type='tel'
                                        error={error || errorReg}
                                        label={t("forms:phone")}
                                        parentClassName={`${classes.inputContainer}`}
                                        {...field} />
                                }
                                name={'username'}
                                control={control}
                                rules={{ required: true }}
                            />

                            <Controller
                                render={({ field: { value, onChange }, fieldState: { error } }) =>
                                    <Select
                                        label={t("forms:gender")}
                                        options={[
                                            { value: 'man', label: `${t("forms:male")}` },
                                            { value: 'woman', label: `${t("forms:female")}` },
                                            { value: 'other', label: `${t("forms:other")}` }
                                        ]}
                                        svgClassName='stroke-grey-3'
                                        defaultValue={{ value: 'man' }}
                                        parentClassName={`${classes.selectContainer}`}
                                        className='w-100 bc-grey-4 h-40px'
                                        error={error}
                                        onChange={(e) => setValue(e.value)}
                                    />
                                }
                                name={'gender'}
                                control={control}
                                rules={{ required: true }}
                            />
                            {/* <label>
                                <h3>Пол:</h3>
                                <select {...register("gender", { required: true })} >
                                    <option value="man">Мужской</option>
                                    <option value="woman">Женский</option>
                                    <option value="other">Другой</option>
                                </select>
                                <span className={classes.error}>
                                    {errors.gender && errors.gender.type === 'required' && 'Пожалуйста заполните это поле'}
                                </span>
                            </label> */}
                            <Controller
                                render={({ field, fieldState: { error } }) =>
                                    <Input noShadow borderRadius='2' error={error} type='password'
                                        parentClassName={classes.inputContainer} {...field}
                                        label={
                                            <>
                                                {t("forms:password")}<span>{t("forms:minPassword")}</span>
                                            </>
                                        }
                                    />
                                }
                                name={'password1'}
                                control={control}
                                rules={{ required: true, minLength: 8 }}
                            />
                            <Controller
                                render={({ field, fieldState: { error } }) =>
                                    <Input
                                        noShadow
                                        borderRadius='2'
                                        label={t("forms:repeatPassword")}
                                        error={error}
                                        type='password'
                                        parentClassName={classes.inputContainer}
                                        {...field}
                                    />
                                }
                                name={'password2'}
                                control={control}
                                rules={{
                                    required: true,
                                    validate: value => value === watch('password1', '' || `${t("forms:passMismatch")}`)
                                }}
                            />
                            <Controller
                                render={({ field }) =>
                                    <Checkbox
                                        parentClassName={classes.check}
                                        className={`${errors.checkbox && errors.checkbox.type === 'required' ? 'alert' : ''}`}
                                        {...field}>
                                        {t("forms:disclaimer")}
                                    </Checkbox>
                                }
                                name={'checkbox'}
                                control={control}
                                rules={{ required: true }}
                            />
                            <button type='submit'>{t("forms:sendCode")}</button>
                            <div className={classes.signup}>
                                <Link to='/login'>
                                    <p>{t("forms:haveAcc")}</p>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp
