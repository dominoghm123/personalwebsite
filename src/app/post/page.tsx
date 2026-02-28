import PostGrid from '@/components/post/PostGrid';
import { getWeChatPosts } from '@/lib/data';

export default async function PostPage() {
    const posts = await getWeChatPosts();

    return (
        <div className="container-padding" style={{
            /* 🎓 完美吻合设定：Navbar(80px) + 吸顶间距(40px) = 120px */
            paddingTop: '120px',
            paddingBottom: '40px',
            maxWidth: '1200px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 10,
        }}>
            <h1 style={{
                fontFamily: 'var(--font-secondary)',
                fontSize: 'clamp(28px, 3.5vw, 44px)', // 🎓 进一步压紧字号，不抢夺卡片视觉核心
                lineHeight: 1.1,
                color: 'var(--color-primary)', // Using the pleasant purple accent
                fontWeight: 700,
                marginBottom: '48px',
            }}>
                Post
            </h1>

            {/* 🎓 The CSS Columns Masonry Grid Container */}
            <PostGrid posts={posts} />
        </div>
    );
}
