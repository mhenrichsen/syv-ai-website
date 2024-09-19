import { useState, useEffect } from "react"
import { CalendarIcon, ClockIcon } from "lucide-react"

export default function Component({
  title = "The Future of AI: Transforming Industries and Shaping Our World",
  content = "Artificial Intelligence (AI) is no longer a concept of the future—it's here, and it's rapidly transforming industries across the globe. From healthcare to finance, manufacturing to education, AI is revolutionizing the way we work, live, and interact with the world around us.\n\n## The AI Revolution\n\nAI's impact is far-reaching and profound. In healthcare, AI algorithms are assisting doctors in diagnosing diseases with unprecedented accuracy. In finance, AI-powered systems are detecting fraud and making split-second trading decisions. In manufacturing, AI is optimizing production lines and predicting equipment failures before they occur.\n\n```python\n# Example of a simple AI model in Python\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import accuracy_score\n\n# Assume X and y are your features and target variables\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\n\nmodel = RandomForestClassifier()\nmodel.fit(X_train, y_train)\n\npredictions = model.predict(X_test)\naccuracy = accuracy_score(y_test, predictions)\nprint(f'Model Accuracy: {accuracy}')\n```\n\n## Challenges and Opportunities\n\nWhile the potential of AI is enormous, it also presents significant challenges. Issues of data privacy, algorithmic bias, and the potential displacement of jobs are at the forefront of discussions about AI's impact.\n\n> \"The development of full artificial intelligence could spell the end of the human race.\" - Stephen Hawking\n\nHowever, with careful consideration and ethical implementation, AI can be a powerful force for good, solving complex problems and creating new opportunities for innovation and growth.\n\n## The Future of Work\n\nAs AI continues to evolve, it will undoubtedly reshape the job market. While some roles may become obsolete, new jobs will emerge. The key to thriving in this new landscape will be adaptability and continuous learning.\n\n1. Data Scientists and AI Specialists will be in high demand\n2. AI Ethics Officers will ensure responsible AI development\n3. Human-AI Collaboration Experts will optimize workflows\n\n## Conclusion\n\nThe AI revolution is just beginning. As we stand on the brink of this new era, it's crucial that we approach AI development with a balance of enthusiasm and caution. By harnessing the power of AI responsibly, we can create a future that is not just technologically advanced, but also ethically sound and beneficial for all of humanity.",
  imageUrl = "/placeholder.svg?height=600&width=1200",
  author = {
    name: "Dr. Jane Doe",
    avatar: "/placeholder.svg?height=100&width=100",
    bio: "AI researcher and tech enthusiast with over 10 years of experience in machine learning and data science."
  },
  date = "May 15, 2023",
  readTime = "10 min read",
  tags = ["AI", "Technology", "Future of Work"]
}) {
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: "-50% 0px -50% 0px" }
    )

    const headings = document.querySelectorAll("h2")
    headings.forEach((heading) => observer.observe(heading))

    return () => {
      headings.forEach((heading) => observer.unobserve(heading))
    }
  }, [])

  const tableOfContents = content
    .split("\n\n")
    .filter((paragraph) => paragraph.startsWith("## "))
    .map((heading) => ({
      id: heading.slice(3).toLowerCase().replace(/ /g, "-"),
      title: heading.slice(3),
    }))

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
      <aside className="lg:w-1/4 lg:sticky lg:top-8 lg:self-start">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Table of Contents</h2>
          <nav className="space-y-1">
            {tableOfContents.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`block text-sm py-1 border-l-2 pl-3 transition-colors ${
                  activeSection === item.id
                    ? "border-primary text-primary font-medium"
                    : "border-transparent text-muted-foreground hover:border-muted-foreground/50 hover:text-foreground"
                }`}
              >
                {item.title}
              </a>
            ))}
          </nav>
        </div>
      </aside>
      
      <article className="lg:w-3/4">
        <header className="mb-8">
          <div className="relative h-[40vh] min-h-[300px] mb-6">
            <img
              src={imageUrl}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-background/20 rounded-lg" />
            <div className="absolute bottom-0 left-0 p-6">
              <h1 className="text-4xl font-bold text-white mb-2">{title}</h1>
              <div className="flex items-center text-white/80 space-x-4">
                <span className="flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-1" />
                  {date}
                </span>
                <span className="flex items-center">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  {readTime}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span key={tag} className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </header>
        
        <main>
          <div className="prose dark:prose-invert max-w-none">
            {content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return <h2 key={index} id={paragraph.slice(3).toLowerCase().replace(/ /g, '-')}>{paragraph.slice(3)}</h2>
              } else if (paragraph.startsWith('```')) {
                const code = paragraph.split('\n').slice(1, -1).join('\n')
                return (
                  <pre key={index} className="bg-muted p-4 rounded-lg overflow-x-auto">
                    <code>{code}</code>
                  </pre>
                )
              } else if (paragraph.startsWith('> ')) {
                return <blockquote key={index}>{paragraph.slice(2)}</blockquote>
              } else if (paragraph.startsWith('1. ')) {
                return (
                  <ol key={index}>
                    {paragraph.split('\n').map((item, i) => (
                      <li key={i}>{item.slice(3)}</li>
                    ))}
                  </ol>
                )
              } else {
                return <p key={index}>{paragraph}</p>
              }
            })}
          </div>
        </main>
      </article>
    </div>
  )
}