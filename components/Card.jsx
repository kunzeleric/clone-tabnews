import React from "react";

export default function Card({ title, content }) {
  return (
    <>
      <div style={styles.card}>
        <h2 style={styles.title}>{title}</h2>
        <p style={styles.content}>{content}</p>
      </div>
    </>
  );
}

const styles = {
  card: {
    boxSizing: "border-box",
    width: "320px",
    height: "120px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    backgroundColor: "#ffffff",
    border: "1px solid #e2e2e2",
    borderRadius: "12px",
    padding: "20px 24px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  },
  title: {
    flexShrink: 0,
    fontSize: "1.5rem",
    fontWeight: 700,
    margin: "0 0 12px",
    color: "#1a1a1a",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  content: {
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: 1.5,
    margin: 0,
    color: "#444444",
    overflow: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 4,
  },
};
