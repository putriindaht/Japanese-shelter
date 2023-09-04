import { gql } from "@apollo/client";
export const GET_ONE_USER = gql`
  query GetOneUser($id: ID) {
    getOneUser(_id: $id) {
      _id
      username
      role
    }
  }
`;
