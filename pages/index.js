import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Horse Animations</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main>
        <h1>Horse Animations</h1>
        <div className="links">
          <a href="/horse1/">Horse 1 - Clip Clop</a>
          <a href="/horse2/">Horse 2 - Night Mare</a>
        </div>
      </main>

      <style jsx>{`
        main {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          color: #fff;
        }
        h1 {
          margin-bottom: 2rem;
          font-size: 2.5rem;
          font-weight: 300;
        }
        .links {
          display: flex;
          gap: 2rem;
        }
        a {
          display: block;
          padding: 1.5rem 3rem;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          color: #fff;
          text-decoration: none;
          font-size: 1.25rem;
          transition: all 0.3s ease;
        }
        a:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-4px);
        }
      `}</style>
    </>
  );
}
