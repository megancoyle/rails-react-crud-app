import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import axios from "axios";
import setAxiosHeaders from "./AxiosHeaders";

class Record extends React.Component {
  constructor(props) {
    super(props);
    this.handleDestroy = this.handleDestroy.bind(this);
    this.path = `/api/v1/records/${this.props.record.id}`;
    this.handleChange = this.handleChange.bind(this);
    this.updateRecord = this.updateRecord.bind(this);
    this.artistRef = React.createRef();
    this.albumRef = React.createRef();
    this.yearRef = React.createRef();
    this.conditionRef = React.createRef();
  }

  handleChange() {
    this.updateRecord();
  }

  updateRecord = _.debounce(() => {
    setAxiosHeaders();
    axios
      .put(this.path, {
        record: {
          artist: this.artistRef.current.value,
          album: this.albumRef.current.value,
          year: this.yearRef.current.value,
          condition: this.conditionRef.current.value,
        },
      })
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
  }, 1000);

  handleDestroy() {
    setAxiosHeaders();
    const confirmation = confirm("Are you sure?");
    if (confirmation) {
      axios
        .delete(this.path)
        .then((response) => {
          this.props.getRecords();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  render() {
    const { record } = this.props;
    return (
      <tr>
        <td>
          <input
            type="text"
            defaultValue={record.artist}
            onChange={this.handleChange}
            ref={this.artistRef}
            className="form-control"
            id={`record__artist-${record.id}`}
          />
        </td>
        <td>
          <input
            type="text"
            defaultValue={record.album}
            onChange={this.handleChange}
            ref={this.albumRef}
            className="form-control"
            id={`record__album-${record.id}`}
          />
        </td>
        <td>
          <input
            type="text"
            defaultValue={record.year}
            onChange={this.handleChange}
            ref={this.yearRef}
            className="form-control"
            id={`record__year-${record.id}`}
          />
        </td>
        <td>
          <input
            type="text"
            defaultValue={record.condition}
            onChange={this.handleChange}
            ref={this.conditionRef}
            className="form-control"
            id={`record__condition-${record.id}`}
          />
        </td>
        <td className="text-right">
          <button
            onClick={this.handleDestroy}
            className="btn btn-outline-danger"
          >
            Remove
          </button>
        </td>
      </tr>
    );
  }
}

export default Record;

Record.propTypes = {
  record: PropTypes.object.isRequired,
  getRecords: PropTypes.func.isRequired,
};
