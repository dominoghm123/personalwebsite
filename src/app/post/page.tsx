import { readFileSync } from 'fs';
import path from 'path';
import PostGrid from '@/components/post/PostGrid';

/**
 * 🎓 Server Component DataLoader
 * 利用 Next.js 强大的 SSG 能力在构建时静态吞噬数据。
 */
async function getPostsData() {
    // 因为这会在服务器跑，我们需要组装绝对路径找 public 里的 JSON
    const filePath = path.join(process.cwd(), 'public/content/wechat-posts.json');
    const fileContents = readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    return data.posts || [];
}

export default async function PostPage() {
    const posts = await getPostsData();

    return (
        <div style={{
            /* 🎓 完美吻合设定：Navbar(80px) + 吸顶间距(40px) = 120px */
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
