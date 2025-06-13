'use client';

import Image from "next/image";

export default function KofiWidget() {

  return (
    <a href='https://ko-fi.com/G2G31E6EM2' target='_blank'>
      <Image
        height={36}
        width={150}
        style={{ position: 'fixed', bottom: '1rem', right: '1.25rem', border: '0px', height: '36px' }}
        src='https://storage.ko-fi.com/cdn/kofi4.png?v=6'
        alt='Buy Me a Coffee at ko-fi.com'
      />
    </a>
  );
}
