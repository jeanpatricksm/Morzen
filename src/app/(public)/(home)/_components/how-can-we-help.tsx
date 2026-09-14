"use client";

import {
  ChevronRight,
  Layout,
  MonitorSmartphone,
  Smartphone,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    title: "Landing Pages",
    description:
      "Sites modernos, otimizados para causar impacto e essenciais para divulgar seus produtos e serviços.",
    icon: Layout,
  },
  {
    title: "Dashboards e Sistemas",
    description:
      "Painéis administrativos, ERPs, CRMs e sistemas pensados para a rotina do seu negócio.",
    icon: MonitorSmartphone,
  },
  {
    title: "Aplicativos Mobile",
    description:
      "Apps Android e iOS usando tecnologias modernas como React Native ou Jetpack Compose.",
    icon: Smartphone,
  },
] as const;

export function HowCanWeHelp() {
  return (
    <section
      id="how_can_we_help"
      className="relative z-10 lg:py-20 px-4 lg:h-screen flex justify-center items-center "
    >
      <div className="container mx-auto text-center">
        <Badge className="mb-4 bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-300 border-purple-500/20 dark:border-purple-500/30">
          Como podemos te ajudar?
        </Badge>

        <h2 className="text-4xl font-bold mb-4 text-foreground">
          Construindo sua ideia em software, com você.
        </h2>

        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          Conte-nos sua ideia e ajudaremos você a tirá-la do papel. Veja alguns
          exemplos do que podemos criar juntos:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 max-w-6xl w-full mx-auto">
          {services.map(({ title, description, icon: Icon }) => (
            <Card key={title} className=" hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-col items-center justify-center">
                <Icon className="w-8 h-8 text-purple-500 mb-2" />
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {description}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/new_project" passHref>
            <Button size="lg" className="text-base">
              Entre em contato <ChevronRight />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
