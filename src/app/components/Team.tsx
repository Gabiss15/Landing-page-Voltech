import { useState } from 'react';
import { motion } from 'motion/react';
import { useInView } from './useInView';
import { Users, ArrowRight, X, Sparkles, Clock, Briefcase } from 'lucide-react';
import joanImg from '../../imports/image-10.png';
import manuelImg from '../../imports/image-11.png';
import vanilsonImg from '../../imports/image-12.png';
import teamProjetosImg from '../../imports/image-15.png';
import teamComercialImg from '../../imports/image-13.png';
import teamGestaoImg from '../../imports/imagemGG.jpeg';

// ─── Modal Processo Seletivo ────────────────────────────────────────────────
function RecruitmentModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-gray-100 relative"
      >
        <div className="bg-gradient-to-br from-[#C85A3C] to-[#8B3A25] p-6 text-white relative overflow-hidden">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 p-1.5 rounded-full transition-colors text-white"
          >
            <X size={18} />
          </button>

          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-3 text-white">
            <Briefcase size={24} />
          </div>

          <span className="inline-block bg-white/20 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-2">
            Voltech EJ · Carreiras
          </span>
          <h3 className="text-2xl font-bold leading-tight">Trabalhe Conosco</h3>
        </div>

        <div className="p-6 text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-[#C85A3C]/20 text-[#C85A3C] px-3 py-1.5 rounded-full text-xs font-semibold">
            <Clock size={14} />
            Processo Seletivo
          </div>

          <h4 className="text-lg font-bold text-gray-900 leading-snug">
            Ainda não estamos com processo seletivo aberto, mas logo logo teremos um!
          </h4>

          <p className="text-gray-600 text-sm leading-relaxed">
            Estamos alinhando os últimos detalhes para a chegada dos novos talentos. Acompanhe nossas redes sociais para saber em primeira mão assim que as inscrições abrirem.
          </p>

          <div className="pt-2 space-y-2">
            <a
              href="https://www.instagram.com/pordentrodavoltech"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#C85A3C] hover:bg-[#b04d33] text-white py-3 px-4 rounded-xl font-medium text-sm transition-all shadow-md shadow-[#C85A3C]/20"
            >
              <Sparkles size={16} />
              Acompanhar no Instagram
              <ArrowRight size={16} />
            </a>

            <button
              onClick={onClose}
              className="w-full py-2.5 text-gray-500 hover:text-gray-800 text-sm font-medium transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Dados de Diretoria e Setores ────────────────────────────────────────────
const directors = [
  { name: 'Joan Bezerra', role: 'Diretor de Projetos', img: joanImg, posX: '60%', posY: '5%' },
  { name: 'Manuel Felipe', role: 'Diretor Comercial', img: manuelImg, posX: '55%', posY: '5%' },
  { name: 'José Vanilson', role: 'Diretor de Gente e Gestão', img: vanilsonImg, posX: '58%', posY: '5%' },
];

const teams = [
  {
    sector: 'Setor de Projetos',
    img: teamProjetosImg,
    description: 'Responsável pelo desenvolvimento técnico, dimensionamento e entrega de projetos elétricos.',
  },
  {
    sector: 'Setor Comercial',
    img: teamComercialImg,
    description: 'Responsável pela prospecção de clientes, elaboração de propostas e relacionamento comercial.',
  },
  {
    sector: 'Gente e Gestão',
    img: teamGestaoImg,
    description: 'Responsável pela gestão de pessoas, cultura organizacional e processos internos da empresa.',
  },
];

// ─── Componente Principal ─────────────────────────────────────────────────────
export function Team() {
  const [ref, isInView] = useInView();
  const [isRecruitmentOpen, setIsRecruitmentOpen] = useState(false);

  return (
    <section id="equipe" className="py-24 bg-gray-50">
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
            Nossa <span className="text-[#C85A3C]">Equipe</span>
          </h2>
          <div className="w-24 h-1 bg-[#C85A3C] mx-auto mb-6" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Por trás de cada projeto existe um time apaixonado por engenharia, inovação e impacto.
          </p>
        </motion.div>

        {/* Diretoria */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-5"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-6 bg-[#C85A3C] rounded-full" />
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest">Diretoria</h3>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-7 mb-16">
          {directors.map((director, index) => (
            <motion.div
              key={director.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + index * 0.12 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={director.img}
                  alt={director.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{
                    objectPosition: `${director.posX} ${director.posY}`,
                    filter: 'brightness(1.06) contrast(1.08) saturate(1.12)',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="inline-block bg-[#C85A3C] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                    {director.role}
                  </span>
                </div>
              </div>

              <div className="px-6 py-5">
                <h3 className="text-xl font-bold text-gray-900 mb-0.5">{director.name}</h3>
                <p className="text-[#C85A3C] text-sm font-semibold">{director.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Setores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-5"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-6 bg-[#C85A3C] rounded-full" />
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest">Nossos Setores</h3>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-7 mb-16">
          {teams.map((team, index) => (
            <motion.div
              key={team.sector}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.55 + index * 0.12 }}
              className="group bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={team.img}
                  alt={team.sector}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{
                    objectPosition: '50% 50%',
                    filter: 'brightness(1.05) contrast(1.05) saturate(1.08)',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent" />
              </div>

              <div className="px-6 py-5">
                <span className="inline-block bg-[#C85A3C]/20 text-[#FF8C5A] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 border border-[#C85A3C]/30">
                  {team.sector}
                </span>
                <p className="text-gray-300 text-sm leading-relaxed">{team.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Quer Fazer Parte da Nossa Equipe?
          </h3>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Estamos sempre em busca de estudantes talentosos e apaixonados por
            engenharia elétrica para se juntar ao nosso time.
          </p>

          <button
            onClick={() => setIsRecruitmentOpen(true)}
            className="inline-flex items-center gap-2 bg-[#C85A3C] hover:bg-[#b04d33] text-white font-semibold px-8 py-3 rounded-xl transition-all shadow-lg shadow-[#C85A3C]/20"
          >
            Trabalhe Conosco
            <ArrowRight size={18} />
          </button>
        </motion.div>

      </div>

      {/* Renderização da Modal */}
      <RecruitmentModal
        isOpen={isRecruitmentOpen}
        onClose={() => setIsRecruitmentOpen(false)}
      />
    </section>
  );
}