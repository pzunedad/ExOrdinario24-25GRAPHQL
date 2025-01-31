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
        getRestaurant(id: ID!): Restaurant!
        getRestaurants(city: String!): [Restaurant!]!
    }

    type Mutation {
        addRestaurant(name: String!, adress:String!, city: String!, phone: String!): Restaurant!
        deleteRestaurant(id: ID!): Boolean
    }

`