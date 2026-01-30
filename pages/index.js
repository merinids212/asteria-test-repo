export default function Home() {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>👋</h1>
        <h2>Hello World from Asteria</h2>
        <p style={{ color: '#666' }}>Deployed on Vercel</p>
      </div>
    </div>
  );
}
