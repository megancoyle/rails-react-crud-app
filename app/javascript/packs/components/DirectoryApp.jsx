import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Records from "./Records";
import Record from "./Record";
import RecordForm from "./RecordForm";
import Pagination from "./Pagination";
import Loader from "./Loader";
import SearchBox from "./SearchBox";

class DirectoryApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      currentPage: 1,
      recordsPerPage: 10,
      isLoading: true,
      searchValue: "",
    };
    this.getRecords = this.getRecords.bind(this);
    this.createRecord = this.createRecord.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
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

  searchHandler(value) {
    this.setState({ searchValue: value });
    this.setState({ currentPage: 1 });
  }

  render() {
    const { records, currentPage, recordsPerPage, isLoading } = this.state;

    // update records list based on search query
    let updateRecords = records.filter((record) => {
      return Object.keys(record).some((key) =>
        record[key]
          .toString()
          .toLowerCase()
          .includes(this.state.searchValue.toString().toLowerCase())
      );
    });

    // pagination
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = updateRecords.slice(
      indexOfFirstRecord,
      indexOfLastRecord
    );

    // change page
    const paginate = (pageNumber) => this.setState({ currentPage: pageNumber });

    return (
      <>
        {!isLoading && (
          <>
            <RecordForm createRecord={this.createRecord} />
            <SearchBox searchHandler={this.searchHandler} />
            <Records>
              {currentRecords.map((record) => (
                <Record
                  key={record.id}
                  record={record}
                  getRecords={this.getRecords}
                />
              ))}
            </Records>
            {updateRecords.length > 10 && (
              <>
                <Pagination
                  recordsPerPage={recordsPerPage}
                  totalRecords={updateRecords.length}
                  paginate={paginate}
                />
                <p>{updateRecords.length} Total Albums</p>
              </>
            )}
            {!updateRecords.length && <p>Nothing to see here...</p>}
          </>
        )}
        {isLoading && <Loader />}
      </>
    );
  }
}

document.addEventListener("turbolinks:load", () => {
  const app = document.getElementById("record-app");
  app && ReactDOM.render(<DirectoryApp />, app);
});
