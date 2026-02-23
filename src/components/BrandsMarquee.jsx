import { BRANDS } from '../data/projects';
import './BrandsMarquee.css';

export default function BrandsMarquee() {
    // Duplicate the brands to create a seamless infinite loop
    const displayBrands = [...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS];

    return (
        <div className="brands-marquee-wrapper">
            <div className="brands-label">BRANDS I'VE WORKED WITH</div>
            <div className="brands-marquee">
                <div className="brands-marquee-track">
                    {displayBrands.map((brand, i) => (
                        <div key={i} className="brand-item">
                            {brand}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
