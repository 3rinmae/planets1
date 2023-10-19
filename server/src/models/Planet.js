import { Schema } from "mongoose";


export const PlanetSchema = new Schema(
  {
    name: { type: String, required: true, maxLength: 50 },
    galaxyId: { type: Schema.Types.ObjectId, required: true, ref: 'Galaxy' },
    biome: { type: String, required: false, maxLength: 200 },
    atmosphere: { type: Boolean, required: true }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
)

PlanetSchema.virtual('galaxy', {
  localField: 'galaxyId',
  ref: 'Galaxy',
  foreignField: '_id',
  justOne: true
})