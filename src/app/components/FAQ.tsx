import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useInView } from './useInView';
import { ChevronDown } from 'lucide-react';

export function FAQ() {
  const [ref, isInView] = useInView();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Quanto tempo leva para instalar um sistema solar?',
      answer:
        'O tempo médio de instalação de um sistema solar fotovoltaico é de 2 a 5 dias, dependendo do tamanho e complexidade do projeto. Após a instalação, o processo de homologação junto à concessionária pode levar de 30 a 60 dias.',
    },
    {
      question: 'A Voltech emite ART dos projetos?',
      answer:
        'Sim! Todos os nossos projetos são acompanhados da respectiva ART (Anotação de Responsabilidade Técnica) emitida junto ao CREA, garantindo a conformidade técnica e legal de todas as instalações.',
    },
    {
      question: 'Vocês trabalham em quais regiões?',
      answer:
        'Atendemos toda a região metropolitana e cidades vizinhas. Para projetos em outras localidades, consulte nossa equipe para verificar disponibilidade. Entre em contato para saber mais!',
    },
    {
      question: 'É necessário fazer manutenção nos painéis solares?',
      answer:
        'A manutenção dos painéis solares é mínima. Recomendamos limpeza semestral (que pode ser feita com água da chuva naturalmente) e inspeção anual do sistema. Oferecemos planos de manutenção preventiva para garantir o máximo desempenho.',
    },
    {
      question: 'Empresa júnior tem a mesma qualidade que empresas tradicionais?',
      answer:
        'Sim! Como empresa júnior, somos formados por estudantes de engenharia elétrica supervisionados por professores experientes, o que garante qualidade técnica aliada a preços mais acessíveis. Todos os projetos seguem rigorosamente as normas técnicas vigentes.',
    },
  ];

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Perguntas <span className="text-[#C85A3C]">Frequentes</span>
          </h2>
          <div className="w-24 h-1 bg-[#C85A3C] mx-auto mb-6"></div>
          <p className="text-xl text-gray-600">
            Tire suas dúvidas sobre nossos serviços
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-8">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-6 h-6 text-[#C85A3C] flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center bg-[#FFF5F2] rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Ainda tem dúvidas?
          </h3>
          <p className="text-gray-600 mb-6">
            Nossa equipe está pronta para te atender e esclarecer todas as suas
            questões.
          </p>
          <button
 onClick={() => window.open('https://wa.me/558988168216?text=Ol%C3%A1!%20Gostaria%20de%20mais%20informa%C3%A7ões.', '_blank')}
            className="bg-[#C85A3C] text-white px-8 py-4 rounded-lg hover:bg-[#B84D30] transition-colors inline-flex items-center gap-2"
          >
            Fale Conosco
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
