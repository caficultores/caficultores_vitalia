import { z } from "zod";

export const CertificationRequestSchema = z.object({
  variety: z.string({
    required_error: "Please select a variety.",
  }),
  harvestDate: z.string({
    required_error: "Please select a harvest date.",
  }),
  altitude: z.string({
    required_error: "Please enter an altitude.",
  }),
  village: z.string({
    required_error: "Please enter a village.",
  }),
  processingMethod: z.string({
    required_error: "Please select a processing method.",
  }),
  province: z.string({
    required_error: "Please select a province.",
  }),
  city: z.string({
    required_error: "Please select a city.",
  }),
  farmName: z.string({
    required_error: "Please enter a farm name.",
  }),
  sampleQuantity: z.string({
    required_error: "Please enter a sample quantity.",
  }),
  analysisExpectations: z.string({
    required_error: "Please enter analysis expectations.",
  }),
  district: z.string({
    required_error: "Please enter a district.",
  }),
  coffeeName: z.string({
    required_error: "Please enter a coffee name.",
  }),
  tastingNotes: z.string({
    required_error: "Please enter tasting notes.",
  }),
});
