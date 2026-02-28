'use client';

import { useState } from 'react';
import ProjectCard, { ProjectData } from './ProjectCard';
import Lightbox from './Lightbox';
import styles from '@/components/post/PostGrid.module.css';

interface ProjectGalleryProps {
    images: ProjectData[];
}

export default function ProjectGallery({ images }: ProjectGalleryProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const openLightbox = (index: number) => setActiveIndex(index);
    const closeLightbox = () => setActiveIndex(null);
    const showNext = () => setActiveIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));
    const showPrev = () => setActiveIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));

    return (
        <>
            <div className={styles.grid}>
                {images.map((img, index) => (
                    <ProjectCard 
                        key={img.id} 
                        project={img} 
                        onClick={() => openLightbox(index)}
                    />
                ))}
            </div>

            {activeIndex !== null && (
                <Lightbox 
                    image={images[activeIndex]} 
                    onClose={closeLightbox}
                    onNext={images.length > 1 ? showNext : undefined}
                    onPrev={images.length > 1 ? showPrev : undefined}
                />
            )}
        </>
    );
}
