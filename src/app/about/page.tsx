import AboutClient from './AboutClient';
import { Metadata } from 'next';
import { getSiteConfig, getHobbies } from '@/lib/data';

export const metadata: Metadata = {
    title: 'About | Qicheng Domino',
    description: 'Learn more about Qicheng, their background, and hobbies.',
};

export default async function AboutPage() {
    const siteConfig = await getSiteConfig();
    const hobbies = await getHobbies();

    return (
        <div style={{ paddingTop: '120px' }}>
            <AboutClient config={siteConfig} hobbies={hobbies} />
        </div>
    );
}
