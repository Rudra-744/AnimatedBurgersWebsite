"use client"; // Error boundaries must be Client Components

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            padding: "2rem",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          <div style={{ textAlign: "center", maxWidth: "28rem" }}>
            <p
              style={{
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "#ef4444",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Critical Error
            </p>
            <h2
              style={{
                marginTop: "1rem",
                fontSize: "1.875rem",
                fontWeight: 700,
                letterSpacing: "-0.025em",
              }}
            >
              Something went wrong
            </h2>
            <p
              style={{
                marginTop: "1.5rem",
                fontSize: "1rem",
                lineHeight: 1.75,
                color: "#71717a",
              }}
            >
              A critical error occurred. Please try refreshing the page.
            </p>
            <div style={{ marginTop: "2.5rem" }}>
              <button
                onClick={() => unstable_retry()}
                style={{
                  borderRadius: "9999px",
                  backgroundColor: "#f97316",
                  padding: "0.75rem 1.5rem",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "#ffffff",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
