'use client';
import { handleScrollWithRef } from '@/utils/utils';
import { useEffect, useRef } from 'react';

export const HeaderContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => handleScrollWithRef(ref);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    handleScrollWithRef(ref);
  }, []);

  return (
    <header ref={ref}>
      <div className="container">
        <div className="headerContainer">{children}</div>
      </div>
    </header>
  );
};
