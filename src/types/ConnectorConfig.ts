export interface ConnectorConfig {
  slack?: {
    apiKey: string;
    channelId: string;
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
