/**
 * Class for API Errors
 */
class ApiError extends Error {
    /**
     * Create a new ApiError instance
     * @param {number} statusCode HTTP status code of the error
     * @param {string} message Error message
     * @param {Array} error Array of errors
     * @param {string} stack Stack trace of the error
     */
    constructor(statusCode, message = "Something went wrong", error = [], stack = "") {
        super(message)
        /**
         * HTTP status code of the error
         * @type {number}
         */
        this.statusCode = statusCode;

        /**
         * Data of the error
         * @type {object}
         */
        this.data = null;

        /**
         * Error message
         * @type {string}
         */
        this.message = message;

        /**
         * If the request was successful
         * @type {boolean}
         */
        this.success = false;

        /**
         * Array of errors
         * @type {Array}
         */
        this.error = error;

        if (stack) {
            /**
             * Stack trace of the error
             * @type {string}
             */
            this.stack = stack;
        } else {
            /**
             * Stack trace of the error
             * @type {string}
             */
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };
