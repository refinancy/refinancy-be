import * as mongoose from 'mongoose';
import { Recipe } from '../interfaces/recipe.interface';

export const RecipeSchema = new mongoose.Schema<Recipe>(
  {
    title: String,
    from: String,
    description: String,
    value: Number,
    receivedAt: Date,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);
