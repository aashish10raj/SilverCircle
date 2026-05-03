"use client";

import { useEffect, useState } from "react";

interface UserProfile {
  id: number;
  name: string;
  email: string;
  ageRange: string;
  city: string;
  interests: string[];
  preferredLanguage: string;
  mobilityPreference: string;
  bio: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Setting dummy profile data as requested
    setProfile({
      id: 1,
      name: "Martha Stewart",
      email: "martha@example.com",
      ageRange: "70-75",
      city: "New York",
      interests: ["Gardening", "Reading", "Walking"],
      preferredLanguage: "English",
      mobilityPreference: "nearby",
      bio: "I love plants and a good book. Looking forward to meeting neighbors.",
    });
  }, []);

  if (!profile) {
    return <p style={{ fontSize: '1.2rem' }}>Loading profile...</p>;
  }

  return (
    <div>
      <h1>My Profile</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
        Manage your personal information and preferences.
      </p>

      <div className="card" style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'var(--primary-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: 'bold' }}>
            {profile.name.charAt(0)}
          </div>
          <div>
            <h2 style={{ marginBottom: '0.2rem' }}>{profile.name}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', margin: 0 }}>{profile.city}</p>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
          <h3 style={{ marginBottom: '0.5rem' }}>About Me</h3>
          <p style={{ fontSize: '1.2rem' }}>{profile.bio}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
          <div>
            <strong>Age Range:</strong> <br/> {profile.ageRange}
          </div>
          <div>
            <strong>Language:</strong> <br/> {profile.preferredLanguage}
          </div>
          <div>
            <strong>Mobility:</strong> <br/> {profile.mobilityPreference === 'nearby' ? 'In Person / Nearby' : 'Online & In Person'}
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
          <h3 style={{ marginBottom: '0.5rem' }}>My Interests</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {profile.interests.map(interest => (
              <span key={interest} style={{ padding: '0.5rem 1rem', backgroundColor: '#e8f5e9', color: '#1b5e20', borderRadius: '16px', fontSize: '1.1rem', fontWeight: '600' }}>
                {interest}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button className="btn-primary">Edit Profile</button>
          <button className="btn-primary" style={{ backgroundColor: 'transparent', color: 'var(--error-color)', border: '1px solid var(--error-color)' }}>Sign Out</button>
        </div>
      </div>
    </div>
  );
}
