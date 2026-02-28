'use client';

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import styles from './Lightbox.module.css';

interface LightboxProps {
    image: {
        cover: string;
        title?: string;
    } | null;
    onClose: () => void;
    onNext?: () => void;
    onPrev?: () => void;
}

export default function Lightbox({ image, onClose, onNext, onPrev }: LightboxProps) {
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowRight' && onNext) onNext();
        if (e.key === 'ArrowLeft' && onPrev) onPrev();
    }, [onClose, onNext, onPrev]);

    useEffect(() => {
        if (image) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [image, handleKeyDown]);

    if (!image) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.content} onClick={(e) => e.stopPropagation()}>
                <button className={styles.close} onClick={onClose} aria-label="Close">
                    ×
                </button>
                
                {onPrev && (
                    <button className={`${styles.nav} ${styles.prev}`} onClick={onPrev} aria-label="Previous">
                        ‹
                    </button>
                )}

                <Image
                    src={image.cover}
                    alt={image.title || 'Lightbox view'}
                    width={1600}
                    height={1200}
                    className={styles.image}
                    priority
                    unoptimized // 🎓 这里选择 unoptimized 是为了在全屏时保留最高精度，不被 Next.js 的管线压缩
                />

                {onNext && (
                    <button className={`${styles.nav} ${styles.next}`} onClick={onNext} aria-label="Next">
                        ›
                    </button>
                )}
            </div>
        </div>
    );
}
