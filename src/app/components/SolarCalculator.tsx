import { useState } from 'react';
import { motion } from 'motion/react';
import { useInView } from './useInView';
import { Calculator, TrendingDown, Calendar, Leaf } from 'lucide-react';

export function SolarCalculator() {
  const [ref, isInView] = useInView();
  const [monthlyBill, setMonthlyBill] = useState('');
  const [result, setResult] = useState<{
    systemSize: number;
    investment: number;
    monthlySavings: number;
    paybackYears: number;
    co2Reduction: number;
  } | null>(null);

  const calculateSolar = () => {
    const bill = parseFloat(monthlyBill);
    if (isNaN(bill) || bill <= 0) return;

    const averageKwhCost = 0.85;
    const monthlyConsumption = bill / averageKwhCost;
    const systemSize = (monthlyConsumption * 12) / 1350;
    const costPerKwp = 4500;
    const investment = systemSize * costPerKwp;
    const monthlySavings = bill * 0.95;
    const paybackYears = investment / (monthlySavings * 12);
    const co2Reduction = systemSize * 1200;

    setResult({
      systemSize: Math.round(systemSize * 10) / 10,
      investment: Math.round(investment),
      monthlySavings: Math.round(monthlySavings),
      paybackYears: Math.round(paybackYears * 10) / 10,
      co2Reduction: Math.round(co2Reduction),
    });
  };

  return (
    <section className="py-24 bg-gradient-to-br from-[#FFF5F2] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simulador de <span className="text-[#C85A3C]">Economia Solar</span>
          </h2>
          <div className="w-24 h-1 bg-[#C85A3C] mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubra quanto você pode economizar com energia solar fotovoltaica
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#C85A3C] w-12 h-12 rounded-xl flex items-center justify-center">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Faça sua Simulação
              </h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valor médio da sua conta de luz (R$)
                </label>
                <input
                  type="number"
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(e.target.value)}
                  placeholder="Ex: 350"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C85A3C] focus:border-[#C85A3C] outline-none transition-all"
                />
              </div>

              <button
                onClick={calculateSolar}
                className="w-full bg-[#C85A3C] text-white py-4 rounded-lg hover:bg-[#B84D30] transition-colors font-medium"
              >
                Calcular Economia
              </button>

              <p className="text-sm text-gray-500 text-center">
                Simulação baseada em média nacional. Valores podem variar conforme
                região e condições locais.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {result ? (
              <div className="space-y-4">
                <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-[#C85A3C]">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#FFF5F2] w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-[#C85A3C]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">
                        Tamanho do Sistema
                      </p>
                      <p className="text-3xl font-bold text-[#C85A3C]">
                        {result.systemSize} kWp
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-[#FF8C5A]">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#FFF5F2] w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                      <TrendingDown className="w-6 h-6 text-[#FF8C5A]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">
                        Investimento Estimado
                      </p>
                      <p className="text-3xl font-bold text-gray-900">
                        R$ {result.investment.toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-[#FFA876]">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#FFF5F2] w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-[#FFA876]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">
                        Economia Mensal
                      </p>
                      <p className="text-3xl font-bold text-gray-900">
                        R$ {result.monthlySavings.toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-[#FFD4A3]">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#FFF5F2] w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-[#FFD4A3]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">
                        Retorno do Investimento
                      </p>
                      <p className="text-3xl font-bold text-gray-900">
                        {result.paybackYears} anos
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-xl p-6 border-l-4 border-green-500">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Leaf className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">
                        Redução de CO₂ em 25 anos
                      </p>
                      <p className="text-3xl font-bold text-green-600">
                        {result.co2Reduction.toLocaleString('pt-BR')} kg
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    const element = document.querySelector('#contato');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full bg-[#C85A3C] text-white py-4 rounded-lg hover:bg-[#B84D30] transition-colors font-medium"
                >
                  Solicitar Proposta Detalhada
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-gray-200">
                <div className="bg-[#FFF5F2] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calculator className="w-10 h-10 text-[#C85A3C]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Preencha o simulador
                </h3>
                <p className="text-gray-600">
                  Informe o valor da sua conta de luz para ver quanto você pode
                  economizar com energia solar.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
