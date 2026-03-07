import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../data/projects';
import './Admin.css';

export default function Admin() {
    const navigate = useNavigate();
    const [status, setStatus] = useState('');
    const [projects, setProjects] = useState([]);
    
    // Form state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('3D Art');
    const [driveId, setDriveId] = useState('');
    const [link, setLink] = useState('');
    const [badges, setBadges] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [editingId, setEditingId] = useState(null); // ID of project being edited

    // Load current projects on mount
    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await fetch('http://localhost:3002/api/projects');
            if (!res.ok) throw new Error(`Server returned ${res.status}`);
            
            const contentType = res.headers.get('content-type');
            if (contentType && !contentType.includes('application/json')) {
                throw new Error('Server returned non-JSON response. Is server.js running on port 3001?');
            }

            const data = await res.json();
            setProjects(data);
        } catch (err) {
            console.error('Error fetching projects:', err);
            setStatus(`Connection Error: ${err.message}. Make sure server is running.`);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus(editingId ? 'Updating...' : 'Uploading...');

        let finalImageUrl = '';

        try {
            // 1. Upload image if present
            if (imageFile) {
                const formData = new FormData();
                formData.append('image', imageFile);

                const uploadRes = await fetch('http://localhost:3002/api/upload', {
                    method: 'POST',
                    body: formData,
                });
                const uploadData = await uploadRes.json();
                
                if (uploadData.error) throw new Error(uploadData.error);
                finalImageUrl = uploadData.imageUrl;
            }

            // 2. Build the project object
            const projectDataObj = {
                title,
                description,
                category,
                badges: badges 
            };

            if (driveId) projectDataObj.driveId = driveId;
            if (link) projectDataObj.link = link;
            if (finalImageUrl) projectDataObj.image = finalImageUrl;

            // 3. Send to API
            const url = editingId 
                ? `http://localhost:3002/api/projects/${editingId}`
                : 'http://localhost:3002/api/projects';
            
            const method = editingId ? 'PUT' : 'POST';

            const projectRes = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(projectDataObj),
            });
            
            if (!projectRes.ok) {
                const errorData = await projectRes.json().catch(() => ({ error: `Server error ${projectRes.status}` }));
                throw new Error(errorData.error || `Server returned ${projectRes.status}`);
            }

            const result = await projectRes.json();

            setStatus(editingId ? 'Success! Project Updated.' : 'Success! Project Added.');
            
            resetForm();
            fetchProjects();

        } catch (err) {
            console.error(err);
            setStatus(`Error: ${err.message}`);
        }
    };

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setCategory('3D Art');
        setDriveId('');
        setLink('');
        setBadges('');
        setImageFile(null);
        setEditingId(null);
        const fileInput = document.getElementById('image-upload');
        if (fileInput) fileInput.value = '';
    };

    const handleEdit = (project) => {
        setEditingId(project.id);
        setTitle(project.title);
        setDescription(project.description);
        setCategory(project.category);
        setDriveId(project.driveId || '');
        setLink(project.link || '');
        setBadges(project.badges ? project.badges.join(', ') : '');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this project?')) return;
        setStatus('Deleting...');
        try {
            const res = await fetch(`http://localhost:3002/api/projects/${id}`, { method: 'DELETE' });
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setStatus('Project Deleted.');
            fetchProjects();
        } catch (err) {
            setStatus(`Delete Failed: ${err.message}`);
        }
    };

    const handlePublish = async () => {
        setStatus('Pushing to GitHub... This takes a few seconds.');
        try {
            const res = await fetch('http://localhost:3002/api/deploy', { method: 'POST' });
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setStatus(`Publish Complete: ${data.message}`);
        } catch (err) {
            setStatus(`Publish Failed: ${err.message}`);
        }
    };

    return (
        <div className="admin-dashboard">
            <header className="admin-header">
                <div className="admin-header-title">
                    <span className="admin-dot pulse"></span>
                    <h1>Local Studio Admin</h1>
                </div>
                <div className="admin-actions">
                    <button className="btn-secondary" onClick={() => navigate('/')}>Exit Admin</button>
                    <button className="btn-publish" onClick={handlePublish}>Publish to GitHub</button>
                </div>
            </header>

            {status && (
                <div className="admin-status">
                    {status}
                </div>
            )}

            <div className="admin-grid">
                <div className="admin-card">
                    <div className="admin-card-header">
                        <h2>{editingId ? 'Edit Project' : 'Add New Project'}</h2>
                        {editingId && <button className="btn-cancel" onClick={resetForm}>Cancel Edit</button>}
                    </div>
                    <form onSubmit={handleSubmit} className="admin-form">
                        
                        <div className="form-group row">
                            <div className="col">
                                <label>Project Title *</label>
                                <input required value={title} onChange={(e)=>setTitle(e.target.value)} type="text" placeholder="e.g. Minimal Poster Design" />
                            </div>
                            <div className="col">
                                <label>Category *</label>
                                <select value={category} onChange={(e)=>setCategory(e.target.value)}>
                                    {CATEGORIES.filter(c => c !== 'All').map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Description *</label>
                            <textarea required value={description} onChange={(e)=>setDescription(e.target.value)} rows="3" placeholder="A short description of the work..."></textarea>
                        </div>

                        <div className="form-group">
                            <label>Badges (Comma separated)</label>
                            <input value={badges} onChange={(e)=>setBadges(e.target.value)} type="text" placeholder="e.g. 3D Motion, Product Spec" />
                        </div>

                        <div className="form-group box-upload">
                            <label>Image Upload (For Graphic Design / Website Previews)</label>
                            <input type="file" id="image-upload" accept="image/*" onChange={handleFileChange} />
                            <small>Images save directly to `/public/uploads` folder locally.</small>
                        </div>

                        <div className="form-group row">
                            <div className="col">
                                <label>Google Drive Video ID (For 3D / Videos)</label>
                                <input value={driveId} onChange={(e)=>setDriveId(e.target.value)} type="text" placeholder="e.g. 1Vaw3JhDq7WTqXNwMYJ8ZH0_jeyPI" />
                            </div>
                            <div className="col">
                                <label>External Link (For Websites)</label>
                                <input value={link} onChange={(e)=>setLink(e.target.value)} type="url" placeholder="https://..." />
                            </div>
                        </div>

                        <button type="submit" className="btn-primary" style={{marginTop: '20px'}}>
                            {editingId ? 'Update Project' : 'Save Project'}
                        </button>
                    </form>
                </div>

                <div className="admin-card list-card">
                    <h2>Current Projects ({projects.length})</h2>
                    <div className="admin-project-list">
                        {projects.map(p => (
                            <div key={p.id || p.title} className="admin-list-item">
                                <div className="admin-list-meta">
                                    <span className="cat-badge">{p.category}</span>
                                    <h4>{p.title}</h4>
                                </div>
                                <div className="admin-list-preview">
                                    {p.image && <span className="icon-img">🖼️ Image</span>}
                                    {p.driveId && <span className="icon-vid">🎬 Video</span>}
                                    {p.link && <span className="icon-link">🔗 Link</span>}
                                </div>
                                <div className="admin-list-actions">
                                    <button className="btn-edit" onClick={() => handleEdit(p)}>Edit</button>
                                    <button className="btn-delete" onClick={() => handleDelete(p.id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                        {projects.length === 0 && <p className="empty">No projects found. Is server.js running?</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
