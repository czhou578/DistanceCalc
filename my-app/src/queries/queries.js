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

export {
  listInitialInfoQuery,
  getCountryInfoQuery,
  getCountriesByContinentQuery,
};
