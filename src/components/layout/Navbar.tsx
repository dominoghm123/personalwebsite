'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

/**
 * 🎓 Navbar Component
 * Strictly following DESIGN_SPEC Section 3.3
 * Purpose: Global navigation with frosted glass effect and active state.
 */
export default function Navbar() {
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (path === '/' && pathname === '/') return true;
        if (path !== '/' && pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Link href="/">Hi I&apos;m <span>Qicheng</span></Link>
            </div>
            <div className={styles.links}>
                <Link href="/" className={`${styles.navItem} ${isActive('/') ? styles.active : ''}`}>Home</Link>
                <Link href="/post" className={`${styles.navItem} ${isActive('/post') ? styles.active : ''}`}>Post</Link>
                <Link href="/project" className={`${styles.navItem} ${isActive('/project') ? styles.active : ''}`}>Project</Link>
                <Link href="/footprint" className={`${styles.navItem} ${isActive('/footprint') ? styles.active : ''}`}>Footprint</Link>
                <Link href="/about" className={`${styles.navItem} ${isActive('/about') ? styles.active : ''}`}>About</Link>
            </div>
        </nav>
    );
}
