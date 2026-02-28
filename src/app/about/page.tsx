import fs from 'fs';
import path from 'path';
import AboutClient from './AboutClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About | Qicheng Domino',
    description: 'Learn more about Qicheng, their background, and hobbies.',
};

export default function AboutPage() {
    const configPath = path.join(process.cwd(), 'public/content/site-config.json');
    const hobbiesPath = path.join(process.cwd(), 'public/content/hobbies.json');

    const siteConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    const hobbiesData = JSON.parse(fs.readFileSync(hobbiesPath, 'utf8'));

    return (
        <main className="container-padding" style={{ paddingTop: '120px' }}>
            <AboutClient config={siteConfig} hobbies={hobbiesData.hobbies} />
        </main>
    );
}
