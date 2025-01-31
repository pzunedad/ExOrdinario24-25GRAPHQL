import { Collection, ObjectId } from "mongodb";
import { RestaurantModel } from "./types.ts";
import { validatephone, validatecoordenadas, validatetime, validateweather } from "./utils.ts";
import { GraphQLError } from "graphql";

type Context = {
    RestaurantCollection: Collection<RestaurantModel>
} 

type MutationArgs = {
    id: string,
    name: string,
    adress: string,
    city: string,
    phone: string,
    country: string,
    latitud: number,
    longitud: number
}

export const resolvers = {
    Restaurant: {
        id:(parent: RestaurantModel) => parent._id!.toString(),
        adress:(parent: RestaurantModel) => `${parent.adress}, ${parent.city}, ${parent.country}`,
        temperature: async (parent: RestaurantModel) => await validateweather(parent.latitud, parent.longitud),
        hora: async (parent: RestaurantModel) => {
            const {hora, minuto} = await validatetime(parent.latitud, parent.longitud)
            return `${hora}, ${minuto}`
        }

    },

    Query: {
        getRestaurant: async(
            _:unknown,
            args: MutationArgs,
            context: Context
        ): Promise<RestaurantModel> => {
            const result = await context.RestaurantCollection.findOne({_id: new ObjectId(args.id)})
            if(!result) throw new GraphQLError ("Restaurant not found");
            return result;
        },
        getRestaurants: async(
            _:unknown,
            args: MutationArgs,
            context: Context
        ): Promise<RestaurantModel[]> => {
            const result = await context.RestaurantCollection.find({city: args.city}).toArray()
            if(result.length === 0) throw new GraphQLError("Restaurant not available in this city")
            return result;
        }
    },

    Mutation: {
        addRestaurant: async(
            _:unknown,
            args:MutationArgs,
            context: Context
        ): Promise<RestaurantModel> => {
            const phoneRestaurant = await context.RestaurantCollection.findOne({phone: args.phone})
            if(phoneRestaurant) throw new GraphQLError("Phone exists")
            
            const {country, is_valid} = await validatephone(args.phone)
            if(!is_valid) throw new GraphQLError("Phone not valid")
            const {latitud, longitud} = await validatecoordenadas(args.city)
            args = {...args, country, latitud, longitud}
            const {insertedId} = await context.RestaurantCollection.insertOne({...args})
            return {
                _id: insertedId,
                ...args
            }
        },
        deleteRestaurant: async(
            _:unknown,
            args: MutationArgs,
            context: Context
        ): Promise<boolean> => {
            const {deletedCount} = await context.RestaurantCollection.deleteOne({_id: new ObjectId(args.id)})
            if(deletedCount === 0) return false;
            return true;
        }
    }
}