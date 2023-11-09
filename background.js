let timeoutID = null;

chrome.runtime.onInstalled.addListener(() => {
  console.log("Using API Key:", ENV.API_KEY);

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const { action, text } = request;

    if (action === "searchChatGPT" && text) {
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ENV.API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4",
            messages: [{ role: "user", content: text }], // Format the input as a message
            // Additional parameters can be added as needed
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.error) {
              console.error("API Error:", data.error);
            } else {
              // Assuming the response has a 'choices' array, even if it's just one
              sendResponse({ result: data.choices[0].message.content });
            }
          })
          .catch((error) => console.error("Error:", error));
      }, 2000); // 2 second debounce
    }

    return true; // Keep the channel open for the async response
  });
});
