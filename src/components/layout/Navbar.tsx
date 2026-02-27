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
            <div className={styles.logo}>
                <Link href="/">Hi I&apos;m <span>Qicheng</span></Link>
            </div>
            <div className={styles.links}>
                <Link href="/" className={styles.navItem}>Home</Link>
                <Link href="/post" className={styles.navItem}>Post</Link>
                <Link href="/project" className={styles.navItem}>Project</Link>
                <Link href="/footprint" className={styles.navItem}>Footprint</Link>
                <Link href="/about" className={styles.navItem}>About</Link>
            </div>
        </nav>
    );
}
