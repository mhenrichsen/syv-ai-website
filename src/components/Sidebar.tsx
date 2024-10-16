'use client'

import React, { useState, useEffect, useRef } from 'react'
import { promptGuideData } from './PromptGuide'
import { FiChevronLeft, FiChevronRight, FiChevronDown, FiChevronUp } from 'react-icons/fi'

interface Method {
  id: string;
  title: string;
  content: string;
  implementations?: Method[];
}

interface Section {
  id: string;
  title: string;
  icon: string;
  methods?: Method[];
}

interface GuideData {
  title: string;
  sections: Section[];
}

interface SidebarProps {
  onToggle: (collapsed: boolean) => void;
}

const COLLAPSIBLE_SECTIONS = ['mere-om-prompt-engineering', 'begynder', 'øvede', 'ekspert'];

export default function Sidebar({ onToggle }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [guideData, setGuideData] = useState<GuideData | null>(null)
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({})
  const [openMethods, setOpenMethods] = useState<{ [key: string]: boolean }>({})
  const [headerHeight, setHeaderHeight] = useState(0)
  const sidebarRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setGuideData(promptGuideData)
    // Initialize collapsible sections as open
    const initialOpenSections = COLLAPSIBLE_SECTIONS.reduce((acc, sectionId) => {
      acc[sectionId] = true;
      return acc;
    }, {} as { [key: string]: boolean });
    setOpenSections(initialOpenSections);
  }, [])

  useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.getElementById('NavHeader')
      if (header) {
        setHeaderHeight(header.offsetHeight)
      }
    }

    updateHeaderHeight()
    window.addEventListener('resize', updateHeaderHeight)

    return () => {
      window.removeEventListener('resize', updateHeaderHeight)
    }
  }, [])

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
    onToggle(!isCollapsed)
  }

  const handleMethodClick = (methodId: string) => {
    const element = document.getElementById(methodId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(`section-${sectionId}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const toggleSection = (sectionId: string, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering handleSectionClick
    if (COLLAPSIBLE_SECTIONS.includes(sectionId)) {
      setOpenSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }))
    }
  }

  const toggleMethod = (methodId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setOpenMethods(prev => ({ ...prev, [methodId]: !prev[methodId] }))
  }

  const noScrollbarStyle = {
    scrollbarWidth: 'none' as const,
    msOverflowStyle: 'none' as const,
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  };

  return (
    <aside 
      ref={sidebarRef}
      className={`fixed left-0 bg-gray-100 text-gray-800 transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-16' : 'w-72'
      } border-r border-gray-200 overflow-hidden`}
      style={{ 
        height: `calc(100vh - ${headerHeight}px)`,
        top: `${headerHeight}px`
      }}
    >
      <div className="h-full flex flex-col overflow-y-auto">
        <div className="p-4 flex items-center justify-between">
          <h1 className={`text-xl font-bold text-gray-900 transition-opacity duration-300 ${
            isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'
          }`}>
            Prompting Guide
          </h1>
          <button 
            onClick={toggleSidebar} 
            className="text-gray-600 hover:text-gray-800 p-1 rounded transition-colors duration-200"
          >
            {isCollapsed ? <FiChevronRight size={24} /> : <FiChevronLeft size={24} />}
          </button>
        </div>
        {isCollapsed && (
          <button
            onClick={toggleSidebar}
            className="absolute inset-0 w-full h-full opacity-0"
            aria-label="Expand sidebar"
          />
        )}
        <nav 
          className={`flex-grow p-4 overflow-y-auto ${
            isCollapsed ? 'opacity-0 invisible' : 'opacity-100 visible'
          }`}
          style={noScrollbarStyle}
        >
          {guideData?.sections.map((section) => (
            <div key={section.id} className="mb-6">
              <div 
                className="flex items-center justify-between font-semibold text-gray-700 mb-3 cursor-pointer hover:text-gray-900"
                onClick={() => handleSectionClick(section.id)}
              >
                <h2 className="flex items-center">
                  {section.icon && <span className="mr-2">{section.icon}</span>}
                  {section.title}
                </h2>
                {COLLAPSIBLE_SECTIONS.includes(section.id) && (
                  <button
                    onClick={(e) => toggleSection(section.id, e)}
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
                            e.preventDefault()
                            handleMethodClick(method.id)
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
                                e.preventDefault()
                                handleMethodClick(impl.id)
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
        </nav>
      </div>
    </aside>
  )
}
