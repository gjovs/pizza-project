import IFile from "./file.interface";

export default interface IMulterRequest extends Request {
  file: IFile;
}
