document.addEventListener("mouseup", (event) => {
  let selectedText = window.getSelection().toString().trim();
  if (selectedText.length > 0) {
    // Send the selected text to the background script for a ChatGPT search

    chrome.runtime.sendMessage(
      { action: "searchChatGPT", text: selectedText },
      (response) => {
        if (response.result) {
          // Create a popup and print the result just below the selected text
          // The implementation of createPopup is not shown here but would involve
          // creating a DOM element and setting its innerHTML to response.result
          // createPopup(response.result, event.clientX, event.clientY);
          createPopup(response.result, 76, 500);
        }
      }
    );
  }
});

function createPopup(result, x, y) {
  // First, remove any existing popup
  const existingPopup = document.getElementById("chatgpt-popup");
  if (existingPopup) {
    existingPopup.remove();
  }

  // Create a new popup element
  const popup = document.createElement("div");
  popup.id = "chatgpt-popup";
  popup.style.position = "absolute";
  popup.style.left = `${x}px`;
  popup.style.top = `${y}px`;
  popup.style.zIndex = "1000";
  popup.style.width = "auto";
  popup.style.maxWidth = "300px"; // Limit the width of the popup
  popup.style.height = "auto";
  popup.style.backgroundColor = "white";
  popup.style.border = "1px solid black";
  popup.style.borderRadius = "8px";
  popup.style.padding = "10px";
  popup.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
  popup.style.fontSize = "16px";
  popup.style.color = "black";
  popup.style.overflow = "hidden";
  popup.innerHTML = result;

  // Append the popup to the body
  document.body.appendChild(popup);

  // Adjust position if the popup goes out of viewport
  const rect = popup.getBoundingClientRect();
  if (rect.right > window.innerWidth) {
    popup.style.left = `${window.innerWidth - rect.width - 20}px`; // 20px for margin
  }
  if (rect.bottom > window.innerHeight) {
    popup.style.top = `${window.innerHeight - rect.height - 20}px`; // 20px for margin
  }
}
