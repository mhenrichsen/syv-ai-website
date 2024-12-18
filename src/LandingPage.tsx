import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageSquare, ChevronDown, ChevronUp, LucideIcon } from 'lucide-react';
import { offerings, danskGPTStats, faqItems, logos } from "./variables/constants";
import Header from './Header';

interface FadeInSectionProps {
  children: React.ReactNode;
}

const FadeInSection: React.FC<FadeInSectionProps> = ({ children }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setVisible(entry.isIntersecting));
    });
    
    observerRef.current = observer;

    const currentElement = domRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement && observerRef.current) {
        observerRef.current.unobserve(currentElement);
      }
    };
  }, []);

  return (
    <div
      className={`transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      ref={domRef}
    >
      {children}
    </div>
  );
};

interface Offering {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface Logo {
  name: string;
  src: string;
}

const LandingPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const location = useLocation();

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="pt-20 px-4 md:px-8">
        <div className="relative min-h-1/2 w-full overflow-hidden p-8 bg-gray-100">
          {/* Background image */}
          <div className="absolute inset-8 bg-gray-800 rounded-3xl overflow-hidden">
            <img
              src="/images/new-header.jpg"
              alt="Background"
              className="w-full h-full object-cover opacity-50"
            />
          </div>
          {/* Content container */}
          <div className="relative z-10 h-full flex flex-col justify-between p-8 md:py-8">
            {/* Main text */}
            <div className="max-w-2xl mt-8">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 ml-6">
                Vi er Danmarks mest nørdede AI-udviklere. Og det afspejler sig i vores resultater.
              </h1>
            </div>
            {/* Smaller text and buttons */}
            <div className="max-w-2xl mb-8">
              <p className="text-xl text-white mb-4 ml-6 pt-32">
                Vi bygger ikke kun AI-løsninger, der virker. <br />
                Vi bygger løsninger, virksomheder elsker at bruge.
              </p>
              {/* Buttons */}
              <div className="bookAndLearnButtons flex space-x-4 mt-8 ml-6">
                <a
                  href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1yfaYI2PP09-3k22OQACAuDIu_3Wwtcw8_59yhaPd4GpRJufF3PTmncVmToiGlRzot_XV0sSrF"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300 text-lg font-semibold"
                >
                  Book et møde
                </a>
                <a
                  href="#om"
                  className="learnMore bg-white text-blue-600 px-6 py-3 rounded-full hover:bg-gray-100 transition duration-300 text-lg font-semibold"
                >
                  Lær mere
                </a>
              </div>
            </div>
          </div>
        </div>

        <section className="bg-white py-12 border-b">
          <div className="container mx-auto px-6">
            <h3 className="text-2xl font-semibold text-center mb-8">Virksomheder der stoler på os</h3>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {logos.map((logo: Logo) => (
                <div key={logo.name} className="w-40 h-20 flex items-center justify-center">
                  <img
                    src={logo.src}
                    alt={`${logo.name} logo`}
                    className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <FadeInSection>
          <section id="om" className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <h3 className="text-3xl font-semibold text-center mb-12">Hvem er vi?</h3>
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="md:w-1/2 mb-8 md:mb-0 px-4">
                  <p className="text-gray-600 mb-4">
                    Vi er et konsulenthus baseret i hjertet af København. Som et lille, men ambitiøst team af tre dedikerede softwareudviklere, har vi specialiseret os i at bringe kunstig intelligens ind i danske virksomheders hverdag.
                  </p>
                  <p className="text-gray-600 mb-4">
                    Vi er stolte af at samarbejde med nogle af Danmarks og verdens førende virksomheder og organisationer. Vores klientliste spænder fra tech-giganter til energiselskaber og offentlige institutioner.
                  </p>
                  <p className="text-gray-600 mb-4">
                    Med vores dybe forståelse for både teknologi og forretning, hjælper vi vores kunder med at udnytte AI's fulde potentiale. Vi omsætter komplekse AI-løsninger til praktiske værktøjer, der styrker effektiviteten og innovationen i vores kunders daglige drift.
                  </p>
                  <p className="text-gray-600">
                    Hos syv.ai tror vi på, at fremtiden tilhører de virksomheder, der formår at integrere AI på en meningsfuld måde. Lad os hjælpe din virksomhed med at tage det næste skridt ind i AI-æraen.
                  </p>
                </div>
                <div className="md:w-1/2 px-4">
                  <img src="/images/talking.jpg" alt="DanskGPT Interface" className="rounded-lg" />
                </div>
              </div>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection>
          <section id="tjenester" className="py-20 bg-gray-100">
            <div className="container mx-auto px-6">
              <h3 className="text-3xl font-semibold text-center mb-12">Det vi tilbyder</h3>
              <div className="offerings flex flex-row justify-between gap-8">
                {offerings.map((offering: Offering, index: number) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 w-1/3">
                    <offering.icon className="text-blue-500 mb-4" size={32} />
                    <h4 className="text-xl font-semibold mb-2">{offering.title}</h4>
                    <p className="text-gray-600">{offering.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeInSection>
        
        <FadeInSection>
          <section id="danskgpt" className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <h3 className="text-3xl font-semibold text-center mb-12">DanskGPT</h3>
              <div className="grid flex-col md:flex-row items-center bg-gray-100 p-8 rounded-lg shadow-md">
                <div className="danskGPTimg_and_text flex">
                  <div className="md:w-1/2 mb-8 md:mb-0">
                    <MessageSquare className="text-blue-500 mb-4" size={32} />
                    <p className="mb-4">DanskGPT er vores specialudviklede sprogmodel, skræddersyet til det danske sprog. Denne innovative teknologi tilbyder enestående fordele:</p>
                    <li className="list-disc list-inside mb-2">In-house drift sikrer fuld GDPR-compliance og maksimal datasikkerhed</li>
                    <li className="list-disc list-inside mb-2">Overlegne resultater: Overgår ChatGPT-4o i fire ud af syv sprogopgaver, herunder grammatik og opsummering</li>
                    <li className="list-disc list-inside mb-2">Specialiseret i dansk kontekst og kultur</li>
                  </div>
                  <div className="md:w-1/2">
                    <img src="/images/danskgpt.png" alt="DanskGPT Interface" className="rounded-lg" />
                  </div>
                </div>
                <div className="danskGPTstats grid grid-cols-1 md:grid-cols-3 gap-4">
                  {danskGPTStats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{stat.value}</p>
                      <p className="text-gray-600">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection>
          <section id="faq" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Ofte stillede spørgsmål</h2>
              <div className="space-y-4">
                {faqItems.map((item: FAQItem, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      className="w-full text-left p-4 focus:outline-none bg-white hover:bg-gray-50 transition-colors duration-200"
                      onClick={() => toggleAccordion(index)}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-gray-700">{item.question}</span>
                        {openIndex === index ? (
                          <ChevronUp className="text-gray-500" size={24} />
                        ) : (
                          <ChevronDown className="text-gray-500" size={24} />
                        )}
                      </div>
                    </button>
                    <div
                      className={`px-4 pt-0 overflow-hidden transition-all duration-300 ease-in-out ${
                        openIndex === index ? 'max-h-96 pb-4' : 'max-h-0'
                      }`}
                    >
                      <p className="text-gray-600">{item.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection>
          <section id="contact" className="py-20 bg-gradient-to-r from-blue-500 to-blue-700 text-white">
            <div className="container mx-auto px-6 text-center">
              <h3 className="text-3xl font-semibold mb-4">Klar til at komme i gang?</h3>
              <p className="text-xl mb-8">Book et møde i dag for at lære, hvordan vi kan hjælpe din virksomhed med at udnytte AI.</p>
              <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1yfaYI2PP09-3k22OQACAuDIu_3Wwtcw8_59yhaPd4GpRJufF3PTmncVmToiGlRzot_XV0sSrF" target="_blank" rel="noopener noreferrer" className="bg-white text-blue-600 px-8 py-3 rounded-full hover:bg-gray-100 transition duration-300 text-lg font-semibold">Book et møde</a>
            </div>
          </section>
        </FadeInSection>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 syv.ai. Alle rettigheder forbeholdes.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;