/* eslint-disable max-classes-per-file */
export class UserNotFoundError extends Error {}

export class InvalidCredentialsError extends Error {}

export class IsUniqueConstraintError extends Error {
  constructor(field: string = 'A field') {
    super();
    this.message = `${field} is already taken`;
  }
}

export class HTTPUnauthorizedError extends Error {
  constructor() {
    super();
    this.message = 'Unauthorized';
  }
}

export class HTTPForbiddenError extends Error {
  constructor() {
    super();
    this.message = 'Forbidden';
  }
}

export class HTTPNotFoundError extends Error {
  constructor() {
    super();
    this.message = 'Not Found';
  }
}
