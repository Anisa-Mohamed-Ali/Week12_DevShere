import React from 'react';
import moment from 'moment';
import { Star, GitFork, Eye, Clock } from 'lucide-react';
import '../styles/ProjectCard.css';

const ProjectCard = ({
  name = '',
  description = '',
  language = '',
  html_url = '#',
  stargazers_count = 0,
  forks_count = 0,
  updated_at,
  topics = [],
  watchers_count = 0,
}) => {
  return (
    <div className="project-card">
      {/* Header: magaca + language pill */}
      <div className="project-header">
        <h3 className="project-name">{name}</h3>
        {language ? <span className="language-badge">{language}</span> : null}
      </div>

      {/* Sharaxaad */}
      <p className="project-description">
        {description || 'No description provided'}
      </p>

      {/* Topics haddii ay jiraan */}
      {Array.isArray(topics) && topics.length > 0 && (
        <div className="project-topics">
          {topics.map((t) => (
            <span key={t} className="topic-badge">
              {t}
            </span>
          ))}
        </div>
      )}

      {/* Khad kala qayb ah */}
      <div style={{ borderTop: '1px solid #eaeaea', margin: '14px 0 10px' }} />

      {/* Stats + Updated time */}
      <div className="project-stats">
        <div className="stat-group">
          <span className="project-stat">
            <Star size={14} />
            <span>{stargazers_count}</span>
          </span>
          <span className="project-stat">
            <Eye size={14} />
            <span>{watchers_count}</span>
          </span>
          <span className="project-stat">
            <GitFork size={14} />
            <span>{forks_count}</span>
          </span>
        </div>

        <span className="project-updated">
          <Clock size={14} />
          <span>
            Updated {updated_at ? moment(updated_at).format('MMM D, YYYY') : '—'}
          </span>
        </span>
      </div>

      {/* Link GitHub */}
      <a
        href={html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="project-link"
      >
        View on GitHub
      </a>
    </div>
  );
};

export default ProjectCard;
