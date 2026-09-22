import { useEffect, useState } from 'react';

const ConversorMoedas = () => {
    const [valor, setValor] = useState(1);
    const [moedas, setMoedas] = useState([]);
    const [carregando, setCarregando] = useState(true);

    const [moedaOrigem, setMoedaOrigem] = useState('USD');
    const [moedaDestino, setMoedaDestino] = useState('BRL');

    const [valorConvertido, setValorConvertido] = useState(null);
    const [convertendo, setConvertendo] = useState(false);

    const fetchMoedas = async () => {
        try {
            const response = await fetch(
                'https://api.frankfurter.dev/v2/currencies'
            );

            if (!response.ok) {
                throw new Error('Erro ao buscar moedas');
            }

            const data = await response.json();

            setMoedas(data);
        } catch (error) {
            console.error('Erro ao buscar moedas:', error);
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        fetchMoedas();
    }, []);

    const handleInverter = () => {
        const moedaTemporaria = moedaOrigem;

        setMoedaOrigem(moedaDestino);
        setMoedaDestino(moedaTemporaria);

        setValorConvertido(null);
    };

    const handleConverter = async () => {
        try {
            setConvertendo(true);

            if (moedaOrigem === moedaDestino) {
                setValorConvertido(valor);
                return;
            }

            const response = await fetch(
                `https://api.frankfurter.dev/v2/rate/${moedaOrigem}/${moedaDestino}`
            );

            if (!response.ok) {
                throw new Error('Erro ao converter moeda');
            }

            const data = await response.json();

            const resultado = valor * data.rate;

            setValorConvertido(resultado);
        } catch (error) {
            console.error('Erro ao converter moeda:', error);
            setValorConvertido(null);
        } finally {
            setConvertendo(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto my-10 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-200/60 overflow-hidden">

            <div className="px-6 py-5 bg-gradient-to-r from-indigo-600 to-teal-500">
                <h2 className="text-2xl text-center font-bold text-white">
                    Conversor de moedas
                </h2>
            </div>

            <div className="p-6 space-y-5">

                <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-center">

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition">
                        <label
                            htmlFor="moedaOrigem"
                            className="block text-xs font-medium text-slate-500 mb-1"
                        >
                            De
                        </label>

                        {carregando ? (
                            <div className="text-sm text-slate-400 py-1">
                                carregando…
                            </div>
                        ) : (
                            <select
                                id="moedaOrigem"
                                value={moedaOrigem}
                                onChange={(e) => setMoedaOrigem(e.target.value)}
                                className="w-full bg-transparent text-lg font-semibold text-slate-800 focus:outline-none"
                            >
                                {moedas.map((dados) => (
                                    <option key={dados.iso_code} value={dados.iso_code}>
                                        {dados.iso_code} - {dados.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>

                    <button
                        onClick={handleInverter}
                        type="button"
                        title="Inverter moedas"
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-teal-500 text-white text-base shadow-md shadow-indigo-200 hover:opacity-90 active:scale-95 transition"
                    >
                        ⇄
                    </button>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition">
                        <label
                            htmlFor="moedaDestino"
                            className="block text-xs font-medium text-slate-500 mb-1"
                        >
                            Para
                        </label>

                        {carregando ? (
                            <div className="text-sm text-slate-400 py-1">
                                carregando…
                            </div>
                        ) : (
                            <select
                                id="moedaDestino"
                                value={moedaDestino}
                                onChange={(e) => setMoedaDestino(e.target.value)}
                                className="w-full bg-transparent text-lg font-semibold text-slate-800 focus:outline-none"
                            >
                                {moedas.map((dados) => (
                                    <option key={dados.iso_code} value={dados.iso_code}>
                                        {dados.iso_code} - {dados.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>

                </div>

                <div>
                    <label
                        htmlFor="valor"
                        className="block text-xs font-medium text-slate-500 mb-1"
                    >
                        Valor
                    </label>

                    <input
                        value={valor}
                        onChange={(e) => setValor(Number(e.target.value))}
                        type="number"
                        id="valor"
                        min="0"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-2xl font-bold text-slate-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
                    />
                </div>

                <button
                    onClick={handleConverter}
                    disabled={carregando || convertendo}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-teal-500 text-white font-semibold shadow-lg shadow-indigo-200 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                    {convertendo ? 'Convertendo...' : 'Converter'}
                </button>

                <div className="rounded-xl bg-gradient-to-br from-indigo-50 to-teal-50 border border-indigo-100 p-4 flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-500">
                        Valor Convertido:
                    </span>

                    {valorConvertido !== null ? (
                        <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent">
                            {valorConvertido.toFixed(2)}{' '}
                            <span className="text-base text-slate-500">{moedaDestino}</span>
                        </span>
                    ) : (
                        <span className="text-lg font-semibold text-slate-300">
                            --
                        </span>
                    )}
                </div>

            </div>
        </div>
    );
};

export default ConversorMoedas;