import React from "react";

class Records extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <table className="table table-striped">
        <thead>
            <tr className="table-dark">
            <th scope="col">Artist</th>
            <th scope="col">Album</th>
            <th scope="col">Year</th>
            <th scope="col">Condition</th>
            <th scope="col"></th>
            </tr>
        </thead>
        <tbody>{this.props.children}</tbody>
        </table>
      </>
    );
  }
}

export default Records;
