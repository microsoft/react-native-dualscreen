import { ImageSourcePropType } from "react-native";

export interface IRestaurantDetails {

    name: string;
    city: string;
    address: string;
    phoneNumber: string;
    storeHours: string;
    deliveryHours: string;
    gallery: imageRequire[]
}

export type imageRequire = { image: ImageSourcePropType}; 

export interface IMenuItem {
    name: string,
    size: pizzaSize,
    price: number
}

export type pizzaSize = 'SMALL' | 'MEDIUM' | 'LARGE';