export async function onRequest(context) {
  const apiUrl = "https://emasku.co.id/api/v1/branding/prices/one";

  try {
    const response = await fetch(apiUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Allow all origins for this public data
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch gold price" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
