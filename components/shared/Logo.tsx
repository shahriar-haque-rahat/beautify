import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Logo = () => {
  return (
    <Link href="/" className="text-3xl font-bold text-primary hover:text-primary/80 transition-colors">
      <span className=" flex justify-start items-center gap-2">
        <Image
          src={"/logo.avif"}
          alt={"logo"}
          width={20}
          height={20}
        />
        <span>Beautify</span>
      </span>
    </Link>
  );
};

export default Logo;