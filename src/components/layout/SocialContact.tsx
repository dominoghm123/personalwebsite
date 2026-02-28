import React from 'react';
import styles from './SocialContact.module.css';
import { EmailIcon, RednoteIcon, InstagramIcon, XIcon, LinkedinIcon } from '@/components/icons/SocialIcons';

/**
 * 🎓 SocialContact Component
 * Purpose: Reusable social link icons for About and Home pages.
 */

interface Contact {
    platform: string;
    url?: string;
    value?: string;
}

interface SocialContactProps {
    contacts: Contact[];
    centered?: boolean;
}

const renderSocialIcon = (platform: string) => {
    const iconClass = styles.socialIcon;
    switch (platform.toLowerCase()) {
        case 'email': return <EmailIcon className={iconClass} />;
        case 'rednote': return <RednoteIcon className={iconClass} />;
        case 'instagram': return <InstagramIcon className={iconClass} />;
        case 'x': return <XIcon className={iconClass} />;
        case 'linkedin': return <LinkedinIcon className={iconClass} />;
        default: return null;
    }
};

export default function SocialContact({ contacts, centered = false }: SocialContactProps) {
    if (!contacts) return null;

    return (
        <div className={`${styles.contactLinks} ${centered ? styles.centered : ''}`}>
            {contacts.map((contact) => (
                <a
                    key={contact.platform}
                    href={contact.url || `mailto:${contact.value}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    aria-label={contact.platform}
                    title={contact.platform}
                >
                    {renderSocialIcon(contact.platform)}
                </a>
            ))}
        </div>
    );
}
