export const typeDefs = `#graphql

    type Restaurant {
        id: ID!,
        name: String!
        adress: String!
        phone: String!
        temperature: String!
        time: String!
    }

    type Query {
        getRestaurant(id: ID!): Restaurante!
        getRestaurants(city: String!): [Restaurante!]!
    }

    type Mutation {
        addRestaurant(name: String!, adress:String!, city: String!, phone: String!): Restaurante!
        deleteRestaurant(id: ID!): Boolean
    }

`