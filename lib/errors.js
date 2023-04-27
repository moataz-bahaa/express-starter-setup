import { StatusCodes } from 'http-status-codes';

class CustomError extends Error {
  constructor(message) {
    super(message);
  }
}

export class NotFoundError extends CustomError {
  constructor(message) {
    super(message ?? 'object not found');
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export class BadRequestError extends CustomError {
  constructor(message) {
    super(message ?? 'please provide all data');
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export class UnAuthenticatedError extends CustomError {
  constructor(message) {
    super(message ?? 'you do not have permission');
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
