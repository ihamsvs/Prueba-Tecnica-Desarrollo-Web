/**
 * Página de propiedades favoritas
 * 
 * Muestra una lista de propiedades que el usuario ha marcado como favoritas.
 * Las propiedades se cargan desde el almacenamiento local del navegador.
 * 
 * @route GET /favoritos
 */
'use client';

import { Propiedad } from "../types/propiedad";
import PropiedadCard from "../components/PropiedadCard";
import { useFavoritos } from "../hooks/useFavoritos";
import { useState, useEffect, useMemo } from "react";

export default function FavoritosPage() {
  const { favoritos, esFavorito, agregarFavorito } = useFavoritos();
  const [propiedades, setPropiedades] = useState<Propiedad[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerPropiedades = async () => {
      const res = await fetch("http://localhost:3000/data/properties_mock_100_clean.json");
      const data: Propiedad[] = await res.json();
      setPropiedades(data);
      setLoading(false);
    };
    obtenerPropiedades();
  }, []);

  // 
  const favoritas = useMemo(() => {
    return propiedades.filter((p) => favoritos.includes(p.id));
  }, [favoritos, propiedades]);

  if (loading) return <p className="p-6 text-center">Cargando favoritos...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tus propiedades favoritas</h1>

      {favoritas.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favoritas.map((p) => (
            <PropiedadCard
              key={p.id}
              propiedad={p}
              esFavorito={esFavorito(p.id)}
              onToggleFavorito={() => agregarFavorito(p.id)}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">Aún no has marcado propiedades como favoritas.</p>
      )}
    </div>
  );
}