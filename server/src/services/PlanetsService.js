import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"



class PlanetsService {

  async createPlanet(planetData) {
    const planet = await dbContext.Planets.create(planetData)
    await planet.populate('galaxy')
    return planet
  }

  async getPlanets() {
    const planets = await dbContext.Planets.find().populate('galaxy')
    return planets
  }

  async getPlanetsByGalaxy(galaxyId) {
    const planets = await dbContext.Planets.find({ galaxyId: galaxyId })
    if (!planets) {
      throw new BadRequest('No planets in this galaxy discovered yet')
    }
    return planets
  }
}

export const planetsService = new PlanetsService()