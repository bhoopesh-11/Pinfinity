import { useState, useEffect } from 'react'
import Header from './components/Header'
import Controls from './components/Controls'
import Section from './components/Section'
import './App.css'

export interface Link {
  id: number
  title: string
  url: string
  section: 'pinned' | 'entertainment' | 'study' | 'progress'
  progress?: number
}

export interface Links {
  pinned: Link[]
  entertainment: Link[]
  study: Link[]
  progress: Link[]
}

function App() {
  const [links, setLinks] = useState<Links>({
    pinned: [],
    entertainment: [],
    study: [],
    progress: []
  })
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // Sample data
    if (Object.values(links).every(arr => arr.length === 0)) {
      setLinks({
        pinned: [
          { id: 1, title: 'github', url: 'https://github.com', section: 'pinned' },
          { id: 2, title: 'gmail', url: 'https://gmail.com', section: 'pinned' },
          { id: 3, title: 'notion', url: 'https://notion.so', section: 'pinned' },
          { id: 4, title: 'discord', url: 'https://discord.com', section: 'pinned' }
        ],
        entertainment: [
          { id: 5, title: 'youtube', url: 'https://youtube.com', section: 'entertainment' },
          { id: 6, title: 'reddit', url: 'https://reddit.com', section: 'entertainment' },
          { id: 7, title: 'netflix', url: 'https://netflix.com', section: 'entertainment' }
        ],
        study: [
          { id: 8, title: 'khan-academy', url: 'https://khanacademy.org', section: 'study' },
          { id: 9, title: 'coursera', url: 'https://coursera.org', section: 'study' },
          { id: 10, title: 'mdn-docs', url: 'https://developer.mozilla.org', section: 'study' }
        ],
        progress: [
          { id: 11, title: 'react-bootcamp', url: 'https://reactjs.org/tutorial', section: 'progress', progress: 78 },
          { id: 12, title: 'portfolio-site', url: 'https://github.com/user/portfolio', section: 'progress', progress: 45 },
          { id: 13, title: 'js-algorithms', url: 'https://leetcode.com', section: 'progress', progress: 62 }
        ]
      })
    }
  }, [])

  const addLink = (title: string, url: string, section: string, progress?: number) => {
    if (!title || !url) {
      alert('please fill in both title and url')
      return
    }

    let formattedUrl = url
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      formattedUrl = 'https://' + url
    }

    const newLink: Link = {
      id: Date.now(),
      title: title.trim().toLowerCase().replace(/\s+/g, '-'),
      url: formattedUrl,
      section: section as Link['section'],
      ...(section === 'progress' && { progress: parseInt(progress?.toString() || '0') })
    }

    setLinks(prev => ({
      ...prev,
      [section]: [newLink, ...prev[section as keyof Links]]
    }))
  }

  const deleteLink = (section: string, id: number) => {
    if (confirm('delete this link?')) {
      setLinks(prev => ({
        ...prev,
        [section]: prev[section as keyof Links].filter(link => link.id !== id)
      }))
    }
  }

  const updateProgress = (section: string, id: number, newProgress: number) => {
    setLinks(prev => ({
      ...prev,
      [section]: prev[section as keyof Links].map(link =>
        link.id === id ? { ...link, progress: Math.max(0, Math.min(100, newProgress)) } : link
      )
    }))
  }

  const getFilteredLinks = (sectionName: keyof Links) => {
    return searchTerm
      ? links[sectionName].filter(link =>
          link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          link.url.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : links[sectionName]
  }

  return (
    <div className="container">
      <Header />
      <Controls onAddLink={addLink} onSearch={setSearchTerm} />
      <div className="main-content">
        <Section
          title="~/bookmarks"
          icon="⭐"
          sectionName="pinned"
          links={getFilteredLinks('pinned')}
          emptyMessage="// No bookmarks found"
          onDeleteLink={deleteLink}
          onUpdateProgress={updateProgress}
        />
        <Section
          title="/dev/fun"
          icon="🕹️"
          sectionName="entertainment"
          links={getFilteredLinks('entertainment')}
          emptyMessage="no fun stuff yet"
          onDeleteLink={deleteLink}
          onUpdateProgress={updateProgress}
        />
        <Section
          title="/usr/learn"
          icon="📖"
          sectionName="study"
          links={getFilteredLinks('study')}
          emptyMessage="// No modules loaded"
          onDeleteLink={deleteLink}
          onUpdateProgress={updateProgress}
        />
        <Section
          title="./projects"
          icon="⚡"
          sectionName="progress"
          links={getFilteredLinks('progress')}
          emptyMessage="// No processes running"
          onDeleteLink={deleteLink}
          onUpdateProgress={updateProgress}
        />
      </div>
    </div>
  )
}

export default App