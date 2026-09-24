import { motion } from 'motion/react';
import { useInView } from './useInView';
import {
  Sun,
  Lightbulb,
  Cpu,
  FileText,
  Zap,
  Settings,
  BarChart3,
  Shield,
} from 'lucide-react';

export function Services() {
  const [ref, isInView] = useInView();

  const services = [
    {
      icon: Sun,
      title: 'Energia Solar Fotovoltaica',
      description:
        'Projetos completos de sistemas solares on-grid e off-grid. Dimensionamento, instalação e homologação.',
      features: ['Economia de até 95%', 'ROI em 4-6 anos', 'Garantia de 25 anos'],
    },
    {
      icon: FileText,
      title: 'Projetos Elétricos',
      description:
        'Projetos elétricos residenciais, comerciais e industriais conforme NBR 5410 e normas técnicas.',
      features: ['ART inclusa', 'Plantas detalhadas', 'Memorial descritivo'],
    },
    {
      icon: BarChart3,
      title: 'Consultoria Energética',
      description:
        'Análise completa do seu consumo energético e identificação de oportunidades de economia.',
      features: ['Relatório detalhado', 'Plano de ação', 'Acompanhamento mensal'],
    },
    {
      icon: Zap,
      title: 'Laudos e Perícias',
      description:
        'Laudos técnicos, perícias e inspeções em instalações elétricas existentes.',
      features: ['NR-10 e SPDA', 'Laudo fotográfico', 'Conformidade técnica'],
    },
    {
      icon: Settings,
      title: 'Manutenção Preventiva',
      description:
        'Manutenção programada para garantir segurança e eficiência das suas instalações.',
      features: ['Termografia', 'Teste de isolação', 'Relatório técnico'],
    },
    {
      icon: Lightbulb,
      title: 'Eficiência Energética',
      description:
        'Implementação de medidas para reduzir o consumo e otimizar o uso de energia.',
      features: ['LED retrofit', 'Correção fator potência', 'Gestão de demanda'],
    },
    {
      icon: Shield,
      title: 'SPDA e Aterramento',
      description:
        'Projeto e instalação de sistemas de proteção contra descargas atmosféricas.',
      features: ['Conforme NBR 5419', 'Malha de aterramento', 'Laudo técnico'],
    },
    {
      icon: Lightbulb,
      title: 'Luminotécnico',
      description:
        'Planejamento estratégico da iluminação de um espaço',
      features: ['Funcionalidade', 'Conforto Visual', 'Ecocnomia de energia'],
    },
  ];

  return (
    <section id="servicos" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nossos <span className="text-[#C85A3C]">Serviços</span>
          </h2>
          <div className="w-24 h-1 bg-[#C85A3C] mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Soluções completas em engenharia elétrica para atender todas as suas
            necessidades
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-white border border-gray-200 rounded-xl p-8 hover:shadow-2xl hover:border-[#C85A3C] transition-all duration-300"
            >
              <div className="bg-[#FFF5F2] w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#C85A3C] transition-colors">
                <service.icon className="w-8 h-8 text-[#C85A3C] group-hover:text-white transition-colors" />
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-[#C85A3C] transition-colors">
                {service.title}
              </h3>

              <p className="text-gray-600 mb-4 leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <svg
                      className="w-5 h-5 text-[#C85A3C] flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => {
              window.open('https://wa.me/558988168216?text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento.', '_blank')
            
            }}
            className="bg-[#C85A3C] text-white px-8 py-4 rounded-lg hover:bg-[#B84D30] transition-colors inline-flex items-center gap-2"
          >
            Solicitar Orçamento Personalizado
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
