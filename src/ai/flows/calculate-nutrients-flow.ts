'use server';
/**
 * @fileOverview A nutritional analysis AI agent.
 *
 * - calculateNutrients - A function that handles the nutritional analysis process.
 * - CalculateNutrientsInput - The input type for the calculateNutrients function.
 * - CalculateNutrientsOutput - The return type for the calculateNutrients function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CalculateNutrientsInputSchema = z.object({
  meal: z.string().describe('The meal to be analyzed.'),
  mealType: z.enum(['breakfast', 'lunch', 'dinner', 'snacks']).describe('The type of meal.'),
});
export type CalculateNutrientsInput = z.infer<typeof CalculateNutrientsInputSchema>;

const CalculateNutrientsOutputSchema = z.object({
  calories: z.number().describe('Estimated calories in the meal.'),
  protein: z.number().describe('Estimated grams of protein in the meal.'),
  carbs: z.number().describe('Estimated grams of carbohydrates in the meal.'),
  fat: z.number().describe('Estimated grams of fat in the meal.'),
});
export type CalculateNutrientsOutput = z.infer<typeof CalculateNutrientsOutputSchema>;

export async function calculateNutrients(input: CalculateNutrientsInput): Promise<CalculateNutrientsOutput> {
  return calculateNutrientsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'calculateNutrientsPrompt',
  input: {schema: CalculateNutrientsInputSchema},
  output: {schema: CalculateNutrientsOutputSchema},
  prompt: `You are an expert nutritionist. Analyze the following {{mealType}} meal and provide an estimated nutritional breakdown.

Meal: {{{meal}}}

Provide your best estimate for calories, protein, carbohydrates, and fat.`,
});

const calculateNutrientsFlow = ai.defineFlow(
  {
    name: 'calculateNutrientsFlow',
    inputSchema: CalculateNutrientsInputSchema,
    outputSchema: CalculateNutrientsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
