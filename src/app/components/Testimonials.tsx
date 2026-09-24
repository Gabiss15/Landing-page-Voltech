import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useInView } from './useInView';
import { 
  BookOpen, Clock, X, ChevronRight, Zap, Sun, AlertTriangle, 
  CheckCircle, ArrowRight, ShieldCheck, Activity, ShieldAlert, Cpu 
} from 'lucide-react';

// ─── SVG Diagrams: Solar System ──────────────────────────────────────────────

function SystemDiagram() {
  return (
    <svg viewBox="0 0 560 120" className="w-full" aria-label="Diagrama do sistema fotovoltaico">
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${i * 56}, 20)`}>
          <rect x="4" y="0" width="48" height="32" rx="3" fill="#FFF5F2" stroke="#C85A3C" strokeWidth="1.5" />
          <line x1="4" y1="10" x2="52" y2="10" stroke="#C85A3C" strokeWidth="0.8" />
          <line x1="4" y1="21" x2="52" y2="21" stroke="#C85A3C" strokeWidth="0.8" />
          <line x1="20" y1="0" x2="20" y2="32" stroke="#C85A3C" strokeWidth="0.8" />
          <line x1="36" y1="0" x2="36" y2="32" stroke="#C85A3C" strokeWidth="0.8" />
        </g>
      ))}
      <text x="84" y="72" textAnchor="middle" fontSize="10" fill="#666" fontFamily="sans-serif">Módulos (CC)</text>

      <line x1="172" y1="36" x2="210" y2="36" stroke="#C85A3C" strokeWidth="2" markerEnd="url(#arr)" />
      <text x="191" y="26" textAnchor="middle" fontSize="9" fill="#C85A3C" fontFamily="sans-serif">DC</text>

      <rect x="210" y="12" width="80" height="48" rx="6" fill="#C85A3C" />
      <text x="250" y="33" textAnchor="middle" fontSize="9" fill="white" fontFamily="sans-serif" fontWeight="bold">INVERSOR</text>
      <text x="250" y="47" textAnchor="middle" fontSize="8" fill="white" fontFamily="sans-serif">DC → AC</text>
      <text x="250" y="78" textAnchor="middle" fontSize="10" fill="#666" fontFamily="sans-serif">"Coração" do sistema</text>

      <line x1="290" y1="36" x2="328" y2="36" stroke="#C85A3C" strokeWidth="2" markerEnd="url(#arr)" />
      <text x="309" y="26" textAnchor="middle" fontSize="9" fill="#C85A3C" fontFamily="sans-serif">AC</text>

      <polygon points="354,14 396,14 396,60 354,60" fill="#FFF5F2" stroke="#C85A3C" strokeWidth="1.5" rx="4" />
      <polygon points="365,14 385,0 405,14" fill="none" stroke="#C85A3C" strokeWidth="1.5" />
      <rect x="367" y="38" width="16" height="22" fill="#C85A3C" opacity="0.3" rx="2" />
      <rect x="388" y="38" width="4" height="8" fill="#C85A3C" opacity="0.5" rx="1" />
      <text x="375" y="80" textAnchor="middle" fontSize="10" fill="#666" fontFamily="sans-serif">Rede / Consumo</text>

      <defs>
        <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#C85A3C" />
        </marker>
      </defs>
    </svg>
  );
}

function StringDiagram({ modules, label, totalV, voc, isError }: {
  modules: number; label: string; totalV: string; voc: string; isError?: boolean;
}) {
  const color = isError ? '#ef4444' : '#22c55e';
  return (
    <div className={`rounded-xl border-2 p-4 ${isError ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}`}>
      <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">{label}</p>
      <div className="flex items-center gap-1 flex-wrap mb-3">
        {Array.from({ length: modules }).map((_, i) => (
          <div key={i} className="flex items-center">
            <div className="w-8 h-5 rounded text-white text-[8px] flex items-center justify-center font-bold"
              style={{ backgroundColor: '#C85A3C' }}>
              {voc}V
            </div>
            {i < modules - 1 && <div className="w-2 h-0.5" style={{ backgroundColor: color }} />}
          </div>
        ))}
        <ArrowRight size={12} style={{ color }} className="ml-1" />
        <span className="text-xs font-bold ml-1" style={{ color }}>Σ = {totalV}V</span>
      </div>
      <div className={`flex items-center gap-1.5 text-xs font-semibold ${isError ? 'text-red-600' : 'text-green-600'}`}>
        {isError ? <AlertTriangle size={13} /> : <CheckCircle size={13} />}
        {isError ? `${totalV}V > 550V (limite do inversor!)` : `${totalV}V < 550V ✓`}
      </div>
    </div>
  );
}

// ─── SVG Diagrams: Distribution Flow (NBR 5410) ─────────────────────────────

function DistributionFlowDiagram() {
  const steps = [
    { label: 'Rede Pública', sub: 'Concessionária' },
    { label: 'Ramal de Ligação', sub: 'Entrada' },
    { label: 'Quadro de Medição', sub: 'QM (Consumo)' },
    { label: 'Quadro Distribuição', sub: 'QD (Proteção)' },
    { label: 'Circuitos Terminais', sub: 'TUE/TUG/Ilum.' },
  ];

  return (
    <div className="w-full overflow-x-auto py-2">
      <div className="min-w-[600px] flex items-center justify-between gap-2">
        {steps.map((step, idx) => (
          <div key={step.label} className="flex items-center flex-1">
            <div className="flex-1 bg-white border border-[#C85A3C]/30 rounded-xl p-3 text-center shadow-sm">
              <span className="text-[10px] font-bold text-[#C85A3C] uppercase tracking-wider block mb-0.5">Passo 0{idx + 1}</span>
              <p className="text-xs font-bold text-gray-900 leading-tight">{step.label}</p>
              <p className="text-[10px] text-gray-500 mt-0.5">{step.sub}</p>
            </div>
            {idx < steps.length - 1 && (
              <ArrowRight size={16} className="text-[#C85A3C] shrink-0 mx-1" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Article Modal 1: Datasheet Solar ────────────────────────────────────────

function ArticleModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="bg-white w-full max-w-3xl my-8 mx-4 rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="relative bg-gradient-to-br from-[#C85A3C] to-[#8B3A25] px-10 pt-12 pb-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-black/10 translate-y-1/2 -translate-x-1/2" />
          <button
            onClick={onClose}
            className="absolute top-5 right-5 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
          >
            <X size={18} className="text-white" />
          </button>
          <span className="inline-block bg-white/20 text-white/90 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
            Energia Solar · Capacitação
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight relative z-10">
            Decifrando o Datasheet Solar
          </h1>
          <p className="text-white/80 text-base relative z-10">
            Entendendo os parâmetros dos sistemas fotovoltaicos para um dimensionamento correto e seguro.
          </p>
          <div className="flex items-center gap-4 mt-5 text-white/60 text-sm relative z-10">
            <span className="flex items-center gap-1.5"><Clock size={13} /> 8 min de leitura</span>
            <span className="flex items-center gap-1.5"><BookOpen size={13} /> Voltech · Setor de Projetos</span>
          </div>
        </div>

        <div className="px-8 md:px-12 py-10 space-y-10 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#C85A3C] text-white text-xs flex items-center justify-center font-bold shrink-0">1</span>
              O que é um Datasheet?
            </h2>
            <p className="mb-4">
              Um <strong>datasheet</strong> é um documento técnico elaborado pelo fabricante de um produto que resume as informações mais importantes de funcionamento. No contexto fotovoltaico, existem dois datasheets fundamentais: o do <strong>módulo solar</strong> e o do <strong>inversor</strong>.
            </p>
            <div className="bg-[#FFF5F2] border border-[#C85A3C]/20 rounded-xl p-5">
              <p className="text-sm text-[#C85A3C] font-semibold mb-1">📄 Onde encontrar?</p>
              <p className="text-sm">Facilmente disponíveis nos sites e plataformas de fornecedores — como a Belenus — e em muitos casos já vêm junto com o produto na caixa.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#C85A3C] text-white text-xs flex items-center justify-center font-bold shrink-0">2</span>
              Visão Geral do Sistema
            </h2>
            <p className="mb-5">O sistema fotovoltaico é composto por módulos que captam a energia solar (lado CC) e um inversor que converte essa energia para corrente alternada (CA), apta para consumo ou injeção na rede.</p>
            <div className="bg-gray-50 rounded-xl p-5">
              <SystemDiagram />
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Zap size={20} className="text-[#C85A3C]" />
              Inversor Fotovoltaico
            </h2>
            <p className="mb-4">
              O inversor é o <strong>coração do sistema</strong>, interligando os componentes da cadeia de geração, consumo e fornecimento. É nele que encontramos os limites que o arranjo de módulos deve respeitar.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-5">
              {[
                { label: 'Potências (CA e CC)', desc: 'Potência máxima de entrada fotovoltaica e potência de saída nominal' },
                { label: 'Tensões (CA e CC)', desc: 'Faixa MPPT, tensão máxima de entrada e tensão de inicialização' },
                { label: 'Correntes (CA e CC)', desc: 'Corrente máxima operacional e de curto-circuito por entrada' },
                { label: 'Strings e MPPT', desc: 'Número de rastreadores MPPT e strings por MPPT disponíveis' },
              ].map((item) => (
                <div key={item.label} className="bg-gray-50 rounded-lg p-4 border-l-4 border-[#C85A3C]">
                  <p className="font-semibold text-gray-900 text-sm mb-1">{item.label}</p>
                  <p className="text-gray-500 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-gray-200 overflow-hidden text-sm">
              <div className="bg-gray-900 text-white px-4 py-2 font-semibold text-xs uppercase tracking-wide">
                Exemplo — Inversor Deye SUN-5K-G05 (dados técnicos)
              </div>
              <table className="w-full text-xs">
                <tbody>
                  {[
                    ['Máx. Potência de entrada FV', '7,5 kW'],
                    ['Máx. Tensão de entrada FV', '550 V'],
                    ['Tensão de inicialização', '80 V'],
                    ['Faixa de tensão MPPT', '70 – 500 V'],
                    ['Máx. Corrente de entrada operacional', '18 + 18 A'],
                    ['Máx. Corrente de curto-circuito de entrada', '27 + 27 A'],
                    ['Nº de MPPT / Strings por MPPT', '2 / 1+1'],
                  ].map(([param, val], i) => (
                    <tr key={param} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-2 text-gray-600">{param}</td>
                      <td className="px-4 py-2 font-semibold text-[#C85A3C]">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Sun size={20} className="text-[#C85A3C]" />
              Módulo Fotovoltaico
            </h2>
            <p className="mb-4">
              O módulo (ou placa solar) é o receptor da energia solar. Ele <strong>define os parâmetros elétricos do lado CC</strong> — a geração e a tensão/corrente que o inversor receberá.
            </p>
            <div className="rounded-xl border border-gray-200 overflow-hidden text-sm mb-4">
              <div className="bg-gray-900 text-white px-4 py-2 font-semibold text-xs uppercase tracking-wide">
                Exemplo — Módulo Vertex N 700Wp (STC)
              </div>
              <table className="w-full text-xs">
                <tbody>
                  {[
                    ['Potência de pico (Pmax)', '700 Wp'],
                    ['Tensão de máx. potência (Vmpp)', '40,5 V'],
                    ['Corrente de máx. potência (Impp)', '17,29 A'],
                    ['Tensão de circuito aberto (Voc)', '48,6 V'],
                    ['Corrente de curto-circuito (Isc)', '18,32 A'],
                    ['Eficiência do módulo', '22,5 %'],
                  ].map(([param, val], i) => (
                    <tr key={param} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-2 text-gray-600">{param}</td>
                      <td className="px-4 py-2 font-semibold text-[#C85A3C]">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-[#FFF5F2] border border-[#C85A3C]/20 rounded-xl p-4 text-sm">
              <p className="font-semibold text-[#C85A3C] mb-1">💡 Condições STC</p>
              <p>Os valores do datasheet são medidos em Condições Padrão de Teste: irradiância de 1000 W/m², temperatura da célula a 25 °C e massa de ar AM 1.5.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#C85A3C] text-white text-xs flex items-center justify-center font-bold shrink-0">5</span>
              Correlacionando os Parâmetros
            </h2>
            <p className="mb-4">
              O inversor e os módulos possuem uma <strong>compatibilidade definida pela corrente por string</strong>. Quando módulos são ligados em série, a corrente se mantém igual em todo o arranjo e as tensões se somam.
            </p>
            <div className="bg-orange-50 border border-[#C85A3C]/30 rounded-xl p-5 mb-4">
              <p className="font-bold text-gray-900 mb-2">Regra de compatibilidade:</p>
              <ul className="space-y-1.5 text-sm text-gray-700">
                <li className="flex items-start gap-2"><CheckCircle size={14} className="text-green-500 mt-0.5 shrink-0" /><span><strong>Isc do módulo</strong> deve ser inferior à <strong>máxima corrente de curto-circuito</strong> do inversor por string.</span></li>
                <li className="flex items-start gap-2"><CheckCircle size={14} className="text-green-500 mt-0.5 shrink-0" /><span><strong>Impp do módulo</strong> deve ser inferior à <strong>máxima corrente de entrada operacional</strong> do inversor por string.</span></li>
              </ul>
              <div className="mt-3 text-xs bg-white rounded-lg p-3 grid grid-cols-2 gap-3 border border-gray-100">
                <div>
                  <p className="text-gray-400 font-medium mb-0.5">Módulo Vertex N</p>
                  <p>Isc = <strong className="text-[#C85A3C]">18,32 A</strong></p>
                  <p>Impp = <strong className="text-[#C85A3C]">17,29 A</strong></p>
                </div>
                <div>
                  <p className="text-gray-400 font-medium mb-0.5">Inversor Deye (por entrada)</p>
                  <p>Isc máx = <strong className="text-green-600">27 A</strong> ✓</p>
                  <p>I op. máx = <strong className="text-green-600">18 A</strong> ✓</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#C85A3C] text-white text-xs flex items-center justify-center font-bold shrink-0">6</span>
              Capacidade Máxima de Módulos
            </h2>
            <p className="mb-4">Há duas formas de calcular quantos módulos podem ser conectados a um inversor. <strong>Ambas devem ser verificadas.</strong></p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border-2 border-[#C85A3C]/30 p-5 bg-white">
                <p className="font-bold text-[#C85A3C] text-base mb-2">Por Potência (CC)</p>
                <p className="text-sm text-gray-600 mb-2">A soma das potências dos módulos <strong>não pode ultrapassar</strong> a potência máxima de entrada (CC) do inversor.</p>
                <div className="bg-gray-50 rounded-lg p-3 text-xs font-mono text-gray-700">
                  Σ Pmod ≤ P<sub>max CC</sub> (inversor)
                </div>
              </div>
              <div className="rounded-xl border-2 border-[#C85A3C]/30 p-5 bg-white">
                <p className="font-bold text-[#C85A3C] text-base mb-2">Por Tensão (Voc)</p>
                <p className="text-sm text-gray-600 mb-2">A soma das tensões de circuito aberto dos módulos na mesma string <strong>não pode ultrapassar</strong> a tensão máxima de entrada (CC).</p>
                <div className="bg-gray-50 rounded-lg p-3 text-xs font-mono text-gray-700">
                  N × Voc ≤ V<sub>max CC</sub> (inversor)
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#C85A3C] text-white text-xs flex items-center justify-center font-bold shrink-0">7</span>
              Caso Prático: 12 Módulos de 700 Wp
            </h2>
            <p className="mb-5">
              Temos um projeto com <strong>12 módulos Vertex N de 700 Wp</strong> para conectar a um inversor Deye 6K. Vamos verificar a compatibilidade pelos dois critérios:
            </p>

            <div className="mb-4">
              <p className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <CheckCircle size={16} className="text-green-500" /> Critério 1 — Potência
              </p>
              <div className="bg-gray-50 rounded-xl p-4 text-sm space-y-1 border border-gray-100">
                <p>12 módulos × 700 Wp = <strong className="text-[#C85A3C]">8.400 Wp = 8,4 kWp</strong></p>
                <p>Potência máx. entrada inversor 6K = <strong>9 kW</strong></p>
                <p className="text-green-600 font-semibold flex items-center gap-1"><CheckCircle size={13} /> 8,4 kWp &lt; 9 kW — Aprovado!</p>
              </div>
            </div>

            <div className="mb-5">
              <p className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <AlertTriangle size={16} className="text-red-500" /> Critério 2 — Tensão (Voc)
              </p>
              <div className="bg-gray-50 rounded-xl p-4 text-sm space-y-1 border border-gray-100 mb-3">
                <p>12 módulos em série × 48,6 V (Voc) = <strong className="text-red-600">583,2 V</strong></p>
                <p>Tensão máxima do inversor = <strong>550 V</strong></p>
                <p className="text-red-600 font-semibold flex items-center gap-1"><AlertTriangle size={13} /> 583,2 V &gt; 550 V — Reprovado! Necessária correção.</p>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                <strong>Solução:</strong> Dividir em 2 strings, aproveitando as 2 entradas MPPT do inversor Deye. Com 6 módulos por string:
              </p>
              <div className="space-y-3">
                <StringDiagram modules={6} label="String 1 — 6 módulos em série" voc="48,6" totalV="291,6" isError={false} />
                <StringDiagram modules={6} label="String 2 — 6 módulos em série" voc="48,6" totalV="291,6" isError={false} />
              </div>
              <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-700 font-medium flex items-start gap-2">
                <CheckCircle size={16} className="shrink-0 mt-0.5" />
                Resultado: 2 strings × 291,6 V — ambas dentro do limite de 550 V do inversor. Sistema compatível!
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#C85A3C] text-white text-xs flex items-center justify-center font-bold shrink-0">✓</span>
              Por que dominar o Datasheet?
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: '📊', title: 'Dados importantes', desc: 'O datasheet concentra todas as informações técnicas relevantes para o projeto em um único documento.' },
                { icon: '📐', title: 'Dimensionamento correto', desc: 'Respeitar os parâmetros garante que o sistema opere na potência projetada sem desperdícios.' },
                { icon: '🔒', title: 'Segurança', desc: 'Evita sobretensões e sobrecorrentes que podem danificar equipamentos ou causar acidentes.' },
                { icon: '🔍', title: 'Vistorias técnicas', desc: 'Dominar os parâmetros permite realizar vistorias eficientes em usinas já existentes.' },
              ].map((item) => (
                <div key={item.title} className="bg-[#FFF5F2] rounded-xl p-5 border border-[#C85A3C]/15">
                  <p className="text-2xl mb-2">{item.icon}</p>
                  <p className="font-bold text-gray-900 mb-1">{item.title}</p>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="border-t border-gray-100 pt-6 text-xs text-gray-400 text-center">
            Conteúdo produzido pela equipe Voltech · Mini Capacitação Interna — Setor de Projetos
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Article Modal 2: NBR 5410 & Dispositivos de Proteção ─────────────────────

function NbrArticleModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="bg-white w-full max-w-3xl my-8 mx-4 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Article Hero */}
        <div className="relative bg-gradient-to-br from-[#C85A3C] to-[#8B3A25] px-10 pt-12 pb-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-black/10 translate-y-1/2 -translate-x-1/2" />
          <button
            onClick={onClose}
            className="absolute top-5 right-5 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
          >
            <X size={18} className="text-white" />
          </button>
          <span className="inline-block bg-white/20 text-white/90 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
            Projetos Eléticos · Capacitação NBR 5410
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight relative z-10">
            ABNT NBR 5410: Dispositivos de Proteção
          </h1>
          <p className="text-white/80 text-base relative z-10">
            Sistemas de proteção contra sobrecarga, curto-circuito, choques elétricos e surtos em instalações de baixa tensão.
          </p>
          <div className="flex items-center gap-4 mt-5 text-white/60 text-sm relative z-10">
            <span className="flex items-center gap-1.5"><Clock size={13} /> 10 min de leitura</span>
            <span className="flex items-center gap-1.5"><BookOpen size={13} /> Voltech · Setor de Projetos</span>
          </div>
        </div>

        {/* Article Body */}
        <div className="px-8 md:px-12 py-10 space-y-10 text-gray-700 leading-relaxed">

          {/* 1. Introdução e Principais Ameaças */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#C85A3C] text-white text-xs flex items-center justify-center font-bold shrink-0">1</span>
              A Segurança e as Principais Ameaças
            </h2>
            <p className="mb-4">
              Para garantir uma instalação elétrica segura e dentro das diretrizes da <strong>ABNT NBR 5410:2004</strong>, é necessária a utilização de dispositivos que protejam os circuitos contra múltiplas ameaças[cite: 2]. Eles atuam prevenindo danos materiais e protegendo vidas[cite: 2].
            </p>

            <div className="bg-[#FFF5F2] border border-[#C85A3C]/20 rounded-xl p-5 mb-4">
              <p className="text-sm font-bold text-[#C85A3C] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <ShieldAlert size={16} /> Principais ameaças combatidas (NBR 5410)[cite: 2]
              </p>
              <div className="grid sm:grid-cols-2 gap-2 text-sm text-gray-700">
                <div className="flex items-center gap-2"><CheckCircle size={14} className="text-[#C85A3C]" /> Choques elétricos em pessoas[cite: 2]</div>
                <div className="flex items-center gap-2"><CheckCircle size={14} className="text-[#C85A3C]" /> Curtos-circuitos[cite: 2]</div>
                <div className="flex items-center gap-2"><CheckCircle size={14} className="text-[#C85A3C]" /> Sobreaquecimento de condutores[cite: 2]</div>
                <div className="flex items-center gap-2"><CheckCircle size={14} className="text-[#C85A3C]" /> Surtos de corrente ou tensão[cite: 2]</div>
                <div className="flex items-center gap-2"><CheckCircle size={14} className="text-[#C85A3C]" /> Sobrecarga nos circuitos[cite: 2]</div>
              </div>
            </div>
          </section>

          {/* 2. Fluxo de Distribuição Elétrica */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#C85A3C] text-white text-xs flex items-center justify-center font-bold shrink-0">2</span>
              Fluxo do Sistema Elétrico Residencial
            </h2>
            <p className="mb-4">
              A energia percorre etapas sequenciais desde a rede pública até os circuitos terminais[cite: 2]. O <strong>Quadro de Distribuição (QD)</strong> é o centro de controle e proteção da instalação[cite: 2].
            </p>

            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <DistributionFlowDiagram />
            </div>

            <div className="mt-4 bg-orange-50 border border-[#C85A3C]/30 rounded-xl p-4 text-xs text-gray-700">
              <p className="font-bold text-[#C85A3C] mb-1">📌 Exigência Normativa (Item 6.5.4.10):</p>
              <p>Os Quadros de Distribuição devem ser entregues com advertência de segurança não facilmente removível, alertando expressamente sobre os riscos eléticos[cite: 2].</p>
            </div>
          </section>

          {/* 3. Disjuntor Termomagnético (DTM) */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Zap size={20} className="text-[#C85A3C]" />
              Disjuntor Termomagnético (DTM)
            </h2>
            <p className="mb-4">
              O DTM atua em duas condições críticas utilizando dois princípios físicos distintos[cite: 2]:
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-5">
              <div className="bg-gray-50 rounded-xl p-4 border-l-4 border-[#C85A3C]">
                <p className="font-bold text-gray-900 text-sm mb-1">1. Proteção contra Sobrecarga</p>
                <p className="text-xs font-semibold text-[#C85A3C] mb-2">Efeito Térmico[cite: 2]</p>
                <p className="text-gray-600 text-xs">Utiliza um par bimetálico[cite: 2]. O aumento da corrente aquece o bimetálico, que se curva e dispara o desarme[cite: 2].</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border-l-4 border-[#C85A3C]">
                <p className="font-bold text-gray-900 text-sm mb-1">2. Proteção contra Curto-Circuito</p>
                <p className="text-xs font-semibold text-[#C85A3C] mb-2">Efeito Magnético[cite: 2]</p>
                <p className="text-gray-600 text-xs">Utiliza uma espira interna[cite: 2]. Em correntes elevadas de curto, gera um campo magnético intenso para disparo instantâneo[cite: 2].</p>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 overflow-hidden text-sm mb-4">
              <div className="bg-gray-900 text-white px-4 py-2 font-semibold text-xs uppercase tracking-wide">
                Classificação das Curvas de Disparo (ABNT NBR NM 60898)[cite: 2]
              </div>
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 text-left border-b border-gray-200">
                    <th className="px-4 py-2 font-bold">Curva</th>
                    <th className="px-4 py-2 font-bold">Faixa de Disparo Magnético</th>
                    <th className="px-4 py-2 font-bold">Aplicação Principal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b border-gray-100">
                    <td className="px-4 py-2.5 font-bold text-[#C85A3C]">Curva B</td>
                    <td className="px-4 py-2.5">3 a 5 × I<sub>n</sub>[cite: 2]</td>
                    <td className="px-4 py-2.5 text-gray-600">Cargas sensíveis, eletrônicas/resistivas em circuitos exclusivos[cite: 2].</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <td className="px-4 py-2.5 font-bold text-[#C85A3C]">Curva C</td>
                    <td className="px-4 py-2.5">5 a 10 × I<sub>n</sub>[cite: 2]</td>
                    <td className="px-4 py-2.5 text-gray-600">Cargas genéricas residenciais e eletrodomésticos em geral[cite: 2].</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-2.5 font-bold text-[#C85A3C]">Curva D</td>
                    <td className="px-4 py-2.5">10 a 20 × I<sub>n</sub>[cite: 2]</td>
                    <td className="px-4 py-2.5 text-gray-600">Cargas com alta corrente de pico no arranque (motores/transformadores)[cite: 2].</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 4. DDR vs IDR */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <ShieldCheck size={20} className="text-[#C85A3C]" />
              Proteção Diferencial Residual: DDR vs IDR
            </h2>
            <p className="mb-4">
              Dispositivos diferenciais residenciais detectam fugas de corrente para a terra, prevenindo choques elétricos e incêndios[cite: 2].
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="bg-white border-2 border-[#C85A3C]/30 rounded-xl p-4">
                <p className="font-bold text-[#C85A3C] text-sm mb-1">DDR (Disjuntor DR)</p>
                <p className="text-xs text-gray-500 mb-2">Dupla Função[cite: 2]</p>
                <p className="text-xs text-gray-700">Reúne no mesmo dispositivo a proteção termomagnética (sobrecarga/curto) e a proteção contra fugas/choques[cite: 2].</p>
              </div>
              <div className="bg-white border-2 border-[#C85A3C]/30 rounded-xl p-4">
                <p className="font-bold text-[#C85A3C] text-sm mb-1">IDR (Interruptor DR)</p>
                <p className="text-xs text-gray-500 mb-2">Exclusivo para Choque[cite: 2]</p>
                <p className="text-xs text-gray-700">Protege <strong>apenas contra choques</strong>[cite: 2]. Não protege contra sobrecarga/curto e deve ser usado com DTM[cite: 2].</p>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 overflow-hidden text-sm mb-4">
              <div className="bg-gray-900 text-white px-4 py-2 font-semibold text-xs uppercase tracking-wide">
                Sensibilidades Comercializadas no Brasil[cite: 2]
              </div>
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 text-left border-b border-gray-200">
                    <th className="px-4 py-2 font-bold">Sensibilidade</th>
                    <th className="px-4 py-2 font-bold">Corrente (IΔn)</th>
                    <th className="px-4 py-2 font-bold">Aplicação Principal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b border-gray-100">
                    <td className="px-4 py-2.5 font-bold text-green-600">Alta Sensibilidade</td>
                    <td className="px-4 py-2.5 font-bold">30 mA[cite: 2]</td>
                    <td className="px-4 py-2.5 text-gray-600">Proteção de pessoas contra contato direto em instalações residenciais[cite: 2].</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-2.5 font-bold text-amber-600">Baixa Sensibilidade</td>
                    <td className="px-4 py-2.5 font-bold">300 mA[cite: 2]</td>
                    <td className="px-4 py-2.5 text-gray-600">Proteção patrimonial (evita incêndios e fugas em estruturas metálicas)[cite: 2].</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-xs text-red-800">
              <p className="font-bold mb-1 flex items-center gap-1">
                <AlertTriangle size={14} /> Uso Obrigatório do DR de 30mA (NBR 5410):
              </p>
              <ul className="list-disc list-inside space-y-1 text-red-700">
                <li>Tomadas em áreas externas e áreas molhadas[cite: 2].</li>
                <li>Tomadas em banheiros, cozinhas, lavanderias e áreas de serviço[cite: 2].</li>
                <li>Tomadas situadas a menos de 2,5 m de piscinas, saunas e hidromassagens[cite: 2].</li>
              </ul>
            </div>
          </section>

          {/* 5. DPS e Aterramento */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Activity size={20} className="text-[#C85A3C]" />
              DPS: Proteção Contra Surtos Elétricos
            </h2>
            <p className="mb-4">
              Os surtos são sobretensões transitórias de curta duração e alta intensidade (causados por descargas atmosféricas ou manobras da rede)[cite: 2]. O uso de DPS é <strong>obrigatório pela NBR 5410 desde 2005</strong>[cite: 2].
            </p>

            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-5">
              <p className="font-bold text-gray-900 text-sm mb-3">Tríade Obrigatória de Proteção Contra Surtos[cite: 2]:</p>
              <div className="grid sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <span className="font-bold text-[#C85A3C] block mb-1">1. Aterramento[cite: 2]</span>
                  Baixa impedância para drenar a corrente ao solo[cite: 2].
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <span className="font-bold text-[#C85A3C] block mb-1">2. Equipotencialização[cite: 2]</span>
                  Interligação das massas ao mesmo potencial[cite: 2].
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <span className="font-bold text-[#C85A3C] block mb-1">3. DPS[cite: 2]</span>
                  Desvia as sobretensões em pontos estratégicos[cite: 2].
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 overflow-hidden text-sm">
              <div className="bg-gray-900 text-white px-4 py-2 font-semibold text-xs uppercase tracking-wide">
                Classes de DPS e suas Aplicações[cite: 2]
              </div>
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 text-left border-b border-gray-200">
                    <th className="px-4 py-2 font-bold">Classe</th>
                    <th className="px-4 py-2 font-bold">Aplicação e Características[cite: 2]</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b border-gray-100">
                    <td className="px-4 py-2.5 font-bold text-[#C85A3C]">Classe I</td>
                    <td className="px-4 py-2.5">Descargas diretas (edificações com SPDA ou até 100m)[cite: 2]. Suporta correntes elevadas[cite: 2].</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <td className="px-4 py-2.5 font-bold text-[#C85A3C]">Classe II</td>
                    <td className="px-4 py-2.5">Descargas indiretas. Padrão no Quadro de Distribuição residencial[cite: 2].</td>
                  </tr>
                  <tr className="bg-white border-b border-gray-100">
                    <td className="px-4 py-2.5 font-bold text-[#C85A3C]">Classe III</td>
                    <td className="px-4 py-2.5">Proteção fina para equipamentos sensíveis a mais de 30m do DPS Classe II[cite: 2].</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-2.5 font-bold text-[#C85A3C]">Classe I/II</td>
                    <td className="px-4 py-2.5">Solução integrada para a entrada da edificação (reúne Classe I e II)[cite: 2].</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 6. Conclusão */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#C85A3C] text-white text-xs flex items-center justify-center font-bold shrink-0">✓</span>
              Resumo do Sistema de Proteção Integrado
            </h2>
            <p className="mb-4 text-sm">
              Uma instalação conforme a NBR 5410 depende da atuação coordenada de todos os componentes[cite: 2]:
            </p>
            <div className="grid sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-[#FFF5F2] rounded-xl p-4 border border-[#C85A3C]/20">
                <p className="font-bold text-gray-900 mb-1">⚡ DTM</p>
                <p className="text-gray-600">Protege cabos contra sobrecarga e curto-circuito[cite: 2].</p>
              </div>
              <div className="bg-[#FFF5F2] rounded-xl p-4 border border-[#C85A3C]/20">
                <p className="font-bold text-gray-900 mb-1">🛡️ DDR / IDR</p>
                <p className="text-gray-600">Protege vidas contra choques e fugas de corrente[cite: 2].</p>
              </div>
              <div className="bg-[#FFF5F2] rounded-xl p-4 border border-[#C85A3C]/20">
                <p className="font-bold text-gray-900 mb-1">🌐 DPS</p>
                <p className="text-gray-600">Protege eletrodomésticos e circuitos contra surtos/raios[cite: 2].</p>
              </div>
              <div className="bg-[#FFF5F2] rounded-xl p-4 border border-[#C85A3C]/20">
                <p className="font-bold text-gray-900 mb-1">🌱 Aterramento + Equipotencialização</p>
                <p className="text-gray-600">Base para funcionamento e escoamento seguro[cite: 2].</p>
              </div>
            </div>
          </section>

          <div className="border-t border-gray-100 pt-6 text-xs text-gray-400 text-center">
            Conteúdo produzido pela equipe Voltech · Mini Capacitação Interna — NBR 5410
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Section ──────────────────────────────────────────────────────────────

const articles = [
  {
    id: 1,
    category: 'Energia Solar',
    readTime: '8 min',
    title: 'Decifrando o Datasheet Solar',
    excerpt: 'Aprenda a interpretar os parâmetros técnicos de módulos e inversores fotovoltaicos para garantir um dimensionamento correto, seguro e eficiente.',
    tags: ['Módulos FV', 'Inversores', 'Dimensionamento'],
    accent: '#C85A3C',
    hasModal: true,
  },
    {
    id: 3,
    category: 'Projetos Elétricos',
    readTime: '10 min',
    title: 'ABNT NBR 5410: guia prático para instalações',
    excerpt: 'Os principais pontos da norma que todo engenheiro e técnico eletricista precisa conhecer antes de elaborar um projeto residencial ou comercial.',
    tags: ['Normas', 'ABNT', 'Projetos'],
    accent: '#C85A3C',
    hasModal: true,
  },
  {
    id: 2,
    category: 'Eficiência Energética',
    readTime: 'Em breve',
    title: 'Como reduzir o consumo elétrico industrial',
    excerpt: 'Principais estratégias de diagnóstico e correção de desperdícios em instalações industriais — desde o fator de potência até a gestão de demanda.',
    tags: ['Fator de Potência', 'Gestão de Demanda', 'NR-10'],
    accent: '#888',
    hasModal: false,
  },

];

export function Testimonials() {
  const [ref, isInView] = useInView();
  const [openArticle, setOpenArticle] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Artigos <span className="text-[#C85A3C]">Sugeridos</span>
          </h2>
          <div className="w-24 h-1 bg-[#C85A3C] mx-auto mb-6" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conteúdo técnico produzido pela nossa equipe para quem quer entender mais sobre engenharia elétrica e energia solar.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className={`group bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden ${
                article.hasModal ? 'cursor-pointer' : 'opacity-75'
              }`}
              onClick={() => article.hasModal && setOpenArticle(article.id)}
            >
              {/* Card top accent */}
              <div className="h-2" style={{ backgroundColor: article.accent }} />

              <div className="p-7 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: `${article.accent}18`, color: article.accent }}>
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock size={12} />
                    {article.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-[#C85A3C] transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-5">{article.excerpt}</p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {article.tags.map((tag) => (
                    <span key={tag} className="text-[11px] bg-gray-100 text-gray-500 px-2.5 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-sm font-semibold mt-auto"
                  style={{ color: article.hasModal ? article.accent : '#aaa' }}>
                  <BookOpen size={15} />
                  {article.hasModal ? (
                    <>Ler artigo <ChevronRight size={15} /></>
                  ) : (
                    'Em breve'
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openArticle === 1 && <ArticleModal onClose={() => setOpenArticle(null)} />}
        {openArticle === 3 && <NbrArticleModal onClose={() => setOpenArticle(null)} />}
      </AnimatePresence>
    </section>
  );
}