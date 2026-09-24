import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Eye, EyeOff, Zap } from 'lucide-react';
import logo from '../../imports/logo2020a.png';

interface LoginPageProps {
  onBack: () => void;
}

export function LoginPage({ onBack }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Preencha todos os campos.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setError('Credenciais inválidas. Verifique seu e-mail e senha.');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top bar */}
      <div className="px-6 py-5">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#C85A3C] transition-colors"
        >
          <ArrowLeft size={16} />
          Voltar ao site
        </button>
      </div>

      <div className="flex flex-1 flex-col md:flex-row">
        {/* Left panel — brand */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="hidden md:flex md:w-1/2 bg-[#C85A3C] flex-col justify-between px-14 py-16 relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/5" />
            <div className="absolute bottom-0 -left-20 w-72 h-72 rounded-full bg-black/10" />
            <div className="absolute top-1/2 right-12 w-48 h-48 rounded-full bg-white/5" />
          </div>

          <div className="relative z-10">
            <img src={logo} alt="Voltech" className="h-14 w-auto brightness-0 invert" />
          </div>

          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3 text-white/70 text-sm">
              <Zap size={16} className="text-white" />
              <span>Plataforma de gestão de projetos elétricos</span>
            </div>
            <h2 className="text-4xl font-bold text-white leading-tight">
              Gerencie seus<br />projetos com<br />eficiência.
            </h2>
            <p className="text-white/75 text-base leading-relaxed max-w-sm">
              Acesse o painel interno da Voltech para acompanhar orçamentos, projetos em andamento e relatórios técnicos.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-4">
            {['Projetos', 'Relatórios', 'Orçamentos'].map((tag) => (
              <span
                key={tag}
                className="text-xs border border-white/30 text-white/80 px-3 py-1.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Right panel — form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="flex flex-1 items-center justify-center px-6 py-12"
        >
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <div className="flex justify-center mb-8 md:hidden">
              <img src={logo} alt="Voltech" className="h-12 w-auto" />
            </div>

            <div className="mb-10">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Bem-vindo de volta</h1>
              <p className="text-gray-500 text-base">Entre com suas credenciais para continuar.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">E-mail</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C85A3C]/40 focus:border-[#C85A3C] transition-all"
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Senha</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pr-11 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C85A3C]/40 focus:border-[#C85A3C] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-600 bg-red-50 border border-red-100 px-4 py-2.5 rounded-lg"
                >
                  {error}
                </motion.p>
              )}

              {/* Forgot password */}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-[#C85A3C] hover:underline"
                >
                  Esqueci minha senha
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#C85A3C] hover:bg-[#B84D30] text-white py-3 rounded-lg font-semibold text-base transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Entrando...
                  </>
                ) : (
                  'Entrar'
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-500">
              Problemas para acessar?{' '}
              <a
                href="mailto:contato@voltech.eng.br"
                className="text-[#C85A3C] hover:underline font-medium"
              >
                Fale conosco
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
