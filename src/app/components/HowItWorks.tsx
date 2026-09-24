import { motion } from 'motion/react';
import { useInView } from './useInView';
import { MessageSquare, FileSearch, Hammer, CheckCircle } from 'lucide-react';

export function HowItWorks() {
  const [ref, isInView] = useInView();

  const steps = [
    {
      icon: MessageSquare,
      number: '01',
      title: 'Contato Inicial',
      description:
        'Entre em contato conosco pelo formulário, WhatsApp ou e-mail. Conte-nos sobre seu projeto.',
    },
    {
      icon: FileSearch,
      number: '02',
      title: 'Análise Técnica',
      description:
        'Nossa equipe realiza uma visita técnica para avaliar o local e elaborar o projeto ideal.',
    },
    {
      icon: Hammer,
      number: '03',
      title: 'Execução',
      description:
        'Executamos o projeto com qualidade, seguindo todas as normas técnicas e prazos acordados.',
    },
    {
      icon: CheckCircle,
      number: '04',
      title: 'Entrega e Suporte',
      description:
        'Entregamos o projeto completo com toda documentação e garantia de suporte contínuo.',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgPGcgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjAyIj4KICAgICAgPHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAgNGgtMnYyaDJ2LTJ6bS0yLTRoLTJ2Mmgydi0yem0tMiAydi0ySDMwdjJoMnptLTItMnYtMmgtMnYyaDJ6bS0yIDBoLTJ2Mmgydi0yem0yLTJoMnYtMmgtMnYyem0wLTJ2LTJoLTJ2Mmgyem0yLTJoMnYtMmgtMnYyeiIvPgogICAgPC9nPgogIDwvZz4KPC9zdmc+')] opacity-50"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Como <span className="text-[#FF8C5A]">Funciona</span>
          </h2>
          <div className="w-24 h-1 bg-[#C85A3C] mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Um processo simples e transparente do primeiro contato até a entrega
            final
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative"
            >
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-[#C85A3C] to-transparent -ml-4"></div>
              )}

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all group">
                <div className="relative mb-6">
                  <div className="absolute -top-4 -left-4 text-6xl font-bold text-[#C85A3C]/20">
                    {step.number}
                  </div>
                  <div className="relative bg-[#C85A3C] w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-white mb-3">
                  {step.title}
                </h3>

                <p className="text-gray-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-gray-300 mb-6">
            Pronto para começar seu projeto?
          </p>
          <button
            onClick={() => {
              window.open('https://wa.me/558988168216?text=Ol%C3%A1!%20Gostaria%20de%20iniciar%20meu%20projeto.', '_blank')

            }}
            className="bg-[#C85A3C] text-white px-8 py-4 rounded-lg hover:bg-[#B84D30] transition-colors inline-flex items-center gap-2"
          >
            Iniciar Meu Projeto
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
