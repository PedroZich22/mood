import { Link } from "react-router-dom";
import {
  Heart,
  BarChart3,
  Shield,
  ArrowRight,
} from "lucide-react";
import { Card } from "./ui/Card";

const LandingPage = () => {
  const features = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Entenda suas Emoções",
      description:
        "Registre seu humor diariamente e perceba o que realmente influencia seu bem-estar emocional.",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Encontre Padrões",
      description:
        "Revele tendências e conexões no seu estado emocional ao longo do tempo.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Segurança e Privacidade",
      description:
        "Seus dados são criptografados e visíveis apenas para você. Aqui, sua intimidade está protegida.",
    },
  ];


  return (
    <div className="min-h-screen">
      {/* Seção primera */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-brown-200 to-brown-300 rounded-full opacity-20 animate-bounce-subtle"></div>
          <div
            className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-cream-200 to-cream-300 rounded-full opacity-30 animate-bounce-subtle"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute bottom-20 left-1/4 w-12 h-12 bg-gradient-to-br from-sage-200 to-sage-300 rounded-full opacity-25 animate-bounce-subtle"
            style={{ animationDelay: "1s" }}
          ></div>

          <div className="text-center relative z-10">
            <div className="mb-8">
              <h1 className="heading-xl mb-6 max-w-4xl mx-auto">
                Entenda suas emoções,
                <br />
                <span className="bg-gradient-to-r from-brown-600 to-brown-800 bg-clip-text text-transparent">
                  melhore seu bem-estar
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-brown-600 mb-8 max-w-3xl mx-auto font-light leading-relaxed">
                Registre seus humores diários, descubra padrões e desenvolva hábitos emocionais mais saudáveis com nosso aplicativo intuitivo e bonito.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/register" className="btn btn-primary space-x-2">
                <span>Comece sua Jornada</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/login" className="btn btn-secondary">
                Entrar
              </Link>
            </div>

            {/* Emojis */}
            <div className="flex justify-center space-x-6 opacity-70">
              <div className="text-5xl animate-bounce-subtle">😢</div>
              <div
                className="text-5xl animate-bounce-subtle"
                style={{ animationDelay: "0.2s" }}
              >
                😐
              </div>
              <div
                className="text-5xl animate-bounce-subtle"
                style={{ animationDelay: "0.4s" }}
              >
                😊
              </div>
              <div
                className="text-5xl animate-bounce-subtle"
                style={{ animationDelay: "0.6s" }}
              >
                😄
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Funcionalidades */}
      <section className="pt-12 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Lista de funcionalidades */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="text-brown-600 mb-4 flex justify-center group-hover:scale-110 transition-transform">
                  <div className="w-12 h-12 bg-brown-100 rounded-xl flex items-center justify-center">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="heading-md mb-3">{feature.title}</h3>
                <p className="text-brown-600 font-light leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Seção Cadastro 2 */}
      {/* <section className="py-20 px-4 bg-brown-600">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h2
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "Noto Serif, serif" }}
            >
              Pronto para começar sua jornada emocional?
            </h2>
            <p className="text-xl text-brown-100 mb-8 font-light max-w-2xl mx-auto">
              Junte-se a milhares de pessoas que estão se conectando com seus sentimentos e cultivando o bem-estar emocional através do autoconhecimento.
            </p>
            <Link to="/register" className="btn btn-secondary space-x-2">
              <span>Comece Gratuitamente</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section> */}


      {/* Footer */}
      <footer className="bg-brown-800 text-brown-100 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Logo */}
            <div className="flex flex-col">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-brown-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span
                  className="text-2xl font-bold text-white"
                  style={{ fontFamily: "Noto Serif, serif" }}
                >
                  Mood
                </span>
              </div>
              <p className="text-brown-300 text-sm leading-relaxed">
                Seu companheiro para o bem-estar emocional.
              </p>
            </div>

            {/* Autores */}
            <div className="flex flex-col md:items-end md:text-right">
              <h4 className="font-semibold text-white mb-4">Autores</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="#"
                    className="text-brown-300 hover:text-white transition-colors"
                  >
                    Pedro Barros Zich
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-brown-300 hover:text-white transition-colors"
                  >
                    Sthefany Cristovam
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-brown-300 hover:text-white transition-colors"
                  >
                    Gustavo Silva Novais
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-brown-300 hover:text-white transition-colors"
                  >
                    João Vitor Leal
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Algumas infos */}
          <div className="border-t border-brown-700 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-brown-300 text-sm">
              © 2025 Mood. Todos direitos reservados.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <Link
                to="#"
                className="text-brown-300 hover:text-white transition-colors"
              >
                <span className="sr-only">GitHub</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
