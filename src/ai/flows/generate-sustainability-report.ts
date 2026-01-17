'use server';

/**
 * @fileOverview Generates a personalized sustainability report based on user location and living type.
 *
 * - generateSustainabilityReport - A function that generates the sustainability report.
 * - SustainabilityReportInput - The input type for the generateSustainabilityReport function.
 * - SustainabilityReportOutput - The return type for the generateSustainabilityReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SustainabilityReportInputSchema = z.object({
  location: z.string().describe('The user\u0027s city.'),
  livingType: z
    .enum(['Flat', 'House', 'Ground'])
    .describe('The user\u0027s living type (Flat, House, or Ground).'),
});
export type SustainabilityReportInput = z.infer<typeof SustainabilityReportInputSchema>;

const SustainabilityReportOutputSchema = z.object({
  report: z.string().describe('The personalized sustainability report.'),
});
export type SustainabilityReportOutput = z.infer<typeof SustainabilityReportOutputSchema>;

export async function generateSustainabilityReport(
  input: SustainabilityReportInput
): Promise<SustainabilityReportOutput> {
  return generateSustainabilityReportFlow(input);
}

const sustainabilityReportPrompt = ai.definePrompt({
  name: 'sustainabilityReportPrompt',
  input: {schema: SustainabilityReportInputSchema},
  output: {schema: SustainabilityReportOutputSchema},
  prompt: `You are a sustainability expert providing personalized advice.

  Based on the user's location ({{location}}) and living type ({{livingType}}), generate a sustainability report with actionable recommendations on how they can reduce their environmental impact and promote climate activism.  The advice should be tailored to their location and living type.
  Incorporate insights related to urban heat analysis of their location.
  `,
});

const generateSustainabilityReportFlow = ai.defineFlow(
  {
    name: 'generateSustainabilityReportFlow',
    inputSchema: SustainabilityReportInputSchema,
    outputSchema: SustainabilityReportOutputSchema,
  },
  async input => {
    const {output} = await sustainabilityReportPrompt(input);
    return output!;
  }
);
