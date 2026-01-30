import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Horse Animations</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet" />
      </Head>

      <main>
        <div className="container">
          <header>
            <div className="logo">
              <div className="logo-mark">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
              </div>
            </div>
            <h1>HORSE</h1>
            <p className="subtitle">ANIMATIONS</p>
          </header>

          <nav className="links">
            <a href="/horse1/" className="link-card">
              <span className="number">01</span>
              <span className="title">CLIP CLOP</span>
              <span className="desc">Pure CSS</span>
            </a>
            <a href="/horse2/" className="link-card">
              <span className="number">02</span>
              <span className="title">NIGHT MARE</span>
              <span className="desc">p5.js + ML5</span>
            </a>
          </nav>

          <footer>
            <span>2025</span>
          </footer>
        </div>
      </main>

      <style jsx>{`
        main {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: #f5f5f0;
          color: #000;
          padding: 2rem;
        }

        .container {
          max-width: 600px;
          width: 100%;
        }

        header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .logo {
          display: flex;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .logo-mark {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4px;
          width: 64px;
          height: 64px;
        }

        .circle {
          background: #000;
          border-radius: 50%;
        }

        h1 {
          font-size: 4rem;
          font-weight: 900;
          letter-spacing: 0.2em;
          margin: 0;
          line-height: 1;
        }

        .subtitle {
          font-size: 1rem;
          font-weight: 400;
          letter-spacing: 0.5em;
          margin: 0.5rem 0 0;
          color: #666;
        }

        .links {
          display: flex;
          flex-direction: column;
          gap: 1px;
          background: #000;
          border: 2px solid #000;
        }

        .link-card {
          display: grid;
          grid-template-columns: 60px 1fr auto;
          align-items: center;
          padding: 1.5rem;
          background: #f5f5f0;
          color: #000;
          text-decoration: none;
          transition: all 0.15s ease;
        }

        .link-card:hover {
          background: #000;
          color: #f5f5f0;
        }

        .number {
          font-size: 0.875rem;
          font-weight: 700;
          letter-spacing: 0.1em;
        }

        .title {
          font-size: 1.25rem;
          font-weight: 900;
          letter-spacing: 0.05em;
        }

        .desc {
          font-size: 0.75rem;
          font-weight: 400;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          opacity: 0.6;
        }

        footer {
          margin-top: 4rem;
          text-align: center;
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          color: #999;
        }

        @media (max-width: 480px) {
          h1 {
            font-size: 2.5rem;
          }
          .link-card {
            grid-template-columns: 40px 1fr;
            gap: 0.5rem;
          }
          .desc {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
