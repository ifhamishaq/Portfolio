import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container footer-inner">
                <div className="footer-left">
                    <span className="footer-copyright">© 2026</span>
                    <span className="footer-name">Ifham Ishaq</span>
                    <span className="footer-tagline">// The Analog Laboratory</span>
                </div>
                <div className="footer-right">
                    <div className="footer-socials">
                        <a href="https://youtube.com/@Ifham" target="_blank" rel="noopener noreferrer" data-cursor-hover>YT</a>
                        <a href="https://www.instagram.com/wani.ifhamm/" target="_blank" rel="noopener noreferrer" data-cursor-hover>IG</a>
                        <a href="https://www.linkedin.com/in/ifham-ishaq-628077395/" target="_blank" rel="noopener noreferrer" data-cursor-hover>LI</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
