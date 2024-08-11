import Link from 'next/link';
import { Clock } from 'lucide-react';
import { ThemeSwitcher } from './theme-switcher';

export function NavBar() {
  return (
    <div className="flex bg-red p-2 w-full border-b border-gray-500 justify-between">
      <div className="flex items-center">
        <Link href="/" className="text-xl hover:text-gray-600 transition duration-300"> PaceQuick </Link>
        <Clock className="ml-2" />
        <ThemeSwitcher />
      </div>
      <Link href="https://andmarek.com" className="text-xl hover:text-gray-600 transition duration-300"> andmarek </Link>
    </div>
  )
}
