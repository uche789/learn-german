export enum QraphqlErrorCode {
  RESOURCES_EXHAUSTED = 'RESOURCES_EXHAUSTED',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED'
}

type ContentfullError = {
  extensions: {
    contentful: {
      code: QraphqlErrorCode, // text error code
      requestId: string // id of current request
    }
  }
}

export default class GraphQLError {
  constructor(public error: ContentfullError[]) {}
}