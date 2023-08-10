export default class ValidationError extends Error {
    private data;
    public name: string;


    constructor(message: string, data?: any) {
        super(message);
        this.data = data;
        this.name = "ValidationError";
    }
}