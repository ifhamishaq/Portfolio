import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Set up image uploads
const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const uploadDir = path.join(__dirname, 'public', 'uploads');
        try {
            await fs.mkdir(uploadDir, { recursive: true });
            cb(null, uploadDir);
        } catch (err) {
            cb(err, null);
        }
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, 'project-' + uniqueSuffix + ext);
    }
});

const upload = multer({ storage });
const dataFilePath = path.join(__dirname, 'src', 'data', 'projectsData.json');

// --- Endpoints ---

// Upload Image
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No image uploaded' });
    }
    // Return relative path for web
    res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

// Fetch current projects
app.get('/api/projects', async (req, res) => {
    try {
        const data = await fs.readFile(dataFilePath, 'utf8');
        res.json(JSON.parse(data));
    } catch (err) {
        console.error('Error reading projectsData.json:', err);
        res.status(500).json({ error: 'Failed to read project data' });
    }
});

// Add a new project
app.post('/api/projects', async (req, res) => {
    try {
        const newProject = req.body;
        
        // Read existing array
        const rawData = await fs.readFile(dataFilePath, 'utf8');
        const projects = JSON.parse(rawData);
        
        // Generate new ID based on highest existing ID
        const maxId = projects.reduce((max, p) => (p.id > max ? p.id : max), 0);
        newProject.id = maxId + 1;
        
        // Ensure badges is an array
        if (typeof newProject.badges === 'string') {
            newProject.badges = newProject.badges.split(',').map(b => b.trim()).filter(b => b);
        }

        // Add to front of the array to signify newest
        projects.unshift(newProject);
        
        // Write back to file with pretty formatting
        await fs.writeFile(dataFilePath, JSON.stringify(projects, null, 4));
        
        res.json({ success: true, project: newProject });
    } catch (err) {
        console.error('Error adding project:', err);
        res.status(500).json({ error: 'Failed to append project' });
    }
});

// Update an existing project
app.put('/api/projects/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const updatedData = req.body;
        
        const rawData = await fs.readFile(dataFilePath, 'utf8');
        let projects = JSON.parse(rawData);
        
        const index = projects.findIndex(p => p.id === id);
        if (index === -1) {
            return res.status(404).json({ error: 'Project not found' });
        }
        
        // Merge updates
        if (typeof updatedData.badges === 'string') {
            updatedData.badges = updatedData.badges.split(',').map(b => b.trim()).filter(b => b);
        }
        
        projects[index] = { ...projects[index], ...updatedData };
        
        await fs.writeFile(dataFilePath, JSON.stringify(projects, null, 4));
        res.json({ success: true, project: projects[index] });
    } catch (err) {
        console.error('Error updating project:', err);
        res.status(500).json({ error: 'Failed to update project' });
    }
});

// Delete a project
app.delete('/api/projects/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        
        const rawData = await fs.readFile(dataFilePath, 'utf8');
        let projects = JSON.parse(rawData);
        
        const initialLength = projects.length;
        projects = projects.filter(p => p.id !== id);
        
        if (projects.length === initialLength) {
            return res.status(404).json({ error: 'Project not found' });
        }
        
        await fs.writeFile(dataFilePath, JSON.stringify(projects, null, 4));
        res.json({ success: true, message: 'Project deleted' });
    } catch (err) {
        console.error('Error deleting project:', err);
        res.status(500).json({ error: 'Failed to delete project' });
    }
});

// Deploy to GitHub
app.post('/api/deploy', async (req, res) => {
    try {
        // Run git commands in sequence
        const { stdout: stdoutAdd } = await execPromise('git add src/data/projectsData.json public/uploads/*');
        const { stdout: stdoutCommit } = await execPromise('git commit -m "content: new projects uploaded via admin"');
        const { stdout: stdoutPush } = await execPromise('git push');
        
        res.json({ success: true, message: 'Successfully published to GitHub!' });
    } catch (err) {
        console.error('Error deploying:', err);
        
        // If git fails because nothing to commit, that's fine
        if (err.message && err.message.includes('nothing to commit')) {
             return res.json({ success: true, message: 'No new changes to publish.' });
        }
        res.status(500).json({ error: 'Git deployment failed', details: err.message });
    }
});
// Root health check
app.get('/', (req, res) => {
    res.json({ status: 'Local Admin Server Running', endpoints: ['/api/projects', '/api/upload', '/api/deploy'] });
});

// Serve static files AFTER API routes
app.use(express.static(path.join(__dirname, 'public')));

// Fallback 404 as JSON
app.use((req, res) => {
    res.status(404).json({ error: `Path not found: ${req.url}` });
});
app.listen(PORT, () => {
    console.log(`Local Admin Server running on http://localhost:${PORT}`);
});
