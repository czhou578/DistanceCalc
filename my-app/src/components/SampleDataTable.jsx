import React, { useEffect, useState } from "react";

const getData = () => {
  return fetch('https://randomuser.me/api/?results=20').then((data) => data.json()).then((data) => {
    return data
  })
}

export default function SampleDataTable(props) {
  const [locationHeaders, setLocationHeaders] = useState('')
  const [locationData, setLocationData] = useState('')

  useEffect(() => {
    getData().then((data) => {
      
    })
  })

}