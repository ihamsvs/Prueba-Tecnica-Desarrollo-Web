'use client';

import { useState, useEffect } from "react";
import { Propiedad } from "../types/propiedad";
import PropiedadCard from "./PropiedadCard";
import { Search } from 'lucide-react';
import { useFavoritos } from "../hooks/useFavoritos";

interface ListaPropiedadesProps {
  propiedades: Propiedad[];
}

/**
 * Componente de lista de propiedades
 * 
 * Muestra una lista paginada y buscable de propiedades. Incluye:
 * - Barra de búsqueda
 * - Paginación
 * - Integración con favoritos
 * - Vista en cuadrícula de propiedades
 * 
 * @component
 * @param {Propiedad[]} propiedades - Lista de propiedades a mostrar
 */


const ITEMS_POR_PAGINA = 12;

export default function ListaPropiedades({ propiedades }: ListaPropiedadesProps) {
  const [busqueda, setBusqueda] = useState<string>('');
  const [paginaActual, setPaginaActual] = useState<number>(1);
  const [minPrecio, setMinPrecio] = useState<number | null>(null);
  const [maxPrecio, setMaxPrecio] = useState<number | null>(null);

  // Hook para favoritos 
  const { esFavorito, agregarFavorito } = useFavoritos();

  // Reiniciar página cuando cambia la búsqueda
  useEffect(()=>{
    setPaginaActual(1);
  }, [busqueda, minPrecio, maxPrecio])


  // Filtrar propiedades según búsqueda
  const filtradas = propiedades.filter((p) => {
    const coincideBusqueda = p.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.ciudad.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.tipo.toLowerCase().includes(busqueda.toLowerCase());

    const dentroRangoMin = minPrecio ? p.precio >= minPrecio : true;
    const dentroRangoMax = maxPrecio ? p.precio <= maxPrecio : true;

    return coincideBusqueda && dentroRangoMin && dentroRangoMax;
  })

  

  // Cálculo de paginación
  const totalPaginas = Math.ceil(filtradas.length / ITEMS_POR_PAGINA);
  const indiceInicio = (paginaActual - 1) * ITEMS_POR_PAGINA;
  const indiceFin = indiceInicio + ITEMS_POR_PAGINA;
  const propiedadesVisibles = filtradas.slice(indiceInicio, indiceFin);

  // Handlers paginación
  const handleAnterior = () => {
    if (paginaActual > 1) setPaginaActual(paginaActual - 1);
  };

  const handleSiguiente = () => {
    if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1);
  };

  return (
    <div className="p-6">
      {/* Input búsqueda */}
      <div className="relative mb-6 max-w-xl mx-auto">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
        <input
          type="text"
          placeholder="Buscar por ciudad, tipo o título..."
          className="w-full pl-12 pr-6 py-3 text-lg bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-full text-white placeholder-white/60 outline-none transition-all duration-300 focus:border-blue-400 focus:bg-white/15 focus:shadow-lg focus:shadow-blue-400/20"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>
      {/* 💰 Filtros de precio */}
      <div className="flex justify-center gap-4 mb-6">
        <input
          type="number"
          placeholder="Precio mínimo"
          value={minPrecio ?? ''}
          onChange={(e) => setMinPrecio(e.target.value ? parseInt(e.target.value) : null)}
          className="px-4 py-2 w-40 rounded bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:outline-none"
        />
        <input
          type="number"
          placeholder="Precio máximo"
          value={maxPrecio ?? ''}
          onChange={(e) => setMaxPrecio(e.target.value ? parseInt(e.target.value) : null)}
          className="px-4 py-2 w-40 rounded bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:outline-none"
        />
      </div>

      {/* Lista paginada */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {propiedadesVisibles.length === 0 ? (
          <div className="md:col-span-3 text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-white/10 rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-white/40" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">No se encontraron propiedades</h3>
            <p className="text-white/60">Intenta ajustar tus filtros de búsqueda</p>
          </div>
        ) : (
          propiedadesVisibles.map((p) => (
            <PropiedadCard 
              key={p.id} 
              propiedad={p} 
              esFavorito={esFavorito(p.id)} 
              onToggleFavorito={() => agregarFavorito(p.id)} 
            />
          ))
        )}
      </div>

      {/* Paginación */}
      {filtradas.length > ITEMS_POR_PAGINA && (
        <div className="flex justify-center items-center gap-4 mt-12">
          <button
            onClick={handleAnterior}
            disabled={paginaActual === 1}
            className="px-6 py-3 bg-white/10 text-blue-400 border border-blue-400 rounded-full font-medium transition-all duration-300 hover:bg-blue-400 hover:text-white hover:shadow-lg hover:shadow-blue-400/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:border-white/20 disabled:text-white/60 disabled:hover:bg-transparent disabled:hover:shadow-none"
          >
            Anterior
          </button>

          <span className="text-white/80 text-lg font-semibold">
            Página {paginaActual} de {totalPaginas}
          </span>

          <button
            onClick={handleSiguiente}
            disabled={paginaActual === totalPaginas}
            className="px-6 py-3 bg-white/10 text-blue-400 border border-blue-400 rounded-full font-medium transition-all duration-300 hover:bg-blue-400 hover:text-white hover:shadow-lg hover:shadow-blue-400/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:border-white/20 disabled:text-white/60 disabled:hover:bg-transparent disabled:hover:shadow-none"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}