export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <div className="text-lg font-bold text-white">FoodPhoto Studio</div>
          <p className="mt-3 text-sm text-neutral-400">
            Transforme fotos simples em imagens profissionais para delivery e redes sociais.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">Produto</h4>
          <ul className="mt-3 space-y-2 text-sm text-neutral-400">
            <li>Recursos</li>
            <li>Templates</li>
            <li>Precos</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">Empresa</h4>
          <ul className="mt-3 space-y-2 text-sm text-neutral-400">
            <li>Sobre</li>
            <li>Contato</li>
            <li>Carreiras</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">Legal</h4>
          <ul className="mt-3 space-y-2 text-sm text-neutral-400">
            <li>Termos</li>
            <li>Privacidade</li>
            <li>Cookies</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-neutral-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-neutral-300 md:flex-row">
          <span>Pronto para comecar?</span>
          <a
            href="/cadastro"
            className="rounded-full bg-primary-600 px-5 py-2 text-xs font-semibold text-white hover:bg-primary-500"
          >
            Crie sua conta gratis
          </a>
        </div>
        <div className="border-t border-neutral-800 py-6 text-center text-xs text-neutral-500">
          © 2026 FoodPhoto Studio. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
