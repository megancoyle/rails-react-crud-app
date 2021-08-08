import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Loader from "./Loader";
import Stats from "./Stats";

class StatsApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      isLoading: true,
    };
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

  getMostCommonWord(items) {
    const albumText = items.map(({ album }) => album.toLowerCase().split(" "));
    const mergedText = [].concat.apply([], albumText);
    const commonWord = mergedText.reduce(
      (a, b, i, arr) =>
        arr.filter((w) => w === a).length >= arr.filter((w) => w === b).length
          ? a
          : b,
      null
    );
    return commonWord;
  }

  formatRecordArray(items) {
    const artistArray = items
      .map(({ artist }) => artist)
      .filter((artist, i, arr) => arr.indexOf(artist) === i);
    const recordArray = artistArray.map((artist) =>
      items.filter((entry) => entry.artist === artist)
    );
    return recordArray;
  }

  getArtistArray(items) {
    let artistAndYears = [];
    if (!items === undefined || !items.length == 0) {
      items.forEach((element) => {
        let recordArtist = element[0].artist;
        let years = element.map(({ year }) => year);
        let instances = years.reduce((acc, curr) => {
          return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
        }, {});
        artistAndYears.push({ artist: recordArtist, years: instances });
      });
      return artistAndYears.sort((a, b) => (a.artist > b.artist ? 1 : -1));
    }
  }

  render() {
    const { records, isLoading } = this.state;
    const data = this.formatRecordArray(records);
    const artistData = this.getArtistArray(data);
    const isDirectoryEmpty = records.length === 0;
    const shouldRender = !isLoading && !isDirectoryEmpty;

    return (
      <>
        {shouldRender && (
          <>
            <p>
              Most common word across record albums:{" "}
              {this.getMostCommonWord(records)}
            </p>

            <Stats>
              {artistData.map((artist, i) => (
                <tr key={i}>
                  <td>{artist.artist}</td>
                  <td>
                    {/* todo: get rid of chaining replace methods */}
                    {JSON.stringify(artist.years)
                      .replace(/[{}"\"\\]/g, "")
                      .replace(/:/g, ": ")
                      .replace(/,/g, ", ")}
                  </td>
                </tr>
              ))}
            </Stats>
          </>
        )}
        {isDirectoryEmpty && <p>There are no records in the directory.</p>}
        {isLoading && <Loader />}
      </>
    );
  }
}

document.addEventListener("turbolinks:load", () => {
  const app = document.getElementById("stats-app");
  app && ReactDOM.render(<StatsApp />, app);
});
