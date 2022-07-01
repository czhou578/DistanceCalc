import { useLazyQuery, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { client } from "..";
import {
  getCapitalsAndPhoneByContinentQuery, getCountriesByContinentQuery,
  getCountriesByCurrencyQuery,
  getCountryInfoQuery,
  getCurrencyInfoQuery, getStatesInCountryByContinentQuery, listInitialInfoQuery
} from "../queries/queries";
import styles from "./sampleDataTable.module.css";

const Countries = () => {
  const [country, setCountry] = useState("");
  const [capitalPhoneContinent, setCapitalPhoneContinent] = useState("");
  const [continent, setContinent] = useState("");
  const [currencyContinent, setCurrencyContinent] = useState("");
  const [currency, setCurrency] = useState("");
  const [noDuplicateCurrencies, setNoDuplicateCurrencies] = useState([]);
  const [statesContinent, setStatesContinent] = useState("")
  const [showStateCode, setShowStateCode] = useState(false)
  const [showName, setShowName] = useState(false)
  const { data, loading, error } = useQuery(listInitialInfoQuery, { client });
  const [
    getCountryInfo,
    { called: countryCalled, loading: countryInfoLoading, data: countryInfo },
  ] = useLazyQuery(getCountryInfoQuery, { variables: { code: country } });

  const {
    called: initialCurrencyCalled,
    loading: initialCurrencyLoading,
    data: initialCurrency,
  } = useQuery(getCurrencyInfoQuery, { client });

  const [
    getCountriesByContinent,
    {
      called: countriesCalled,
      loading: getCountriesLoading,
      data: countriesByContinentData,
    },
  ] = useLazyQuery(getCountriesByContinentQuery, {
    variables: { code: continent },
  });
  const [
    getCountriesByCurrency,
    { called: currencyCalled, loading: currencyLoading, data: currencyCountry },
  ] = useLazyQuery(getCountriesByCurrencyQuery, {
    variables: { continent: currencyContinent, currency: currency },
  });

  const [
    getCapitalsAndPhoneByContinents,
    {
      called: capitalPhoneCalled,
      loading: capitalPhoneLoading,
      data: capitalPhones,
    },
  ] = useLazyQuery(getCapitalsAndPhoneByContinentQuery, {
    variables: { continent: capitalPhoneContinent },
  });

  const [
    getStatesInCountryByContinent,
    {
      called: statesCountryCalled,
      loading: statesCountryLoading,
      data: statesInCountry
    },
  ] = useLazyQuery(getStatesInCountryByContinentQuery, {
    variables: { continent: statesContinent, showStateCode: showStateCode, showStateName: showName}
  })

  // useEffect(() => {
  //   console.log('states in country: ' + JSON.stringify(statesInCountry), null, 2)
  // }, [statesInCountry])

  useEffect(() => {
    if (initialCurrency && initialCurrency.countries) {
      let removeCurrencyDuplicates = new Set();
      initialCurrency.countries.forEach((element) => {
        if (element.currency !== null) {
          if (element.currency.split(",").length < 2) {
            removeCurrencyDuplicates.add(element.currency);
          }
        }
      });

      let array = Array.from(removeCurrencyDuplicates);
      setNoDuplicateCurrencies(array);
    }
  }, [initialCurrency]);

  if (loading || error) {
    return <p>{error ? error.message : "Loading..."}</p>;
  }

  return (
    <div>
      <h2 className={styles.sampleBoxHeader} style={{ marginLeft: "700px" }}>
        Countries of the World
      </h2>
      <div>
        <select
          value={country}
          onChange={(event) => setCountry(event.target.value)}
          style={{ marginLeft: "23%" }}
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
            console.log(countryInfo);
          }}
          style={{ marginLeft: "10px" }}
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
        <button
          onClick={() => getCountriesByContinent()}
          style={{ marginLeft: "10px" }}
        >
          Get Countries By Continent
        </button>
      </div>
      <div style={{ marginLeft: "500px", marginTop: "30px" }}>
        <select
          value={currency}
          onChange={(event) => setCurrency(event.target.value)}
        >
          {noDuplicateCurrencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <select
          value={currencyContinent}
          onChange={(event) => setCurrencyContinent(event.target.value)}
        >
          {data.continents.map((continent) => (
            <option key={continent.code} value={continent.code}>
              {continent.name}
            </option>
          ))}
        </select>
        <button
          onClick={() => getCountriesByCurrency()}
          style={{ marginLeft: "10px" }}
        >
          Get Country By Currency
        </button>
      </div>
      <div style={{ marginLeft: "500px", marginTop: "30px" }}>
        <select
          value={capitalPhoneContinent}
          onChange={(event) => setCapitalPhoneContinent(event.target.value)}
        >
          {data.continents.map((continent) => (
            <option key={continent.code} value={continent.code}>
              {continent.name}
            </option>
          ))}
        </select>
        <button
          onClick={() => getCapitalsAndPhoneByContinents()}
          style={{ marginLeft: "10px" }}
        >
          Get Capitals And Phone #s
        </button>
      </div>
      <div style={{ marginLeft: "500px", marginTop: "30px" }}>
        <select
            value={statesContinent}
            onChange={(event) => setStatesContinent(event.target.value)}
          >
            {data.continents.map((continent) => (
              <option key={continent.code} value={continent.code}>
                {continent.name}
              </option>
            ))}
        </select>
        <fieldset>
          <legend>Choose Filter Options</legend>
          <div>
            <input type="checkbox" id="scales" name="State Code"
             onChange={() => setShowStateCode(!showStateCode)} />
            <label for="scales">Show State Code</label>
          </div>
          <div>
            <input type="checkbox" id="horns" name="State Name" onChange={() => setShowName(!showName)}/>
            <label for="horns">Skip State Name</label>
          </div>
        </fieldset>
          <button
            onClick={() => getStatesInCountryByContinent()}
            style={{ marginLeft: "10px" }}
          >
            Get States in a Country
          </button>            
      </div>
      <div>
        {countryCalled && countryInfoLoading ? (
          <p>Loading...</p>
        ) : countryInfo ? (
          <div style={{ marginLeft: "500px", marginTop: "30px" }}>
            <p style={{ color: "white" }}>
              CAPITAL: {countryInfo.country.capital}
            </p>
            <p style={{ color: "white" }}>
              CURRENCY: {countryInfo.country.currency}
            </p>
            <p style={{ color: "white" }}>EMOJI: {countryInfo.country.emoji}</p>
            <p style={{ color: "white" }}>NAME: {countryInfo.country.name}</p>
            <p style={{ color: "white" }}>
              NATIVE: {countryInfo.country.native}
            </p>
            <ul style={{ color: "white", padding: "0px" }}>
              LANGUAGES:{" "}
              {countryInfo.country.languages.map((element, key) => {
                return <li key={key}>{element.name}</li>;
              })}
            </ul>
          </div>
        ) : null}
        {countriesCalled && getCountriesLoading ? (
          <p>Loading....</p>
        ) : countriesByContinentData ? (
          <div style={{ marginLeft: "350px", marginTop: "30px" }}>
            <table>
              {Object.keys(countriesByContinentData.countries[0]).map(
                (header, key) => {
                  console.log(header);
                  if (header === "__typename") return null;

                  return (
                    <th
                      key={key}
                      style={{ color: "white", paddingRight: "40px" }}
                    >
                      {header}
                    </th>
                  );
                }
              )}
              {countriesByContinentData.countries.map((element, key) => {
                return (
                  <tr style={{ color: "white" }}>
                    <td style={{ color: "white" }}>{element.name}</td>
                    <td style={{ color: "white" }}>{element.native}</td>
                    <td style={{ color: "white" }}>{element.capital}</td>
                    <td style={{ color: "white" }}>{element.emoji}</td>
                    <td style={{ color: "white" }}>{element.currency}</td>
                    <td style={{ color: "white" }}>
                      {element.languages[0].name}
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
        ) : null}
        {currencyCalled && currencyLoading ? (
          <p>Loading....</p>
        ) : currencyCountry ? (
          <div style={{ marginLeft: "350px", marginTop: "30px" }}>
            <h2 style={{ color: "white" }}>
              Countries that use {currency} as Currency
            </h2>
            <table>
              {Object.keys(currencyCountry.countries[0]).map((header, key) => {
                if (header === "__typename") return null;
                return (
                  <th
                    key={key}
                    style={{ color: "white", paddingRight: "40px" }}
                  >
                    {header}
                  </th>
                );
              })}
              {currencyCountry.countries.map((element, key) => {
                return (
                  <tr style={{ color: "white" }}>
                    <td style={{ color: "white" }}>{element.name}</td>
                    <td style={{ color: "white" }}>{element.native}</td>
                    <td style={{ color: "white" }}>{element.capital}</td>
                    <td style={{ color: "white" }}>{element.emoji}</td>
                    <td style={{ color: "white" }}>{element.currency}</td>
                    <td style={{ color: "white" }}>
                      {element.languages[0].name}
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
        ) : null}
        {capitalPhoneCalled && capitalPhoneLoading ? (
          <p>Loading...</p>
        ) : capitalPhones ? (
          <div style={{ marginLeft: "350px", marginTop: "30px" }}>
            <h2 style={{ color: "white" }}>
              Capitals and Phone Numbers of Countries in {capitalPhoneContinent}
            </h2>
              <table>
                <th style={{ color: "white" }}>Capital</th>
                <th style={{ color: "white" }}>Phone Number</th>
              {capitalPhones.countries.map((element, key) => {
                return (
                  <tr style={{ color: "white" }}>
                    <td style={{ color: "white" }}>{element.capital}</td>
                    <td style={{ color: "white", paddingLeft: "40px" }}>{element.phone}</td>
                  </tr>
                );
              })}
            </table>
          </div>            
        ) : null}
        {statesCountryCalled && statesCountryLoading ? (
          <p>Loading...</p>
        ) : statesInCountry ? (
            <div style={{ marginLeft: "350px", marginTop: "30px" }}>
              <h2 style={{ color: "white" }}>
                Different States in Countries in {statesContinent}
              </h2>
              {Object.keys(statesInCountry.countries[0]).map((element, key) => {
                return (
                  <th key={key} style={{ color: "white", paddingRight: "40px" }}>
                    {element}
                  </th>
                )
              })}
              {statesInCountry.countries.map((element, key) => {

                if (element.states.length === 0) return null

                const {}

                // for (const iterator of element.states) {
                //   return (
                //         <tr style={{ color: "white" }}>
                //           <td style={{ color: "white" }}>{iterator.code}</td>
                //           <td style={{ color: "white" }}>{iterator.name}</td>
                //         </tr>

                //   )
                // }

                // return (
                //   <div>
                //     {element.states.map((state, key) => {
                //       return (
                //         <tr style={{ color: "white" }}>
                //           <td style={{ color: "white" }}>{state?.code}</td>
                //           <td style={{ color: "white" }}>{state.name}</td>
                //         </tr>
                //       )
                //     })}
                //   </div>
                // )
              })}
            </div>
        ) : null}
      </div>
    </div>
  );
};

export default Countries;
