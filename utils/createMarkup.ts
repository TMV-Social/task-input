export default function createMarkup(content: string) {
  // Split the content at each newline and map each part to a <li> element
  const listItemsHtml = content
    .split('\n')
    .map((part) => {
      // Detect URLs starting with "https://" and replace them with clickable links
      const urlRegex = /https:\/\/[^\s]+/g
      const partWithLinks = part.replace(
        urlRegex,
        (url) => `<a href="${url}" target="_blank">${url}</a>`,
      )
      return `<li>${partWithLinks}</li>`
    })
    .join('')

  // Sanitize the content to prevent XSS attacks if it's user-generated
  // Example: const safeContent = DOMPurify.sanitize(listItemsHtml);

  return { __html: listItemsHtml /* or safeContent if sanitized */ }
}