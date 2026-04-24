const skills = {
  // Frontend
  HTML: { label: "HTML", icon: "fa-brands fa-html5", category: "frontend" },
  CSS: { label: "CSS", icon: "fa-brands fa-css3-alt", category: "frontend" },
  JAVASCRIPT: { label: "JavaScript", icon: "fa-brands fa-js", category: "frontend" },
  TYPESCRIPT: { label: "TypeScript", icon: "fa fa-code", category: "frontend" },
  REACT: { label: "React", icon: "fa-brands fa-react", category: "frontend" },
  NEXTJS: { label: "Next.js", icon: "fa fa-code", category: "frontend" },
  VUE: { label: "Vue", icon: "fa fa-vuejs", category: "frontend" },
  ANGULAR: { label: "Angular", icon: "fa fa-angular", category: "frontend" },
  SVELTE: { label: "Svelte", icon: "fa fa-code", category: "frontend" },
  TAILWINDCSS: { label: "Tailwind CSS", icon: "fa fa-wind", category: "frontend" },
  BOOTSTRAP: { label: "Bootstrap", icon: "fa fa-bootstrap", category: "frontend" },
  SASS: { label: "Sass", icon: "fa fa-sass", category: "frontend" },
  REDUX: { label: "Redux", icon: "fa fa-code", category: "frontend" },
  ZUSTAND: { label: "Zustand", icon: "fa fa-code", category: "frontend" },
  FRAMERMOTION: { label: "Framer Motion", icon: "fa fa-code", category: "frontend" },

  // Backend
  NODEJS: { label: "Node.js", icon: "fa fa-node", category: "backend" },
  EXPRESS: { label: "Express", icon: "fa fa-code", category: "backend" },
  DJANGO: { label: "Django", icon: "fa fa-code", category: "backend" },
  FLASK: { label: "Flask", icon: "fa fa-code", category: "backend" },
  FASTAPI: { label: "FastAPI", icon: "fa fa-code", category: "backend" },
  LARAVEL: { label: "Laravel", icon: "fa fa-laravel", category: "backend" },
  SPRINGBOOT: { label: "Spring Boot", icon: "fa fa-code", category: "backend" },
  NESTJS: { label: "NestJS", icon: "fa fa-code", category: "backend" },
  RUBYONRAILS: { label: "Ruby on Rails", icon: "fa fa-code", category: "backend" },

  // Programming Language
  PYTHON: { label: "Python", icon: "fa fa-python", category: "language" },
  JAVA: { label: "Java", icon: "fa fa-java", category: "language" },
  C: { label: "C", icon: "fa fa-code", category: "language" },
  CPP: { label: "C++", icon: "fa fa-code", category: "language" },
  CSHARP: { label: "C#", icon: "fa fa-code", category: "language" },
  GO: { label: "Go", icon: "fa fa-code", category: "language" },
  RUST: { label: "Rust", icon: "fa fa-code", category: "language" },
  PHP: { label: "PHP", icon: "fa fa-php", category: "language" },
  KOTLIN: { label: "Kotlin", icon: "fa fa-code", category: "language" },
  SWIFT: { label: "Swift", icon: "fa fa-code", category: "language" },

  // Database
  MYSQL: { label: "MySQL", icon: "fa fa-database", category: "database" },
  POSTGRESQL: { label: "PostgreSQL", icon: "fa fa-database", category: "database" },
  MONGODB: { label: "MongoDB", icon: "fa fa-leaf", category: "database" },
  SQLITE: { label: "SQLite", icon: "fa fa-database", category: "database" },
  REDIS: { label: "Redis", icon: "fa fa-database", category: "database" },
  FIREBASE: { label: "Firebase", icon: "fa fa-fire", category: "database" },
  SUPABASE: { label: "Supabase", icon: "fa fa-database", category: "database" },

  // DevOps & Cloud
  DOCKER: { label: "Docker", icon: "fa fa-docker", category: "devops" },
  KUBERNETES: { label: "Kubernetes", icon: "fa fa-code", category: "devops" },
  NGINX: { label: "Nginx", icon: "fa fa-code", category: "devops" },
  GITHUBACTIONS: { label: "GitHub Actions", icon: "fa fa-github", category: "devops" },
  CICD: { label: "CI/CD", icon: "fa fa-code", category: "devops" },
  AWS: { label: "AWS", icon: "fa fa-aws", category: "devops" },
  GCLOUD: { label: "Google Cloud", icon: "fa fa-cloud", category: "devops" },
  AZURE: { label: "Azure", icon: "fa fa-cloud", category: "devops" },
  CLOUDFLARE: { label: "Cloudflare", icon: "fa fa-cloud", category: "devops" },
  VERCEL: { label: "Vercel", icon: "fa fa-code", category: "devops" },
  NETLIFY: { label: "Netlify", icon: "fa fa-code", category: "devops" },

  // Tools
  GIT: { label: "Git", icon: "fa fa-git-alt", category: "tools" },
  GITHUB: { label: "GitHub", icon: "fa fa-github", category: "tools" },
  GITLAB: { label: "GitLab", icon: "fa fa-gitlab", category: "tools" },
  BITBUCKET: { label: "Bitbucket", icon: "fa fa-bitbucket", category: "tools" },
  POSTMAN: { label: "Postman", icon: "fa fa-paper-plane", category: "tools" },
  FIGMA: { label: "Figma", icon: "fa fa-figma", category: "tools" },
  JIRA: { label: "Jira", icon: "fa fa-code", category: "tools" },
  SLACK: { label: "Slack", icon: "fa fa-slack", category: "tools" }
};

export function getSkills(list){
  const normalize = (s) => s.trim().toUpperCase();

  return list.map((skill) => {
    const key = normalize(skill);

    return skills[key] || {
      label: skill,
      icon: "fa fa-question",
      category: "unknown"
    };
  });
}