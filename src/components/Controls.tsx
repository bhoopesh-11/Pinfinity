import { useState } from 'react'
import './Controls.css'

interface ControlsProps {
  onAddLink: (title: string, url: string, section: string, progress?: number) => void
  onSearch: (searchTerm: string) => void
}

const Controls = ({ onAddLink, onSearch }: ControlsProps) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [section, setSection] = useState('pinned')
  const [progress, setProgress] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddLink(title, url, section, progress ? parseInt(progress) : undefined)
    setTitle('')
    setUrl('')
    setProgress('')
    setSection('pinned')
  }

  const handleSectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSection(e.target.value)
  }

  return (
    <div className="controls">
      <form onSubmit={handleSubmit} className="input-row">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-field"
          placeholder="title"
          required
        />
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="input-field"
          placeholder="url"
          required
        />
        <select
          value={section}
          onChange={handleSectionChange}
          className="select-field"
        >
          <option value="pinned">pinned</option>
          <option value="entertainment">entertainment</option>
          <option value="study">study</option>
          <option value="progress">progress</option>
        </select>
        {section === 'progress' && (
          <input
            type="number"
            value={progress}
            onChange={(e) => setProgress(e.target.value)}
            className="input-field progress-input"
            placeholder="%"
            min="0"
            max="100"
          />
        )}
        <button type="submit" className="add-btn">
          [add]
        </button>
      </form>
      <input
        type="text"
        onChange={(e) => onSearch(e.target.value)}
        className="search-box"
        placeholder="search all links..."
      />
    </div>
  )
}

export default Controls