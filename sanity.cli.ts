/**
 * This configuration file lets you run `$ sanity [command]` in this folder
 * Go to https://www.sanity.io/docs/cli to learn more.
 **/
import { defineCliConfig } from 'sanity/cli';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export default defineCliConfig({
  api: { projectId, dataset },
  typegen: {
    enabled: true,
    path: './src/**/*.{ts,tsx,js,jsx}', // glob pattern to your typescript files. Can also be an array of paths
    generates: './sanity.types.ts', // path to the output file for generated type definitions
    overloadClientMethods: true, // set to false to disable automatic overloading the sanity client
  },
  schemaExtraction: { enabled: true, path: './' },
});
