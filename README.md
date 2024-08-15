# PawFeed

Feedback that fetches results! 🐾

## Why PawFeed?

**PawFeed** is on a mission to make feedback collection cool again. We believe that gathering feedback should be as effortless and enjoyable as a game of fetch with your dog (woof!). That’s why we created an open-source, easy-to-use feedback collection widget for React applications. With PawFeed, you can start collecting feedback in seconds, without the hassle.

But we’re not stopping there. We understand the importance of filtering out the noise and focusing on what really matters: constructive feedback. To help you do that, we’re launching a beta program featuring advanced machine learning capabilities that will:

1. **Filter out negative and non-constructive feedback** – Cut through the noise and focus on insights that drive improvement.
2. **Prioritize constructive feedback** – Ensure the most valuable feedback is front and center.
3. **Auto-summarize feedback** – Get a clear overview of user sentiment and key takeaways.
4. **Integrate with tools like GitHub, Jira, Linear, and more** – Seamlessly convert feedback into actionable tasks and issues.

And the best part? You remain in full control of your data throughout the process!

Join us in making feedback collection a positive, productive experience. Let’s fetch the insights that will help your app thrive!

## Features

- 🐾 **Drag-and-Drop Configurable**: Easily customizable feedback forms with drag-and-drop functionality, fetching you the results you need.
- 🐕 **Integration**: Send feedback directly to your Slack or Discord channel, ensuring that valuable insights are fetched right into your workflow.
- 📝 **Customizable Themes**: Tailor the look and feel of the widget to match your application’s design, and fetch the style that suits you best.
- 💬 **Multi-Platform Support**: Works effortlessly on Electron apps, web apps, and Next.js/Vercel projects, fetching consistent results across platforms.

## Installation

Install the PawFeed widget via npm:

```bash
npm install pawfeed
```

## Usage

Here’s a simple example of how to integrate PawFeed into your React application and start fetching valuable feedback:

```
import React from 'react';
import { PawFeed } from 'pawfeed';

function App() {
  return (
    <div className="App">
      <PawFeed
        connector={{
           name: "slack",
           config: {
             slack: {
               channel: <slack-channel-id>,
               token: <slack-token>,
             },
           },
        }}
        theme="dark"
        position={{ bottom: 20, right: 20 }}
      />
    </div>
  );
}

export default App;
```

## Customization

You can customize the PawFeed widget by passing additional props for colors, text, and more. Here’s an example of how to fetch a unique look with custom styles:

```
<PawFeed
    connector={{
        name: "discord",
        config: {
            discord: {
                webhookUrl: "https://discord.com/api/webhooks/your-webhook-url",
            },
        },
    }}
    theme={"dark"}
    position={{ bottom: 20, right: 20 }}
    buttonOptions={{
        size: "small",
    }}
    name="milo"
    email="milo@gmail.com"
    tooltipOptions={{
        showTooltip: true,
        position: "top",
        tooltipMessage: "Let us know what you think! we are glad to help you out",
        tooltipFontSize: 12,
    }}
    widgetOptions={{
        showTitle: true,
        showDescription: false,
        width: 300,
        fontSize: 14,
    }}
    draggable={true}
    requiredFields={["name", "email", "feedback"]}
    optionalFields={["rating"]}
    />
</div>
```

## Contributing

We welcome contributions to PawFeed! If you have ideas for new features or have found a bug, feel free to open an issue or submit a pull request. Together, we can fetch even better results!

## Development

To set up the development environment:

Fork the repository.

Clone your fork to your local machine.

Install dependencies:

```
npm install
```

Start the development server:

```
npm start
```

## License

PawFeed is released under the MIT License.
