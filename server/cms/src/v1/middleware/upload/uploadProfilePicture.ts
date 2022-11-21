import IUserRequest from "../../interfaces/user.interface";
import { FirebaseService } from "../../services";



export default async function uploadProfilePicture(req: IUserRequest) {
    const { file} = req;    
    
    const fileURL = await FirebaseService.uploadImage(file)

    req.path = fileURL
    console.log(req.body);
    
}