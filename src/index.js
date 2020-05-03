/**
 * This is the front-end
 * Back-end: https://codesandbox.io/s/spreadsheet-server-v1-xyus2
 */

import React, { useCallback, useRef } from "react";
import ReactDOM from "react-dom";
import { VariableSizeGrid } from "react-window";
import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import "./styles.css";

import Cell from "./components/Cell";

console.log("hey");

const client = new ApolloClient({
  uri: "https://zhgyt.sse.codesandbox.io/"
});

const ServerHandshake = () => {
  const { loading, error, data } = useQuery(gql`
    {
      hello
    }
  `);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <p>{data.hello}</p>
    </div>
  );
};

const columnWidths = new Array(300).fill(true).map(() => 75);
const rowHeights = new Array(500).fill(true).map(() => 25);

const Example = () => {
  /* STATE */
  // const selectedCell = useState([0, 0]);

  /* REFS */
  const rowHeader = useRef();
  const columnHeader = useRef();
  const onScroll = useCallback(
    ({ scrollTop, scrollLeft, scrollUpdateWasRequested }) => {
      if (!scrollUpdateWasRequested) {
        rowHeader.current.scrollTo({ scrollLeft: 0, scrollTop });
        columnHeader.current.scrollTo({ scrollLeft, scrollTop: 0 });
      }
    },
    []
  );

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <VariableSizeGrid
          ref={columnHeader}
          style={{ overflowX: "hidden", marginLeft: 100 }}
          className="Grid"
          columnCount={10}
          rowCount={1}
          rowHeight={() => 100}
          columnWidth={index => columnWidths[index]}
          width={window.innerHeight}
          height={100}
          blah={"blah"}
          data={123}
        >
          {props => <Cell {...props} />}
        </VariableSizeGrid>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <VariableSizeGrid
          ref={rowHeader}
          style={{ overflowY: "hidden" }}
          className="Grid"
          columnCount={1}
          rowCount={1000}
          columnWidth={() => 100}
          rowHeight={index => rowHeights[index]}
          height={window.innerHeight}
          width={100}
        >
          {props => <Cell {...props} />}
        </VariableSizeGrid>
        <VariableSizeGrid
          onScroll={onScroll}
          className="Grid"
          columnCount={10}
          columnWidth={index => columnWidths[index]}
          rowHeight={index => rowHeights[index]}
          rowCount={1000}
          height={window.innerHeight}
          width={window.innerWidth - 100}
        >
          {props => <Cell {...props} />}
        </VariableSizeGrid>
      </div>
    </div>
  );
};

ReactDOM.render(
  <ApolloProvider client={client}>
    <ServerHandshake />
    <Example />
  </ApolloProvider>,
  document.getElementById("root")
);
