import fs from 'fs';
import path from 'path';

/**
 * 🎓 Unified Data Loader
 * Follows IMPLEMENTATION_PLAN 'Single Logic' strategy.
 * centralizes all JSON reading logic to simplify maintenance.
 */

export async function getLocalJSON(filename: string) {
    const filePath = path.join(process.cwd(), 'public/content', filename);
    try {
        if (!fs.existsSync(filePath)) {
            console.warn(`Data file not found: ${filename}`);
            return null;
        }
        const fileContents = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(fileContents);
    } catch (e) {
        console.error(`Error loading data from ${filename}:`, e);
        return null;
    }
}

// Named helpers for better DX
export async function getSiteConfig() {
    return await getLocalJSON('site-config.json');
}

export async function getWeChatPosts() {
    const data = await getLocalJSON('wechat-posts.json');
    return data?.posts || [];
}

export async function getProjects() {
    const data = await getLocalJSON('projects.json');
    return data || { featured: null, carousel: [] };
}

export async function getHobbies() {
    const data = await getLocalJSON('hobbies.json');
    return data?.hobbies || [];
}

export async function getLocations() {
    const data = await getLocalJSON('locations.json');
    return data?.locations || [];
}
