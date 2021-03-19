import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!) {
    login(email: $email) {
      token
      email
    }
  }
`;

export const BOOK_TRIP = gql`
  mutation BookTrip($siteId: [ID]!) {
    bookTrips(launchIds: $siteId) {
      success
    }
  }
`;
