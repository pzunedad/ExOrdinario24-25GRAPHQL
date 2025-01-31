import { MongoClient } from 'mongodb'
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from "./schema.ts";
import { resolvers } from "./resolvers.ts";
import { RestaurantModel } from "./types.ts";
import { GraphQLError } from "graphql";

const MONGO_URL = Deno.env.get("MONGO_URL")
if(!MONGO_URL){
  console.error("Error MONGO_URL");
  Deno.exit(1);
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