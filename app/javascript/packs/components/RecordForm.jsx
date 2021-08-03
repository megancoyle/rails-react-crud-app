import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import setAxiosHeaders from "./AxiosHeaders";

class RecordForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.artistRef = React.createRef();
    this.albumRef = React.createRef();
    this.yearRef = React.createRef();
    this.conditionRef = React.createRef();
  }

  handleSubmit(e) {
    e.preventDefault();
    setAxiosHeaders();
    axios
      .post("/api/v1/records", {
        record: {
          artist: this.artistRef.current.value,
          album: this.albumRef.current.value,
          year: this.yearRef.current.value,
          condition: this.conditionRef.current.value,
        },
      })
      .then((response) => {
        const record = response.data;
        this.props.createRecord(record);
      })
      .catch((error) => {
        console.log(error);
      });
    e.target.reset();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="record-form">
        <div className="row">
          <div className="col">
            <input
              type="text"
              name="artist"
              ref={this.artistRef}
              required
              className="form-control"
              id="artist"
              placeholder="Add Artist Name"
            />
          </div>
          <div className="col">
            <input
              type="text"
              name="album"
              ref={this.albumRef}
              required
              className="form-control"
              id="album"
              placeholder="Add Album"
            />
          </div>
          <div className="col">
            <input
              type="text"
              name="year"
              ref={this.yearRef}
              required
              className="form-control"
              id="year"
              placeholder="Add Album Year"
            />
          </div>
          <div className="col">
            <input
              type="text"
              name="condition"
              ref={this.conditionRef}
              required
              className="form-control"
              id="condition"
              placeholder="Add Album Condition"
            />
          </div>
          <div className="col">
            <button className="btn btn-outline-success btn-block">
              Add Record
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default RecordForm;

RecordForm.propTypes = {
  createRecord: PropTypes.func.isRequired,
};
