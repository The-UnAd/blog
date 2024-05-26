export type Image = {
    src: string;
    alt?: string;
    caption?: string;
};

export type Link = {
    text: string;
    href: string;
};

export type Hero = {
    title?: string;
    text?: string;
    image?: Image;
    actions?: Link[];
};

export type Subscribe = {
    title?: string;
    text?: string;
    formUrl: string;
};

export type SiteConfig = {
    logo?: Image;
    title: string;
    subtitle?: string;
    description: string;
    image?: Image;
    headerNavLinks?: Link[];
    footerNavLinks?: Link[];
    socialLinks?: Link[];
    hero?: Hero;
    subscribe?: Subscribe;
    postsPerPage?: number;
    projectsPerPage?: number;
};

const siteConfig: SiteConfig = {
    title: 'UnAd Devlog',
    subtitle: 'Yes, Its another Devlog',
    description: 'A resource for developers to learn from my mistakes',
    image: {
        src: '/dante-preview.jpg',
        alt: 'Dante - Astro.js and Tailwind CSS theme'
    },
    headerNavLinks: [
        {
            text: 'Home',
            href: '/'
        },
        {
            text: 'Blog',
            href: '/blog'
        },
        {
            text: 'Tags',
            href: '/tags'
        }
    ],
    footerNavLinks: [
        {
            text: 'About',
            href: '/about'
        },
        {
            text: 'Contact',
            href: '/contact'
        },
        {
            text: 'Built with Astro 🚀',
            href: 'https://github.com/JustGoodUI/dante-astro-theme'
        }
    ],
    hero: {
        title: "Yes, It's another Devlog",
        text: 'Welcome!  My name is Stephen Collins.  I am a Software Architect who took the bold decision to attempt to build a brand-new product from the ground up, by myself, in my spare time.  The result was <a href="https://theunad.com">UnAd</a>, a direct-to-consumer SMS relay system targeted at small business.<br><br>This blog is intended to be--as well as a creative outlet--a resource for other developers to learn from my mistakes.',
        image: {
            src: '/hero.webp',
            alt: 'Me, according to ChatGPT'
        },
        actions: [
            {
                text: 'Get in Touch',
                href: '/contact'
            }
        ]
    },
    postsPerPage: 8,
    projectsPerPage: 8
};

export default siteConfig;
