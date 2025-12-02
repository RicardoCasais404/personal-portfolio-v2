// Definimos o formato dos links sociais para o TypeScript não reclamar
export interface SocialLink {
  name: string;
  href: string;
  label: string;
}

// --- DADOS DA SECÇÃO ABOUT ---
export const aboutData = {
  title: "ABOUT ME",
  paragraphs: [
    "Hello! My name is Ricardo, I'm based in Portugal and I'm a creative and driven Full-Stack Engineer-in-training with a strong passion for front-end development and visual design.",
    "I specialize in crafting beautiful, animated, and dynamic websites by pairing modern JavaScript frameworks with expressive, well-structured CSS. My focus is on building engaging user experiences that are not only performant and accessible but also visually captivating.",
    "While my heart lies in front-end development, I'm actively expanding my skills in backend architecture to become a well-rounded developer. I love turning ideas into interactive digital experiences and continuously push myself to learn, experiment, and grow.",
  ],
  socials: [
    {
      name: "GitHub",
      href: "https://github.com/RicardoCasais404", // Substitui se tiveres o link real
      label: "Visit my GitHub",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/ricardocasais404/",
      label: "Visit my LinkedIn",
    },
    {
      name: "Email",
      href: "mailto:ricardo.casais.404@example.com", // Substitui pelo teu real
      label: "Send me an email",
    },
  ] as SocialLink[],
};
