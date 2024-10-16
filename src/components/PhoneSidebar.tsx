import React, { useState, useEffect } from 'react';
import { FiChevronDown, FiChevronUp, FiChevronRight } from 'react-icons/fi';
import { promptGuideData } from './PromptGuide';

const COLLAPSIBLE_SECTIONS = ['mere-om-prompt-engineering', 'begynder', 'øvede', 'ekspert'];

const PhoneSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});
  const [openMethods, setOpenMethods] = useState<{ [key: string]: boolean }>({});
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const header = document.getElementById('NavHeader');
    if (header) {
      setHeaderHeight(header.offsetHeight);
    }
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const toggleSection = (sectionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (COLLAPSIBLE_SECTIONS.includes(sectionId)) {
      setOpenSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }));
    }
  };

  const toggleMethod = (methodId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenMethods(prev => ({ ...prev, [methodId]: !prev[methodId] }));
  };

  const handleMethodClick = (methodId: string) => {
    const element = document.getElementById(methodId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20; // 20px extra padding
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="fixed top-20 right-4 z-50 bg-gray-100 p-2 rounded-full shadow-md"
      >
        {isOpen ? <FiChevronUp size={24} /> : <FiChevronRight size={24} />}
      </button>
      {isOpen && (
        <nav className="fixed inset-0 bg-white z-40 overflow-y-auto pt-20">
          <div className="p-4">
            {promptGuideData.sections.map((section) => (
              <div key={section.id} className="mb-6">
                <div 
                  className="flex items-center justify-between font-semibold text-gray-700 mb-3 cursor-pointer hover:text-gray-900"
                  onClick={(e) => {
                    e.preventDefault();
                    handleMethodClick(`section-${section.id}`);
                    if (COLLAPSIBLE_SECTIONS.includes(section.id)) {
                      toggleSection(section.id, e);
                    }
                  }}
                >
                  <h2 className="flex items-center">
                    {section.icon && <span className="mr-2">{section.icon}</span>}
                    {section.title}
                  </h2>
                  {COLLAPSIBLE_SECTIONS.includes(section.id) && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSection(section.id, e);
                      }}
                      className="ml-2 focus:outline-none"
                    >
                      {openSections[section.id] ? <FiChevronUp /> : <FiChevronDown />}
                    </button>
                  )}
                </div>
                {(!COLLAPSIBLE_SECTIONS.includes(section.id) || openSections[section.id]) && (
                  <div className="ml-6 space-y-2">
                    {section.methods?.map((method) => (
                      <div key={method.id}>
                        <div className="flex items-center justify-between">
                          <a
                            href={`#${method.id}`}
                            onClick={(e) => {
                              e.preventDefault();
                              handleMethodClick(method.id);
                            }}
                            className="block text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded px-2 py-1 transition-colors duration-200"
                          >
                            {method.title}
                          </a>
                          {method.implementations && method.implementations.length > 0 && (
                            <button
                              onClick={(e) => toggleMethod(method.id, e)}
                              className="ml-2 focus:outline-none"
                            >
                              {openMethods[method.id] ? <FiChevronUp /> : <FiChevronDown />}
                            </button>
                          )}
                        </div>
                        {method.implementations && openMethods[method.id] && (
                          <div className="ml-4 mt-1 space-y-1">
                            {method.implementations.map((impl) => (
                              <a
                                key={impl.id}
                                href={`#${impl.id}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleMethodClick(impl.id);
                                }}
                                className="block text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded px-2 py-1 transition-colors duration-200"
                              >
                                {impl.title}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
};

export default PhoneSidebar;
