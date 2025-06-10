import Image from 'next/image';

import './header.scss';

export default function Header() {
  return (
    <header className="header">
      <p className='header_powered-by'>
        Powered by
        <Image src="/tmdb-logo.svg" alt="tmdb" width="120" height="50" />
      </p>
      <p className='header_github'>
        <span>Made with 💛 by</span>
        <a target='_blank' href="https://github.com/mapersico">
          <Image src="/github.svg" alt="github" width="20" height="20" />
          <span>Marco</span>
        </a>
      </p>
    </header>
  );
}