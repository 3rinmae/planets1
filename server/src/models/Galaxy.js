import { Schema } from "mongoose"


export const GalaxySchema = new Schema(
  {
    name: { type: String, required: true, maxLength: 50 },
    type: { type: String, required: true, maxLength: 50 },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
)

GalaxySchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})