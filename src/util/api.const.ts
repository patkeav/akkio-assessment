

export const API_BASE_URL = 'https://www.thecolorapi.com';

export default {
    getSwatches: async (hue: number, saturation: number, lightness: number) => {
        const url = new URL(`${API_BASE_URL}/id`);
        const params = new URLSearchParams({
            hsl: `${hue},${saturation}%,${lightness}%`,
        });
        const response = await fetch(new URL(`${url}?${params.toString()}`), { headers: { 'Content-Type': 'application/json' } });
        return response.json();
    },
}