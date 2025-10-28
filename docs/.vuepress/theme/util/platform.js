/**
 * Map of platform keys to uniquely identifying user-agent substring.
 */
const PLATFORM_STRINGS = {
    ANDROID: ['Android'],
    IOS: ['iPhone', 'iPod', 'iPad'],
    MACOS: ['Macintosh', 'macOS'],
    WINDOWS: ['Windows NT'],
    LINUX: ['Linux'],
    // This isn’t an expected match—we just need a fallback value to index on:
    UNKNOWN: ['Unknown'],
};

const META_KEYS = {
    MACOS: '⌘',
    UNKNOWN: 'Ctrl',
};

/**
 * Return the current “platform” identifier, based on crude UA-sniffing.
 * 
 * @returns {String}
 */
function getPlatform() {
    if (typeof window === 'undefined') {
        return 'UNKNOWN';
    }

    const ua = window.navigator.userAgent;

    for (let p in PLATFORM_STRINGS) {
        for (let str of PLATFORM_STRINGS[p]) {
            if (ua.includes(str)) {
                return p;
            }
        }
    }

    return PLATFORM_STRINGS.UNKNOWN;
}

/**
 * Returns the name/symbol for the current platform’s primary modifier/shortcut key.
 * 
 * @param {String} platform 
 * @returns {String}
 */
function getShortcutKey(platform) {
    if (!platform) {
        platform = getPlatform();
    }

    return META_KEYS[platform] || META_KEYS['UNKNOWN'];
}


export { PLATFORM_STRINGS, META_KEYS, getPlatform, getShortcutKey };
