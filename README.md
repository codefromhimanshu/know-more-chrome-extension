# Know More Extension

This Chrome extension enables users to select text on any webpage and use OpenAI's GPT-4 to generate responses that appear in a popup near the selected text. This helps in learning about keywords, side topic while reading blog, news, article, tweet. 

## Features

- Text selection detection: The extension reacts when the user selects text on any webpage.
- Debounced API calls: Avoids overloading the API with requests by implementing a debounce mechanism.
- Popup display: Shows the ChatGPT response in a popup near the selected text.

## Setup Instructions

### Getting Started

Before you begin, make sure you have access to OpenAI's API and have obtained an API key.

## Setup

To set up the extension locally, follow these steps:

1. **Get an API Key**: Obtain an API key from OpenAI's website by creating an account and setting up API access.

2. **Configure API Key**: Create an `env.js` file in the root of the project with the following content, replacing `your-secret-api-key` with your actual API key:

   ```javascript
   const ENV = {
     API_KEY: 'your-secret-api-key'
   };