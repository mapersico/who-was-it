import Image from 'next/image';

import './header.scss';

export default function Header() {
  return (
    <header className="header">
      <p className='header_powered-by'>
        Powered by
        <Image src="/tmdb-logo.svg" alt="tmdb" width="120" height="50" />
      </p>
      <p>Made with 💛 by <a target='_blank' href="https://github.com/mapersico">Marco</a></p>
    </header>
  );
}