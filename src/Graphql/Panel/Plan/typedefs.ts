import { gql } from "graphql-tag";

const planDefs = gql`
  scalar DateTime
  scalar Upload 
type slot {
      planId:Int
      timeSlotId:Int
}
  type Plan {
    id: ID
    name: String
    image: String
    description: String
    price: Int
    credits: Int
    timeSlots: [slot]
    type: String
    status: Boolean
    createdAt: DateTime
    updatedAt: DateTime
  }

  type PaginatedPlans {
    plans: [Plan]
    totalCount: Int
    page: Int
    pageSize: Int
    totalPages: Int
  }

  input PlanFilter {
    search: String
  }

  type Query {
    plans(page: Int, pageSize: Int, filter: PlanFilter): PaginatedPlans
    plan(id: ID!): Plan
  }

  type Mutation {
    createPlan(
      name: String
      image: Upload
      description: String
      price: Int
      credits: Int
      timeSlots: [Int!]! # Array of non-null integers
      type: String
      status: Boolean = false
    ): Plan
    updatePlan(
      id: ID!
      name: String
      description: String
      price: Int
      credits: Int
      timeSlots: [Int!] # Optional array of non-null integers
      type: String
      status: Boolean
      image: Upload
    ): Plan
    deletePlan(id: ID!): Plan
  }
`;

export default planDefs;