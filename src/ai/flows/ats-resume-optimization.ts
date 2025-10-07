'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing ATS resume optimization suggestions.
 *
 * - atsResumeOptimization - A function that takes a resume and job description as input and returns optimization suggestions.
 * - AtsResumeOptimizationInput - The input type for the atsResumeOptimization function.
 * - AtsResumeOptimizationOutput - The return type for the atsResumeOptimization function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AtsResumeOptimizationInputSchema = z.object({
  resumeText: z
    .string()
    .describe('The text content of the resume to be optimized.'),
  jobDescription: z
    .string()
    .describe('The job description for which the resume is being optimized.'),
});
export type AtsResumeOptimizationInput = z.infer<
  typeof AtsResumeOptimizationInputSchema
>;

const AtsResumeOptimizationOutputSchema = z.object({
  suggestions: z
    .string()
    .describe(
      'A list of suggestions to optimize the resume for the given job description, specifically for ATS systems.  Include keywords, formatting, and content changes.'
    ),
});
export type AtsResumeOptimizationOutput = z.infer<
  typeof AtsResumeOptimizationOutputSchema
>;

export async function atsResumeOptimization(
  input: AtsResumeOptimizationInput
): Promise<AtsResumeOptimizationOutput> {
  return atsResumeOptimizationFlow(input);
}

const atsResumeOptimizationPrompt = ai.definePrompt({
  name: 'atsResumeOptimizationPrompt',
  input: {schema: AtsResumeOptimizationInputSchema},
  output: {schema: AtsResumeOptimizationOutputSchema},
  prompt: `You are an expert resume optimization consultant, specializing in helping candidates get past Applicant Tracking Systems (ATS).  A candidate will provide their resume text and a job description. You will provide a list of actionable suggestions to improve the resume for the ATS, including changes to keywords, formatting, and content.

Resume Text: {{{resumeText}}}

Job Description: {{{jobDescription}}} `,
});

const atsResumeOptimizationFlow = ai.defineFlow(
  {
    name: 'atsResumeOptimizationFlow',
    inputSchema: AtsResumeOptimizationInputSchema,
    outputSchema: AtsResumeOptimizationOutputSchema,
  },
  async input => {
    const {output} = await atsResumeOptimizationPrompt(input);
    return output!;
  }
);
