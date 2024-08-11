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
    if (!config || !config.token || !config.channel) {
      throw new Error("Invalid Slack configuration");
    }
    // Implement Slack submission logic here using config.apiKey and config.channelId
    console.debug("Submitting to Slack:", data, "Config:", config);

    const { name, email, feedback, rating } = data;
    const body = `channel=${config.channel}&blocks=${JSON.stringify([
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "New Feedback Received",
          emoji: true,
        },
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*Name:*\n${name || "Anonymous"}`,
          },
          {
            type: "mrkdwn",
            text: `*Email:*\n${email || "Not provided"}`,
          },
        ],
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*Rating:*\n${rating ? `${rating}/5` : "Not provided"}`,
          },
        ],
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Feedback:*\n${feedback || "No feedback provided"}`,
        },
      },
    ])}&token=${config.token}`;

    try {
      await retryRequest(async () => {
        const response = await fetch("https://slack.com/api/chat.postMessage", {
          method: "POST",
          body: new URLSearchParams(body).toString(), // Convert the payload to a URL-encoded string
          headers: {
            "Content-Type": "application/x-www-form-urlencoded", // Set the content type
          },
        });

        if (!response.ok) {
          throw new Error(
            `Slack API Error! status: ${response.status}; statusText: ${response.statusText}`
          );
        } else {
          const data = await response.json();
          if (!data.ok) {
            throw new Error("Slack API error: " + data.error);
          }
        }
      });

      console.log("Feedback submitted to Slack successfully");
    } catch (error) {
      console.error("Error submitting feedback to Slack:", error);
      throw new Error("Failed to submit feedback to Slack");
    }
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

    // Color based on rating
    let embedColor;

    switch (rating) {
      case 1:
        embedColor = 0xff0000; // Red for 1 star
        break;
      case 2:
        embedColor = 0xffa500; // Orange for 2 stars
        break;
      case 3:
        embedColor = 0xffff00; // Yellow for 3 stars
        break;
      case 4:
        embedColor = 0x90ee90; // Light Green for 4 stars
        break;
      case 5:
        embedColor = 0x008000; // Green for 5 stars
        break;
      default:
        embedColor = 0x7289da; // Default Discord blue color if no rating or invalid rating
        break;
    }

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
            `Discord API Error! status: ${response.status}; statusText: ${response.statusText}`
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
