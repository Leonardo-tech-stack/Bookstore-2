import { Footer1 } from "./styles";

const Footer = () => {
  return (
    <Footer1 className="bg-[#EFF2F6] py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">

          <div className="text-left">
            <h2 className="text-black text-2xl font-semibold mb-6">Assine a nossa newsletter!</h2>
            <p className="text-gray-400 mb-6">Seja o primeiro a saber sobre nossas ofertas especiais, lançamentos de novos produtos e eventos.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Insira seu e-mail"
                className="border border-gray-500 rounded-l px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button title="Desabilitado" className="subs bg-black text-white rounded-r px-6 py-2 ml-2">Inscreva-se</button> 
            </div>
          </div>

          <div>
            <h2 className="text-black text-2xl font-semibold mb-6">Links rápidos</h2>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-black">Início da página</a></li>
              <li><a href="/lista-de-produtos" className="text-gray-400 hover:text-black">Comprar</a></li>
              <li><a href="#" className="text-gray-400 hover:text-black">Sobre</a></li>
              <li><a href="/contato" className="text-gray-400 hover:text-black">Contato</a></li>
            </ul>
          </div>

          <div>
            <h2 className="text-black text-2xl font-semibold mb-6">Suporte</h2>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-black">FAQs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-black">Envio</a></li>
              <li><a href="#" className="text-gray-400 hover:text-black">Retorno</a></li>
              <li><a href="#" className="text-gray-400 hover:text-black">Termos de serviço</a></li>
            </ul>
          </div>

          <div>
            <h2 className="text-black text-2xl font-semibold mb-6">Contato</h2>
            <ul className="space-y-2">
              <li><a href="https://linkedin.com/in/leonardo-carvalho-3708bb260/" target="_blank" className="text-gray-400 hover:text-black" rel="noreferrer">Linkedin</a></li>
              <li><a href="https://github.com/Leonardo-tech-stack" target="_blank" className="text-gray-400 hover:text-black" rel="noreferrer">Github</a></li>
              <li><a href="#" className="text-gray-400 hover:text-black">Retorno</a></li>
              <li><a href="#" className="text-gray-400 hover:text-black">Termos de serviço</a></li>
            </ul>
          </div>
        </div>
      </div>
    </Footer1>
  )
}

export default Footer;
