export default async function handler(req, res) {
  try {

    // ===== GOOGLE APPS SCRIPT API =====
    const GAS_URL =
      "https://script.google.com/macros/s/AKfycbyhZ3kmNwltzCzufoSWllj4sCtAcBBoddr74H_6oMZYIBptnGRhYJsaAZBitPS_6lmzPQ/exec?mode=api";

    // ===== GET =====
    if (req.method === "GET") {

      const response = await fetch(GAS_URL);

      const data = await response.text();

      res.setHeader("Content-Type", "application/json");

      return res.status(200).send(data);
    }

    // ===== POST =====
    if (req.method === "POST") {

      const response = await fetch(GAS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      });

      const data = await response.text();

      res.setHeader("Content-Type", "application/json");

      return res.status(200).send(data);
    }

    // ===== METHOD NOT ALLOWED =====
    return res.status(405).json({
      error: "Method Not Allowed",
    });

  } catch (err) {

    return res.status(500).json({
      error: err.toString(),
    });

  }
}
