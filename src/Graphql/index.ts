import { ApolloServer } from "@apollo/server";
import userDefs from "./User/typedefs";
import User from "./User/resolver";
import categoriesDef from "./Categories/typedefs";
import Categories from "./Categories/resolver";
import adsDef from "./Ads/typedefs";
import Ads from "./Ads/resolver";
import { makeExecutableSchema } from "@graphql-tools/schema";
import planDefs from "./Plan/typedefs";
import Plan from "./Plan/resolver";
import TimeSlotDefs from "./TimeSlots/typedefs";
import TimeSlot from "./TimeSlots/resolver";
import dashboardDef from "./Dashboard/typedefs";
import Dashboard from "./Dashboard/resolver";
import customerDefs from "./Customers/typedefs";
import Customer from "./Customers/resolver";

async function createApolloGraphQlServer() {
  const schema = makeExecutableSchema({
    typeDefs: [userDefs, categoriesDef, adsDef , planDefs, TimeSlotDefs , dashboardDef , customerDefs],
    resolvers: [
      User,
      Categories,
      Ads,
      Plan,
      TimeSlot,
      Dashboard,
      Customer
    ],
  });

  const gqlServer = new ApolloServer({
    schema, // Provide the schema directly
    csrfPrevention: false,
  });

  await gqlServer.start();
  return gqlServer;
}

export default createApolloGraphQlServer;
