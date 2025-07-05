import { Link } from "react-router-dom";
import {
  Heart,
  BarChart3,
  Shield,
  Sparkles,
  ArrowRight,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";

const LandingPage = () => {
  const features = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Track Your Emotions",
      description:
        "Monitor your daily mood patterns with our intuitive and beautiful interface",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Insightful Analytics",
      description:
        "Understand your emotional trends with beautiful charts and meaningful insights",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Private & Secure",
      description:
        "Your emotional data is encrypted and completely private - only you can see it",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Personalized Insights",
      description:
        "Get personalized recommendations based on your unique emotional patterns",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Designer",
      content:
        "Mood has helped me understand my emotional patterns better than any other app. The insights are genuinely helpful!",
      rating: 5,
    },
    {
      name: "Marcus Johnson",
      role: "Software Engineer",
      content:
        "Simple, beautiful, and effective. I&apos;ve been tracking my mood for 6 months and it&apos;s been life-changing.",
      rating: 5,
    },
    {
      name: "Elena Rodriguez",
      role: "Therapist",
      content:
        "I recommend Mood to my clients. The data visualization helps them see patterns they never noticed before.",
      rating: 5,
    },
  ];

  const stats = [
    { number: "10K+", label: "Happy Users" },
    { number: "50K+", label: "Mood Entries" },
    { number: "98%", label: "User Satisfaction" },
    { number: "24/7", label: "Available" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Floating elements for visual interest */}
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
              <div className="inline-flex items-center space-x-2 bg-brown-100 text-brown-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                <span>Your emotional wellness journey starts here</span>
              </div>

              <h1 className="heading-xl mb-6 max-w-4xl mx-auto">
                Understand your emotions,
                <br />
                <span className="bg-gradient-to-r from-brown-600 to-brown-800 bg-clip-text text-transparent">
                  improve your wellbeing
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-brown-600 mb-8 max-w-3xl mx-auto font-light leading-relaxed">
                Track your daily moods, discover patterns, and build healthier
                emotional habits with our beautiful and intuitive mood tracking
                app.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/register" className="btn btn-primary space-x-2">
                <span>Start Your Journey</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/login" className="btn btn-secondary">
                Sign In
              </Link>
            </div>

            {/* Mood visualization */}
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

      {/* Stats Section */}
      <section className="py-16 px-4 bg-brown-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-brown-800 mb-2">
                  {stat.number}
                </div>
                <div className="text-brown-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">
              Everything you need to track your mood
            </h2>
            <p className="text-lg text-brown-600 max-w-2xl mx-auto font-light">
              Our app combines simplicity with powerful insights to help you
              understand your emotional patterns and build better habits.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-cream-50 to-brown-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Loved by thousands of users</h2>
            <p className="text-lg text-brown-600 max-w-2xl mx-auto font-light">
              See what our community has to say about their mood tracking
              journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-brown-700 mb-4 italic leading-relaxed">
                  &quot;{testimonial.content}&quot;
                </p>
                <div>
                  <div className="font-semibold text-brown-800">
                    {testimonial.name}
                  </div>
                  <div className="text-brown-600 text-sm">
                    {testimonial.role}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-brown-600">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h2
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "Noto Serif, serif" }}
            >
              Ready to start your emotional journey?
            </h2>
            <p className="text-xl text-brown-100 mb-8 font-light max-w-2xl mx-auto">
              Join thousands of users who&apos;ve discovered the power of
              understanding their emotions through mindful tracking.
            </p>
            <Link to="/register" className="btn btn-secondary space-x-2">
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="flex items-center justify-center space-x-6 text-brown-200 text-sm">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>100% Private</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>No Setup Required</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Join 10K+ Users</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brown-800 text-brown-100 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-1">
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
                Your companion for emotional wellness and mindful mood tracking.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="#"
                    className="text-brown-300 hover:text-white transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-brown-300 hover:text-white transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-brown-300 hover:text-white transition-colors"
                  >
                    Security
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-brown-300 hover:text-white transition-colors"
                  >
                    Roadmap
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="#"
                    className="text-brown-300 hover:text-white transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-brown-300 hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-brown-300 hover:text-white transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-brown-300 hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="#"
                    className="text-brown-300 hover:text-white transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-brown-300 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-brown-300 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-brown-300 hover:text-white transition-colors"
                  >
                    Status
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-brown-700 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-brown-300 text-sm">
              © 2024 Mood. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <Link
                to="#"
                className="text-brown-300 hover:text-white transition-colors"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
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
              <Link
                to="#"
                className="text-brown-300 hover:text-white transition-colors"
              >
                <span className="sr-only">LinkedIn</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
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
