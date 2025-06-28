/**
 * Utilidad para generar recomendaciones de propiedades
 * 
 * Proporciona funciones para obtener propiedades recomendadas basadas en similitudes
 * con una propiedad de referencia, considerando ubicación, tipo y rango de precios.
 */

import {Propiedad} from "../types/propiedad";

/**
 * Obtiene propiedades recomendadas basadas en una propiedad de referencia
 * 
 * @param propiedad - Propiedad de referencia para generar recomendaciones
 * @param propiedades - Lista completa de propiedades disponibles
 * @returns Array de propiedades recomendadas (máximo 2)
 */
export function obtenerRecomendaciones(propiedad : Propiedad, propiedades:Propiedad[]) : Propiedad[]{
    const rango = propiedad.precio * 0.2;

    return propiedades.filter((p) =>
        p.id !== propiedad.id &&
        p.ciudad === propiedad.ciudad &&
        p.tipo === propiedad.tipo &&
        p.precio >= propiedad.precio - rango &&
        p.precio <= propiedad.precio + rango
      ).slice(0,2);
}