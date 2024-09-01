export type FormCheckResult = {
  status: number | null;
  message: string;
  endpointURLEncoded?: string;
  queryEncoded?: string;
};