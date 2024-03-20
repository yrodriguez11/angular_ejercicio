export class Result<T> {
    postId: any;
    constructor(
    public data: T,
    public error: boolean,
    public msg: Array<any>,
    ){}
}