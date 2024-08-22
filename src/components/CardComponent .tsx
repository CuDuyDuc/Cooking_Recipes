import React from 'react';
import { Image, StyleProp, TouchableOpacity, View, ViewStyle, Dimensions } from 'react-native';
import COLORS from '../assets/colors/Colors';
import TextComponent from './TextComponent';
import { Heart } from 'iconsax-react-native';
import { globalStyle } from '../styles/globalStyle';
import { FONTFAMILY } from '../../assets/fonts';

interface Props {
    dataCookingRecipes: any,
    nameCate?: string,
    styles?: StyleProp<ViewStyle>,
    onPress?: () => void
}

const CardComponent = (props: Props) => {
    const { dataCookingRecipes, nameCate, styles, onPress } = props;
    const cardWidth = (Dimensions.get('window').width / 2) - 24;

    return (
        <TouchableOpacity 
            onPress={onPress}
            activeOpacity={0.9} 
            style={[globalStyle.shadowCard,
                    { width: cardWidth, 
                    height: 190, 
                    borderRadius: 16, 
                    borderColor: COLORS.HEX_LIGHT_GREY, 
                    backgroundColor: COLORS.WHITE, padding: 16, 
                    marginBottom: 16, borderWidth: 1 }, styles]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
                <TouchableOpacity activeOpacity={0.7} style={{ paddingEnd: 10 }}>
                    <Heart color={COLORS.RED} />
                </TouchableOpacity>
                <Image
                    src={dataCookingRecipes?.strMealThumb ?? 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg'}
                    style={{ width: 100, height: 80, borderRadius: 8 }}
                />
            </View>
            <TextComponent
                text={nameCate??dataCookingRecipes?.strCategory}
                color= {COLORS.TEAL_GREEN}
                font= {FONTFAMILY.montserrat_bold}
                size={16}
                styles={{ marginBottom: 4 }}
            />
            <TextComponent
                text={dataCookingRecipes?.strMeal}
                color={COLORS.BLACK}
                font={FONTFAMILY.montserrat_regular}
                size={14}
                styles={{ marginBottom: 12 }}
                numberOfLines={2}
            />
        </TouchableOpacity>
    );
};

export default CardComponent;
