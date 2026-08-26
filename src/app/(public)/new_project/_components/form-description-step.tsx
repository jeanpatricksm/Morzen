import { type FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, ValidationError } from "@formspree/react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Project } from "../projects";

type ProjectFormFields = {
  name: string;
  email: string;
  phone?: string;
  description: string;
  projectTitle: string;
  honey?: string;
};

interface FormDescriptionProps {
  selectedProject?: Project;
  handleBack: VoidFunction;
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 2) return digits;

  const areaCode = digits.slice(0, 2);
  const phoneNumber = digits.slice(2);

  if (phoneNumber.length <= 4) return `(${areaCode}) ${phoneNumber}`;

  if (digits.length <= 10) {
    return `(${areaCode}) ${phoneNumber.slice(0, 4)}-${phoneNumber.slice(4)}`;
  }

  return `(${areaCode}) ${phoneNumber.slice(0, 5)}-${phoneNumber.slice(5)}`;
}

export function FormDescriptionStep({
  selectedProject,
  handleBack,
}: FormDescriptionProps) {
  const router = useRouter();
  const [formState, submitToFormspree] =
    useForm<ProjectFormFields>("mbgjrgwq");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [honeyPot, setHoneyPot] = useState("");

  useEffect(() => {
    if (!formState.succeeded) return;

    toast("Recebemos sua ideia. Em breve a Morzen entra em contato.");
    setName("");
    setEmail("");
    setPhone("");
    setDescription("");
    setHoneyPot("");

    const redirectTimeout = window.setTimeout(() => {
      router.push("/");
    }, 3000);

    return () => window.clearTimeout(redirectTimeout);
  }, [formState.succeeded, router]);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if (honeyPot) {
      e.preventDefault();
      return;
    }

    await submitToFormspree(e);
  };

  return (
    <div className="morzen-project-form mx-auto flex w-full max-w-2xl flex-col items-center gap-7 p-6 sm:p-10">
      <div className="w-full">
        <p className="morzen-eyebrow">Etapa 02</p>
        <h2 className="mt-4 text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
          Vamos entender o seu desafio.
        </h2>
        <p className="mt-3 leading-7 text-black/58">
          Compartilhe o contexto, os objetivos e o que precisa melhorar. A
          gente responde para conversar sobre os próximos passos.
        </p>
      </div>

      {selectedProject && (
        <div className="morzen-project-selected w-full px-4 py-3 text-sm text-black/58">
          Você quer começar por:{" "}
          <span className="font-semibold text-black">
            {selectedProject.title}
          </span>
        </div>
      )}

      <form className="w-full space-y-5" onSubmit={handleFormSubmit}>
        <input
          type="hidden"
          name="projectTitle"
          value={selectedProject?.title ?? "Não informado"}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium text-black/72" htmlFor="nome">
              Nome
            </Label>
            <Input
              id="nome"
              name="name"
              className="morzen-form-control"
              placeholder="Seu nome"
              value={name}
              minLength={1}
              maxLength={128}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={Boolean(formState.errors?.getFieldErrors("name").length)}
              required
            />
            <ValidationError
              field="name"
              errors={formState.errors}
              className="text-sm leading-6 text-red-600"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium text-black/72" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              className="morzen-form-control"
              placeholder="Seu melhor email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={512}
              aria-invalid={Boolean(formState.errors?.getFieldErrors("email").length)}
              required
            />
            <ValidationError
              field="email"
              errors={formState.errors}
              className="text-sm leading-6 text-red-600"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium text-black/72" htmlFor="telefone">
            Telefone <span className="text-black/42">opcional</span>
          </Label>
          <Input
            id="telefone"
            name="phone"
            type="tel"
            className="morzen-form-control"
            placeholder="(11) 91234-5678"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            maxLength={15}
            inputMode="numeric"
            pattern="\\([0-9]{2}\\) [0-9]{4,5}-[0-9]{4}"
            title="Use o formato (xx) xxxxx-xxxx"
            autoComplete="tel"
          />
          <ValidationError
            field="phone"
            errors={formState.errors}
            className="text-sm leading-6 text-red-600"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium text-black/72" htmlFor="desc">
            Qual desafio você quer resolver?
          </Label>
          <Textarea
            id="desc"
            name="description"
            rows={8}
            cols={4}
            className="morzen-form-control min-h-56 resize-y"
            placeholder="Conte o que está acontecendo e o que você gostaria de melhorar"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            minLength={4}
            maxLength={1024}
            aria-invalid={Boolean(
              formState.errors?.getFieldErrors("description").length,
            )}
            required
          />
          <ValidationError
            field="description"
            errors={formState.errors}
            className="text-sm leading-6 text-red-600"
          />
          <p className="text-sm leading-6 text-black/48">
            Quanto mais contexto você compartilhar, melhor conseguimos pensar
            junto com você.
          </p>
        </div>
        <div className="hidden">
          <label htmlFor="honey">Deixe este campo em branco</label>
          <input
            type="text"
            id="honey"
            name="honey"
            value={honeyPot}
            onChange={(e) => setHoneyPot(e.target.value)}
            autoComplete="off"
            tabIndex={-1}
          />
        </div>
        <ValidationError
          errors={formState.errors}
          className="text-sm leading-6 text-red-600"
        />
        <div className="flex w-full flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-between">
          <Button
            variant="ghost"
            className="morzen-project-back rounded-full px-5 text-black"
            onClick={handleBack}
            type="button"
            disabled={formState.submitting}
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Voltar
          </Button>
          <Button
            type="submit"
            variant="ghost"
            className="morzen-project-submit rounded-full px-6 text-white"
            disabled={formState.submitting}
          >
            {formState.submitting
              ? "Enviando sua mensagem..."
              : "Quero conversar sobre isso"}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </form>
    </div>
  );
}
