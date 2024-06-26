import {parseYAML} from "confbox";
import {readFileSync} from 'fs'
import { gql, Client, cacheExchange, fetchExchange } from '@urql/core';

const graphqlConfig = parseYAML(readFileSync(process.cwd() + '/.graphqlrc.yml')).schema[0]

const client = new Client({
  url: Object.keys(graphqlConfig)[0],
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: () => {
    return Object.values(graphqlConfig)[0];
  },
});

const query = gql`
  query {
    categories {
      id
      name
      pid
    }
  }
`;
const variables = {}

await client
  .query(query, variables)
  .toPromise()
  .then(({data}) => {
    console.log(data);
  });

// console.log(res);

