module.exports = {
  siteUrl: 'https://www.robinwieruch.de/',
  languageCode: 'en-US',

  // manifest
  manifest: {
    name: 'Robin Wieruch - Freelance Web Developer',
    short_name: 'RW',
    start_url: '/',
    background_color: '#fff',
    theme_color: '#823EB7',
    display: 'standalone',
    icon: 'static/icon.png',
  },

  // sitemap
  sitemap: {
    enabled: true,
    exclude: [
      '/legal',
      '/categories/recent/**',
      '/categories/react/**',
      '/categories/javascript/**',
      '/categories/freelance/**',
      '/categories/react-table-library/**',
      '/categories/tooling/**',
      '/categories/webpack/**',
      '/categories/babel/**',
      '/categories/eslint/**',
      '/categories/react-native/**',
      '/categories/firebase/**',
      '/categories/web-development/**',
      '/categories/deno/**',
      '/categories/node/**',
      '/categories/docker/**',
      '/categories/redux/**',
      '/categories/jest/**',
      '/categories/nextjs/**',
      '/categories/enzyme/**',
      '/categories/gatsby/**',
      '/categories/vs-node/**',
      '/categories/web-components/**',
      '/categories/mobx/**',
      '/categories/reason/**',
      '/categories/graphql/**',
      '/categories/angular/**',
      '/categories/vue/**',
      '/categories/machine-learning/**',
      '/categories/growth/**',
      '/categories/d3/**',
    ],
  },

  // can be specified in gatsby-config.js
  // default rss.xml
  rssUrl: 'index.xml',

  // can be specified in frontmatter
  title: 'Robin Wieruch - Freelance Web Developer',
  // can be specified in frontmatter
  description:
    'Freelance Web Developer for React.js, Next.js and Node.js. Based in Berlin, German/English speaking. Consulting/Freelancing for Web Development project: Code Audits/Reviews, Workshops, Training, Implementation ...',

  // can be specified in frontmatter
  author: 'Robin Wieruch',
  // can be specified in frontmatter
  keywords: ['freelance', 'react', 'developer'],

  monetization: '$ilp.uphold.com/xBpREnjPwD4j',

  hashtags: ['#ReactJs'],

  blog: {
    enabled: true,
    // provide a link which is used with article's slug to edit article by reader
    // specify: provide contribute property as whole URL in frontmatter
    contributeBase:
      'https://github.com/rwieruch/blog_robinwieruch_content/edit/master/blog',

    // how many posts should show up on /category
    pagination: 10,

    slug: '/categories',

    otherCategories: {
      prefix: 'Read more about',
      suffix: '',
      labelFn: (category) => category,
      limit: 4,
    },

    configuredCategories: [
      {
        prefix: '',
        suffix: '',
        labelFn: () => 'Recent articles',
        limit: 4,
        customCategory: true,
        byGrouping: {
          category: 'recent',
          categoryFn: (edges) =>
            edges.sort(
              (a, b) =>
                new Date(b.node.fields.date) - new Date(a.node.fields.date)
            ),
        },
      },
      {
        prefix: '',
        suffix: '',
        labelFn: () => 'Getting Started Tutorials',
        limit: 4,
        customCategory: false,
        byGrouping: {
          category: 'Starter',
        },
      },
    ],
  },

  // analytics defined in .env file
  analytics: {
    enabled: false,
  },

  // goodie shown below each blog post
  goodie: {
    enabled: true,
    header: 'The Road to React',
    text: 'Learn React by building real world applications. No setup configuration. No tooling. Plain React in 200+ pages of learning material. Learn React like <strong>50.000+ readers</strong>.',
    cta: 'Get the Book',
    ctaSecondary: 'Get it on Amazon.',
    url: 'https://courses.robinwieruch.de',
    urlSecondary: 'https://amzn.to/2LHjxRB',
  },

  // Navigation

  navigation: {
    enabled: true,
    hasLogo: true,
    links: [
      { to: '/work-with-me/', label: 'Hire' },
      { to: '/blog/', label: 'Blog' },
      { to: '/about/', label: 'About' },
      { to: 'https://courses.robinwieruch.de', label: 'Courses' },
      { to: '/index.xml', label: 'RSS' },
    ],
  },

  // Landing Page

  pattern: '',

  lazyLanding: [
    'Hero',
    'About',
    'Services',
    'Portfolio',
    'Vita',
    'Testimonial',
  ],
  hero: {
    header: 'Robin Wieruch',
    subheader:
      'Freelance Web Developer for React.js, Next.js in TypeScript and JavaScript',
  },
  bait: {
    header: '',
    subheader: '',
    features: [
      {
        description: '',
        label: '',
      },
    ],
  },
  ppp: {
    header: '',
    subheader: '',
    suffix: '',
  },
  about: {
    header: 'About me',
    subheader: 'Get to know me before you dive into my content.',
    social: [
      {
        icon: 'twitter-round',
        url: 'https://twitter.com/rwieruch',
      },
      {
        icon: 'github-round',
        url: 'https://www.github.com/rwieruch/',
      },
      {
        icon: 'facebook-round',
        url: 'https://www.facebook.com/rwieruch/',
      },
      { icon: 'email', url: 'mailto:hello@rwieruch.com' },
    ],
    text: `
      <p>I am a self-employed software and web engineer dedicated to learning and teaching JavaScript for client-server architectures. After obtaining my Master's Degree in computer science, I gained experience from the startup world, where I used JavaScript intensively during both my professional life and spare time. Eventually it led me to teach others about these topics and to offer online courses and on-site consulting for companies. I am happy to welcome you on my website :-)</p>
    `,
  },
  services: {
    header: 'What I offer',
    subheader: 'Why you might want to hire me.',
    items: [
      {
        icon: 'plant-pot',
        label: 'Workshops',
        description:
          'Teaching your team on-site/remote to get them up to speed with the latest web technologies for client-server applications in JavaScript.',
      },
      {
        icon: 'health-care',
        label: 'Code Audit',
        description:
          'Conducting code reviews for your JavaScript application together with your team or a single person which usually last 2-3 days.',
      },
      {
        icon: 'man-in-a-party-dancingW-with-people',
        label: 'MVP',
        description:
          'Bringing your idea to code from zero to one as a minimal viable product (MVP) and beyond within a well-architected application.',
      },

      {
        icon: 'search-data',
        label: 'Complex Problems',
        description:
          "Solving complex problems in JavaScript code which you want to have eliminated in your application's code base but no one dares to fix.",
      },
      {
        icon: 'megaphone',
        label: 'Writing Code',
        description:
          'Coding along with your team on a large scale application to make your customers happy with new features and performance improvements.',
      },
      {
        icon: 'feather',
        label: 'Technical Writing',
        description:
          'Writing tutorials about your technical product, open source work, or API (all related to JavaScript) to get more publicity for it.',
      },
    ],
  },
  portfolio: {
    header: 'Portfolio',
    subheader: 'What you can learn from me.',
    items: [
      {
        label: 'Online Courses',
        description: 'My in-depth content ...',
        url: 'https://courses.robinwieruch.de',
      },
      {
        label: 'Open Source',
        description: 'My contributions ...',
        url: 'https://github.com/rwieruch',
      },
      {
        label: 'Tutorials',
        description: 'My free content ...',
        url: '/blog/',
      },
    ],
  },
  vita: {
    header: 'Vita',
    subheader: 'My professional story.',
    themed: false,
    lastItem: 'Be part of my story.',
    items: [
      {
        label: 'Master of Science',
        description:
          '<p>I graduated with a master of science in computer science. Lots of this knowledge can be applied for more complex problems in client-server architectures.</p>',
        year: '2009 - 2014',
      },
      {
        label: 'Freelancer',
        description:
          '<p>While studing computer science, I got my hands dirty by writing JavaScript, Java, and C# applications for several clients in Germany.</p>',
        year: '2010 - 2014',
      },
      {
        label: 'Startups',
        description:
          '<p>I worked closely with an exceptional team of engineers at a company in Berlin developing large scale applications for thousands of customers.</p>',
        year: '2014 - 2017',
      },
      {
        label: 'React Book',
        description:
          '<p>This year I published my first book about React.js. Within the first month it had more than 10.000 readers and today it is one of the most popular React.js books.</p>',
        year: '2016',
      },
      {
        label: 'Redux Book',
        description:
          '<p>I published my second book about state management with Redux in React.js which I took one level further by packaging it as a full-blown online course.</p>',
        year: '2017',
      },
      {
        label: 'GraphQL Book',
        description:
          '<p>As an early adopter of GraphQL in my recent jobs, I wrote my third book about it for modern client-server applications using GraphQL in JavaScript.</p>',
        year: '2018',
      },
      {
        label: 'Developer Magazines',
        description:
          '<p>Every other month I write for a German software developer magazine educational content about JavaScript and its ecosystem.</p>',
        year: '2018',
      },
      {
        label: 'Firebase Book',
        description:
          '<p>Later this year, I published my fourth book/course about Firebase in React to build modern frontend applications without worrying about your backend application.</p>',
        year: '2018',
      },
      {
        label: 'Self-Employed',
        description:
          '<p>Lots of demand for JavaScript on-site or remote training, implementations for MVPs, code reviews, or complex JavaScript problem solving, led me to being self-employed.</p>',
        year: '2017 - TODAY',
      },
    ],
  },
  table: {
    header: '',
    subheader: '',
    chapters: [
      {
        label: '',
        sections: [''],
      },
    ],
    secondaryHeader: '',
    secondarySubheader: '',
    curriculum: [
      {
        label: '',
        type: '',
        sections: [''],
      },
    ],
  },
  sproof: {
    header: '',
    subheader: '',
    cites: [
      {
        author: '',
        url: '',
        text: '',
      },
    ],
    tweets: [''],
  },
  testimonial: {
    header: 'Testimonials',
    subheader: 'What industry leaders are saying',
    items: [
      {
        label: 'Shawn Wang',
        sublabel: 'Developer Experience at Netlify',
        description:
          'Robin is one of the most consistently high quality React educators. His approach directly addresses practical concerns you *will* face in your daily React work, without talking down to you or wasting your time with fluff. Don’t just take my word for it - look at his public work and you’ll see.',
        url: 'https://twitter.com/swyx',
      },
      {
        label: 'Tania Rascia',
        sublabel: 'JS Dev, Online Educator',
        description:
          "Robin is an excellent teacher. His articles and tutorials are in-depth and informative, and his code is clear and concise. I've found an answer on his site countless times when researching a problem, and I know that's one less article I have to write.",
        url: 'https://twitter.com/taniarascia',
      },
      {
        label: 'Kent C. Dodds',
        sublabel: 'Full-time JavaScript Instructor',
        description: `Everything that I've read from Robin has been top tier quality stuff. There are blog posts that I have wanted to write, but then I found one by Robin and decided I didn't need to. Fantastic content 💯`,
        url: 'https://twitter.com/kentcdodds',
      },
      {
        label: 'Christian Nwamba',
        sublabel: 'JS Dev, Organizer of Concatenate',
        description:
          'You can tell how much time Robin has put into a teaching piece when you consume his content. I have partnered with Robin and he sets the bar high for other teachers and content creators – this results to a quality learning ecosystem for his students regardless if a content or course was thought by him or not.',
        url: 'https://twitter.com/codebeast',
      },
      {
        label: 'Dan Abramov',
        sublabel: 'React.js Core Team',
        description:
          "I haven't read this book yet, but the previous educational materials made by Robin were nothing short of amazing. Thanks for creating this content and putting it out there!",
        url: 'http://twitter.com/dan_abramov',
      },
      {
        label: 'Preethi Kasireddy',
        sublabel: 'Founder & CEO of TruStory',
        description:
          "If it's anything to do with React and it's written by Robin, you can trust that it'll be world-class. His books are some of the best content you'll find on the web for learning React.",
        url: 'https://twitter.com/iam_preethi',
      },
      {
        label: 'Kamran Ahmed',
        sublabel: 'Founder & CEO of roadmap.sh',
        description:
          "I have known Robin through his content for 5+ years; I have read his books and several of his blog posts. Robin is an excellent teacher and content creator. I can guarantee that you'll be hard pressed to find anyone knowing React and the ecosystem more than Robin.",
        url: 'https://roadmap.sh/',
      },
    ],
  },
  faq: {
    header: '',
    subheader: '',
    items: [
      {
        label: '',
        description: '',
      },
    ],
  },
  sale: {
    header: '',
    subheader: '',
    courseUrl: '',
    courseId: '',
  },
  newsletter: {
    enabled: true,
    header: 'Take Part',
    subheader: 'Never miss an article about web development and JavaScript.',
    items: [
      'Join 50.000+ Developers',
      'Learn Web Development',
      'Learn JavaScript',
      'Access Tutorials, eBooks and Courses',
      'Personal Development as a Software Engineer',
    ],
    url: 'https://rwieruch.substack.com/',
  },
  subfooter: {
    enabled: true,
    items: [
      {
        label: 'Portfolio',
        items: [
          {
            label: 'Online Courses',
            url: 'https://courses.robinwieruch.de',
          },
          {
            label: 'Open Source',
            url: 'https://github.com/rwieruch',
          },
          {
            label: 'Tutorials',
            url: '/blog/',
          },
        ],
      },
      {
        label: 'About',
        items: [
          {
            label: 'About me',
            url: '/about/',
          },
          {
            label: 'How to work with me',
            url: '/work-with-me/',
          },
          {
            label: 'What I use',
            url: '/about#what-i-use',
          },
          {
            label: 'How to support me',
            url: '/about#support-me',
          },
        ],
      },
    ],
  },
  footer: {
    copyright: '© Robin Wieruch',
    social: [
      {
        icon: 'twitter-round',
        url: 'https://twitter.com/rwieruch',
      },
      {
        icon: 'github-round',
        url: 'https://www.github.com/rwieruch',
      },
      {
        icon: 'facebook-round',
        url: 'https://www.facebook.com/rwieruch',
      },
      { icon: 'email', url: 'mailto:hello@rwieruch.com' },
    ],
    links: [
      {
        label: 'Contact Me',
        url: 'mailto:hello@rwieruch.com',
      },
      {
        label: 'Privacy & Terms',
        url: '/legal/',
      },
    ],
  },

  // Social Media

  share: ['facebook', 'twitter', 'linkedin'],
  follow: ['twitter', 'facebook'],
  socialHandles: {
    instagram: 'rwieruch',
    twitter: 'rwieruch',
    github: 'rwieruch',
    facebook: 'rwieruch',
  },
};
