/**
 * CORS configuration
 */
const corsOption = {
    /**
     * Allow requests from the specified origin(s)
     */
    origin: ["http://localhost:5173", "http://localhost:4173"],

    /**
     * Allow the specified HTTP methods
     */
    methods: ["GET", "POST", "PUT", "DELETE"],

    /**
     * Support sending cookies in cross-site requests
     */
    credentials: true,
}

export { corsOption };
