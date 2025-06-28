'use client'
import Link from 'next/link'
import { Propiedad } from '../types/propiedad'
import { Heart } from 'lucide-react'

/**
 * Componente de tarjeta de propiedad
 * 
 * Muestra una vista resumida de una propiedad con su imagen, título, ubicación
 * y precio. Incluye funcionalidad para marcar como favorito.
 * 
 * @component
 * @param {Propiedad} propiedad - Datos de la propiedad a mostrar
 * @param {boolean} [esFavorito] - Indica si la propiedad está marcada como favorita
 * @param {Function} [onToggleFavorito] - Función para alternar el estado de favorito
 */
interface PropiedadCardProps {
  propiedad: Propiedad
  esFavorito?: boolean
  onToggleFavorito?: () => void
}

export default function PropiedadCard({ propiedad, esFavorito, onToggleFavorito }: PropiedadCardProps) {
  return (
    <div className="group bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-100 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/20 hover:border-blue-400/50 scale-90">
      <div className="relative h-64 bg-gradient-to-br from-slate-200 to-slate-300 overflow-hidden">
        {propiedad.imagen ? (
          <img
            src={propiedad.imagen}
            alt={`${propiedad.tipo} en ${propiedad.ciudad}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300" />
        )}

        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Botón favorito */}
        <button
          onClick={onToggleFavorito}
          aria-label="Toggle Favorito"
          className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-rose-500 z-10"
        >
          <Heart
            className={`w-6 h-6 transition-colors duration-300 ${
              esFavorito ? 'text-rose-500 fill-current' : 'text-slate-400'
            }`}
          />
        </button>

        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-blue-400 mb-1 group-hover:text-blue-300 transition-colors duration-300">
            {propiedad.ciudad}
          </h3>
          <p className="text-white/70 text-sm font-medium uppercase tracking-wide">{propiedad.tipo}</p>
        </div>

        <div className="flex items-center gap-6 mb-6 text-white/80">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full group-hover:bg-blue-300 transition-colors duration-300" />
            <span className="text-sm font-medium">{propiedad.ambientes} ambientes</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full group-hover:bg-emerald-300 transition-colors duration-300" />
            <span className="text-sm font-medium">{propiedad.metros_cuadrados} m²</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/10 group-hover:border-white/20 transition-colors duration-300">
          <div className="text-2xl font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300">
            ${propiedad.precio.toLocaleString()}
          </div>
          <Link
            href={`/propiedad/${propiedad.id}`}
            className="px-6 py-2 bg-transparent border-2 border-blue-400 text-blue-400 rounded-full font-medium transition-all duration-300 hover:bg-blue-400 hover:text-white hover:translate-x-1 hover:shadow-lg hover:shadow-blue-400/25"
          >
            Ver detalle
          </Link>
        </div>
      </div>
    </div>
  )
}