import { Heart, Map, Plane } from 'lucide-react';

export default function PremiumServices() {
  const services = [
    {
      icon: Heart,
      title: 'Voyages Religieux',
      description: 'Omra, pèlerinages et retraites spirituelles avec accompagnement professionnel',
    },
    {
      icon: Map,
      title: 'Circuits Touristiques',
      description: 'Maroc et destinations internationales avec guides expérimentés',
    },
    {
      icon: Plane,
      title: 'Billetterie Aérienne',
      description: 'Vols nationaux et internationaux aux meilleurs tarifs',
    },
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Nos Services Premium
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center">
                    <Icon size={32} className="text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {service.description}
                </p>
                <button className="btn-outline">
                  En Savoir Plus
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
