import { ChevronRight } from "lucide-preact";
import { Footer } from "@/components/footer";

export function NotFound() {
  return (
    <>
      <main id="conteudo" className="mz-404">
        <div className="mz-404-art" aria-hidden="true">
          <img src="/art/codex-sky.webp" alt="" width={1600} height={894} decoding="async" />
          <span>404</span>
        </div>
        <h1>Essa página ficou fora de rota.</h1>
        <p>O endereço que você procurou não existe ou mudou de lugar.</p>
        <a className="mz-btn" href="/">
          Voltar ao início <ChevronRight aria-hidden="true" />
        </a>
      </main>
      <Footer />
    </>
  );
}
