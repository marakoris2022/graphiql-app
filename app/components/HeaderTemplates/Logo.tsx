import { RoutePath } from '@/utils/utils';
import Image from 'next/image';

export const Logo = () => {
  return (
    <a className="logo" href={RoutePath.HOME}>
      <Image
        src="/logo-graph.svg"
        alt="logo"
        width={35}
        height={35}
        style={{
          position: 'absolute',
          top: '15px',
          left: '5px',
          zIndex: 1,
        }}
      ></Image>
      <h1 className="logoTitle">RSTeam</h1>
      <Image
        src="/logo-rest.svg"
        alt="logo"
        width={35}
        height={35}
        style={{
          position: 'absolute',
          top: '4px',
          right: '5px',
          zIndex: 1,
        }}
      ></Image>
    </a>
  );
};
