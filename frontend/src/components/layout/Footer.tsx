import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <div className="text-lg font-bold text-white">FoodPhoto Studio</div>
          <p className="mt-3 text-sm text-neutral-400">
            Transforme fotos simples em imagens profissionais para delivery e redes sociais.
          </p>
          <div className="mt-4 flex items-center gap-3 text-neutral-400">
            <a className="rounded-lg p-2 hover:bg-neutral-800" href="#" aria-label="Facebook">
              <Facebook size={18} />
            </a>
            <a className="rounded-lg p-2 hover:bg-neutral-800" href="#" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a className="rounded-lg p-2 hover:bg-neutral-800" href="#" aria-label="Youtube">
              <Youtube size={18} />
            </a>
            <a className="rounded-lg p-2 hover:bg-neutral-800" href="#" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
          </div>
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
      <div className="border-t border-neutral-800 py-6 text-center text-xs text-neutral-500">
        © 2026 FoodPhoto Studio. Todos os direitos reservados.
      </div>
    </footer>
  );
}
