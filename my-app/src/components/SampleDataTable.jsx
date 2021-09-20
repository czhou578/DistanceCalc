import React, { useEffect, useState } from "react";
import styles from './sampleDataTable.module.css'

const getData = () => {
  return fetch('https://randomuser.me/api/?results=20').then((data) => data.json()).then((data) => {
    return data.results
  })
}

const flattenObject = (obj) => {
  let flattenedObject = []

  for (const {street, coordinates, timezone, ...rest} of obj) {
    flattenedObject.push({
      number: street.number,
      name: street.name,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      timezone: timezone.description,
      timezoneOffset: timezone.offset,
      ...rest
    })
  }
  return flattenedObject
}

const setHeaders = (obj) => {
  let array = flattenObject(obj)
  let headerArray = []

  for (const header in array[0]) {
    headerArray.push(header)
  }
  return headerArray
}

const style = {
  color: 'white'
}

export default function SampleDataTable(props) {
  const [locationHeaders, setLocationHeaders] = useState([])
  const [locationData, setLocationData] = useState([])

  useEffect(() => {
    getData().then((data) => {
      console.log(data);
      setLocationData(flattenObject(data.map((element) => element.location)))
      setLocationHeaders(setHeaders([data[0].location]))
    })
  }, [])

  const sortColumn = (sortColumnKey) => {
    const newFlattenedColumn = {
      data: [...locationData]
    }

    newFlattenedColumn.data.sort((a, b) => {
      const key1 = a[sortColumnKey]
      const key2 = b[sortColumnKey]

      if (key1 < key2) return -1
      if (key1 > key2) return 1
      return 0
    })

    setLocationData(newFlattenedColumn.data)
  }
  
  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            {locationHeaders.length > 0 ? locationHeaders.map((header, idx) => {
              return <th key={idx} style={style} onClick={() => sortColumn(header)}>{header}</th>
            }) : null}
          </tr>
        </thead>
        <tbody>
          {locationData.length > 0 ? locationData.map((row, idex) => {
            return <tr>
              {Object.values(row).map((value, idex) => {
                return <td key={idex} style={style}>{value}</td>
              })}
            </tr>
          }) : null}
        </tbody>

      </table>
    </div>
  )

}