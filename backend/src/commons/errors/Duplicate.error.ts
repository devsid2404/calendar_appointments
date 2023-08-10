export default class DuplicateError extends Error {
    private data;
    public name: string;

    constructor(message: string, data?: any) {
        super(message);
        this.data = data;
        this.name = "DuplicateError";
    }
}