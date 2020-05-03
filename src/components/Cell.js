import styled from "styled-components";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const reactLiveScope = {
  styled,
  useQuery,
  gql
};

const code1 = `
  () => {
    const Header = styled.header\`
      color: blue;
      font-size: 18px;
    \`
    return (<Header>Hello World!</Header>)
  }
`;

const code2 = `
() => {
  const { loading, error, data } = useQuery(gql\`
    {
      sheetData
    }
  \`);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <p>{data.sheetData.map(datum => datum*2)}</p>
    </div>
  );
}
`;

const Cell = ({ columnIndex, rowIndex, style }) => {
  if (rowIndex === 1 && columnIndex === 1) {
    return (
      <div className="CodeLive" style={style}>
        <LiveProvider scope={reactLiveScope} code={code1}>
          <LivePreview />
          <LiveEditor className="LiveEditor" />
          <LiveError />
        </LiveProvider>
      </div>
    );
  }
  if (rowIndex === 1 && columnIndex === 3)
    return (
      <div className="CodeLive" style={style}>
        <LiveProvider scope={reactLiveScope} code={code2}>
          <LivePreview />
          <LiveEditor className="LiveEditor" />
          <LiveError />
        </LiveProvider>
      </div>
    );
  else
    return (
      <div
        className={
          columnIndex % 2
            ? rowIndex % 2 === 0
              ? "GridItemOdd"
              : "GridItemEven"
            : rowIndex % 2
            ? "GridItemOdd"
            : "GridItemEven"
        }
        style={style}
      >
        r{rowIndex}, c{columnIndex}
      </div>
    );
};

export default Cell;
