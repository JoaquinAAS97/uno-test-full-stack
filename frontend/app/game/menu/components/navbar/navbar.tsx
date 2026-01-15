'use client';
import Link from "next/link";
import { useAudioContext } from "../../play/AudioProvider";

const navItems = [
  { path: '/game/menu/history', text: 'Ver Historial de juegos' },
  { path: '/', text: 'Log out' }
];

export const Navbar = () => {
  const { play, pause } = useAudioContext();

  return (
    <nav className="flex flex-row justify-center gap-80 bg-blue-800/30 p-3 m-2">
      <Link href="/game/menu/play" onClick={() => play()}>
        <span>Jugar</span>
      </Link>
      <div className="flex flex-row gap-5 justify-baseline">
        {navItems.map(navItem => (
          <Link
            key={navItem.text}
            href={navItem.path}
            onClick={navItem.path === "/" ? () => pause() : undefined}
          >
            {navItem.text}
          </Link>
        ))}
      </div>
    </nav>
  );
};
