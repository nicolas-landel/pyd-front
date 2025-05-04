export function flattenResponseData(data) {
  if (typeof data === 'string') {
    return "";
  }
  return Object.entries(data)
    .map(([key, value]) => {
      const messages = Array.isArray(value) ? value.join(', ') : value;
      const truncatedMessage = truncateMessage(messages, 100); // Limit to 100 characters
      return `${capitalizeFirstLetter(key)}: ${truncatedMessage}`;
    })
    .join('\n');
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function truncateMessage(message, maxLength) {
  return message.length > maxLength ? `${message.slice(0, maxLength)}...` : message;
}