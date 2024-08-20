import { Lock, Sms } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { FONTFAMILY } from '../../../assets/fonts';
import COLORS from '../../assets/colors/Colors';
import { ButtonComponent, InputComponent, KeyboardAvoidingViewWrapper, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components';
import { Validate } from '../../utils/validate';
import { Button, Image, Switch, TouchableOpacity } from 'react-native';
import { globalStyle } from '../../styles/globalStyle';
import { Facebook, Google } from '../../assets/svgs';
import { LoadingModal } from '../../modal';

const LoginScreen = ({navigation}: any) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRemember, setIsRemember] = useState(true);
    const [isDisable, setIsDisable] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const emailValidation = Validate.email(email);

        if (!email || !password || !emailValidation) {
            setIsDisable(true);
        } else {
            setIsDisable(false);
        }
    }, [email, password]);

    return (
        <KeyboardAvoidingViewWrapper>
            <SectionComponent>
                <SpaceComponent height={70}/>
                <TextComponent
                    text='Đăng Nhập'
                    styles={{ fontFamily: FONTFAMILY.montserrat_bold }}
                    color={COLORS.BLACK}
                    size={45} />
                <TextComponent
                    text='Welcome Back'
                    size={30}
                    styles={{ fontFamily: FONTFAMILY.montserrat_regular }}
                    color={COLORS.BLACK} />
            </SectionComponent>
            <SpaceComponent height={40} />
            <SectionComponent>
                <TextComponent
                    text='Email'
                    styles={{ fontFamily: FONTFAMILY.montserrat_regular }}
                    color={COLORS.BLACK} />
                <InputComponent
                    value={email}
                    placeholder='Email'
                    onChange={val => setEmail(val)}
                    allowClear
                    affix={<Sms size={22} color={COLORS.HEX_LIGHT_GREY} />} />
                <TextComponent
                    text='Password'
                    styles={{ fontFamily: FONTFAMILY.montserrat_regular }}
                    color={COLORS.BLACK} />
                <InputComponent
                    value={password}
                    placeholder='Mật khẩu'
                    onChange={val => setPassword(val)}
                    isPassword
                    affix={<Lock size={22} color={COLORS.HEX_LIGHT_GREY} />} />
            </SectionComponent>
            <SectionComponent>
                <RowComponent justify='space-between'>
                    <RowComponent onPress={() => setIsRemember(!isRemember)}>
                        <Switch
                            trackColor={{ false: COLORS.WHITE, true: COLORS.TEAL_GREEN }}
                            thumbColor={isRemember ? COLORS.WHITE : COLORS.TEAL_GREEN}
                            value={isRemember}
                            onChange={() => setIsRemember(!isRemember)} />
                        <TextComponent text='Ghi nhớ tài khoản' color={COLORS.BLACK} />
                    </RowComponent>
                    <ButtonComponent
                        text='Quên mật khẩu?'
                        onPress={() => navigation.navigate('ForgotPassWord')}
                        type="link" />
                </RowComponent>
            </SectionComponent>
            <SectionComponent styles={{ marginTop: 20 }}>
                <ButtonComponent
                    disable={isDisable}
                    text='ĐĂNG NHẬP'
                    type='#129575'
                    // onPress={handleLogin}
                />
            </SectionComponent>
            <SectionComponent>
                <TextComponent
                    text='Đăng nhập với'
                    color={COLORS.HEX_LIGHT_GREY}
                    styles={{
                        textAlign: 'center',
                        fontSize: 16,
                        fontFamily: FONTFAMILY.montserrat_medium,
                        marginBottom: 30
                    }} />
                <RowComponent>
                    <ButtonComponent
                        text='Google'
                        iconFlex='left'
                        type='#129575'
                        styles={globalStyle.shadow}
                        textColor={COLORS.HEX_LIGHT_GREY}
                        // onPress={handleLoginWithGoogle}
                        icon={<Google />}
                    />
                    <ButtonComponent
                        text='Facebook'
                        iconFlex='left'
                        type='#129575'
                        // onPress={handleLoginWithFacebook}
                        styles={globalStyle.shadow}
                        textColor={COLORS.HEX_LIGHT_GREY}
                        icon={<Facebook />} />
                </RowComponent>
            </SectionComponent>
            <SectionComponent>
                <SpaceComponent height={20}/>
                <RowComponent justify='center'>
                    <TextComponent text="Bạn chưa có tài khoản?  " color={COLORS.BLACK} />
                    <ButtonComponent type='link' text='Đăng ký' onPress={() => {
                        navigation.navigate('SignUpScreen')
                    }} />
                </RowComponent>
            </SectionComponent>
            <LoadingModal visible={isLoading} />
        </KeyboardAvoidingViewWrapper>
    )
}

export default LoginScreen