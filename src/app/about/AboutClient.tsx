'use client';

import React, { useState } from 'react';
import styles from './AboutClient.module.css';
import SocialContact from '@/components/layout/SocialContact';

interface Contact {
    platform: string;
    url?: string;
    value?: string;
    icon: string; // Keep for data mapping, but we render SVG components
}

interface SiteConfig {
    siteName: string;
    about: {
        bio: string[];
        avatar: {
            base: string;
            hover: string;
        }
    };
    contacts: Contact[];
}

interface Hobby {
    id: string;
    title: string;
    image: string;
    description: string;
}

interface AboutClientProps {
    config: SiteConfig;
    hobbies: Hobby[];
}

export default function AboutClient({ config, hobbies }: AboutClientProps) {
    const [selectedHobby, setSelectedHobby] = useState<Hobby | null>(null);

    return (
        <div className={`${styles.container} container-padding`}>
            {/* HERO BIOGRAPHY SECTION */}
            <section className={styles.hero}>
                <div className={styles.avatarBox}>
                    <img src={config.about.avatar.base} alt="Qicheng Avatar" className={styles.avatarBase} />
                    <img src={config.about.avatar.hover} alt="Qicheng Avatar Hover" className={styles.avatarHover} />
                </div>

                <div className={styles.aboutInfo}>
                    <h1>About Me</h1>
                    {config.about.bio.map((paragraph, index) => (
                        <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
                    ))}
                </div>
            </section>

            {/* HOBBIES GRID WITH BLUR INTERACTION */}
            <section className={styles.interestsSection}>
                <h2>Interests and Hobbies</h2>

                <div className={styles.hobbyGrid}>
                    {hobbies.map((hobby) => (
                        <div
                            key={hobby.id}
                            className={styles.hobbyCard}
                            onClick={() => setSelectedHobby(hobby)}
                        >
                            <div className={styles.hobbyImg}>
                                <img src={hobby.image} alt={hobby.title} />
                                <div className={styles.hobbyTitle}>{hobby.title}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.hobbyDescription}>
                    {selectedHobby ? (
                        <div className={styles.descContent} key={selectedHobby.id}>
                            <h3 className={styles.descTitle}>{selectedHobby.title}</h3>
                            <p className={styles.descText}>{selectedHobby.description}</p>
                        </div>
                    ) : (
                        <p className={styles.descPlaceholder}>
                            Click a hobby to see more.
                        </p>
                    )}
                </div>
            </section>

            {/* CONTACT BOX */}
            <section className={styles.contactBox}>
                <h3>Contact Me {'>'}</h3>
                <SocialContact contacts={config.contacts} />
            </section>
        </div>
    );
}

