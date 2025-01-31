import { OptionalId } from "mongodb";

export type RestaurantModel = OptionalId<{
    name: string,
    adress: string,
    city: string
    phone:string,
    country: string,
    latitud: number,
    longitud: number
}>

//https://api-ninjas.com/api/validatephone
export type API_PHONE = {
    is_valid: boolean,
    country: string,
}

//https://api-ninjas.com/api/city
export type API_lat_lon = {
    latitude: number,
    longitude: number
}

export type API_datetime = {
    hour: number,
    minute: number
}


//https://api-ninjas.com/api/weather
export type API_TEMPERATURA = {
    temp: number,
}
