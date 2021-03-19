import React from "react";
import { useMutation } from "@apollo/client";
import { BOOK_TRIP } from "../graphql/mutations";

const RocketLaunchDetail = ({ launchDetails }) => {
  const [bookTrip, { data, loading, error }] = useMutation(BOOK_TRIP, {
    errorPolicy: "all",
  });

  const clickHandler = () => {
    bookTrip({ variables: { siteId: launchDetails.id } });
  };

  data && console.log(data);
  error && console.log(error);

  return (
    <li
      key={launchDetails.id}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1em",
        margin: "0",
      }}
    >
      <div>
        <h2>{launchDetails.site}</h2>
        <p>{launchDetails.mission.name}</p>
        <p>{launchDetails.rocket.name}</p>
      </div>
      <button
        style={{
          padding: "1em",
          border: "1px solid #cecece",
          cursor: "pointer",
        }}
        onClick={clickHandler}
      >
        {loading
          ? "Booking"
          : data && data.bookTrips.success
          ? "Booked"
          : "Book Trip"}
      </button>
    </li>
  );
};

export default RocketLaunchDetail;
