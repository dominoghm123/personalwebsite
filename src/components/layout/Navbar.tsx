import Link from 'next/link';
import styles from './Navbar.module.css';

/**
 * 🎓 Navbar Component
 * Strictly following DESIGN_SPEC Section 3.3
 * Purpose: Global navigation with frosted glass effect.
 */
export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            {/* 🎓 这里的设计决策：Logo 保持全大写并强制使用 Hepta Slab，体现人文艺术品牌感。 */}
            <div className={styles.logo}>
                <Link href="/">DOMINO.</Link>
            </div>
            <div className={styles.links}>
                <Link href="/post">Post</Link>
                <Link href="/project">Project</Link>
                <Link href="/footprint">Footprint</Link>
                <Link href="/about">About</Link>
            </div>
        </nav>
    );
}
