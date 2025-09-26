import { useState } from 'react'
import { Link } from '../App'
import './LinkCard.css'

interface LinkCardProps {
  link: Link
  onDelete: () => void
  onUpdateProgress: (progress: number) => void
}

const LinkCard = ({ link, onDelete, onUpdateProgress }: LinkCardProps) => {
  const [progress, setProgress] = useState(link.progress?.toString() || '0')

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = e.target.value
    setProgress(newProgress)
    onUpdateProgress(parseInt(newProgress) || 0)
  }

  const isProgressSection = link.section === 'progress'

  return (
    <div className={`link-card ${isProgressSection ? 'progress-card' : ''} fade-in`}>
      <div className="link-header">
        <div className="link-title">{link.title}</div>
        <button className="delete-btn" onClick={onDelete}>×</button>
      </div>
      <a href={link.url} target="_blank" rel="noopener noreferrer" className="link-url">
        {link.url}
      </a>
      {isProgressSection && link.progress !== undefined && (
        <div className="progress-status">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${link.progress}%` }}></div>
          </div>
          <div className="progress-text">
            <span>{link.progress}% complete</span>
            <input
              type="number"
              value={progress}
              min="0"
              max="100"
              className="progress-input-inline"
              onChange={handleProgressChange}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default LinkCard