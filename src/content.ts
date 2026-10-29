export const intro = {
  location: 'Portland, OR',
  greeting: "Hi, I'm Jonathan.",
  lead: "I'm a senior full-stack engineer who builds the platforms other engineers quietly rely on, then makes them a little less painful to use.",
  status: 'Always looking for new adventures',
}

export const about =
  "I've spent more than 15 years building software in Portland, most recently on the internal platforms Nike's engineers used to find documentation, ship services, and manage access. I care about the unglamorous parts done well: clear ownership, infrastructure as code, and automation that gives people their time back. My favorite work sits where product and engineering meet, talking with the people who use a tool and then making it better for them."

export type Role = {
  company: string
  title: string
  years: string
  story?: string
}

export const career: Role[] = [
  {
    company: 'Nike',
    title: 'Senior Software Engineer',
    years: '2018 - 2026',
    story:
      "Built and ran internal developer platforms used by thousands of engineers, including Nike's Backstage developer portal, documentation search, and the entitlements service behind employee access. Along the way, I automated the routine work around them with CI/CD and AI agents.",
  },
  {
    company: 'InComm Digital Solutions',
    title: 'Software Engineer',
    years: '2014 - 2018',
    story:
      'Helped grow a gift card application into a B2B and B2C commerce platform, focusing on reliable order processing and payment integrations.',
  },
  {
    company: 'RMLS',
    title: 'QA Engineer, then Software Engineer',
    years: '2010 - 2014',
    story:
      'Started in QA building automated test coverage, then moved into software engineering, improving the tools realtors rely on every day.',
  },
  {
    company: 'Portland State University',
    title: 'BS Computer Science, BS Micro / Molecular Biology',
    years: '',
  },
]

export const strengths = [
  'Developer platforms people actually choose to use',
  'Infrastructure as code with Terraform, GitHub Actions, and AWS',
  'Search that finds the right thing on the first try',
  'Turning manual chores into automation, and lately into agents',
  // Non-breaking hyphen keeps "on-call" on one line.
  'Mentoring, code review, and calm on\u2011call',
]

export type Project = {
  name: string
  blurb: string
  href?: string
  status?: string
}

export const projects: Project[] = [
  {
    name: 'Coffee Passport',
    blurb: 'Bringing my coffee journey to life, one cup and one commit at a time.',
    status: 'Brewing',
  },
  {
    name: 'Personal site',
    blurb:
      "The page you're reading, served from its own AWS account in a multi-account organization, with DNS, CI, and deploys all in Terraform. Proportionate? No. Fun? Very.",
    href: 'https://github.com/virtualmadden/virtualmadden-dev',
  },
  {
    name: 'gimme-aws-creds',
    blurb:
      'A from-scratch Rust CLI for AWS IAM Identity Center logins. It writes native SSO profiles, so the AWS CLI and SDKs find credentials on their own.',
    href: 'https://github.com/virtualmadden/gimme-aws-creds',
    status: 'In progress',
  },
  {
    name: 'Dotfiles',
    blurb: 'My whole machine as Nix code, so a fresh laptop is one command away from feeling like home.',
    href: 'https://github.com/virtualmadden/dotfiles',
  },
]

export const links = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/virtualmadden' },
  { label: 'GitHub', href: 'https://github.com/virtualmadden' },
] as const
