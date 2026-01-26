import Image from 'next/image'
import Link from 'next/link'

interface BiensCardProps {
  titre: string
  description: string
  prix: number
  ville: string
  surface: number
  pieces: number
  image: string
  id: string
}

export default function BiensCard({
  titre,
  description,
  prix,
  ville,
  surface,
  pieces,
  image,
  id
}: BiensCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
      <Image
        src={image || '/images/placeholder.jpg'}
        alt={titre}
        width={400}
        height={250}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-1">{titre}</h2>
        <p className="text-gray-600 text-sm mb-2">{description}</p>
        <p className="font-bold text-gray-800 mb-1">{prix.toLocaleString()} FCFA</p>
        <p className="text-sm text-gray-600">{surface} m² • {pieces} pièces</p>
        <p className="text-sm text-gray-600 mb-2">{ville}</p>
        <Link
          href={`/biens/${id}`}
          className="inline-block px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Voir détails
        </Link>
      </div>
    </div>
  )
}
