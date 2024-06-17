import { Button } from "@components/Button";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineCloud } from "react-icons/ai";

export default function Home() {
  return (
    <main className="flex flex-col pt-16 pb-28 gap-28">
      <div className="flex px-24 justify-between items-start">
        <div className="flex gap-20">
          <div className="flex items-center gap-1">
            <span>
              <AiOutlineCloud className="text-primary-65" size={34} />
            </span>
            <span className="text-primary-65 text-2xl font-semibold">Nimbus</span>
          </div>
          <div className="flex items-center gap-10">
            <Link href="#home" className="text-lg font-medium text-text-on-background">HOME</Link>
            <Link href="#solucao" className="text-lg font-medium text-text-on-background">SOLUÇÃO</Link>
            <Link href="#sobre" className="text-lg font-medium text-text-on-background">SOBRE</Link>
          </div>
        </div>
        <Link href="/login">
          <Button text="Log In" variant="outline" />
        </Link>
      </div>
      <section className="flex px-24 gap-6 justify-around min-h-fit" id="home">
        <div className="flex flex-col py-12 max-w-4xl gap-6">
          <h1 className="text-text-on-background text-5xl font-bold leading-relaxed">Explore dados meteorológicos de forma simples</h1>
          <div className="flex flex-col gap-4 max-w-2xl">
            <p className="text-text-on-background text-lg font-medium">Acesse informações sobre o ambiente e monitore as condições com dados coletados por estações próximas a você.</p>
            <Link href="/publico/estacoes">
              <Button text="Acessar >" variant="primary" />
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-6 py-10">
          <Image src="/weather-report.svg" alt="weather report" width={500} height={436.78} />
          <a className="text-text-on-background-disabled text-sm place-self-end" href="https://iconscout.com/illustrations/weather-report">Weather Report by Ira Design</a>
        </div>
      </section>
      <section className="flex py-40 justify-around bg-gradient-to-b from-primary-65 from-10% to-primary-30" id="solucao">
        <div className="bg-bg-100 flex flex-col gap-8 px-4 py-10 justify-center items-center max-w-60 rounded-md">
          <Image src="/station-icon.svg" alt="station icon" width={100} height={100} />
          <p className="text-text-on-background font-medium text-center">Dados coletados de estações metereológicas de baixo custo.</p>
        </div>
        <div className="bg-bg-100 flex flex-col gap-8 px-4 py-10 justify-center items-center max-w-60 rounded-md">
          <Image src="/wind-icon.svg" alt="station icon" width={100} height={100} />
          <p className="text-text-on-background font-medium text-center">Captação de diferentes sensores: termômetro, higrômetro, pluviômetro e
            <a href="/publico/tutorial" className="text-text-on-outlinebutton font-medium">
              mais
            </a>
            .
          </p>
        </div>
        <div className="bg-bg-100 flex flex-col gap-8 px-4 py-10 justify-center items-center max-w-60 rounded-md">
          <Image src="/dashboard-icon.svg" alt="station icon" width={100} height={100} />
          <p className="text-text-on-background font-medium text-center">Dashboards para visualização dos dados constantemente atualizados.</p>
        </div>
      </section>
      <section className="flex px-24 gap-28" id="sobre">
        <Image src="/station-example.png" alt="station example" width={500} height={334} className="rounded-md drop-shadow" />
        <div>
          <h2 className="text-primary-65 text-4xl font-bold">Sobre o Projeto</h2>
          <div className="flex flex-col gap-4 max-w-3xl">
            <p className="text-text-on-background text-lg font-medium text-justify">
              O Nimbus foi desenvolvido por alunos da FATEC de São José dos Campos em parceria com a Tecsus com objetivo de exibir os dados obtidos por estações meteorológicas, bem como divulgar detalhes sobre sua coleta e enfatizar a importância do monitoramento ambiental.
            </p>
            <a href="https://github.com/Equipe-Nimbus/API_DSM4-Equipe-Nimbus" target="_blank" className="text-secondary-65 font-medium">Mais detalhes sobre o processo</a>
          </div>
        </div>
      </section>
    </main>
  );
}
