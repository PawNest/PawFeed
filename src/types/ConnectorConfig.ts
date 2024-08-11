export interface ConnectorConfig {
  slack?: {
    token: string;
    channel: string;
  };
  discord?: {
    webhookUrl: string;
  };
  supabase?: {
    url: string;
    apiKey: string;
    tableName: string;
  };
  // Add other connector configurations as needed
}
