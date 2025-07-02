import React from "react";
import {
  List,
  CellMeasurer,
  CellMeasurerCache,
  AutoSizer,
} from "react-virtualized";

const MyVirtualizedList = ({ items }) => {
  const cache = React.useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 50, // estimated initial height
    })
  );

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          width={width}
          height={height}
          deferredMeasurementCache={cache.current}
          rowHeight={cache.current.rowHeight}
          rowCount={items.length}
          rowRenderer={({ key, index, style, parent }) => (
            <CellMeasurer
              key={key}
              cache={cache.current}
              columnIndex={0}
              rowIndex={index}
              parent={parent}
            >
              <div style={style}>
                <MyRow item={items[index]} />
              </div>
            </CellMeasurer>
          )}
        />
      )}
    </AutoSizer>
  );
};

const MyRow = ({ item }) => (
  <div style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
    {item.text}
  </div>
);

export default MyVirtualizedList;

/*
| Part                    | What It Does                                                          |
| ----------------------- | --------------------------------------------------------------------- |
| **`AutoSizer`**         | Makes the list fill parent’s size dynamically.                        |
| **`List`**              | Handles virtualization: only visible rows are mounted.                |
| **`CellMeasurer`**      | Measures height for each row and reports it.                          |
| **`CellMeasurerCache`** | Stores row heights so they aren’t measured repeatedly.                |
| **`rowRenderer`**       | Provides a function for `List` to render each visible row.            |
| **`style`**             | Ensures rows are positioned correctly (absolute with calculated top). |
| **`useRef`**            | Keeps the same cache instance across renders.                         |
*/