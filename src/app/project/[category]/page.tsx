import { readdirSync } from 'fs';
import path from 'path';
import ProjectGallery from '@/components/project/ProjectGallery';

interface GalleryPageProps {
  params: {
    category: string;
  };
}

async function getGalleryImages(category: string) {
  const dirPath = path.join(process.cwd(), 'public/images/project', category);
  try {
    const files = readdirSync(dirPath);
    return files
      .filter(file => file.endsWith('.webp'))
      .sort((a, b) => {
        const numA = parseInt(a.match(/\d+/)?.[0] || '0');
        const numB = parseInt(b.match(/\d+/)?.[0] || '0');
        return numA - numB;
      })
      .map(file => ({
        id: file,
        title: '',
        cover: `/images/project/${category}/${file}`,
        description: '',
        type: 'gallery' as const
      }));
  } catch (e) {
    console.error('Gallery read error:', e);
    return [];
  }
}

export default async function GalleryPage({ params }: GalleryPageProps) {
  const { category } = params;
  const images = await getGalleryImages(category);
  const displayTitle = category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ');

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
        {displayTitle}
      </h1>

      <ProjectGallery images={images} />
    </div>
  );
}
