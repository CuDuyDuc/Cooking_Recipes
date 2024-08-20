import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Heart, Home2, SearchNormal1, User } from 'iconsax-react-native';
import React, { ReactNode } from 'react';
import { FONTFAMILY } from '../../assets/fonts';
import COLORS from '../assets/colors/Colors';
import { TextComponent } from '../components';
import { FavouriteScreen, HomeScreen, ProFileScreen, SearchScreen } from '../screen';

const TabNavigator = () => {
    const Tab =  createBottomTabNavigator();  
    return (
      <Tab.Navigator screenOptions={({ route }) => ({
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
              height: 60,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: COLORS.WHITE,
              borderColor: COLORS.WHITE, 
          },
          tabBarIcon: ({ focused, color, size }) => {
              let icon: ReactNode;
              color = focused ? COLORS.TEAL_GREEN : COLORS.HEX_LIGHT_GREY
  
              switch (route.name) {
                  case 'Trang Chủ':
                      icon = <Home2 size={size} color={color} variant="Bold" />;
                      break;
                  case 'Tìm Kiếm':
                      icon = <SearchNormal1 size={size} color={color} variant="Bold" />
                      break;
                  case 'Yêu Thích':
                      icon = <Heart size={size} color={color} variant="Bold" />
                      break;
                  case 'Profile':
                      icon = <User size={size} color={color} variant="Bold" />
                      break;
  
              }
              return icon;
          },
          tabBarIconStyle: {
              marginTop: 4
          },
          tabBarLabel({ focused }) {
              return <TextComponent text={route.name} flex={0} size={12} color={focused ? COLORS.TEAL_GREEN : COLORS.HEX_LIGHT_GREY} font={FONTFAMILY.montserrat_bold} />;
          },
      })}>
          <Tab.Screen name="Trang Chủ" component={HomeScreen} />
          <Tab.Screen name="Tìm Kiếm" component={SearchScreen} />
          <Tab.Screen name="Yêu Thích" component={FavouriteScreen} />
          <Tab.Screen name="Profile" component={ProFileScreen}/>
      </Tab.Navigator>
  )
  }
  
  export default TabNavigator