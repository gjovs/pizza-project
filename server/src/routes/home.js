import HomeController from "../controllers/HomeController";

export default async function homeRoutes(server) {
    server.get('/greeting', HomeController.index)
}