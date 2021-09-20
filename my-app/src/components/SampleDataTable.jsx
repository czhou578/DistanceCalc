import React, { useEffect, useState } from "react";
//https://randomuser.me/api/?results=20

const getData = () => {
  return fetch('https://randomuser.me/api/?results=20').then((data) => data.json()).then((data) => {
    return data.results
  })
}

const flattenObject = (obj) => {
  const flattenedObject = []

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
  console.log('previous: ' + obj);
  let temp = flattenObject(obj)
  console.log(temp);
  // console.log(flattenObject(obj))

}

export default function SampleDataTable(props) {
  const [locationHeaders, setLocationHeaders] = useState([])
  const [locationData, setLocationData] = useState('')

  useEffect(() => {
    getData().then((data) => {
      console.log(data);
      setLocationData(data.map((element) => element.location))
      // setLocationHeaders(data.location[0])
      // setHeaders(data)
    })
  }, [])

  return (
    <div>

    </div>
  )

}