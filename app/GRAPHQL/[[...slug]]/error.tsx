'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Error!</h2>
      <h3>{error.message}</h3>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
