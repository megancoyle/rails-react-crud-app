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
      .then((response) => {
        window.location.reload(false);
      })
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
            onClick={this.handleArtistClick}
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
              <path
                fillRule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
              />
            </svg>
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
