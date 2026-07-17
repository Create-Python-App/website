import type { TemplatesData } from './schemas';

export const mockTemplatesData: TemplatesData = {
  categories: [
    {
      slug: 'frontend-applications',
      name: 'Frontend Applications',
      description: 'Templates for building modern web interfaces',
      details: 'Discover templates for React, Vue, and other frontend frameworks to build beautiful user interfaces.',
      labels: ['Frontend', 'UI', 'React', 'Vue', 'Web'],
    },
    {
      slug: 'backend-applications',
      name: 'Backend Applications',
      description: 'Templates for building robust server-side applications',
      details: 'Explore templates for Node.js, Express, NestJS, and other backend frameworks to build powerful APIs.',
      labels: ['Backend', 'API', 'Server', 'Node.js', 'Express', 'NestJS'],
    },
    {
      slug: 'fullstack-applications',
      name: 'Full Stack Applications',
      description: 'Templates for building complete web applications',
      details: 'Find templates for Next.js, Remix, and other full stack frameworks to build end-to-end applications.',
      labels: ['Fullstack', 'Next.js', 'Remix', 'SSR', 'API Routes'],
    },
    {
      slug: 'monorepo-boilerplate',
      name: 'Monorepo Boilerplate',
      description: 'Templates for managing multiple packages in a single repository',
      details:
        'Streamline development with monorepo templates using tools like Nx, Turborepo, and Lerna for efficient code sharing.',
      labels: ['Monorepo', 'Nx', 'Turborepo', 'Lerna', 'Workspace'],
    },
    {
      slug: 'user-acceptance-testing',
      name: 'User Acceptance Testing',
      description: 'Templates with built-in testing frameworks for end-to-end validation',
      details:
        'Ensure your applications meet user requirements with templates featuring Cypress, Playwright, or Selenium for comprehensive testing.',
      labels: ['Testing', 'UAT', 'Cypress', 'Playwright', 'Selenium', 'E2E'],
    },
    {
      slug: 'web-extension',
      name: 'Web Extension',
      description: 'Templates for building browser extensions and add-ons',
      details:
        'Develop cross-browser extensions with templates that support Chrome, Firefox, and Edge with modern web technologies.',
      labels: ['Extension', 'Browser', 'Chrome', 'Firefox', 'Edge', 'Add-on'],
    },
  ],
  templates: [
    {
      slug: 'react-vite-boilerplate',
      name: 'React Vite Boilerplate',
      description: 'A highly opinionated React boilerplate with Vite, TypeScript, ESLint, Prettier, and more.',
      url: 'https://github.com/Create-Node-App/cna-templates/tree/main/templates/react-vite-starter',
      type: 'react',
      category: 'frontend-applications',
      labels: ['React', 'Vite', 'TypeScript', 'ESLint', 'Prettier'],
    },
    {
      slug: 'nestjs-boilerplate',
      name: 'NestJS Boilerplate',
      description: 'A progressive Node.js framework for building efficient and scalable server-side applications.',
      url: 'https://github.com/Create-Node-App/cna-templates/tree/main/templates/nestjs-starter',
      type: 'nestjs',
      category: 'backend-applications',
      labels: ['NestJS', 'TypeScript', 'API', 'REST', 'Swagger'],
    },
    {
      slug: 'nextjs-starter',
      name: 'Next.js Starter',
      description: 'The React framework for production with server-side rendering and static site generation.',
      url: 'https://github.com/Create-Node-App/cna-templates/tree/main/templates/nextjs-starter',
      type: 'nextjs',
      category: 'fullstack-applications',
      labels: ['Next.js', 'React', 'TypeScript', 'SSR', 'API Routes'],
    },
  ],
  extensions: [
    {
      slug: 'material-ui',
      name: 'Material UI',
      description: 'Extension to add Material UI to your React app',
      url: 'https://github.com/Create-Node-App/cna-templates/tree/main/extensions/react-material-ui',
      type: 'react',
      category: 'UI',
      labels: ['React', 'Material UI', 'Components', 'Theming'],
    },
    {
      slug: 'tailwindcss',
      name: 'Tailwind CSS',
      description: 'Add Tailwind CSS to your project for utility-first styling',
      url: 'https://github.com/Create-Node-App/cna-templates/tree/main/extensions/tailwindcss',
      type: ['react', 'nextjs', 'vue'],
      category: 'UI',
      labels: ['Tailwind CSS', 'Styling', 'Utility Classes'],
    },
    {
      slug: 'github-setup',
      name: 'GitHub Setup',
      description: 'Configure GitHub Actions, PR templates, and more',
      url: 'https://github.com/Create-Node-App/cna-templates/tree/main/extensions/github-setup',
      type: ['react', 'nextjs', 'nestjs', 'express', 'vue'],
      category: 'DevOps',
      labels: ['GitHub', 'CI/CD', 'Actions', 'Templates'],
    },
  ],
};

// Helper function to get fallback data if API fails
export function getFallbackData(): TemplatesData {
  return mockTemplatesData;
}
