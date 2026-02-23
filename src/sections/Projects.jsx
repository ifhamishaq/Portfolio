import { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import './Projects.css';

const PROJECTS = [
    // 3D Art
    {
        id: 1,
        title: 'Crocs 3D Animation',
        description: '3D product animation showcasing Crocs with dynamic camera movement.',
        category: '3D Art',
        driveId: '1Vaw3JhDq7WTqXNwMYJ8ZH0_jeyPI2rje',
    },
    {
        id: 2,
        title: 'Environment Scene',
        description: 'Stylized 3D environment animation with atmospheric lighting.',
        category: '3D Art',
        driveId: '1BIoXFywO1-ul4LpQ618HfmTo9sKt_mw5',
    },
    {
        id: 3,
        title: 'VFX Car Animation',
        description: 'CGI car integration with motion tracking and compositing.',
        category: '3D Art',
        driveId: '1CLVG0enXU15K-yyNOKmprQfsvGKgf0nV',
    },
    {
        id: 4,
        title: 'Chair Animation',
        description: '3D chair product visualization with smooth camera animation.',
        category: '3D Art',
        driveId: '1HwmLSgQXAg-rIZzBfpazQiJzYxnzuryA',
    },
    // Video Editing
    {
        id: 5,
        title: 'Fruit Bar Advertisement',
        description: 'Montage-style promotional video with dynamic cuts and color grading.',
        category: 'Video Editing',
        driveId: '1x2Dz51oxtYV9vLA6khI4xMmrtjb1fhZs',
    },
    {
        id: 6,
        title: 'Motion Graphics Reel',
        description: 'Compilation of motion design work showcasing animated elements.',
        category: 'Video Editing',
        driveId: '1PyH0EDXU5FOo1Ohfa8daqj3pfJ5A13ch',
    },
    {
        id: 7,
        title: 'Stranger Things Rotoscoping',
        description: '3D rotoscoping and camera tracking inspired by the Netflix show.',
        category: 'Video Editing',
        driveId: '1pUECbC1kOra2arVztr1KYXEe1tORq55K',
    },
    // Graphic Design
    {
        id: 8,
        title: '3D Minimal Thumbnail',
        description: 'Clean, minimal 3D-style YouTube thumbnail design.',
        category: 'Graphic Design',
        image: 'https://media.canva.com/v2/image-resize/format:JPG/height:720/quality:92/uri:ifs%3A%2F%2FM%2Fb17cfa20-ff54-4dc7-be74-92b2252cd70d/watermark:F/width:1280?csig=AAAAAAAAAAAAAAAAAAAAAPtTFKHRYsLYMH313i-x-Njo0SLTM36Ris_yaqWquNi-&exp=1771843494&osig=AAAAAAAAAAAAAAAAAAAAABBGBQqcupeSzQZ_MadNSeydbXeXr26R-2xZZAMytUEe&signer=media-rpc&x-canva-quality=screen_3x',
    },
    {
        id: 9,
        title: 'Cartoon Style Thumbnail',
        description: 'Pixar-inspired cartoon thumbnail with vibrant colors.',
        category: 'Graphic Design',
        image: 'https://media.canva.com/v2/image-resize/format:JPG/height:720/quality:92/uri:ifs%3A%2F%2FM%2F165a0d91-5172-4e90-ab36-b31d8d03fbb1/watermark:F/width:1280?csig=AAAAAAAAAAAAAAAAAAAAAKfojYVwiOmFier70Tfuev3bamhGhDsAiEFJfqfr9FdG&exp=1771843231&osig=AAAAAAAAAAAAAAAAAAAAALXZWgNzReb4ZOa-sBGIWHJbo8QbYVnCnm5QEAJCV46x&signer=media-rpc&x-canva-quality=screen_3x',
    },
    {
        id: 10,
        title: 'Educational Thumbnail',
        description: 'Minimal, clean educational content thumbnail design.',
        category: 'Graphic Design',
        image: 'https://media.canva.com/v2/image-resize/format:JPG/height:720/quality:92/uri:ifs%3A%2F%2FM%2F97abb2f6-9757-48a2-97c7-eaad9bf0635f/watermark:F/width:1280?csig=AAAAAAAAAAAAAAAAAAAAAJopCr-iSiB3nesxe6ETzTJ7UITccC14v2W9mWEnIV7z&exp=1771843190&osig=AAAAAAAAAAAAAAAAAAAAAJg7uWjhxXCaa_8Db84990QHRSg0A521pQCFjf2F2dKu&signer=media-rpc&x-canva-quality=screen_3x',
    },
    {
        id: 11,
        title: 'Finance Thumbnail',
        description: 'High-CTR finance and business-themed thumbnail.',
        category: 'Graphic Design',
        image: 'https://media.canva.com/v2/image-resize/format:JPG/height:768/quality:92/uri:ifs%3A%2F%2FM%2Fd4c79ac1-507c-4d63-9635-0764e0846457/watermark:F/width:1392?csig=AAAAAAAAAAAAAAAAAAAAAPzNWQHnGVHaWrxRXqq48FHGhlsR_LRbtE5qNeG6qlAL&exp=1771843400&osig=AAAAAAAAAAAAAAAAAAAAAFrhPw4ZVr23dsSQVn0UWxlZJZSoKsWEWciJbMc0xzya&signer=media-rpc&x-canva-quality=screen_3x',
    },
    {
        id: 12,
        title: 'Documentary Thumbnail',
        description: 'Dark, cinematic documentary-style thumbnail design.',
        category: 'Graphic Design',
        image: 'https://media.canva.com/v2/image-resize/format:JPG/height:1080/quality:92/uri:ifs%3A%2F%2FM%2F0f0d6e9d-cf0c-4b96-b023-ba6b887a2670/watermark:F/width:1920?csig=AAAAAAAAAAAAAAAAAAAAAHwMLkkNby8e17ned8Wizr4DWNzCnxKiOkrdUd4oyiNG&exp=1771841742&osig=AAAAAAAAAAAAAAAAAAAAALAZPz4UdmAZd1hoGl41ATOUpW6rgV2P-oiEKPWdqAFP&signer=media-rpc&x-canva-quality=screen_3x',
    },
    {
        id: 13,
        title: '3D Product Thumbnail',
        description: 'Minimal 3D product-style thumbnail with clean composition.',
        category: 'Graphic Design',
        image: 'https://media.canva.com/v2/image-resize/format:JPG/height:720/quality:92/uri:ifs%3A%2F%2FM%2F72bba0c7-c7fe-4750-961b-c024b871b013/watermark:F/width:1280?csig=AAAAAAAAAAAAAAAAAAAAABiqzrqfoiMNA5Pgn3sFqLAsPNKn61dwUFpZInl9YnGX&exp=1771841171&osig=AAAAAAAAAAAAAAAAAAAAAPnkhfoHb7VDXs6ouAK_7yW6dVbOU0AKpP5GGMEGOF-B&signer=media-rpc&x-canva-quality=screen_3x',
    },
];

const CATEGORIES = ['All', '3D Art', 'Video Editing', 'Graphic Design'];

export default function Projects() {
    const [active, setActive] = useState('All');
    const [showAll, setShowAll] = useState(false);

    const filtered = active === 'All'
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === active);

    const VISIBLE_COUNT = 6;
    const displayed = showAll ? filtered : filtered.slice(0, VISIBLE_COUNT);
    const hasMore = filtered.length > VISIBLE_COUNT && !showAll;

    return (
        <section className="projects" id="work">
            <div className="container">
                <motion.div
                    className="projects-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="section-label">// Portfolio</div>
                    <h2 className="section-title">Selected Work</h2>

                    <div className="projects-tabs">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                className={`projects-tab ${active === cat ? 'active' : ''}`}
                                onClick={() => { setActive(cat); setShowAll(false); }}
                                data-cursor-hover
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </motion.div>

                <div className="projects-grid">
                    {displayed.map((project, i) => (
                        <ProjectCard key={project.id} project={project} index={i} />
                    ))}
                </div>

                {hasMore && (
                    <motion.div
                        className="projects-see-more"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <button
                            className="projects-see-more-btn"
                            data-cursor-hover
                            onClick={() => setShowAll(true)}
                        >
                            See More Work
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
