import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Horse Animations</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main>
        <div className="container">
          <div className="wordmark">
            <h1>HORSE</h1>
            <div className="stripe-accent">
              <span></span><span></span><span></span><span></span><span></span>
            </div>
          </div>

          <nav className="links">
            <a href="/horse1/">
              <span className="num">01</span>
              <span className="name">CLIP CLOP</span>
              <span className="tag">CSS</span>
            </a>
            <a href="/horse2/">
              <span className="num">02</span>
              <span className="name">NIGHT MARE</span>
              <span className="tag">P5.JS</span>
            </a>
          </nav>

          <footer>
            <span className="year">2025</span>
          </footer>
        </div>
      </main>

      <style jsx>{`
        main {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif;
          background: #f5f5f0;
          color: #000;
          padding: 3rem 2rem;
        }

        .container {
          max-width: 400px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .wordmark {
          text-align: center;
          margin-bottom: 4rem;
        }

        h1 {
          font-size: 3.5rem;
          font-weight: 800;
          letter-spacing: 0.4em;
          margin: 0 0 0.75rem -0.4em;
          padding-left: 0.4em;
        }

        .stripe-accent {
          display: flex;
          justify-content: center;
          gap: 6px;
        }

        .stripe-accent span {
          display: block;
          width: 40px;
          height: 3px;
          background: #000;
        }

        .links {
          width: 100%;
          display: flex;
          flex-direction: column;
          border: 3px solid #000;
        }

        .links a {
          display: flex;
          align-items: center;
          padding: 1.25rem 1.5rem;
          color: #000;
          text-decoration: none;
          border-bottom: 3px solid #000;
          transition: all 0.1s ease;
        }

        .links a:last-child {
          border-bottom: none;
        }

        .links a:hover {
          background: #000;
          color: #f5f5f0;
        }

        .num {
          font-size: 0.75rem;
          font-weight: 700;
          width: 36px;
          letter-spacing: 0.05em;
        }

        .name {
          flex: 1;
          font-size: 1.1rem;
          font-weight: 700;
          letter-spacing: 0.15em;
        }

        .tag {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          padding: 0.25rem 0.5rem;
          border: 2px solid currentColor;
        }

        footer {
          margin-top: 4rem;
        }

        .year {
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.3em;
          color: #999;
        }

        @media (max-width: 480px) {
          h1 {
            font-size: 2.5rem;
            letter-spacing: 0.3em;
          }
          .name {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </>
  );
}
