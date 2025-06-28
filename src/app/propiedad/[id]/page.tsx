/**
 * Página de detalle de propiedad
 * 
 * Muestra la información detallada de una propiedad específica y una sección
 * de propiedades recomendadas basadas en características similares.
 * 
 * @route GET /propiedad/[id]
 */


import { Propiedad } from "../../types/propiedad";
import { obtenerRecomendaciones } from "../../lib/recomendaciones";
import PropiedadCard from "../../components/PropiedadCard";

export default async function PropiedadPage({
  params,
}: {
  params: { id: string };
}) {
  const res = await fetch("http://localhost:3000/data/properties_mock_100_clean.json");
  if (!res.ok) {
    throw new Error("Error al cargar los datos de propiedades");
  }

  const propiedades: Propiedad[] = await res.json();
  const propiedadId = parseInt(params.id);
  const propiedad = propiedades.find((p) => p.id === propiedadId);

  if (!propiedad) {
    return (
      <div className="p-6 text-center text-red-600 font-bold">
        Propiedad no encontrada
      </div>
    );
  }

  const recomendaciones = obtenerRecomendaciones(propiedad, propiedades);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{propiedad.titulo}</h1>
      <img
        src={propiedad.imagen}
        alt={propiedad.titulo}
        className="w-full h-64 object-cover rounded-xl mb-4"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <p>
          <strong>Ciudad:</strong> {propiedad.ciudad}
        </p>
        <p>
          <strong>Tipo:</strong> {propiedad.tipo}
        </p>
        <p>
          <strong>Ambientes:</strong> {propiedad.ambientes}
        </p>
        <p>
          <strong>Metros cuadrados:</strong> {propiedad.metros_cuadrados} m²
        </p>
        <p className="text-green-700 font-bold text-lg col-span-2">
          Precio: ${propiedad.precio.toLocaleString()}
        </p>
      </div>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-4">Propiedades similares</h2>
      {recomendaciones.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {recomendaciones.map((p) => (
            <PropiedadCard
              key={p.id}
              propiedad={p}
              esFavorito={false}
            />
          ))}
        </div>
      ) : (
        <p>No se encontraron propiedades similares.</p>
      )}
    </div>
  );
}