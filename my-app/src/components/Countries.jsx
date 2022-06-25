import { useLazyQuery, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { client } from "..";
import { getCountriesByContinentQuery, getCountryInfoQuery, listInitialInfoQuery } from "../queries/queries";
import styles from "./sampleDataTable.module.css";

const Countries = () => {
  const [country, setCountry] = useState("");
  const [continent, setContinent] = useState("");
  const { data, loading, error } = useQuery(listInitialInfoQuery, { client });
  const [getCountryInfo, { called: countryCalled, loading: countryInfoLoading, data: countryInfo }] = useLazyQuery(
    getCountryInfoQuery,
    { variables: { code: country } }
  );
  const [getCountriesByContinent, {called: countriesCalled, loading: getCountriesLoading, data: countriesByContinentData }] = useLazyQuery(getCountriesByContinentQuery, { variables: { code: continent } })
  
  useEffect(() => {
    console.log(countriesByContinentData)
  }, [countriesByContinentData])

  
  if (loading || error) {
    return <p>{error ? error.message : "Loading..."}</p>;
  }


  return (
    <div>
      <h2 className={styles.sampleBoxHeader}>Countries of the World</h2>
      <div>
        <select
          value={country}
          onChange={(event) => setCountry(event.target.value)}
        >
          {data.countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
        <button
            onClick={() => {
            getCountryInfo();
            console.log(countryInfo)
            }}
          >
            Get Country Info
          </button>
        <select
          value={continent}
          onChange={(event) => setContinent(event.target.value)}
        >
          {data.continents.map((continent) => (
            <option key={continent.code} value={continent.code}>
              {continent.name}
            </option>
          ))}
        </select>
        <button onClick={() => getCountriesByContinent()}>Submit</button>
      </div>
      <div>
        {countryCalled && countryInfoLoading ?
          <p>Loading...</p> : countryInfo ? 
          <div style={{marginLeft: "300px", marginTop: "30px"}}>
              <p style={{ color: 'white' }}>CAPITAL: {countryInfo.country.capital}</p>
              <p style={{ color: 'white' }}>CURRENCY: {countryInfo.country.currency}</p>
              <p style={{ color: 'white' }}>EMOJI: {countryInfo.country.emoji}</p>
              <p style={{ color: 'white' }}>NAME: {countryInfo.country.name}</p>
              <p style={{ color: 'white' }}>NATIVE: {countryInfo.country.native}</p>
              <ul style={{ color: 'white', padding: '0px'}}>LANGUAGES: {countryInfo.country.languages.map((element, key) => {
                return <li key={key}>{element.name}</li>
              })}</ul>
          </div>
            : null}
        {countriesCalled && getCountriesLoading ? <p>Loading....</p> : countriesByContinentData ? 
          <div style={{ marginLeft: "300px", marginTop: "30px" }}>
            <table>
              {Object.keys(countriesByContinentData.countries[0]).map((header, key) => {
                let temp = header;
                if (header === "__typename") return null

                return (
                  <th key={key} style={{ color: 'white', paddingRight: '40px' }}>
                    {header}
                  </th>
                )
              })}
              {countriesByContinentData.countries.map((element, key) => {
                return (
                  <tr style={{ color: 'white' }}>
                    <td style={{ color: 'white' }}>{element.capital}</td>
                    <td style={{ color: 'white' }}>{element.currency}</td>
                    <td style={{ color: 'white' }}>{element.emoji}</td>
                    <td style={{ color: 'white' }}>{element.languages[0].name}</td>
                    <td style={{ color: 'white' }}>{element.name}</td>
                    <td style={{ color: 'white' }}>{element.native}</td>
                  </tr>
                )
              })}
            </table>
          </div> : null}
      </div>
    </div>
  );
};

export default Countries;
