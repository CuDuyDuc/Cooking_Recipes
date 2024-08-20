import { Lock, Sms, User } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { FONTFAMILY } from '../../../assets/fonts';
import COLORS from '../../assets/colors/Colors';
import { ButtonComponent, InputComponent, KeyboardAvoidingViewWrapper, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components';
import { LoadingModal } from '../../modal';
import { Validate } from '../../utils/validate';
import authenticationAPI from '../../apis/authAPI';


const initValues = {
    username: '',
    email: '',
    password: '',
    confirmPass: '',
}

const SignUpScreen = ({ navigation }: any) => {

    const [values, setValues] = useState(initValues);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<any>();
    const [isDisable, setIsDisable] = useState(true);

    useEffect(() => {
        if (
            !errorMessage ||
            (errorMessage &&
                (errorMessage.email ||
                    errorMessage.password ||
                    errorMessage.confirmPass)) ||
            !values.email ||
            !values.password ||
            !values.confirmPass
        ) {
            setIsDisable(true);
        } else {
            setIsDisable(false);
        }
    }, [errorMessage, values]);


    const handleChangeValue = (key: string, value: string) => {
        const data: any = { ...values }
        data[`${key}`] = value;
        setValues(data);
    }

    const formValidator = (key: string) => {
        const data = { ...errorMessage };
        let message = ``;

        switch (key) {
            case 'email':
                if (!values.email) {
                    message = `Vui lòng nhập Email!`;
                } else if (!Validate.email(values.email)) {
                    message = 'Email không hợp lệ!';
                } else {
                    message = '';
                }

                break;

            case 'password':
                message = !values.password ? `Vui lòng nhập Password` : '';
                break;

            case 'confirmPass':
                if (!values.confirmPass) {
                    message = `Vui lòng nhập xác nhận mật khẩu!`;
                } else if (values.confirmPass !== values.password) {
                    message = 'Mật khẩu không khớp!';
                } else {
                    message = '';
                }

                break;
        }

        data[`${key}`] = message;

        setErrorMessage(data);
    };

    const handleRegister = async () => {
        const api = `/verification`;
        setIsLoading(true);
        try {
            const res = await authenticationAPI.HandleAuthentication(
                api,
                { email: values.email },
                'post',
            );

            setIsLoading(false);

            navigation.navigate('Verification', {
                code: res.data.code,
                ...values,
            });
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    return (
        <>
            <KeyboardAvoidingViewWrapper>
                <SectionComponent>
                    <SpaceComponent height={70} />
                    <TextComponent
                        text='Đăng Ký'
                        styles={{ fontFamily: FONTFAMILY.montserrat_bold }}
                        color={COLORS.TEAL_GREEN}
                        size={45} />
                    <TextComponent
                        text='Bạn hãy thiết lập tài khoản của mình, sẽ không mất nhiều thời gian.'
                        size={18}
                        styles={{ fontFamily: FONTFAMILY.montserrat_regular }}
                        color={COLORS.BLACK} />
                </SectionComponent>
                <SpaceComponent height={40} />
                <SectionComponent>
                    <TextComponent
                        text='Họ tên'
                        styles={{ fontFamily: FONTFAMILY.montserrat_bold }}
                        color={COLORS.BLACK} />
                    <SpaceComponent height={5} />
                    <InputComponent
                        value={values.username}
                        placeholder='Họ tên'
                        onChange={val => handleChangeValue('username', val)}
                        allowClear
                        affix={<User size={22} color={COLORS.HEX_LIGHT_GREY} />} />
                    <TextComponent
                        text='Email'
                        styles={{ fontFamily: FONTFAMILY.montserrat_bold }}
                        color={COLORS.BLACK} />
                    <SpaceComponent height={5} />
                    <InputComponent
                        value={values.email}
                        placeholder='Email'
                        onChange={val => handleChangeValue('email', val)}
                        allowClear
                        affix={<Sms size={22} color={COLORS.HEX_LIGHT_GREY} />}
                        onEnd={() => formValidator('email')} />
                    <TextComponent
                        text='Mật khẩu'
                        styles={{ fontFamily: FONTFAMILY.montserrat_bold }}
                        color={COLORS.BLACK} />
                    <SpaceComponent height={5} />
                    <InputComponent
                        value={values.password}
                        placeholder='Mật khẩu'
                        onChange={val => handleChangeValue('password', val)}
                        isPassword
                        affix={<Lock size={22} color={COLORS.HEX_LIGHT_GREY} />}
                        onEnd={() => formValidator('password')} />
                    <TextComponent
                        text='Xác nhận mật khẩu'
                        styles={{ fontFamily: FONTFAMILY.montserrat_bold }}
                        color={COLORS.BLACK} />
                    <SpaceComponent height={5} />
                    <InputComponent
                        value={values.confirmPass}
                        placeholder='Xác nhận mật khẩu'
                        onChange={val => handleChangeValue('confirmPass', val)}
                        isPassword
                        affix={<Lock size={22} color={COLORS.HEX_LIGHT_GREY} />}
                        onEnd={() => formValidator('confirmPass')} />
                </SectionComponent>
                {errorMessage && (
                    <SectionComponent>
                        {Object.keys(errorMessage).map(
                            (error, index) =>
                                errorMessage[`${error}`] && (
                                    <TextComponent
                                        text={errorMessage[`${error}`]}
                                        key={`error${index}`}
                                        color={COLORS.RED}
                                    />
                                ),
                        )}
                    </SectionComponent>
                )}
                <SectionComponent styles={{ marginTop: 20 }}>
                    <ButtonComponent
                        text='ĐĂNG KÝ'
                        type='#129575'
                        onPress={handleRegister}
                        disable={isDisable} />
                </SectionComponent>
                <SectionComponent>
                    <RowComponent justify='center'>
                        <TextComponent text="Bạn đã có tài khoản?  " color={COLORS.BLACK} />
                        <ButtonComponent type='link' text='Đăng nhập' onPress={() => {
                            navigation.navigate('LoginScreen')
                        }} />
                    </RowComponent>
                </SectionComponent>
            </KeyboardAvoidingViewWrapper>
            <LoadingModal visible={isLoading} />
        </>
    )
}

export default SignUpScreen