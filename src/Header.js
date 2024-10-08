import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar/NavBar';

const Header = () => {
  return (
    <header id='NavHeader' className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold text-blue-600">syv.ai</Link>
        <NavBar />
        <a 
          href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1yfaYI2PP09-3k22OQACAuDIu_3Wwtcw8_59yhaPd4GpRJufF3PTmncVmToiGlRzot_XV0sSrF" 
          id="book_meeting" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300"
        >
          Book et møde
        </a>
      </div>
    </header>
  );
};

export default Header;