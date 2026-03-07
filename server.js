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
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
// Serve static files from public so uploaded images are visible
app.use(express.static(path.join(__dirname, 'public')));

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

app.listen(PORT, () => {
    console.log(`Local Admin Server running on http://localhost:${PORT}`);
});
