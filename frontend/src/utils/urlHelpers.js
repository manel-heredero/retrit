export const isValidUrl = (string) => {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
};

export const isValidGoogleMapsUrl = (url) => {
    return isValidUrl(url) && url.includes('google.com/maps');
};

export const formatUrl = (url) => {
    if (!url) return '';
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return `https://${url}`;
    }
    return url;
};
