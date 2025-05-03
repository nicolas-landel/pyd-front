export function flattenResponseData(data) {
  return Object.entries(data)
    .map(([key, value]) => {
      const messages = Array.isArray(value) ? value.join(', ') : value;
      return `${capitalizeFirstLetter(key)}: ${messages}`;
    })
    .join('\n');
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}