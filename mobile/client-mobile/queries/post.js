import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts {
    getPosts {
      id
      title
      content
      imgUrl
      createdAt
      userMongoId
      categoryId
      slug
      Category {
        name
      }
    }
  }
`;

export const GET_POST = gql`
  query GetPost($slug: String) {
    getPost(slug: $slug) {
      id
      title
      slug
      content
      imgUrl
      categoryId
      userMongoId
      createdAt
      updatedAt
      Category {
        name
      }
      Tags {
        name
      }
      Author {
        username
      }
    }
  }
`;
