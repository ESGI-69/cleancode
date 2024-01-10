export enum CustomErrorCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
}

export type CustomErrorContent = {
  message: string;
  statusCode: CustomErrorCode;
};

export class CustomError extends Error {
  public readonly content: CustomErrorContent;

  constructor(content: CustomErrorContent) {
    super(content.message);
    this.content = content;
  }
}
