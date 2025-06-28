import Link from 'next/link';
import { Heart, Home } from 'lucide-react';

export default function NavBar(){
    return(
        <nav className="bg-white/5 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-wider bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent hover:from-blue-300 hover:to-indigo-500 transition-all duration-300">
          IV
        </Link>

        {/* Botones de Navegación */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="px-4 py-2 flex items-center gap-2 bg-transparent border-2 border-blue-400 text-blue-400 rounded-full font-medium transition-all duration-300 hover:bg-blue-400 hover:text-white hover:shadow-lg hover:shadow-blue-400/25"
          >
            <Home className="w-5 h-5" />
            Inicio
          </Link>

          <Link
            href="/favoritos"
            className="px-4 py-2 flex items-center gap-2 bg-transparent border-2 border-rose-500 text-rose-500 rounded-full font-medium transition-all duration-300 hover:bg-rose-500 hover:text-white hover:shadow-lg hover:shadow-rose-500/25"
          >
            <Heart className="w-5 h-5" />
            Favoritos
          </Link>
        </div>
      </div>
    </nav>
    )
}