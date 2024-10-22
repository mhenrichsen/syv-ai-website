'use client'

import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import PhoneSidebar from './PhoneSidebar'
import Header from '../Header'  // Update this import path if necessary
import { promptGuideData, GuideData } from './PromptGuide'
import ReactMarkdown from 'react-markdown'
import { FaDownload } from 'react-icons/fa'

const processContent = (content: string, setModalImage: (src: string | null) => void) => {
  const parts = content.split(/(Prompt:[\s\S]*?)(?=\n\n|$)|(System:[\s\S]*?)(?=\n\n|$)|(Image:[\s\S]*?)(?=\n\n|$)/g);

  const createInternalLink = (text: React.ReactNode): React.ReactNode => {
    if (typeof text !== 'string') return text;

    const elements = text.split(/(\[\[.*?\]\])/g).map((part, index) => {
      if (part.startsWith('[[') && part.endsWith(']]')) {
        const innerText = part.slice(2, -2);
        const id = innerText.toLowerCase().replace(/\s+/g, '-');
        return (
          <a
            key={index}
            href={`#${id}`}
            className="text-black underline hover:text-blue-600 transition-colors duration-200"
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById(id);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            {innerText}
          </a>
        );
      }
      return part;
    });

    return <>{elements}</>;
  };

  return parts.map((part, index) => {
    if (!part) return null;

    if (part.startsWith('Prompt:')) {
      const lines = part.split('\n');
      return (
        <div key={index} className="bg-blue-100 p-2 my-4 rounded">
          {lines.map((line, lineIndex) => {
            if (line.startsWith('Prompt:') || line.startsWith('Svar:')) {
              const [label, ...content] = line.split(':');
              return (
                <div key={lineIndex} className="flex items-baseline">
                  <span className="text-blue-800 font-medium w-16 flex-shrink-0">{label}:</span>
                  <div className="text-gray-800 flex-1">
                    <ReactMarkdown components={MarkdownComponents}>
                      {content.join(':').trim()}
                    </ReactMarkdown>
                  </div>
                </div>
              );
            } else {
              return (
                <div key={lineIndex} className="text-gray-800 ml-16">
                  <ReactMarkdown components={MarkdownComponents}>
                    {line.trim()}
                  </ReactMarkdown>
                </div>
              );
            }
          })}
        </div>
      );
    } else if (part?.startsWith('System:')) {
      if (part.startsWith('*System:*')) {
        return <ReactMarkdown key={index} components={MarkdownComponents}>
          {part.replace(/^\*System:\*\s*/, '')}
        </ReactMarkdown>;
      }

      const lines = part.split('\n').map(line => line.trim()).filter(line => line !== '');
      return (
        <div key={index} className="bg-blue-100 p-2 my-4 rounded">
          {lines.map((line, lineIndex) => {
            const [label, ...content] = line.split(':');
            if (['System', 'User', 'Assistant'].includes(label)) {
              return (
                <div key={lineIndex} className="flex items-start mb-3">
                  <span className="text-blue-800 font-medium w-20 flex-shrink-0">{label}:</span>
                  <div className="text-foreground flex-1">
                    <ReactMarkdown components={{
                      ...MarkdownComponents,
                      p: ({node, ...props}) => <p className="my-0.5" {...props} />
                    }}>
                      {content.join(':').trim()}
                    </ReactMarkdown>
                  </div>
                </div>
              );
            } else {
              return (
                <div key={lineIndex} className="ml-20 text-foreground mb-2">
                  <ReactMarkdown components={{
                    ...MarkdownComponents,
                    p: ({node, ...props}) => <p className="my-0.5" {...props} />
                  }}>
                    {line}
                  </ReactMarkdown>
                </div>
              );
            }
          })}
        </div>
      );
    } else if (part.startsWith('Image:')) {
      const [_, imagePath] = part.split(':');
      const trimmedPath = imagePath.trim();
      return (
        <div key={index} className="my-4">
          <img 
            src={trimmedPath} 
            alt="Guide image" 
            style={{
              width: '100%',
              maxWidth: '500px',
              height: 'auto',
              borderRadius: '0.5rem',
              cursor: 'pointer'
            }}
            onClick={() => setModalImage(trimmedPath)}
          />
        </div>
      );
    } else if (part.trim() !== '') {
      return <ReactMarkdown key={index} components={{
        ...MarkdownComponents,
        p: ({ children }) => <p className="mb-4 whitespace-pre-line">{createInternalLink(children)}</p>,
      }}>{part}</ReactMarkdown>;
    }
    return null;
  }).filter(Boolean);
};

const MarkdownComponents = {
  p: (props: any) => {
    return <p className="mb-4 whitespace-pre-line" {...props} />;
  },
  li: (props: any) => {
    return <li className="ml-4 mb-2 whitespace-pre-wrap break-words" {...props} />;
  },
  h1: (props: any) => <h1 className="text-2xl font-bold mb-4" {...props} />,
  h2: (props: any) => <h2 className="text-xl font-semibold mb-3" {...props} />,
  h3: (props: any) => <h3 className="text-lg font-medium mb-2" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside mb-4" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside mb-4" {...props} />,
  blockquote: (props: any) => <blockquote className="border-l-4 border-gray-300 pl-4 italic mb-4" {...props} />,
  a: (props: any) => {
    return <a className="text-black underline hover:text-blue-600 transition-colors duration-200" {...props} />;
  },
}

export default function MainPage() {
  const [guideData, setGuideData] = useState<GuideData | null>(null)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [modalImage, setModalImage] = useState<string | null>(null)
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    setGuideData(promptGuideData)
  }, [])

  const handleSidebarToggle = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed)
  }

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768) // Adjust this breakpoint as needed
    }

    handleResize() // Set initial value
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-16 md:pt-24"> {/* Adjusted padding for mobile and desktop */}
        {/* Enhanced download section with responsive positioning */}
        <div className="py-3 px-4 sm:px-8 flex justify-end items-center mt-16 md:mt-0">
          <a
            href="/prompting-guide-syv-ai.pdf"
            download
            className="inline-flex items-center px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-sm"
          >
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download PDF
          </a>
        </div>
        {isDesktop ? (
          <div className="flex">
            <Sidebar onToggle={handleSidebarToggle} />
            <main className={`transition-all duration-300 ease-in-out flex-grow overflow-y-auto ${
              isSidebarCollapsed ? 'ml-16' : 'ml-72'
            }`}>
              <div className="px-4 sm:px-8 max-w-3xl mx-auto">
                {guideData && (
                  <>
                    <h1 className="mb-8 text-4xl font-bold text-gray-900">{guideData.title}</h1>
                    {guideData.sections.map((section) => (
                      <div key={section.id} id={`section-${section.id}`} className="mb-12">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                          <span className="mr-3 text-3xl">{section.icon}</span>
                          {section.title}
                        </h2>
                        {section.content && (
                          <div className="prose prose-gray max-w-none mb-6">
                            {processContent(section.content, setModalImage)}
                          </div>
                        )}
                        {section.methods && section.methods.length > 0 && (
                          <div className="space-y-8">
                            {section.methods.map((method) => (
                              <section key={method.id} id={method.id} className="bg-white shadow-md rounded-lg p-6">
                                <h3 className="text-2xl font-bold text-gray-800 mb-6">{method.title}</h3>
                                <div className="prose prose-gray max-w-none mb-6">
                                  {processContent(method.content, setModalImage)}
                                </div>
                                {method.implementations && method.implementations.length > 0 && (
                                  <div className="space-y-6 mt-8">
                                    {method.implementations.map((impl) => (
                                      <div key={impl.id} id={impl.id} className="bg-gray-50 rounded-lg p-4">
                                        <h5 className="text-lg font-semibold text-gray-700 mb-3">{impl.title}</h5>
                                        <div className="prose prose-gray max-w-none">
                                          {processContent(impl.content, setModalImage)}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </section>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </div>
            </main>
          </div>
        ) : (
          <div>
            <PhoneSidebar />
            <main className="px-4 sm:px-8 max-w-3xl mx-auto">
              <div className="pt-4 pb-8">
                {guideData && (
                  <>
                    <h1 className="mb-8 text-4xl font-bold text-gray-900">{guideData.title}</h1>
                    {guideData.sections.map((section) => (
                      <div key={section.id} id={`section-${section.id}`} className="mb-12">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                          <span className="mr-3 text-3xl">{section.icon}</span>
                          {section.title}
                        </h2>
                        {section.content && (
                          <div className="prose prose-gray max-w-none mb-6">
                            {processContent(section.content, setModalImage)}
                          </div>
                        )}
                        {section.methods && section.methods.length > 0 && (
                          <div className="space-y-8">
                            {section.methods.map((method) => (
                              <section key={method.id} id={method.id} className="bg-white shadow-md rounded-lg p-6">
                                <h3 className="text-2xl font-bold text-gray-800 mb-6">{method.title}</h3>
                                <div className="prose prose-gray max-w-none mb-6">
                                  {processContent(method.content, setModalImage)}
                                </div>
                                {method.implementations && method.implementations.length > 0 && (
                                  <div className="space-y-6 mt-8">
                                    {method.implementations.map((impl) => (
                                      <div key={impl.id} id={impl.id} className="bg-gray-50 rounded-lg p-4">
                                        <h5 className="text-lg font-semibold text-gray-700 mb-3">{impl.title}</h5>
                                        <div className="prose prose-gray max-w-none">
                                          {processContent(impl.content, setModalImage)}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </section>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </div>
            </main>
          </div>
        )}
      </div>
      {modalImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setModalImage(null)}
        >
          <img 
            src={modalImage} 
            alt="Full size image" 
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </div>
  )
}
