import React, { useState } from 'react';
import NavLinks from './NavLinks';
import { Menu, X } from 'lucide-react';

const MobileNavigation: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <nav className="MobileNavigation">
            <button className="Hamburger" onClick={toggleMenu}>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            {isOpen && <NavLinks isClicked={true} closeMenu={closeMenu} />}
        </nav>
    );
};

export default MobileNavigation;