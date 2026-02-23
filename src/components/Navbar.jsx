import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const isHome = location.pathname === '/';

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollTo = (id) => {
        setOpen(false);
        if (!isHome) {
            navigate('/');
            // Wait for navigation then scroll
            setTimeout(() => {
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <a
                href="/"
                className="navbar-logo"
                onClick={(e) => {
                    e.preventDefault();
                    if (isHome) {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                        navigate('/');
                    }
                }}
            >
                LAB<span> // Ifham</span>
            </a>

            <button
                className={`navbar-toggle ${open ? 'open' : ''}`}
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
            >
                <span /><span /><span />
            </button>

            <ul className={`navbar-links ${open ? 'open' : ''}`}>
                <li><a href="#work" onClick={(e) => { e.preventDefault(); scrollTo('work'); }}>Work</a></li>
                <li>
                    <a
                        href="/portfolio"
                        onClick={(e) => { e.preventDefault(); setOpen(false); navigate('/portfolio'); }}
                    >
                        Portfolio
                    </a>
                </li>
                <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }}>About</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services'); }}>Services</a></li>
                <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>Contact</a></li>
            </ul>
        </nav>
    );
}
