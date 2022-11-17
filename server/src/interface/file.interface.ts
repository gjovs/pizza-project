import { Readable } from "stream";

export default interface IFile {
    fieldname: string,
    originalname: string, 
    encoding: string,
    mimetype: string,
    filename: string,
    buffer: Buffer,
    stream: Readable,
    destination: string, 
    path: string,
    size: number
}