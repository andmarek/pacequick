import Link from 'next/link';
import { Clock } from 'lucide-react';

export function NavBar() {
  return (
    <div className="flex bg-red p-2 w-full border-b border-gray-500 justify-between">
      <div className="flex items-center">
        <Link href="/" className="text-xl text-gray-800 hover:text-gray-600 transition duration-300">PaceQuick  </Link>
        <Clock className="ml-2" />
      </div>
      <Link href="https://andmarek.com" className="text-xl text-gray-800 hover:text-gray-600 transition duration-300"> andmarek </Link>
    </div>
  )
}
