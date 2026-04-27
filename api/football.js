const API_KEY = '07740c047e40400e9faebe27e75b11f5';
const BASE    = 'https://api.football-data.org/v4';

module.exports = async function handler(req, res) {
    const endpoint = req.query.endpoint;
    if (!endpoint || !endpoint.startsWith('/')) {
        return res.status(400).json({ error: 'Missing or invalid endpoint' });
    }

    try {
        const response = await fetch(`${BASE}${endpoint}`, {
            headers: { 'X-Auth-Token': API_KEY }
        });
        const data = await response.json();
        res.status(response.status).json(data);
    } catch (e) {
        res.status(500).json({ error: 'Proxy error', detail: e.message });
    }
};
