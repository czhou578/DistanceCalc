import { gql } from "@apollo/client";

const listInitialInfoQuery = gql`
  {
    countries {
      name
      code
    }
    continents {
      code
      name
    }
  }
`;

const getCountryInfoQuery = gql`
  query getCountryInfo($code: ID!) {
    country(code: $code) {
      name
      native
      capital
      emoji
      currency
      languages {
        code
        name
      }
    }
  }
`;

const getCurrencyInfoQuery = gql`
  query getCurrencies {
    countries {
      currency
    }
  }
`;

const getCountriesByContinentQuery = gql`
  query getCountriesByContinent($code: String!) {
    countries(filter: { continent: { eq: $code } }) {
      name
      native
      capital
      emoji
      currency
      languages {
        code
        name
      }
    }
  }
`;

const getCountriesByCurrencyQuery = gql`
  query Query($continent: String!, $currency: String!) {
    countries(
      filter: { continent: { eq: $continent }, currency: { eq: $currency } }
    ) {
      name
      native
      capital
      emoji
      currency
      languages {
        code
        name
      }
    }
  }
`;

const getCapitalsAndPhoneByContinentQuery = gql`
  query getCapitalsContinent($continent: String!) {
    countries(filter: { continent: { eq: $continent } }) {
      capital
      phone
    }
  }
`;

const getStatesInCountryByContinentQuery = gql`
  query Query(
    $continent: String!
    $showStateCode: Boolean!
    $showStateName: Boolean!
  ) {
    countries(filter: { continent: { eq: $continent } }) {
      name
      states {
        code @include(if: $showStateCode)
        name @skip(if: $showStateName)
      }
    }
  }
`;

//get countries that speak a certain language

export {
  listInitialInfoQuery,
  getCountryInfoQuery,
  getCountriesByContinentQuery,
  getCountriesByCurrencyQuery,
  getCurrencyInfoQuery,
  getCapitalsAndPhoneByContinentQuery,
  getStatesInCountryByContinentQuery,
};
