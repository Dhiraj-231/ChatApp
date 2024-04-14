const corsOption = {
    origin: ["http://localhost:5173", "http://localhost:4173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}

export { corsOption };