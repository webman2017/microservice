interface IErrorResponse {
    status: number;
    message: string;
}

const setCommonErrorResponse = (
    status: number,
    message: string,
): IErrorResponse => ({
    status,
    message,
});

export { setCommonErrorResponse, IErrorResponse };
