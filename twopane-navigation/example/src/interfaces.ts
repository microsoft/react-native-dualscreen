
export interface IRestaurantDetails {

    name: string;
    city: string;
    address: string;
    phoneNumber: string;
    storeHours: string;
    deliveryHours: string;
}

export interface IMenuItem {
    name: string,
    size: pizzaSize,
    price: number
}

export type pizzaSize = 'SMALL' | 'MEDIUM' | 'LARGE';