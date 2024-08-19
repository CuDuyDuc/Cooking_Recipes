import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import IMAGES from '../assets/images/Images'

const SplashScreen = () => {

    return (
        <ImageBackground source={IMAGES.SplashScreen} style = {{flex: 1}}></ImageBackground>
    )
}

export default SplashScreen