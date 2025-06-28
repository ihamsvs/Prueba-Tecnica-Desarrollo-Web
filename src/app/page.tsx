

import { Propiedad } from './types/propiedad';
import ListaPropiedades from '@/app/components/ListaPropiedades';


export default async function HomePage(){
  
  const res = await fetch('http://localhost:3000/data/properties_mock_100_clean.json')
  const propiedades: Propiedad[] = await res.json();
  return(
    <main>
      <h1 className='text-3xl font-bold text-center my-6'>Propiedades disponibles</h1>
      <ListaPropiedades propiedades={propiedades}/>
    </main>
  )
}