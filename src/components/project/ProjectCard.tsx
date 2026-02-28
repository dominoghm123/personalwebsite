'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './ProjectCard.module.css';

export interface ProjectData {
    id: string;
    title: string;
    cover: string;
    type: 'featured' | 'external' | 'gallery';
    description: string;
    link?: string;
    category?: string;
}

interface ProjectCardProps {
    project: ProjectData;
    onClick?: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
    const isInsideGallery = project.description === '' && project.title === '';
    
    // 🎓 这里的设计决策：如果是在 Gallery 内，点击不再跳转路由，而是触发父组件的 Lightbox
    if (isInsideGallery) {
        return (
            <div className={styles.card} onClick={onClick} style={{ cursor: 'zoom-in' }}>
                <div className={styles.imageContainer}>
                    <Image
                        src={project.cover}
                        alt={project.title || 'gallery image'}
                        width={800}
                        height={1000}
                        className={styles.image}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
            </div>
        );
    }

    const href = project.type === 'gallery' ? `/project/${project.category || project.id}` : (project.link || '#');

    return (
        <Link
            href={href}
            className={styles.card}
            target={project.type !== 'gallery' ? '_blank' : undefined}
            rel={project.type !== 'gallery' ? 'noopener noreferrer' : undefined}
        >
            <div className={styles.imageContainer}>
                <Image
                    src={project.cover}
                    alt={project.title}
                    width={800}
                    height={1000}
                    className={styles.image}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>

            <div className={styles.meta}>
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.description}>{project.description}</p>
            </div>
        </Link>
    );
}
