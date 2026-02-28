import PostCard, { PostCardProps } from './PostCard';
import styles from './PostGrid.module.css';

export default function PostGrid({ posts }: { posts: PostCardProps['post'][] }) {
    if (!posts || posts.length === 0) {
        return <p>Loading articles...</p>;
    }

    return (
        <div className={styles.grid}>
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
}
