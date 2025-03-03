# Azure Bot Service Example

This is a simple example of a bot built with the Microsoft Bot Framework and deployed as an Azure Bot Service.

## Prerequisites

- [Node.js](https://nodejs.org/en/) version 14 or higher
- [Bot Framework Emulator](https://github.com/microsoft/BotFramework-Emulator/releases/latest) for testing locally
- An Azure account (for deployment)

## Setup

1. Clone this repository
2. Run `npm install` to install dependencies
3. Create a `.env` file based on the provided template and fill in your Azure Bot Service credentials
4. Run `npm start` to start the bot locally

## Testing Locally

1. Start the bot with `npm start`
2. Open Bot Framework Emulator
3. Connect to http://localhost:3978/api/messages
4. If you have configured authentication, enter your Microsoft App ID and password

## Deploying to Azure

1. Create an Azure Bot Service in the Azure Portal
2. Set up continuous deployment from your repository or use Azure CLI to deploy
3. Configure the environment variables in the Azure Portal to match your `.env` file

## Extending the Bot

This is a simple echo bot that repeats back user messages. To extend its functionality:

1. Modify the `bot.js` file to add more complex conversation flows
2. Add additional dialog handlers as needed
3. Integrate with Azure Cognitive Services for more advanced capabilities

## Additional Resources

- [Bot Framework Documentation](https://docs.microsoft.com/en-us/azure/bot-service/?view=azure-bot-service-4.0)
- [Bot Builder Samples](https://github.com/microsoft/BotBuilder-Samples)
- [Azure Bot Service Documentation](https://docs.microsoft.com/en-us/azure/bot-service/bot-service-overview-introduction?view=azure-bot-service-4.0) 