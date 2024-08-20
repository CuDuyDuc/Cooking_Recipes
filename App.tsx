import { StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import SplashScreen from './src/screen/SplashScreen';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './src/navigators/MainNavigator';
import AuthNavigator from './src/navigators/AuthNavigator';

const App = () => {
  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowSplash(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [])


  return (
    <>
      <StatusBar 
        barStyle={'dark-content'}
        backgroundColor="transparent"
        translucent/>
      {isShowSplash ? (
        <SplashScreen/>
      ):(
        <NavigationContainer>
          <AuthNavigator/>
        </NavigationContainer>
      )}
    </>
  )
}

export default App