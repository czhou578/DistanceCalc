import React, { useEffect, useState } from "react";
import styles from "./sampleDataTable.module.css";

const getData = () => {
  return fetch("https://randomuser.me/api/?results=20")
    .then((data) => data.json())
    .then((data) => {
      return data.results;
    });
};

const flattenObject = (obj) => {
  let flattenedObject = [];

  for (const { street, coordinates, timezone, ...rest } of obj) {
    flattenedObject.push({
      number: street.number,
      name: street.name,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      timezone: timezone.description,
      timezoneOffset: timezone.offset,
      ...rest,
    });
  }
  return flattenedObject;
};

const setHeaders = (obj) => {
  let array = flattenObject(obj);
  let headerArray = [];

  for (const header in array[0]) {
    headerArray.push(header);
  }
  return headerArray;
};

const sortEnum = {
  DEFAULT: "DEFAULT",
  ASCENDING: "ASCENDING",
  DESCENDING: "DESCENDING",
};

const assignSortingDirection = (sortingDirection) => {
  if (
    sortingDirection === sortEnum.DEFAULT ||
    sortingDirection === sortEnum.ASCENDING
  ) {
    return sortEnum.DESCENDING;
  }
  return sortEnum.ASCENDING;
};

export default function SampleDataTable(props) {
  const [locationHeaders, setLocationHeaders] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [sortingDirection, setSortingDirection] = useState({});

  useEffect(() => {
    getData().then((data) => {
      setLocationData(flattenObject(data.map((element) => element.location)));
      setLocationHeaders(setHeaders([data[0].location]));

      const startSortDirection = {}; //assign initial header sorting state
      for (const header in locationHeaders) {
        startSortDirection[header] = sortEnum.DEFAULT;
      }
      setSortingDirection(startSortDirection);
    });
  }, []);

  const sortColumn = (sortColumnKey) => {
    const newFlattenedColumn = {
      data: [...locationData],
    };
    const currentSortingDirection = sortingDirection[sortColumnKey];

    newFlattenedColumn.data.sort((a, b) => {
      const key1 = a[sortColumnKey];
      const key2 = b[sortColumnKey];

      if (
        currentSortingDirection === sortEnum.DEFAULT ||
        currentSortingDirection === sortEnum.ASCENDING
      ) {
        if (key1 < key2) return -1;
        if (key1 > key2) return 1;
        return 0;
      } else {
        if (key1 > key2) return -1;
        if (key1 < key2) return 1;
        return 0;
      }
    });

    const nextSortDirection = assignSortingDirection(currentSortingDirection); //ascending example
    const newSortDirection = { ...nextSortDirection };
    newSortDirection[sortColumnKey] = nextSortDirection;
    setSortingDirection(newSortDirection);
    setLocationData(newFlattenedColumn.data);
  };

  return (
    <div className={styles.container} id="container">
      <div>
        <h5 className={styles.sortDir}>Click Headers to Sort Ascend/Descend</h5>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            {locationHeaders.length > 0
              ? locationHeaders.map((header, idx) => {
                  return (
                    <th
                      key={idx}
                      className={styles.thStyle}
                      tabIndex={idx}
                      onClick={() => sortColumn(header)}
                    >
                      {header}
                    </th>
                  );
                })
              : null}
          </tr>
        </thead>
        <tbody id="body">
          {locationData.length > 0
            ? locationData.map((row, idex) => {
                return (
                  <tr key={idex} className={styles.tr}>
                    {Object.values(row).map((value, idex) => {
                      return (
                        <td key={idex} className={styles.tdStyle}>
                          {value}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
}
