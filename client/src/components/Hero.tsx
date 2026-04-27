export default function Hero() {
  return (
    <section className="relative h-96 md:h-[500px] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663591781073/ViXFFkRctWTJLPBgidN9PC/tanger-hero-73xRuh7JkjY6wqeXsHAKjv.webp)',
        }}
      />

      {/* Overlay */}
      <div className="hero-overlay" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center items-start container mx-auto px-4">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#FF6B35' }}>
            اختر وجهتك .. وعلينا ايصالك
          </h1>
          <p className="text-lg text-gray-100 mb-8">
            Voyages religieux, circuits marocains et destinations internationales. Depuis 2015, nous réalisons vos rêves de voyage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="btn-primary bg-white text-primary hover:bg-gray-100">
              Réserver Maintenant
            </button>
            <button className="btn-outline border-white text-white hover:bg-white hover:text-primary">
              En Savoir Plus
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
