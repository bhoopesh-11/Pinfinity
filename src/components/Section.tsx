import { Link } from '../App'
import LinkCard from './LinkCard'
import './Section.css'

interface SectionProps {
  title: string
  icon: string
  sectionName: string
  links: Link[]
  emptyMessage: string
  onDeleteLink: (section: string, id: number) => void
  onUpdateProgress: (section: string, id: number, progress: number) => void
}

const Section = ({
  title,
  icon,
  sectionName,
  links,
  emptyMessage,
  onDeleteLink,
  onUpdateProgress
}: SectionProps) => {
  const getSectionClass = () => {
    switch (sectionName) {
      case 'pinned': return 'pinned'
      case 'entertainment': return 'entertainment'
      case 'study': return 'study'
      case 'progress': return 'progress'
      default: return ''
    }
  }

  return (
    <div className={`section ${getSectionClass()}`}>
      <div className={`section-header ${getSectionClass()}`}>
        <span className="section-icon">{icon}</span>
        <span className="section-title">{title}</span>
        <span className="section-count">{links.length}</span>
      </div>
      <div className="section-content">
        {links.length === 0 ? (
          <div className="empty-section">{emptyMessage}</div>
        ) : (
          <div className="links-container">
            {links.map((link) => (
              <LinkCard
                key={link.id}
                link={link}
                onDelete={() => onDeleteLink(sectionName, link.id)}
                onUpdateProgress={(progress) => onUpdateProgress(sectionName, link.id, progress)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Section