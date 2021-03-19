import React, { useState, useEffect } from "react";
import uuid from "react-uuid";
import _ from "lodash";
import { useQuery } from "@apollo/client";
import { GET_ROCKET_LAUNCHES_DATA } from "../graphql/query";
import RocketLaunchDetail from "./RocketLaunchDetail";

const RocketLaunchesList = () => {
  const [launchData, setLaunchData] = useState();

  const { data, loading, error, fetchMore } = useQuery(
    GET_ROCKET_LAUNCHES_DATA,
    {
      variables: {
        limit: 5,
        cr: "1603553460",
      },
    }
  );

  useEffect(() => {
    if (data) {
      console.log(data.launches[data.launches.length - 1]);
      setLaunchData(() => {
        let temp = [];
        _.forEach(data.launches, (da) => {
          temp = [...temp, ...da.launches];
        });
        return temp;
        // [...data.launches[0].launches];
      });
    }
  }, [data]);

  error && console.log(error);

  return (
    <div>
      <h2>Rocket Launches List</h2>
      {loading ? (
        <div>Getting rocket launches data...</div>
      ) : (
        launchData && (
          <>
            <ul style={{ textAlign: "left", padding: 0 }}>
              {launchData.map((launchDetails) => (
                <RocketLaunchDetail
                  key={launchDetails.id + uuid()}
                  launchDetails={launchDetails}
                />
              ))}
            </ul>
            <button
              style={{ margin: "2em", padding: "1em" }}
              onClick={() =>
                fetchMore({
                  variables: { limit: 5, cr: launchData.cursor },
                })
              }
            >
              {" "}
              Load more{" "}
            </button>
          </>
        )
      )}
    </div>
  );
};

export default RocketLaunchesList;
