import '../App.css';

const NavLinks = ({isClicked, closeMenu}) => {
    return (
      <nav className='NavLinks'>
        <ul>
          <li onClick={() => isClicked && closeMenu()}>
            <a href="#om" className="text-gray-600 hover:text-blue-600 transition duration-300">Om os</a>
          </li>
          <li onClick={() => isClicked && closeMenu()}>
            <a href="#tjenester" className="text-gray-600 hover:text-blue-600 transition duration-300">Tjenester</a>
          </li>
          <li onClick={() => isClicked && closeMenu()}>
            <a href="#danskgpt" className="text-gray-600 hover:text-blue-600 transition duration-300">DanskGPT</a>
          </li>
          <li onClick={() => isClicked && closeMenu()}>
            <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition duration-300">Udtalelser</a>
          </li>
          <li onClick={() => isClicked && closeMenu()}>
            <a href="#faq" className="text-gray-600 hover:text-blue-600 transition duration-300">FAQ</a>
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