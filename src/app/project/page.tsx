import FeaturedProject from '@/components/project/FeaturedProject';
import ProjectCarousel from '@/components/project/ProjectCarousel';
import { getProjects } from '@/lib/data';

export default async function ProjectPage() {
    const data = await getProjects();

    return (
        <div className="container-padding" style={{
            paddingTop: '120px',
            paddingBottom: '40px',
            maxWidth: '1200px',
            margin: '0 auto',
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
