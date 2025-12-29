/**
 * Base class for all SDK errors.
 */
export class FrontalError extends Error {
  constructor(
    message: string,
    public readonly cause?: unknown,
    public readonly code?: string,
  ) {
    super(message);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Thrown when authentication fails.
 */
export class AuthenticationError extends FrontalError {
  constructor(message = "Authentication failed", cause?: unknown) {
    super(message, cause, "AUTHENTICATION_ERROR");
  }
}

/**
 * Thrown when a resource is not found.
 */
export class NotFoundError extends FrontalError {
  constructor(resource: string, id?: string, cause?: unknown) {
    const message = id ? `${resource} with ID ${id} not found` : `${resource} not found`;
    super(message, cause, "NOT_FOUND");
  }
}

/**
 * Thrown when rate limits are exceeded.
 */
export class RateLimitError extends FrontalError {
  constructor(message = "Rate limit exceeded", cause?: unknown) {
    super(message, cause, "RATE_LIMIT_ERROR");
  }
}

/**
 * Thrown when a request is invalid.
 */
export class ValidationError extends FrontalError {
  constructor(message: string, cause?: unknown) {
    super(message, cause, "VALIDATION_ERROR");
  }
}
