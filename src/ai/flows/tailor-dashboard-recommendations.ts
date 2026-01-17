'use server';

/**
 * @fileOverview A flow to tailor dashboard recommendations based on user location and living type.
 *
 * - tailorDashboardRecommendations - A function that generates personalized recommendations.
 * - TailorDashboardRecommendationsInput - The input type for the tailorDashboardRecommendations function.
 * - TailorDashboardRecommendationsOutput - The return type for the tailorDashboardRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TailorDashboardRecommendationsInputSchema = z.object({
  city: z.string().describe('The user\u0027s city.'),
  livingType: z.enum(['Flat', 'House', 'Ground']).describe('The user\u0027s living type (Flat, House, or Ground).'),
  preferences: z.string().optional().describe('Any specific user preferences or concerns regarding sustainability.'),
});

export type TailorDashboardRecommendationsInput = z.infer<typeof TailorDashboardRecommendationsInputSchema>;

const TailorDashboardRecommendationsOutputSchema = z.object({
  recommendations: z.array(z.string()).describe('A list of personalized sustainability recommendations.'),
});

export type TailorDashboardRecommendationsOutput = z.infer<typeof TailorDashboardRecommendationsOutputSchema>;

export async function tailorDashboardRecommendations(input: TailorDashboardRecommendationsInput): Promise<TailorDashboardRecommendationsOutput> {
  return tailorDashboardRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'tailorDashboardRecommendationsPrompt',
  input: {schema: TailorDashboardRecommendationsInputSchema},
  output: {schema: TailorDashboardRecommendationsOutputSchema},
  prompt: `You are a sustainability expert providing personalized recommendations to users based on their location, living type, and preferences.

  Location: {{city}}
  Living Type: {{livingType}}
  Preferences: {{preferences}}

  Generate a list of actionable recommendations tailored to the user that will help them reduce their urban heat impact and promote sustainability. Recommendations should be specific and practical.

  Format the recommendations as a numbered list.
  `,
});

const tailorDashboardRecommendationsFlow = ai.defineFlow(
  {
    name: 'tailorDashboardRecommendationsFlow',
    inputSchema: TailorDashboardRecommendationsInputSchema,
    outputSchema: TailorDashboardRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
