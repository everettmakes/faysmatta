import RequestForm from '../components/RequestForm';

const mat = {
  name: 'Red Swedish Wool Mat',
  image: '/mat.jpg',
  price: '499 SEK',
};

export default function HomePage() {
  return (
    <main className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-4">{mat.name}</h1>
      <img src={mat.image} alt={mat.name} className="mb-4 rounded" />
      <p className="text-lg mb-6">Price: {mat.price}</p>
      <RequestForm product={mat} />
    </main>
  );
}