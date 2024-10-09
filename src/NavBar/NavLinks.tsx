import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

interface NavLinksProps {
  isClicked: boolean;
  closeMenu: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ isClicked, closeMenu }) => {
  return (
    <nav className='NavLinks'>
      <ul>
        <li onClick={() => isClicked && closeMenu()}>
          <Link to="/#om" className="text-gray-600 hover:text-blue-600 transition duration-300">Om os</Link>
        </li>
        <li onClick={() => isClicked && closeMenu()}>
          <Link to="/#offerings" className="text-gray-600 hover:text-blue-600 transition duration-300">Ydelser</Link>
        </li>
        <li onClick={() => isClicked && closeMenu()}>
          <Link to="/#testimonials" className="text-gray-600 hover:text-blue-600 transition duration-300">Kunder</Link>
        </li>
        <li onClick={() => isClicked && closeMenu()}>
          <Link to="/#faq" className="text-gray-600 hover:text-blue-600 transition duration-300">FAQ</Link>
        </li>
        <li onClick={() => isClicked && closeMenu()}>
          <Link to="/#contact" className="text-gray-600 hover:text-blue-600 transition duration-300">Kontakt</Link>
        </li>
        <li onClick={() => isClicked && closeMenu()}>
          <Link to="/prompting-guide" className="text-gray-600 hover:text-blue-600 transition duration-300">Prompting Guide</Link>
        </li>
        <li onClick={() => isClicked && closeMenu()}>
          <a
            href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1yfaYI2PP09-3k22OQACAuDIu_3Wwtcw8_59yhaPd4GpRJufF3PTmncVmToiGlRzot_XV0sSrF"
            target="_blank"
            rel="noopener noreferrer"
            className="bookMeeting bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300 text-lg font-semibold"
          >
            Book et møde
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavLinks;