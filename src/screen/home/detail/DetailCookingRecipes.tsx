import { View, Text } from 'react-native'
import React from 'react'

const DetailCookingRecipes = ({navigation, route}: any) => {

    const {data} = route.params 
    console.log(data);
    
    return (
        <View>
            <Text>DetailCookingRecipes</Text>
        </View>
    )
}

export default DetailCookingRecipes