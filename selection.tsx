import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Clock, Briefcase, ArrowRight } from 'lucide-react';

interface RecruitmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RecruitmentModal({ isOpen, onClose }: RecruitmentModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
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
          {/* Header Decorativo */}
          <div className="bg-gradient-to-br from-[#C85A3C] to-[#8B3A25] p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2" />
            
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

          {/* Conteúdo da Modal */}
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

            {/* Ações / Botões */}
            <div className="pt-2 space-y-2">
              <a
                href="https://www.instagram.com/voltechej"
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
      </motion.div>
    </AnimatePresence>
  );
}