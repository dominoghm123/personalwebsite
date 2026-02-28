import Link from 'next/link';
import Image from 'next/image';
import styles from './ProjectCarousel.module.css';

interface CarouselItemData {
    id: string;
    title: string;
    thumbnail: string;
    description: string;
    externalUrl?: string;
    type: 'external' | 'gallery';
    category?: string;
}

export default function ProjectCarousel({ items }: { items: CarouselItemData[] }) {
    if (!items || items.length === 0) return null;

    return (
        <div className={styles.carousel}>
            {items.map(item => {
                const href = item.type === 'gallery' ? `/project/${item.category}` : item.externalUrl || '#';
                return (
                    <Link
                        key={item.id}
                        href={href}
                        className={styles.item}
                        target={item.type === 'external' ? '_blank' : undefined}
                        rel={item.type === 'external' ? 'noopener noreferrer' : undefined}
                    >
                        <div className={styles.thumb}>
                            <Image
                                src={item.thumbnail}
                                alt={item.title}
                                width={400}
                                height={300}
                                className={styles.image}
                                sizes="(max-width: 600px) 85vw, (max-width: 900px) 50vw, 33vw"
                            />
                        </div>
                        <div className={styles.info}>
                            <h3 className={styles.title}>{item.title}</h3>
                            <p className={styles.description}>{item.description}</p>
                            <span className={styles.explore}>Explore →</span>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}
