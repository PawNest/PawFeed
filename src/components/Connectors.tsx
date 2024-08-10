import { ConnectorConfig } from "../types/ConnectorConfig";
import { FeedbackData } from "../types/Feedback";
import { retryRequest } from "../utils";

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
    console.debug("Submitting to Discord:", data, "Config:", config);

    const { name, email, feedback, rating } = data;

    const embedColor = rating
      ? Math.floor(((rating - 1) / 4) * 16777215)
      : 0x7289da; // Color based on rating

    const payload = {
      embeds: [
        {
          title: "New Feedback Received",
          color: embedColor,
          fields: [
            { name: "Name", value: name || "Anonymous", inline: true },
            { name: "Email", value: email || "Not provided", inline: true },
            {
              name: "Rating",
              value: rating ? `${rating}/5` : "Not provided",
              inline: true,
            },
            { name: "Feedback", value: feedback || "No feedback provided" },
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    };

    try {
      await retryRequest(async () => {
        const response = await fetch(config.webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(
            `Request Failed! status: ${response.status}; statusText: ${response.statusText}`
          );
        }
      });
      console.debug("Feedback submitted to Discord successfully");
    } catch (error) {
      console.error("Error submitting feedback to Discord: ", error);
      throw new Error("Failed to submit feedback to Discord");
    }
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
