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
    { question: "Hvad er Syv.ai?", answer: "Syv.ai er et AI-bureau, der hjælper virksomheder med at implementere vellykkede AI-projekter gennem vores syv-trins metode." },
    { question: "Hvordan fungerer onboarding-processen?", answer: "Vi starter med en konsultation for at forstå dine behov og guider dig derefter gennem vores syv trin, fra målsætning til implementering og evaluering." },
    { question: "Kan Syv.ai arbejde med mine eksisterende systemer?", answer: "Ja, vi specialiserer os i at skabe skræddersyede AI-løsninger, der integreres problemfrit med din nuværende infrastruktur." }
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