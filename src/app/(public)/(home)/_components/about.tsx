import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import Image from "next/image";

export function About() {
  return (
    <section id="about" className="relative z-10 py-20 lg:py-0 px-4 mt-35">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-4 bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-300 border-purple-500/20 dark:border-purple-500/30">
              Sobre a Morzen
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Inovação e excelência em cada linha de código
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 leading-relaxed">
              Somos uma startup focada em desenvolvimento de software de alta
              qualidade. Nossa missão é transformar ideias em soluções digitais
              que geram valor real para nossos clientes.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-purple-500" />
                <span className="text-gray-600 dark:text-gray-300">
                  Equipe especializada e experiente
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-purple-500" />
                <span className="text-gray-600 dark:text-gray-300">
                  Metodologias ágeis e modernas
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-purple-500" />
                <span className="text-gray-600 dark:text-gray-300">
                  Suporte contínuo e manutenção
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-purple-500" />
                <span className="text-gray-600 dark:text-gray-300">
                  Foco em performance e escalabilidade
                </span>
              </div>
            </div>
          </div>
          <div className="relative flex gap-4 lg:ml-15">
            <a
              href="https://www.linkedin.com/in/diegorezm/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Perfil do LinkedIn do Diego"
              className="group relative block w-full overflow-hidden rounded-lg shadow-sm border transform transition-transform duration-300 hover:scale-105"
            >
              <Image
                src="/diego_about_pic.webp"
                alt="Diego, membro da equipe Morzen"
                width={800}
                height={800}
                className="rounded-lg object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                <span className="text-white font-semibold text-lg">Diego</span>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/jeanpatrickm/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Perfil do LinkedIn do Jean"
              className="group relative block w-full overflow-hidden rounded-lg shadow-sm border transform transition-transform duration-300 hover:scale-105"
            >
              <Image
                src="/jean_about_pic.webp"
                alt="Jean, membro da equipe Morzen"
                width={800}
                height={800}
                className="rounded-lg object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                <span className="text-white font-semibold text-lg">Jean</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
