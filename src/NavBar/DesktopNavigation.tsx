import React from 'react';
import NavLinks from './NavLinks';

const DesktopNavigation: React.FC = () => {
    return (
        <nav className="DesktopNavigation">
            <NavLinks isClicked={false} closeMenu={() => {}} />
        </nav>
    );
};

export default DesktopNavigation;