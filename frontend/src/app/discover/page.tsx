"use client";

import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  bio: string;
  city: string;
  interests: string[];
}

export default function DiscoverPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For demo purposes, assuming user 1 is logged in
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
    fetch(`${API_URL}/api/users/1/recommendations`)
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch", err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>People you may like to connect with</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
        These people live nearby or share similar interests with you.
      </p>

      {loading ? (
        <p style={{ fontSize: '1.2rem' }}>Loading recommendations...</p>
      ) : users.length === 0 ? (
        <p style={{ fontSize: '1.2rem' }}>No recommendations found right now.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
          {users.map(user => (
            <div key={user.id} className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'var(--primary-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h2 style={{ marginBottom: 0 }}>{user.name}</h2>
                  <p style={{ color: 'var(--text-secondary)', margin: 0 }}>{user.city}</p>
                </div>
              </div>
              <p>{user.bio}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem', marginBottom: '1.5rem' }}>
                {user.interests.map(interest => (
                  <span key={interest} style={{ padding: '0.25rem 0.75rem', backgroundColor: '#e8f5e9', color: '#1b5e20', borderRadius: '16px', fontSize: '0.9rem', fontWeight: '600' }}>
                    {interest}
                  </span>
                ))}
              </div>
              <button className="btn-primary" style={{ width: '100%' }}>Send Connection Request</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
