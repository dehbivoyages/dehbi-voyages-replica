export default function Stats() {
  const stats = [
    { number: '2000+', label: 'Clients Satisfaits' },
    { number: '50+', label: 'Destinations' },
    { number: '10+', label: 'Années d\'Expérience' },
    { number: '24/7', label: 'Support Client' },
  ];

  return (
    <section className="bg-gradient-to-r from-blue-700 to-blue-600 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center text-white">
              <div className="text-3xl md:text-4xl font-bold mb-2">
                {stat.number}
              </div>
              <div className="text-sm md:text-base text-blue-100">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
