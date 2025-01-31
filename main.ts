import { MongoClient } from 'mongodb'
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from "./schema.ts";
import { resolvers } from "./resolvers.ts";
import { RestaurantModel } from "./types.ts";
import { GraphQLError } from "graphql";

const MONGO_URL = Deno.env.get("MONGO_URL")
if(!MONGO_URL){
  throw new GraphQLError("ERROR MONGO_URL")
}

const client = new MongoClient(MONGO_URL)
await client.connect()
console.log("Conectado a MongoDB")

const db = client.db("NomBD")
const RestaurantCollection = db.collection<RestaurantModel>("Restaurantes")

const server = new ApolloServer({typeDefs, resolvers})

const { url } = await startStandaloneServer(server, {
  context: async() => ({ RestaurantCollection})
})

console.log(`🚀  Server ready at: ${url}`);