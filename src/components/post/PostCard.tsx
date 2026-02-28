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
        tags: string[];
        excerpt: string;
        publishDate: string;
    }
}

/**
 * 🎓 Post Card Component
 * PRD Requirement: 瀑布流 (Masonry) 布局。卡片默认白色，悬停变为 #f0eee6。悬停时不产生位移或放大。
 */
export default function PostCard({ post }: PostCardProps) {
    return (
        <a href={post.url} target="_blank" rel="noopener noreferrer" className={styles.card}>
            {post.cover && (
                <div className={styles.imageWrapper}>
                    {/* 🎓 这里使用了 fill 和 objectFit，是为了让随意长宽比的文章封面被优雅包裹在固定比率容器内 */}
                    <Image
                        src={post.cover}
                        alt={post.title}
                        fill
                        className={styles.image}
                        sizes="(max-width: 900px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
            )}

            <div className={styles.tags}>
                {post.tags.map((tag, idx) => (
                    <span key={idx} className={styles.tag}>{tag}</span>
                ))}
            </div>

            <h3 className={styles.title}>{post.title}</h3>
            <p className={styles.excerpt}>{post.excerpt}</p>
            <div className={styles.date}>{post.publishDate}</div>
        </a>
    );
}
