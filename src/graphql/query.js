import { gql } from "@apollo/client";

export const GET_ROCKET_LAUNCHES_DATA = gql`
  query GetRocketLauchesData($limit: Int, $cr: String) {
    launches(pageSize: $limit, after: $cr) {
      hasMore
      cursor
      launches {
        id
        site
        mission {
          name
        }
        rocket {
          name
        }
      }
    }
  }
`;
export const GET_LAUNCH_DATA_BY_ID = gql`
  query GetLaunchById($id: ID!) {
    launch(id: $id) {
      id
      site
      mission {
        name
      }
      rocket {
        id
        name
      }
    }
  }
`;
