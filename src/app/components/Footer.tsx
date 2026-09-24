import { useState } from 'react';
import { motion } from 'motion/react';
import { useInView } from './useInView';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Send,
  X,
  Sparkles,
  ArrowRight,
  Briefcase,
} from 'lucide-react';
import logo from '../../imports/logo2020a.png';
import { LegalModal, LegalType } from './LegalPrivacy';

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
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-gray-100 relative text-gray-900"
      >
        <div className="bg-gradient-to-br from-[#C85A3C] to-[#8B3A25] p-6 text-white relative overflow-hidden text-left">
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

// ─── Componente Principal ─────────────────────────────────────────────────────
export function Footer() {
  const [ref, isInView] = useInView();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  function WhatsappIcon2({ size = 20 }: { size?: number }) {
    return (
      <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    );
  }

  const [submitted, setSubmitted] = useState(false);
  const [legalModalType, setLegalModalType] = useState<LegalType>(null);
  const [isRecruitmentOpen, setIsRecruitmentOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "03a7b667-2d6d-49c9-992c-418635cf73e4",
          subject: "Novo Contato pelo Site",
          from_name: "Formulário Voltech", 
          replyto: formData.email,       
          nome: formData.name,
          email: formData.email,
          telefone: formData.phone,
          mensagem: formData.message,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        alert("Ocorreu um erro ao enviar. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro no envio:", error);
    }
  };

  return (
    <footer id="contato" className="bg-gray-900 text-white pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Entre em <span className="text-[#FF8C5A]">Contato</span>
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              Preencha o formulário e nossa equipe entrará em contato em até 24
              horas para discutir seu projeto.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Seu nome completo"
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#C85A3C] focus:border-transparent outline-none transition-all text-white placeholder-gray-500"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Seu e-mail"
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#C85A3C] focus:border-transparent outline-none transition-all text-white placeholder-gray-500"
                />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="Seu telefone"
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#C85A3C] focus:border-transparent outline-none transition-all text-white placeholder-gray-500"
                />
              </div>

              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Conte-nos sobre seu projeto..."
                rows={5}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#C85A3C] focus:border-transparent outline-none transition-all text-white placeholder-gray-500 resize-none"
              ></textarea>

              <button
                type="submit"
                disabled={submitted}
                className={`w-full py-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                  submitted
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-[#C85A3C] hover:bg-[#B84D30]'
                }`}
              >
                {submitted ? (
                  <>
                    Mensagem Enviada!
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </>
                ) : (
                  <>
                    Enviar Mensagem
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <img src={logo} alt="Voltech" className="h-16 mb-6" />
              <p className="text-gray-400 leading-relaxed">
                Empresa Júnior de Engenharia Elétrica comprometida em oferecer
                soluções inovadoras e sustentáveis para o setor energético.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-[#C85A3C] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Endereço</h4>
                  <p className="text-gray-400">
                    Campus Sede UFCG Bloco CG
                    Rua Aprígio Veloso, 882 - Universitário 
                    <br />
                    CEP 58428-830 - Campina Grande, PB
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-[#C85A3C] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Telefone</h4>
                  <p className="text-gray-400">
                    (89) 8816-8216
                    <br />
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-[#C85A3C] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">E-mail</h4>
                  <p className="text-gray-400">voltech@ee.ufcg.edu.br</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Redes Sociais</h4>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, href: 'https://www.facebook.com/VoltechEJ/?locale=pt_BR' },
                  { icon: Instagram, href: 'https://www.instagram.com/voltechej?igsi=MWVydDA1OXlrbnoweg==' },
                  { icon: Linkedin, href: 'https://br.linkedin.com/company/voltechej' },
                  {
                    icon: WhatsappIcon2, 
                    href: 'https://wa.me/558988168216?text=Ol%C3%A1!%20Quero%20come%C3%A7ar%20meu%20projeto'
                  }
                ].map(({ icon: Icon, href }, index) => (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-white hover:text-orange-500 transition-colors"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div> 
            </div>
          </motion.div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4 text-[#FF8C5A]">
                Serviços
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#servicos" className="hover:text-white transition-colors">
                    Energia Solar
                  </a>
                </li>
                <li>
                  <a href="#servicos" className="hover:text-white transition-colors">
                    Projetos Elétricos
                  </a>
                </li>
                <li>
                  <a href="#servicos" className="hover:text-white transition-colors">
                    Consultoria
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-[#FF8C5A]">
                Institucional
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#sobre" className="hover:text-white transition-colors">
                    Sobre Nós
                  </a>
                </li>
                <li>
                  <a href="#equipe" className="hover:text-white transition-colors">
                    Nossa Equipe
                  </a>
                </li>
                <li>
                  <a href="#portfolio" className="hover:text-white transition-colors">
                    Portfólio
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => setIsRecruitmentOpen(true)}
                    className="hover:text-white transition-colors text-left"
                  >
                    Trabalhe Conosco
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-[#FF8C5A]">Suporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#faq" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#contato" className="hover:text-white transition-colors">
                    Contato
                  </a>
                </li>
                <li>
                  <button 
                    onClick={() => setLegalModalType('privacy')} 
                    className="hover:text-white transition-colors text-left"
                  >
                    Política de Privacidade
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setLegalModalType('terms')} 
                    className="hover:text-white transition-colors text-left"
                  >
                    Termos de Uso
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center text-gray-500 pt-8 border-t border-gray-800">
            <p>
              © {new Date().getFullYear()} Voltech - Consultoria e Projetos
              Elétricos. Todos os direitos reservados.
            </p>
            <p className="mt-2 text-sm">
              Desenvolvido com tecnologia e inovação por estudantes de Engenharia
              Elétrica
            </p>
          </div>
        </div>
      </div>

      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

      <RecruitmentModal
        isOpen={isRecruitmentOpen}
        onClose={() => setIsRecruitmentOpen(false)}
      />
    </footer>
  );
}