import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { galaxiesService } from "../services/GalaxiesService.js";
import { planetsService } from "../services/PlanetsService.js";



export class GalaxiesController extends BaseController {
  constructor() {
    super('api/galaxies')
    this.router
      .get('', this.getGalaxies)
      .get('/:galaxyId/planets', this.getPlanetsByGalaxy)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createGalaxy)
  }

  async createGalaxy(req, res, next) {
    try {
      const galaxyData = req.body
      const userInfo = req.userInfo
      galaxyData.creatorId = userInfo.id
      const galaxy = await galaxiesService.createGalaxy(galaxyData)
      res.send(galaxy)
    } catch (error) {
      next(error)
    }
  }

  async getGalaxies(req, res, next) {
    try {
      const galaxies = await galaxiesService.getGalaxies()
      return res.send(galaxies)
    } catch (error) {
      next(error)
    }
  }

  async getPlanetsByGalaxy(req, res, next) {
    try {
      const galaxyId = req.params.galaxyId
      const planets = await planetsService.getPlanetsByGalaxy(galaxyId)
      return res.send(planets)
    } catch (error) {
      next(error)
    }
  }
}