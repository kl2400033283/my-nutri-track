'use server';
/**
 * @fileOverview A meal plan generation AI agent.
 *
 * - generateMealPlan - A function that handles the meal plan generation process.
 * - GenerateMealPlanOutput - The return type for the generateMealPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMealPlanOutputSchema = z.object({
  breakfast: z.string().describe('A healthy and balanced breakfast suggestion. Should be 1-2 sentences.'),
  lunch: z.string().describe('A healthy and balanced lunch suggestion. Should be 1-2 sentences.'),
  dinner: z.string().describe('A healthy and balanced dinner suggestion. Should be 1-2 sentences.'),
  snacks: z.string().describe('A healthy and balanced snack suggestion. Should be 1-2 sentences.'),
});

export async function generateMealPlan() {
  return generateMealPlanFlow();
}

const prompt = ai.definePrompt({
  name: 'generateMealPlanPrompt',
  output: {schema: GenerateMealPlanOutputSchema},
  prompt: `You are an expert nutritionist. Generate a new, unique, and healthy meal plan for a full day.

Ensure the meal plan is balanced and provides a variety of nutrients. Do not repeat the same meal plan. Every time you are asked, provide a different set of meals.

Provide suggestions for breakfast, lunch, dinner, and snacks.`,
});

const generateMealPlanFlow = ai.defineFlow(
  {
    name: 'generateMealPlanFlow',
    outputSchema: GenerateMealPlanOutputSchema,
  },
  async () => {
    const {output} = await prompt();
    return output;
  }
);
