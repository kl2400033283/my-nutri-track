'use server';

/**
 * @fileOverview A flow that determines whether the 3D element should look away based on the password input.
 *
 * - shouldLookAway - A function that determines if the 3D element should look away.
 * - ShouldLookAwayInput - The input type for the shouldLookAway function.
 * - ShouldLookAwayOutput - The return type for the shouldLookAway function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ShouldLookAwayInputSchema = z.object({
  passwordInput: z
    .string()
    .describe('The current value of the password input field.'),
});
export type ShouldLookAwayInput = z.infer<typeof ShouldLookAwayInputSchema>;

const ShouldLookAwayOutputSchema = z.object({
  shouldLookAway: z
    .boolean()
    .describe(
      'Whether the 3D element should look away based on the password input.'
    ),
});
export type ShouldLookAwayOutput = z.infer<typeof ShouldLookAwayOutputSchema>;

export async function shouldLookAway(
  input: ShouldLookAwayInput
): Promise<ShouldLookAwayOutput> {
  return shouldLookAwayFlow(input);
}

const prompt = ai.definePrompt({
  name: 'shouldLookAwayPrompt',
  input: {schema: ShouldLookAwayInputSchema},
  output: {schema: ShouldLookAwayOutputSchema},
  prompt: `Determine if the 3D element should look away based on the password input. The element should look away while the user is typing in the password field.

Password Input: {{{passwordInput}}}

Consider the following:
- If the password input is empty, the element should not look away.
- If the password input is being actively typed into (length is greater than zero), the element should look away.

Return a JSON object with a single boolean field called "shouldLookAway". The "shouldLookAway" field should be true if the 3D element should look away, and false otherwise.`,
});

const shouldLookAwayFlow = ai.defineFlow(
  {
    name: 'shouldLookAwayFlow',
    inputSchema: ShouldLookAwayInputSchema,
    outputSchema: ShouldLookAwayOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
