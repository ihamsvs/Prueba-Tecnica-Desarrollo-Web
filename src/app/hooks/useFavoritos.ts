'use client';

import { useState, useEffect } from 'react';

/**
 * Hook personalizado para manejar propiedades favoritas
 * 
 * Proporciona funcionalidad para gestionar propiedades marcadas como favoritas,
 * incluyendo agregar/eliminar de favoritos y verificar el estado actual.
 * Los favoritos se persisten en el localStorage del navegador.
 * 
 * @returns {Object} Objeto con:
 *   - favoritos: Array de IDs de propiedades favoritas
 *   - esFavorito: Función para verificar si una propiedad es favorita
 *   - agregarFavorito: Función para alternar el estado de favorito de una propiedad
 */
export function useFavoritos() {
  const [favoritos, setFavoritos] = useState<number[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Solo en el cliente
  useEffect(() => {
    setIsMounted(true);
    
    const guardados = localStorage.getItem('favoritos');
    if (guardados) {
      try {
        const parsed = JSON.parse(guardados);
        if (Array.isArray(parsed)) {
          console.log('Favoritos cargados de localStorage:', parsed);
          setFavoritos(parsed);
        }
      } catch (error) {
        console.error('Error al parsear favoritos:', error);
      }
    }
  }, []);

  // Efecto para guardar en localStorage
  useEffect(() => {
    if (isMounted) {
      console.log('Guardando favoritos en localStorage:', favoritos);
      localStorage.setItem('favoritos', JSON.stringify(favoritos));
    }
  }, [favoritos, isMounted]);

  const agregarFavorito = (id: number) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const esFavorito = (id: number) => favoritos.includes(id);

  return { favoritos, agregarFavorito, esFavorito };
}