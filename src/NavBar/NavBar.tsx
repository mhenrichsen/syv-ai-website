import React from 'react';
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';

const NavBar: React.FC = () => {
    return (
        <div>
            <DesktopNavigation />
            <MobileNavigation />
        </div>
    );
};

export default NavBar;