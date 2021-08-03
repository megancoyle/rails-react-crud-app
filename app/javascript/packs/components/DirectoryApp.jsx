import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Records from "./Records";
import Record from "./Record";
import RecordForm from "./RecordForm";
import Pagination from "./Pagination";
import Loader from "./Loader";

class DirectoryApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      currentPage: 1,
      recordsPerPage: 10,
      isLoading: true,
    };
    this.getRecords = this.getRecords.bind(this);
    this.createRecord = this.createRecord.bind(this);
  }

  componentDidMount() {
    this.getRecords();
  }

  getRecords() {
    axios
      .get("/api/v1/records")
      .then((response) => {
        this.setState({ isLoading: true });
        const records = response.data;
        this.setState({ records });
        this.setState({ isLoading: false });
      })
      .catch((error) => {
        this.setState({ isLoading: true });
        console.log(error);
      });
  }

  createRecord(record) {
    const records = [record, ...this.state.records];
    this.setState({ records });
  }

  render() {
    // pagination
    const { records, currentPage, recordsPerPage } = this.state;
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);
    // change page
    const paginate = (pageNumber) => this.setState({ currentPage: pageNumber });

    return (
      <>
        {!this.state.isLoading && (
          <>
            <RecordForm createRecord={this.createRecord} />
            <Records>
              {currentRecords.map((record) => (
                <Record
                  key={record.id}
                  record={record}
                  getRecords={this.getRecords}
                />
              ))}
            </Records>
            {records.length > 10 && (
              <>
                <Pagination
                  recordsPerPage={recordsPerPage}
                  totalRecords={records.length}
                  paginate={paginate}
                />
                <p>{records.length} Total Albums</p>
              </>
            )}
          </>
        )}
        {this.state.isLoading && <Loader />}
      </>
    );
  }
}

document.addEventListener("turbolinks:load", () => {
  const app = document.getElementById("record-app");
  app && ReactDOM.render(<DirectoryApp />, app);
});
