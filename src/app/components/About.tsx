import { motion } from 'motion/react';
import { useInView } from './useInView';
import { Target, Users, TrendingUp, Heart } from 'lucide-react';

export function About() {
  const [ref, isInView] = useInView();

  return (
    <section id="sobre" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Sobre a <span className="text-[#C85A3C]">Voltech</span>
          </h2>
          <div className="w-24 h-1 bg-[#C85A3C] mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Somos uma empresa júnior formada por estudantes de Engenharia
            Elétrica, comprometidos em trazer inovação e tecnologia para o setor
            energético.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80"
              alt="Equipe trabalhando"
              className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Quem Somos
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              A Voltech nasceu da união entre conhecimento acadêmico e prática de
              mercado. Nossa equipe é formada por estudantes talentosos,
              supervisionados por professores experientes, oferecendo soluções
              elétricas de alta qualidade a preços competitivos.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Especializados em projetos elétricos, energia solar fotovoltaica,
              automação e consultoria energética, já ajudamos dezenas de clientes
              a economizar energia e investir em sustentabilidade.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#C85A3C]">
                <p className="text-4xl font-bold text-[#C85A3C] mb-2">100+</p>
                <p className="text-gray-600">Projetos Realizados</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#C85A3C]">
                <p className="text-4xl font-bold text-[#C85A3C] mb-2">98%</p>
                <p className="text-gray-600">Satisfação</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Target,
              title: 'Nossa Missão',
              desc: 'Democratizar o acesso a soluções elétricas de qualidade',
            },
            {
              icon: Users,
              title: 'Nossa Equipe',
              desc: 'Estudantes apaixonados por tecnologia e inovação',
            },
            {
              icon: TrendingUp,
              title: 'Nossa Visão',
              desc: 'Ser referência em projetos elétricos sustentáveis',
            },
            {
              icon: Heart,
              title: 'Nossos Valores',
              desc: 'Ética, qualidade, inovação e responsabilidade',
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow border-t-4 border-[#C85A3C]"
            >
              <item.icon className="w-12 h-12 text-[#C85A3C] mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 mb-3">
                {item.title}
              </h4>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
