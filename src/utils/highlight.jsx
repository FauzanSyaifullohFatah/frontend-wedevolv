function highlightText(text, keyword) {
  if (!keyword) return text;

  const regex = new RegExp(`(${keyword})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, i) => 
    part.toLocaleLowerCase() === keyword.toLocaleLowerCase()
    ? (
      <span key={i} className="highlight-text">
        {part}
      </span>
    )
    : part
  )
}

export default highlightText;