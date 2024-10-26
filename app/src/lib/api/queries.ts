export const postCollectionQuery = (conceptIds: string[]) => `query postCollectionQuery {
  postCollection (where: {
    contentfulMetadata: {
      concepts_exists: true
      concepts: {
        id_contains_all: [${conceptIds.map((id) => '"' + id + '"').join(',')}]
      }
    } 
  }) {
    items {
      sys {
        id
      }
      title
      slug
      contentfulMetadata {
        concepts {
          id
        }
      }
    }
  }
}`

export const idiomsCollectionQuery = (conceptIds: string[]) => `query idiomsCollectionQuery {
  idiomsCollection (where: {
    contentfulMetadata: {
      concepts_exists: true
      concepts: {
        id_contains_all: [${conceptIds.map((id) => '"' + id +'"').join(',')}]
      }
    } 
  }) {
    items {
      sys {
        id
      }
      idiom
      meaning
      examples
      slug
      contentfulMetadata {
        concepts {
          id
        }
      }
    }
  }
}`

export const idiomQuery = (slug: string) => `query idiomsCollectionQuery {
  idiomsCollection (limit: 1, where: { slug: "${slug}"}) {
    items {
      idiom
      meaning
      examples
      contentfulMetadata {
        concepts {
          id
        }
      }
    }
  }
}`

export const postQuery = (slug: string) => `query postCollectionQuery {
  postCollection (limit: 1, where: { slug: "${slug}"}) {
    items {
      title
      contentfulMetadata {
        concepts {
          id
        }
      }
    }
  }
}`