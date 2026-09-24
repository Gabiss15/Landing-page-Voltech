import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, FileText } from 'lucide-react';

export type LegalType = 'privacy' | 'terms' | null;

interface LegalModalProps {
  type: LegalType;
  onClose: () => void;
}

export function LegalModal({ type, onClose }: LegalModalProps) {
  if (!type) return null;

  const isPrivacy = type === 'privacy';

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="bg-white w-full max-w-2xl max-h-[85vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-100"
        >
          {/* Header */}
          <div className="bg-gray-900 p-6 text-white flex items-center justify-between border-b border-gray-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#C85A3C]/20 text-[#C85A3C]">
                {isPrivacy ? <ShieldCheck size={22} /> : <FileText size={22} />}
              </div>
              <div>
                <h3 className="text-xl font-bold">
                  {isPrivacy ? 'Política de Privacidade' : 'Termos de Uso'}
                </h3>
                <p className="text-xs text-gray-400">Voltech Engenharia Júnior</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body Scrollável */}
          <div className="p-6 overflow-y-auto space-y-4 text-gray-600 text-sm leading-relaxed">
            {isPrivacy ? (
              <>
                <p>
                  A <strong>Voltech Engenharia Júnior</strong> está comprometida em proteger a privacidade e os dados pessoais de nossos clientes e visitantes, em conformidade com a Lei Geral de Proteção de Dados (LGPD).
                </p>

                <h4 className="font-bold text-gray-900 text-base">1. Coleta de Dados</h4>
                <p>
                  Coletamos informações fornecidas voluntariamente por você ao solicitar orçamentos ou entrar em contato via WhatsApp/formulário, como nome, e-mail, telefone e informações do projeto.
                </p>

                <h4 className="font-bold text-gray-900 text-base">2. Uso das Informações</h4>
                <p>
                  Os dados fornecidos são utilizados exclusivamente para elaboração de propostas comerciais, atendimento ao cliente e melhoria da experiência em nossos serviços. Não compartilhamos nem vendemos dados a terceiros.
                </p>

                <h4 className="font-bold text-gray-900 text-base">3. Segurança e Direitos</h4>
                <p>
                  Adotamos medidas técnicas adequadas para proteger seus dados. Você pode solicitar a alteração ou exclusão de suas informações a qualquer momento entrando em contato diretamente com nossa equipe.
                </p>
              </>
            ) : (
              <>
                <p>
                  Bem-vindo ao site da <strong>Voltech Engenharia Júnior</strong>. Ao utilizar nossos serviços ou navegar em nossa plataforma, você concorda com as condições abaixo:
                </p>

                <h4 className="font-bold text-gray-900 text-base">1. Propriedade Intelectual</h4>
                <p>
                  Todo o conteúdo deste site (textos, logotipos, imagens, marcas e projetos apresentados) é de propriedade exclusiva da Voltech EJ, protegido por leis de direitos autorais.
                </p>

                <h4 className="font-bold text-gray-900 text-base">2. Solicitação de Orçamentos</h4>
                <p>
                  As propostas comerciais geradas via atendimento são personalizadas para cada projeto e possuem validade informada na entrega do documento. O envio de dados pelo formulário não gera vínculo contratual automático.
                </p>

                <h4 className="font-bold text-gray-900 text-base">3. Modificações dos Termos</h4>
                <p>
                  A Voltech EJ se reserva o direito de alterar estes termos e condições a qualquer momento, visando a melhoria contínua dos processos.
                </p>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
            <button
              onClick={onClose}
              className="bg-[#C85A3C] hover:bg-[#b04d33] text-white px-5 py-2 rounded-xl text-sm font-medium transition-colors"
            >
              Entendido
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}