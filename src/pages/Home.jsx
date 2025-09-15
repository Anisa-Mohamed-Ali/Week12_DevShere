import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { Users, Star, GitBranch, MapPin, Calendar } from 'lucide-react';
import '../styles/Home.css';

const GITHUB_USER = 'Anisa-Mohamed-Ali'; // 👈 Hubi inaad ku qorto username-kaaga saxda ah

const Home = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get(`https://api.github.com/users/${GITHUB_USER}`);
        setUser(res.data);
      } catch (err) {
        setError('Error loading profile');
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="home-container">
      {user && (
        <div className="profile-card">
          <div className="profile-header">
            <div className="avatar-container">
              <img src={user.avatar_url} alt="avatar" className="avatar" />
            </div>
            <div className="profile-info">
              <h1>{user.name}</h1>
              <h2>@{user.login}</h2>
              {user.location && (
                <p><MapPin size={16} /> {user.location}</p>
              )}
              <p><Calendar size={16} /> Joined {moment(user.created_at).format('MMMM D, YYYY')}</p>
            </div>
          </div>

          <p>{user.bio || 'No bio available'}</p>

          <div className="profile-stats">
            <p><GitBranch size={16}/> {user.public_repos} Repos</p>
            <p><Users size={16}/> {user.followers} Followers</p>
            <p><Star size={16}/> {user.following} Following</p>
          </div>

          <div className="profile-actions">
            <a href={user.html_url} target="_blank" rel="noreferrer" className="btn">Visit GitHub</a>
            <Link to="/projects" className="btn">View Projects</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
