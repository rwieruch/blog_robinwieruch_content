module.exports = {
  siteUrl: 'https://www.robinwieruch.de/',
  languageCode: 'en-US',

  // color theme
  theme: {
    primary: '#823EB7',
    fontPrimary: '#333333',
    backgroundPrimary: '#fff',
  },

  // can be specified in gatsby-config.js
  // default rss.xml
  rssUrl: 'index.xml',

  // can be specified in frontmatter
  title: 'RWieruch',
  // can be specified in frontmatter
  description:
    'Software Engineer for React.js, Node.js, GraphQL and JavaScript. Based in Berlin, German/English speaking. Consulting/Freelancing for Web Development project: Code Audits/Reviews, Workshops, Trainoing, Implementation ...',

  // can be specified in frontmatter
  author: 'Robin Wieruch',
  // can be specified in frontmatter
  keywords: [
    'freelancer',
    'consultant',
    'german',
    'berlin',
    'web development',
    'software engineer',
    'reactjs',
    'nodejs',
    'graphql',
  ],

  hashtags: ['#ReactJs'],

  blog: {
    // provide a link which is used with article's slug to edit article by reader
    // specify: provide contribute property as whole URL in frontmatter
    contributeBase:
      'https://github.com/rwieruch/blog_robinwieruch_content/edit/master/blog',

    // how many posts should show up on /category
    pagination: 10,

    slug: '/categories',

    otherCategories: {
      prefix: 'All about',
      suffix: '',
      labelFn: category => category,
      limit: 4,
    },

    configuredCategories: [
      {
        prefix: '',
        suffix: '',
        labelFn: () => 'Most recent articles',
        limit: 4,
        customCategory: true,
        byGrouping: {
          category: 'recent',
          categoryFn: edges =>
            edges.sort(
              (a, b) =>
                new Date(b.node.fields.date) - new Date(a.node.fields.date),
            ),
        },
      },
      // {
      //   prefix: 'All about',
      //   suffix: '',
      //   labelFn: () => 'Hormones',
      //   limit: 4,
      //   customCategory: false,
      //   byGrouping: {
      //     category: 'hormones',
      //   },
      // },
    ],
  },

  // analytics defined in .env file
  analytics: {
    enabled: true,
  },

  // goodie shown below each blog post
  goodie: {
    enabled: true,
    header: 'The Road to React',
    text:
      'Learn React by building real world applications. No setup configuration. No tooling. Plain React in 200+ pages of learning material. Learn React like <strong>50.000+ readers</strong>.',
    cta: 'Get the Book for free',
    ctaSecondary: 'Get it on Amazon.',
    url: 'https://roadtoreact.com/',
    urlSecondary: 'https://amzn.to/2LHjxRB',
  },

  // note shown below each blog psot
  note: {
    enabled: true,
    text:
      'If you found this blog post helpful, please consider supporting what I do.',
    cta: 'Support my Work',
    url: 'https://www.patreon.com/rwieruch',
  },

  // Navigation

  navigation: [
    { to: '/about', label: 'About' },
    { to: '/blog', label: 'Blog' },
  ],

  // Landing Page

  order: ['hero', 'about', 'services', 'portfolio', 'vita', 'testimonial'],

  hero: {
    header: 'Robin Wieruch',
    subheader: 'German Software Engineer for React.js, Node.js and GraphQL',
  },
  about: {
    enabled: true,
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
    enabled: true,
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
    enabled: true,
    header: 'Portfolio',
    subheader: 'What you can learn from me.',
    items: [
      {
        label: 'Online Courses',
        description: 'My in-depth content ...',
        url: 'https://roadtoreact.com',
      },
      {
        label: 'Open Source',
        description: 'My contributions ...',
        url: 'https://github.com/rwieruch',
      },
      {
        label: 'Tutorials',
        description: 'My free content ...',
        url: '/blog',
      },
    ],
  },
  vita: {
    enabled: true,
    header: 'Vita',
    subheader: 'My professional story.',
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
  testimonial: {
    enabled: false,
    header: 'Testimonials',
    subheader: 'What others are saying about my work.',
    items: [
      {
        label: 'Elena Miebach',
        sublabel: 'Greenyogashop',
        description:
          'Creative, passionate and professional. Liesa knows her business. She is easy to work with and delivers quality work, always before deadline. She is a great support for all tasks related to content creation, copywriting and PR.',
        url: 'https://www.greenyogashop.com/blog',
      },
      {
        label: 'Maike Bork',
        sublabel: 'Head of Brand at Delivery Hero GmbH',
        description:
          'As an external copywriter, Liesa is a great help to the entire team. She has adapted to our brand as well as to our tone of voice and audience extremely fast and has an excellent writing style. She is also able to nail the tone of voice for different online & offline channels, for Sales, and Social Media precisely and to the fullest satisfaction. Liesa is always reliable and does all the tasks quickly and carefully. The cooperation is always uncomplicated and super nice.',
        url: 'https://www.lieferheld.de',
      },
      {
        label: 'Caro Hobler',
        sublabel: 'Head of Content at Gymondo',
        description:
          'As an external writer, Liesa fits in very well with our brand and target group. She has a natural, modern writing style and writes well-researched blog posts for our online magazine. Working together is productive and enjoyable: Liesa is fast, careful, reliable and totally nice.',
        url: 'https://www.gymondo.de/magazin/author/liesa-huppertz',
      },
    ],
  },
  newsletter: {
    // Create a Revue Newsletter Account: https://www.getrevue.co/referrals/adNOMX8eMpOQ5ndAIyXovw
    // provide Revue API KEY as GATSBY_GET_REVUE_API_KEY in .env or .env.development/.env.production
    enabled: true,
    doubleOptIn: true,
    header: 'Take Part',
    subheader: 'Never miss an article about web development and JavaScript.',
    items: [
      'Join 40.000+ Developers',
      'Learn Web Development with JavaScript',
      'Tips and Tricks',
      'Access Tutorials, eBooks and Courses',
      'Personal Development as a Software Engineer',
    ],
  },
  subfooter: {
    enabled: true,
    items: [
      {
        label: 'Portfolio',
        items: [
          {
            label: 'Online Courses',
            url: 'https://roadtoreact.com/',
          },
          {
            label: 'Open Source',
            url: 'https://github.com/rwieruch',
          },
          {
            label: 'Tutorials',
            url: '/blog',
          },
        ],
      },
      {
        label: 'About',
        items: [
          {
            label: 'About me',
            url: '/about',
          },
          {
            label: 'What I use',
            url: '/about#what-i-use',
          },
          {
            label: 'How to work with me',
            url: '/work-with-me',
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
        url: 'https://www.github.com/rwieruch/',
      },
      {
        icon: 'facebook-round',
        url: 'https://www.facebook.com/rwieruch/',
      },
      {
        icon: 'instagram-round',
        url: 'https://www.instagram.com/rwieruch/',
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
        url: '/legal',
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
  disqus: {
    enabled: true,
    shortname: 'rwieruch',
    prefix: '',
    suffix: '',
  },
};
