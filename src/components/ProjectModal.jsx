import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Play } from 'lucide-react';
import './ProjectModal.css';

export default function ProjectModal({ project, isOpen, onClose }) {
    if (!project) return null;

    const hasDriveVideo = !!project.driveId;
    const hasLink = !!project.link;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="modal-root">
                    <motion.div
                        className="modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    <motion.div
                        className="modal-container"
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.95 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                    >
                        <button className="modal-close" onClick={onClose}>
                            <X size={24} />
                        </button>

                        <div className="modal-content">
                            <div className="modal-media">
                                {hasDriveVideo ? (
                                    <div className="modal-video-wrapper">
                                        <iframe
                                            src={`https://drive.google.com/file/d/${project.driveId}/preview`}
                                            allow="autoplay"
                                            allowFullScreen
                                            title={project.title}
                                        />
                                    </div>
                                ) : project.image ? (
                                    <img src={project.image} alt={project.title} />
                                ) : hasLink ? (
                                    <div className="modal-iframe-wrapper">
                                        <iframe src={project.link} title={project.title} />
                                    </div>
                                ) : null}
                            </div>

                            <div className="modal-info">
                                <div className="modal-header">
                                    <div className="modal-category">{project.category}</div>
                                    <h2 className="modal-title">{project.title}</h2>
                                    {project.badges && (
                                        <div className="modal-badges">
                                            {project.badges.map(badge => (
                                                <span key={badge} className="modal-badge">{badge}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="modal-body">
                                    <h3>Project Description</h3>
                                    <p>{project.description}</p>

                                    {project.gallery && (
                                        <div className="modal-gallery">
                                            <h3>Process & Assets</h3>
                                            <div className="gallery-grid">
                                                {project.gallery.map((item, i) => (
                                                    <div key={i} className="gallery-item">
                                                        {item.type === 'image' ? (
                                                            <img src={item.url} alt="Process shot" />
                                                        ) : (
                                                            <div className="gallery-video-placeholder">
                                                                <Play size={20} />
                                                                <span>Video Asset</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="modal-footer">
                                    {hasLink && (
                                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="modal-link-btn">
                                            Visit Live Project <ExternalLink size={18} />
                                        </a>
                                    )}
                                    <button className="modal-close-btn" onClick={onClose}>
                                        Close Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
