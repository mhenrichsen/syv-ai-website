import '../App.css';
import { Link } from 'react-router-dom';

const NavLinks = ({isClicked, closeMenu}) => {
  return (
    <nav className='NavLinks'>
      <ul>
        <li onClick={() => isClicked && closeMenu()}>
          <Link to="/#om" className="text-gray-600 hover:text-blue-600 transition duration-300">Om os</Link>
        </li>
        <li onClick={() => isClicked && closeMenu()}>
          <Link to="/#tjenester" className="text-gray-600 hover:text-blue-600 transition duration-300">Tjenester</Link>
        </li>
        <li onClick={() => isClicked && closeMenu()}>
          <Link to="/#danskgpt" className="text-gray-600 hover:text-blue-600 transition duration-300">DanskGPT</Link>
        </li>
        <li onClick={() => isClicked && closeMenu()}>
          <Link to="/#faq" className="text-gray-600 hover:text-blue-600 transition duration-300">FAQ</Link>
        </li>
        <li onClick={() => isClicked && closeMenu()}>
          <Link to="/prompting-guide" className="text-gray-600 hover:text-blue-600 transition duration-300">Prompting Guide</Link>
        </li>
        <li onClick={() => isClicked && closeMenu()}>
          <a
            href="https://calendly.com/syv-ai/llm-generativ-ai-med-mads-henrichsen"
            target="_blank"
            rel="noopener noreferrer"
            className="bookMeeting bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300 text-lg font-semibold"
          >
            Book et møde
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default NavLinks;