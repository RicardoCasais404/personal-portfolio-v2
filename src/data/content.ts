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
  ] as SocialLink[],
};

// --- DADOS DA SECÇÃO EDUCATION ---
export interface EducationItem {
  type: "school" | "certificate"; // Para podermos dar estilos diferentes se quisermos
  title: string;
  institution: string;
  description?: string; // Opcional
  link?: {
    text: string;
    url: string;
  };
}

export const educationData = {
  titlePart1: "EDUCATION AND",
  titlePart2: "CERTIFICATIONS",
  items: [
    {
      type: "school",
      title: "HIGH SCHOOL, PROFESSIONAL TRAINING PROGRAM",
      institution: "MULTIMEDIA TECHNIQUES",
      link: {
        text: "View school program",
        url: "https://www.eseqmultimedia.net/site/",
      },
      description:
        "A comprehensive program focused on multimedia production, covering graphic design, web development fundamentals, video editing, and 2D/3D animation.",
    },
    {
      type: "certificate",
      title: "CODE FOUNDATIONS",
      institution: "CODECADEMY",
      link: {
        text: "View certificate",
        url: "src/certificates/code-foundations.pdf",
      },
      description:
        "Gained a solid introduction to the core principles of programming, including syntax, control flow, and data types. Explored the fundamental workings of the web, such as the client-server model and HTTP requests.",
    },
    {
      type: "certificate",
      title: "COMPUTER SCIENCE",
      institution: "CODECADEMY",
      link: {
        text: "View certificate",
        url: "src/certificates/computer-science.pdf",
      },
      description:
        "A comprehensive path focused on the theoretical foundations of programming. Mastered essential data structures like stacks, queues, and trees, and learned to analyze the efficiency of algorithms using Big O notation.",
    },
    {
      type: "certificate",
      title: "UX DESIGN",
      institution: "CODECADEMY",
      link: { text: "View certificate", url: "/certificates/ux-design.pdf" },
      description:
        "Developed a strong understanding of the end-to-end UX design process. Practiced key skills including user research, persona creation, wireframing, building interactive prototypes, and conducting usability testing.",
    },
    {
      type: "certificate",
      title: "FRONT-END ENGINEERING",
      institution: "CODECADEMY",
      link: {
        text: "View certificate",
        url: "src/certificates/front-end-engineering.pdf",
      },
      description:
        "An in-depth career path focused on building modern, responsive, and interactive user interfaces. Mastered front-end technologies including HTML5, CSS3, JavaScript (ES6+), and gained proficiency in the React ecosystem.",
    },
    {
      type: "certificate",
      title: "FULL-STACK ENGINEERING",
      institution: "CODECADEMY",
      link: {
        text: "View certificate",
        url: "src/certificates/full-stack-engineering.pdf",
      },
      description:
        "An intensive, end-to-end program covering the entire web development stack. Built upon front-end skills with back-end technologies, including Node.js, Express, and PostgreSQL.",
    },
  ] as EducationItem[],
};
