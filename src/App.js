import React, { useState, useEffect } from 'react';
import { BarChart, Code, BookOpen, MessageSquare, CheckCircle } from 'lucide-react';
import NavBar from './NavBar/NavBar';
import {offerings, danskGPTStats, testimonials, faqItems, logos, LogoImage} from "./variables/constants";

const FadeInSection = ({ children }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = React.useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setVisible(entry.isIntersecting));
    });
    observer.observe(domRef.current);
    return () => observer.unobserve(domRef.current);
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

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header id='NavHeader' className="bg-white shadow-md fixed w-full z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-600">syv.ai</h1>
          <NavBar />
          <a href="https://calendly.com/syv-ai/llm-generativ-ai-med-mads-henrichsen" id="book_meeting" target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300">Book et møde</a>
        </div>
      </header>

      <main className="pt-20 px-4 md:px-8">
      <div className="relative min-h-1/2 w-full overflow-hidden p-8 bg-gray-100">
        {/* Background image */}
        <div className="absolute inset-8 bg-gray-800 rounded-3xl overflow-hidden">
          <img
            src="/images/image.webp"
            alt="Background"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        {/* Content container */}
        <div className="relative z-10 h-full flex flex-col justify-between p-8 md:py-8">
          {/* Main text */}
          <div className="max-w-2xl mt-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 ml-6">
              Vi er Danmarks mest nørderede AI-udviklere. Og det afspejler sig i vores resultater.
            </h1>
          </div>
          {/* Smaller text and buttons */}
          <div className="max-w-2xl mb-8">
            <p className="text-xl text-white mb-4 ml-6 pt-32">
              Vi bygger ikke kun AI-løsninger, der virker. <br />
              Vi bygger løsninger, virksomheder elsker at bruge.
            </p>
            {/* Buttons */}
            <div className="flex space-x-4 mt-8 ml-6">
              <a
                href="https://calendly.com/syv-ai/llm-generativ-ai-med-mads-henrichsen"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300 text-lg font-semibold"
              >
                Book et møde
              </a>
              <a
                href="#om"
                className="bg-white text-blue-600 px-6 py-3 rounded-full hover:bg-gray-100 transition duration-300 text-lg font-semibold"
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
              {logos.map((logo) => (
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
                <div className="md:w-1/2 mb-8 md:mb-0">
                  <p className="text-gray-600 mb-4">
                    Vi er et dynamisk konsulenthus baseret i hjertet af København. Som et lille, men ambitiøst team af tre dedikerede softwareudviklere, har vi specialiseret os i at bringe kunstig intelligens ind i danske virksomheders hverdag.
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
                <div className="md:w-1/2">
                  <img src="/images/danskgpt.png" alt="DanskGPT Interface" className="rounded-lg" />
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
                {offerings.map((offering, index) => (
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
          <section id="testimonials" className="py-20 bg-gray-100">
            <div className="container mx-auto px-6">
              <h3 className="text-3xl font-semibold text-center mb-12">Hvad Vores Kunder Siger</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                    <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
                    <div className="flex items-center">
                      <img src={`/api/placeholder/64/64`} alt={testimonial.name} className="rounded-full mr-4" />
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection>
          <section id="faq" className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <h3 className="text-3xl font-semibold text-center mb-12">Ofte Stillede Spørgsmål</h3>
              <div className="space-y-6">
                {faqItems.map((item, index) => (
                  <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                    <h4 className="text-xl font-semibold mb-2 flex items-center">
                      <CheckCircle className="text-green-500 mr-2" size={24} />
                      {item.question}
                    </h4>
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection>
          <section id="contact" className="py-20 bg-gradient-to-r from-blue-500 to-blue-700 text-white">
            <div className="container mx-auto px-6 text-center">
              <h3 className="text-3xl font-semibold mb-4">Klar til at Komme i Gang?</h3>
              <p className="text-xl mb-8">Book et møde i dag for at lære, hvordan vi kan hjælpe din virksomhed med at udnytte kraften i AI.</p>
              <a href="https://calendly.com/syv-ai/llm-generativ-ai-med-mads-henrichsen" target="_blank" rel="noopener nore</section>ferrer" className="bg-white text-blue-600 px-8 py-3 rounded-full hover:bg-gray-100 transition duration-300 text-lg font-semibold">Book et møde</a>
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