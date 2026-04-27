export default function MoroccanDestinations() {
  const destinations = [
    {
      name: 'Tanger',
      description: 'La perle du détroit où l\'Atlantique rencontre la Méditerranée',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663591781073/ViXFFkRctWTJLPBgidN9PC/tanger-hero-73xRuh7JkjY6wqeXsHAKjv.webp',
    },
    {
      name: 'Casablanca',
      description: 'La métropole avec la majestueuse Mosquée Hassan II',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663591781073/ViXFFkRctWTJLPBgidN9PC/casablanca-city-JYR78Cm2j7t45RV6KHFTWT.webp',
    },
    {
      name: 'Rabat',
      description: 'La capitale royale avec ses palais et jardins',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663591781073/ViXFFkRctWTJLPBgidN9PC/rabat-capital-Sm3UnDvHLdrWX3vNdSzjSY.webp',
    },
    {
      name: 'Meknès',
      description: 'La ville impériale avec ses portes monumentales',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663591781073/ViXFFkRctWTJLPBgidN9PC/meknes-imperial-QkA5mBceUmtk4YMX6kXeUV.webp',
    },
  ];

  return (
    <section id="maroc" className="section-padding bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Destinations Marocaines
          </h2>
          <p className="text-muted-foreground text-lg">
            Découvrez les villes les plus fascinantes du Maroc
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {destinations.map((dest, index) => (
            <div key={index} className="card-destination group">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                  {dest.name}
                </h3>
              </div>
              <div className="p-4">
                <p className="text-sm text-muted-foreground mb-4">
                  {dest.description}
                </p>
                <button className="btn-outline w-full text-center justify-center">
                  Découvrir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
