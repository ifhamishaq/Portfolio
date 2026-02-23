import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ProjectModal from './ProjectModal';
import './ProjectCard.css';

export default function ProjectCard({ project, index }) {
    const cardRef = useRef(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [glare, setGlare] = useState({ x: 50, y: 50 });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleMouseMove = (e) => {
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        setTilt({
            x: (y - 0.5) * -15,
            y: (x - 0.5) * 15,
        });
        setGlare({ x: x * 100, y: y * 100 });
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
        setGlare({ x: 50, y: 50 });
    };

    const hasDriveVideo = !!project.driveId;
    const hasExternalVideo = !!project.video;
    const hasImage = !!project.image;
    const hasLink = !!project.link;

    return (
        <>
            <motion.div
                ref={cardRef}
                className="project-card"
                data-cursor-hover
                data-cursor-text="VIEW"
                onMouseMove={!hasDriveVideo ? handleMouseMove : undefined}
                onMouseLeave={!hasDriveVideo ? handleMouseLeave : undefined}
                onClick={() => setIsModalOpen(true)}
                style={{
                    transform: hasDriveVideo
                        ? undefined
                        : `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
            >
                <div className="project-card-media">
                    {hasDriveVideo ? (
                        <iframe
                            src={`https://drive.google.com/file/d/${project.driveId}/preview`}
                            allow="autoplay"
                            allowFullScreen
                            title={project.title}
                            className="project-card-iframe"
                        />
                    ) : hasExternalVideo ? (
                        <video
                            src={project.video}
                            muted
                            loop
                            playsInline
                            autoPlay
                        />
                    ) : hasImage ? (
                        <img src={project.image} alt={project.title} loading="lazy" />
                    ) : hasLink ? (
                        <div className="project-card-site-preview">
                            <div className="project-card-site-bar">
                                <span className="site-dot" />
                                <span className="site-dot" />
                                <span className="site-dot" />
                                <span className="site-url">{new URL(project.link).hostname}</span>
                            </div>
                            <iframe
                                src={project.link}
                                title={project.title}
                                className="project-card-site-iframe"
                                loading="lazy"
                            />
                        </div>
                    ) : null}
                    {!hasDriveVideo && <div className="project-card-overlay" />}
                </div>

                <div className="project-card-info">
                    <div className="project-card-header">
                        <div className="project-card-category">{project.category}</div>
                        {project.badges?.[0] && (
                            <span className="project-card-badge">{project.badges[0]}</span>
                        )}
                    </div>
                    <h3 className="project-card-title">{project.title}</h3>
                    <p className="project-card-desc">{project.description}</p>
                </div>

                {/* Glare */}
                {!hasDriveVideo && (
                    <div
                        className="project-card-glare"
                        style={{
                            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.06), transparent 60%)`,
                        }}
                    />
                )}
            </motion.div>

            <ProjectModal
                project={project}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}

