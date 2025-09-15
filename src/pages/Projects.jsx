import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Star, GitBranch, Eye, Clock, ExternalLink } from 'lucide-react';
import '../styles/projects.css';

const GITHUB_USER = 'Anisa-Mohamed-Ali'; // 👈 ku qor username-kaaga saxda ah

const Projects = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await axios.get(
          `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=12`
        );
        setRepos(res.data);
      } catch (err) {
        setError('Error loading repos');
      } finally {
        setLoading(false);
      }
    }
    fetchRepos();
  }, []);

  if (loading) return <div>Loading repos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="projects-container">
      <div className="projects-header">
        <h1 className="projects-title">GitHub Projects</h1>
        <p className="projects-subtitle">My latest GitHub repositories.</p>
      </div>

      <div className="projects-grid">
        {repos.map(repo => (
          <div key={repo.id} className="project-card">
            {/* Header: Repo name + language */}
            <div className="project-header">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-name"
              >
                {repo.name} <ExternalLink size={14} />
              </a>
              {repo.language && (
                <span className="language-badge">{repo.language}</span>
              )}
            </div>

            {/* Description */}
            <p className="project-description">
              {repo.description || 'No description provided'}
            </p>

            {/* Stats */}
            <div className="project-stats">
              <div className="stat-group">
                <span className="project-stat"><Star size={14}/> {repo.stargazers_count}</span>
                <span className="project-stat"><Eye size={14}/> {repo.watchers_count}</span>
                <span className="project-stat"><GitBranch size={14}/> {repo.forks_count}</span>
              </div>
              <span className="project-updated">
                <Clock size={14}/> Updated {moment(repo.updated_at).format('MMM D, YYYY')}
              </span>
            </div>

            {/* Button */}
            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="project-link"
            >
              View on GitHub
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
