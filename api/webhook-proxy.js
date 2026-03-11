export default async function handler(req, res) {
    // CORS Headers for Vercel
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Require POST method
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed. Use POST.' });
    }

    const { webhookUrl, payload } = req.body || {};

    if (!webhookUrl) {
        return res.status(400).json({ error: 'webhookUrl is required in the request body.' });
    }

    try {
        const fetchResponse = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        // Check response content type (some n8n webhooks return text, some return json)
        const contentType = fetchResponse.headers.get("content-type");
        let responseData;

        if (contentType && contentType.includes("application/json")) {
            responseData = await fetchResponse.json();
        } else {
            const textData = await fetchResponse.text();
            try {
                responseData = JSON.parse(textData);
            } catch (e) {
                responseData = textData;
            }
        }

        res.status(fetchResponse.status).json(responseData);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to connect to the automation backend through proxy.',
            details: error.message || String(error)
        });
    }
};
