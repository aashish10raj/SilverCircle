import Link from "next/link";

export default function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h1>Welcome to SilverCircle</h1>
      <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
        A safe, warm, and friendly community for older adults to connect, share hobbies, and join local activities.
      </p>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
        <Link href="/discover">
          <button className="btn-primary">Find People Like Me</button>
        </Link>
        <Link href="/activities">
          <button className="btn-primary" style={{ backgroundColor: 'var(--secondary-color)', color: '#000' }}>
            Explore Activities
          </button>
        </Link>
      </div>

      <div style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', textAlign: 'left' }}>
        <div className="card">
          <h2>Trust & Safety</h2>
          <p>Connect with verified community members in your area safely and securely.</p>
        </div>
        <div className="card">
          <h2>Shared Interests</h2>
          <p>Find companions for walking, reading, gardening, or just having a cup of tea.</p>
        </div>
        <div className="card">
          <h2>Accessible Design</h2>
          <p>Large text, simple navigation, and clear buttons designed for ease of use.</p>
        </div>
      </div>
    </div>
  );
}
