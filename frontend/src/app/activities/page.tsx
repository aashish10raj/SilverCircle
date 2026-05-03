"use client";

import { useEffect, useState } from "react";

interface Activity {
  id: number;
  title: string;
  description: string;
  category: string;
  scheduleTime: string;
  location: string;
  isOnline: boolean;
  capacity: number;
  currentAttendees: number;
}

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
    fetch(`${API_URL}/api/activities`)
      .then(res => res.json())
      .then(data => {
        setActivities(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch", err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1>Upcoming Activities</h1>
          <p style={{ fontSize: '1.2rem', margin: 0 }}>
            Join local or online groups for your favorite hobbies.
          </p>
        </div>
        <button className="btn-primary" style={{ backgroundColor: 'var(--secondary-color)', color: '#000' }}>Host an Activity</button>
      </div>

      {loading ? (
        <p style={{ fontSize: '1.2rem' }}>Loading activities...</p>
      ) : activities.length === 0 ? (
        <p style={{ fontSize: '1.2rem' }}>No activities found right now.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
          {activities.map(activity => (
            <div key={activity.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h2 style={{ marginBottom: '0.5rem' }}>{activity.title}</h2>
                  <p style={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: '1.1rem' }}>
                    {new Date(activity.scheduleTime).toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                  </p>
                </div>
                <span style={{ padding: '0.5rem 1rem', backgroundColor: activity.isOnline ? '#e3f2fd' : '#fff3e0', color: activity.isOnline ? '#1565c0' : '#e65100', borderRadius: '16px', fontWeight: 'bold' }}>
                  {activity.isOnline ? 'Online' : 'In Person'}
                </span>
              </div>
              
              <p style={{ fontSize: '1.1rem' }}>{activity.description}</p>
              
              <div style={{ display: 'flex', gap: '2rem', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '0.5rem' }}>
                <div>
                  <strong>Location:</strong> {activity.location}
                </div>
                <div>
                  <strong>Category:</strong> {activity.category}
                </div>
                <div>
                  <strong>Spots:</strong> {activity.currentAttendees} / {activity.capacity} filled
                </div>
              </div>
              
              <button className="btn-primary" style={{ alignSelf: 'flex-start', marginTop: '1rem' }}>RSVP to Activity</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
