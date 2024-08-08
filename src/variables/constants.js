import { BarChart, Code, BookOpen} from 'lucide-react';
export const offerings = [
    {
      title: "Strategisk AI-rådgivning",
      description: "Vi hjælper organisationer med at identificere og udnytte unikke AI-muligheder. Vores ekspertise omsætter komplekse udfordringer til skræddersyede, effektive AI-løsninger, der driver innovation og vækst.",
      icon: BarChart
    },
    {
      title: "Skræddersyet AI-udvikling",
      description: "Fra startup til C25 - vi leverer skalerbare, enterprise-grade AI-løsninger. Vores track record inkluderer succesfulde implementeringer i virksomheder med op til 170.000 ansatte, hvilket sikrer robuste og pålidelige systemer uanset organisationens størrelse.",
      icon: Code
    },
    {
      title: "Vidensbaseret AI-implementering",
      description: "Vi tror på, at succesfuld AI-adoption starter med uddannelse. Vores skræddersyede foredrag og hands-on kurser inden for Generativ AI giver jeres team den nødvendige indsigt og kompetence til at drive og vedligeholde banebrydende AI-projekter.",
      icon: BookOpen
    }
  ];


  
export const danskGPTStats = [
    { label: "API-kald", value: "+ 1.000.000" },
    { label: "Oprettede samtaler", value: "+ 105.000" },
    { label: "Data udenfor Danmark", value: "0" }
  ];
  
export const testimonials = [
    { name: "Jane Doe", company: "Tech Co", quote: "Syv.ai transformerede vores virksomhed med kraftfulde AI-løsninger." },
    { name: "John Smith", company: "Data Corp", quote: "Ekspertisen og supporten fra Syv.ai er uovertruffen i branchen." }
  ];
  
export const faqItems = [
  {
    question: "Hvordan adskiller syv.ai sig fra andre AI-konsulentfirmaer?",
    answer: "syv.ai er unik som både konsulenter og udviklere af avancerede AI-teknologier. Vi er det eneste konsulenthus i Danmark, der har trænet og udgivet large language models (LLMs). Vores dedikation til open source, hvor de fleste af vores modeller er frit tilgængelige, demonstrerer vores tekniske ekspertise og commitment til innovation i AI-fællesskabet."
  },
  {
    question: "Hvilke typer virksomheder samarbejder syv.ai med?",
    answer: "syv.ai samarbejder med en bred vifte af virksomheder, fra startups og etablerede mellemstore virksomheder til nogle af verdens største og mest indflydelsesrige virksomheder. Vores fleksible tilgang tillader os at tilpasse vores ydelser til hver enkelt klients unikke behov, uanset deres størrelse eller branche."
  },
  {
    question: "Kan I give eksempler på konkrete AI-løsninger, I har implementeret?",
    answer: "De fleste af vores projekter er underlagt fortrolighedserklæringer, men vores løsninger inkluderer implementering af avancerede chatbots, automatisering af backoffice opgaver, translation modeller, og optimering af supply chain gennem AI-drevne prognoser. Hver løsning er skræddersyet til klientens specifikke behov."
  },
  {
    question: "Hvilke kompetencer har syv.ai's team?",
    answer: "syv.ai's team består af AI-ingeniører med ekspertise i machine learning, deep learning og NLP, samt erfarne forretningsudviklere. Dette tværfaglige team sikrer, at vores leverancer er teknisk avancerede og succesfuldt implementeret i organisationen."
  },
  {
    question: "Hvordan holder syv.ai sig opdateret med de nyeste AI-trends og teknologier?",
    answer: "syv.ai er en frontrunner inden for AI-udvikling. Vi er aktivt involveret i at forme og drive udviklingen af de nyeste AI-teknologier gennem kontinuerlig forskning, deltagelse i konferencer, samarbejde med akademiske institutioner, og bidrag til open source AI-projekter. Vores arbejde med at udvikle og udgive egne large language models placerer os i frontlinjen af AI-innovation."
  }
];
  
export const logos = [
    { name: 'Apple', src: '/images/apple.svg', type: 'svg' },
    { name: 'Siemens Energy', src: '/images/siemens.png' },
    { name: 'Ramboll', src: '/images/ramboll.png' },
    { name: 'Plan- og Landdistriksstyrelsen', src: '/images/plst.png' },
    { name: 'Københavns Kommune', src: '/images/kk.png' },
  
  ]
  ;
  
export const LogoImage = ({ logo }) => {
    if (logo.type === 'svg') {
      return (
        <div className="w-40 h-20 flex items-center justify-center">
          <img
            src={logo.src}
            alt={`${logo.name} logo`}
            className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
            style={{ maxWidth: '160px', maxHeight: '80px' }} // Adjust these values as needed
          />
        </div>
      );
    } else {
      return (
        <div className="w-40 h-20 flex items-center justify-center">
          <img
            src={logo.src}
            alt={`${logo.name} logo`}
            className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
          />
        </div>
      );
    }
  };