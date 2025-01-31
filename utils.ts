import {GraphQLError} from "graphql";
import {API_datetime, API_lat_lon, API_PHONE, API_TEMPERATURA} from "./types.ts";

const API_KEY = Deno.env.get("API_KEY");

export const validatephone = async (phone:string) => {
    if(!API_KEY) throw new GraphQLError("API_KEY not found");
    const url = `https://api.api-ninjas.com/v1/validatephone?number=${phone}`
    const data = await fetch(url, {
        headers: {
            'X-Api-Key': API_KEY
          },
    })
    if(data.status!== 200) throw new GraphQLError("Error in the API")
    const result:API_PHONE = await data.json()
    return {
        is_valid: result.is_valid,
        country: result.country,
    }
}

export const validatecoordenadas = async (city: string) => {
    if(!API_KEY) throw new GraphQLError("API_KEY not found")
    const url = `https://api.api-ninjas.com/v1/city?name=${city}`
    const data = await fetch(url, {
        headers: {
            'X-Api-Key': API_KEY
          },
    })
    if(data.status!== 200) throw new GraphQLError("Error in the API")
    const result = await data.json()
    const aux:API_lat_lon = result[0]
    return {
        latitud: aux.latitude,
        longitud: aux.longitude

    }

}

export const validatetime = async (lat: number, lon: number) => {
    if(!API_KEY) throw new GraphQLError("API_KEY not found");
    const url = `https://api.api-ninjas.com/v1/worldtime?lat=${lat}&lon=${lon}`
    const data = await fetch(url, {
        headers: {
            'X-Api-Key': API_KEY
          },
    })
    if(data.status!== 200) throw new GraphQLError("Error in the API")
    const result:API_datetime = await data.json()
    return {
        hora: result.hour,
        minuto: result.minute
    }
}

export const validateweather = async (lat:number, lon:number) => {
    if(!API_KEY) throw new GraphQLError("API_KEY not found");
    const url = `https://api.api-ninjas.com/v1/weather?lat=${lat}&lon=${lon}`
    const data = await fetch(url, {
        headers: {
            'X-Api-Key': API_KEY
          },
    })
    if(data.status!== 200) throw new GraphQLError("Error in the API")
    const result:API_TEMPERATURA = await data.json()
    return result.temp;
} 



