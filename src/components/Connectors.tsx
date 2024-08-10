import { ConnectorConfig } from "../types/ConnectorConfig";
import { FeedbackData } from "../types/Feedback";

export interface Connector {
  name: string;
  submit: (data: FeedbackData, config: any) => Promise<void>;
}

class SlackConnector implements Connector {
  name = "slack";
  async submit(data: FeedbackData, config: ConnectorConfig["slack"]) {
    if (!config || !config.apiKey || !config.channelId) {
      throw new Error("Invalid Slack configuration");
    }
    // Implement Slack submission logic here using config.apiKey and config.channelId
    console.log("Submitting to Slack:", data, "Config:", config);
  }
}

class DiscordConnector implements Connector {
  name = "discord";
  async submit(data: FeedbackData, config: ConnectorConfig["discord"]) {
    if (!config || !config.webhookUrl) {
      throw new Error("Invalid Discord configuration");
    }
    // Implement Discord submission logic here using config.webhookUrl
    console.log("Submitting to Discord:", data, "Config:", config);
  }
}

class SupabaseConnector implements Connector {
  name = "supabase";
  async submit(data: FeedbackData, config: ConnectorConfig["supabase"]) {
    if (!config || !config.url || !config.apiKey || !config.tableName) {
      throw new Error("Invalid Supabase configuration");
    }
    // Implement Supabase submission logic here using config.url, config.apiKey, and config.tableName
    console.log("Submitting to Supabase:", data, "Config:", config);
  }
}

export const connectors: Record<string, Connector> = {
  slack: new SlackConnector(),
  discord: new DiscordConnector(),
  supabase: new SupabaseConnector(),
};

export const submitFeedback = async (
  connectorName: string,
  data: FeedbackData,
  config: ConnectorConfig
) => {
  const selectedConnector = connectors[connectorName];
  if (selectedConnector) {
    await selectedConnector.submit(
      data,
      config[connectorName as keyof ConnectorConfig]
    );
  } else {
    throw new Error(`Connector '${connectorName}' not found`);
  }
};
