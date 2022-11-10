class HomeController {
  async index(req, rep) {
    const { name } = req.query
    
    return rep.status(200).send({
        message: `Hello ${name}`
    })
  }
}

export default new HomeController();
