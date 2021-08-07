import React from "react";

const Stats = (props) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr className="table-dark">
          <th scope="col">Artist</th>
          <th scope="col">Number of Albums Released Each Year</th>
        </tr>
      </thead>
      <tbody>{props.children}</tbody>
    </table>
  );
};

export default Stats;
