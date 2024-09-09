'use client';
import { useEffect, useRef, useState } from 'react';

export const HeaderContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      if (window.scrollY > 10) {
        ref.current.classList.add('sticky');
      } else {
        ref.current.classList.remove('sticky');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header ref={ref}>
      <div className="container">
        <div className="headerContainer">{children}</div>
      </div>
    </header>
  );
};
