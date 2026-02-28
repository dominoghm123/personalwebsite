import Link from 'next/link';
import Image from 'next/image';
import styles from './FeaturedProject.module.css';

interface FeaturedData {
    id: string;
    title: string;
    description: string;
    images: {
        base: string;
        hover: string;
    };
    link: string;
}

export default function FeaturedProject({ project }: { project: FeaturedData }) {
    return (
        <Link href={project.link} target="_blank" rel="noopener noreferrer" className={styles.featured}>
            <div className={styles.cover}>
                <Image
                    src={project.images.base}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    priority
                    className={styles.baseImg}
                />
                <Image
                    src={project.images.hover}
                    alt={`${project.title} inside`}
                    fill
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    className={styles.hoverImg}
                />
            </div>
            <div className={styles.content}>
                <h2 className={styles.title}>{project.title}</h2>
                <p className={styles.description}>{project.description}</p>
                <span className={styles.explore}>Explore →</span>
            </div>
        </Link>
    );
}
