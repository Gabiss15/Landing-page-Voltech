import { motion } from 'motion/react';
import { ArrowRight, Zap, Shield, Award } from 'lucide-react';

export function Hero() {
  const scrollToContact = () => {
    const element = document.querySelector('#contato');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#C85A3C] via-[#B84D30] to-[#A03E25] overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgPGcgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjA1Ij4KICAgICAgPHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAgNGgtMnYyaDJ2LTJ6bS0yLTRoLTJ2Mmgydi0yem0tMiAydi0ySDMwdjJoMnptLTItMnYtMmgtMnYyaDJ6bS0yIDBoLTJ2Mmgydi0yem0yLTJoMnYtMmgtMnYyem0wLTJ2LTJoLTJ2Mmgyem0yLTJoMnYtMmgtMnYyeiIvPgogICAgPC9nPgogIDwvZz4KPC9zdmc+')] opacity-30"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-block mb-6 px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white border border-white/30"
          >
            Empresa Júnior de Engenharia Elétrica
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Energia Inteligente para{' '}
            <span className="text-[#FFE8E0]">o Futuro</span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
            Soluções elétricas inovadoras e eficientes para residências,
            empresas e indústrias. Tecnologia de ponta com preços acessíveis.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('https://wa.me/558988168216?text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento.', '_blank')}
              className="group bg-white text-[#C85A3C] px-8 py-4 rounded-lg flex items-center gap-3 hover:shadow-2xl transition-all"
            >
              Solicitar Orçamento Grátis
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.querySelector('#servicos');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-[#C85A3C] transition-all"
            >
              Conheça Nossos Serviços
            </motion.button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Zap,
                title: 'Eficiência Energética',
                desc: 'Reduza até 95% da sua conta',
              },
              {
                icon: Shield,
                title: 'Projetos Seguros',
                desc: 'Normas ABNT e NR-10',
              },
              {
                icon: Award,
                title: 'Excelência Técnica',
                desc: 'Equipe altamente qualificada',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all"
              >
                <item.icon className="w-12 h-12 text-white mb-4 mx-auto" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-white/80">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}
