import { readFileSync } from 'fs';
import path from 'path';
import FeaturedProject from '@/components/project/FeaturedProject';
import ProjectCarousel from '@/components/project/ProjectCarousel';

async function getProjectsData() {
    const filePath = path.join(process.cwd(), 'public/content/projects.json');
    try {
        const fileContents = readFileSync(filePath, 'utf8');
        return JSON.parse(fileContents);
    } catch {
        return { featured: null, carousel: [] };
    }
}

export default async function ProjectPage() {
    const data = await getProjectsData();

    return (
        <div style={{
            paddingTop: '120px',
            paddingBottom: '40px',
            maxWidth: '1200px',
            margin: '0 auto',
            paddingLeft: '64px',
            paddingRight: '64px',
            width: '100%',
            position: 'relative',
            zIndex: 10,
        }}>
            <h1 style={{
                fontFamily: 'var(--font-secondary)',
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                lineHeight: 1.1,
                color: 'var(--color-primary)',
                fontWeight: 700,
                marginBottom: '48px',
            }}>
                Project
            </h1>

            {data.featured && (
                <FeaturedProject project={data.featured} />
            )}

            {data.carousel && data.carousel.length > 0 && (
                <ProjectCarousel items={data.carousel} />
            )}
        </div>
    );
}
