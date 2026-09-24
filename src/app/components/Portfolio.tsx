import { motion } from 'motion/react';
import { useInView } from './useInView';
import { Sun, Lightbulb, Zap, BarChart3, Store, MapPin, Calendar, ChevronRight } from 'lucide-react';
import featuredImg from '../../imports/image-1.png';
import supermarketImg from '../../imports/image-2.png';
import mogeiroImg from '../../imports/image-3.png';

const projects = [
  {
    icon: Sun,
    category: 'Energia Solar',
    tag: 'Solar',
    title: 'Instalação de Painéis Fotovoltaicos',
    description: 'Projeto e instalação de sistema fotovoltaico em edificação urbana com monitoramento remoto de geração.',
    image: 'https://images.unsplash.com/photo-1726795867801-63c0a37b80c6?w=800&q=80',
  },
  {
    icon: Lightbulb,
    category: 'Luminotécnica',
    tag: 'Iluminação',
    title: 'Projeto Luminotécnico — Mogeiro',
    description: 'Planejamento e dimensionamento do sistema de iluminação pública para a cidade de Mogeiro – PB.',
    image: mogeiroImg,
  },
  {
    icon: Zap,
    category: 'Elétrica',
    tag: 'Reforma',
    title: 'Reforma de Instalação Elétrica',
    description: 'Modernização e adequação de quadros de distribuição, cabeamento e proteções em instalação industrial.',
    image: 'https://images.unsplash.com/photo-1770838773181-e1b17ec22fee?w=800&q=80',
  },
  {
    icon: BarChart3,
    category: 'Gestão de Risco',
    tag: 'Gestão',
    title: 'Gerenciamento de Risco Energético',
    description: 'Monitoramento contínuo e análise de dados para otimização do consumo e identificação de riscos elétricos.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  },
];

const featuredStats = [
  { value: '189', label: 'Placas instaladas' },
  { value: '405 W', label: 'Potência/placa' },
  { value: '60 kW', label: 'Inversor WEG' },
  { value: '76,5 kWp', label: 'Potência total' },
];

export function Portfolio() {
  const [ref, isInView] = useInView();

  return (
    <section id="portfolio" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nosso <span className="text-[#C85A3C]">Portfólio</span>
          </h2>
          <div className="w-24 h-1 bg-[#C85A3C] mx-auto mb-6" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Atuamos em diferentes segmentos desenvolvendo soluções elétricas eficientes, seguras e sustentáveis
          </p>
        </motion.div>

        {/* Featured Project */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative rounded-2xl overflow-hidden mb-10 shadow-2xl"
        >
          <div className="relative h-[400px] md:h-[340px]">
            <img
              src={featuredImg}
              alt="Projeto em destaque — Sistema Solar 76,5 kWp em Nazária-PI"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/88 via-black/65 to-black/20" />

            <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-14">
              <span className="inline-block bg-[#C85A3C] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 w-fit">
                Projeto em Destaque
              </span>
              <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 max-w-lg leading-tight">
                Sistema de Energia Solar 76,5 kWp
              </h3>

              <div className="flex flex-wrap gap-x-7 gap-y-2 mb-6">
                <div className="flex items-center gap-2 text-gray-300 text-sm">
                  <MapPin size={14} className="text-[#FF8C5A] shrink-0" />
                  Nazária — PI
                </div>
                <div className="flex items-center gap-2 text-gray-300 text-sm">
                  <Calendar size={14} className="text-[#FF8C5A] shrink-0" />
                  Entregue em 08/09/2020
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg">
                {featuredStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white/10 backdrop-blur-sm rounded-xl px-3 py-2.5 border border-white/20"
                  >
                    <p className="text-[#FF8C5A] font-bold text-lg leading-none mb-1">{stat.value}</p>
                    <p className="text-gray-400 text-xs leading-tight">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Projects Grid — 4 real projects */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
            >
              <div className="relative h-44 overflow-hidden shrink-0">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute top-3 left-3 bg-white/95 text-[#C85A3C] text-xs font-semibold px-2.5 py-1 rounded-full">
                  {project.tag}
                </span>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <project.icon size={15} className="text-[#C85A3C] shrink-0" />
                  <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                    {project.category}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-2 group-hover:text-[#C85A3C] transition-colors leading-snug">
                  {project.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>


        <div className="text-center">
          <p className="text-gray-600 mb-4">Quer ver seu projeto aqui também?</p>
          <button
            onClick={() => {
             window.open('https://wa.me/558988168216?text=Ol%C3%A1!%20Gostaria%20de%20iniciar%20meu%20projeto.', '_blank')
            }}
            className="bg-[#C85A3C] text-white px-8 py-4 rounded-lg hover:bg-[#B84D30] transition-colors inline-flex items-center gap-2"
          >
            Começar Meu Projeto
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
