import { shopifyFetch } from './client';

export interface Collection {
  id: string;
  title: string;
  handle: string;
  description: string;
  image?: {
    url: string;
    altText: string;
  };
}

export const getCollections = async (): Promise<Collection[]> => {
  const query = `
    query getCollections {
      collections(first: 10) {
        edges {
          node {
            id
            title
            handle
            description
            image {
              url
              altText
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch<{ collections: { edges: Array<{ node: Collection }> } }>(query);
  return response.data.collections.edges.map(edge => edge.node);
};
