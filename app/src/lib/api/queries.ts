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
      contentfulMetadata {
        concepts {
          id
        }
      }
    }
  }
}`