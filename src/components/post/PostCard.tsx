import Image from 'next/image';
import Link from 'next/link';
import styles from './PostCard.module.css';

// 🎓 定义数据契约
export interface PostCardProps {
    post: {
        id: string;
        title: string;
        cover: string;
        url: string;
        publishDate: string;
    }
}

/**
 * 🎓 Post Card Component
 * PRD Requirement: 瀑布流 (Masonry) 布局。仅显示图片、标题和日期。
 */
export default function PostCard({ post }: PostCardProps) {
    return (
        <a href={post.url} target="_blank" rel="noopener noreferrer" className={styles.card}>
            {post.cover && (
                <div className={styles.imageWrapper}>
                    <Image
                        src={post.cover}
                        alt={post.title}
                        fill
                        className={styles.image}
                        sizes="(max-width: 900px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
            )}

            <div className={styles.content}>
                <h3 className={styles.title}>{post.title}</h3>
                <div className={styles.date}>{post.publishDate}</div>
            </div>
        </a>
    );
}
