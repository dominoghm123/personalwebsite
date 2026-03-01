'use client';

import { usePathname } from 'next/navigation';
import styles from './Footer.module.css';
import clsx from 'clsx';

/**
 * 🎓 Global Footer Component (v1.1)
 * Displays copyright and necessary map attributions (moved from Map component)
 */
export default function Footer() {
    const pathname = usePathname();
    const isHome = pathname === '/';

    return (
        <footer className={clsx(styles.footer, isHome && styles.homeFooter)}>
            {!isHome && <hr className={styles.divider} />}

            <div className={styles.content}>
                <p>© 2026 Qicheng Dai. All rights reserved.</p>

                {/* Map attribution moved here as per PRD v1.1 */}
                {pathname === '/footprint' && (
                    <p className={styles.attribution}>
                        Map data © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors, <a href="https://carto.com/attributions" target="_blank" rel="noopener noreferrer">CARTO</a>
                    </p>
                )}
            </div>
        </footer>
    );
}
