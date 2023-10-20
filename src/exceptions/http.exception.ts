import Joi from 'joi';

export class HttpException extends Error {
  status: number;
  constructor(status: number, message) {
    super(message);

    this.message = message;
    this.status = status;
  }
}

export class ErrorBuilder {
  static BadRequest(message?: string | Joi.ValidationError) {
    return new HttpException(400, message || 'Bad request');
  }
  static Forbidden(message?: string | Joi.ValidationError) {
    return new HttpException(403, message || 'Forbidden');
  }
}
