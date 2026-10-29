export const intro = {
  location: 'Portland, OR',
  greeting: "Hi, I'm Jonathan.",
  lead: "I'm a senior full-stack engineer who builds the platforms other engineers quietly rely on, then makes them a little less painful to use.",
  status: 'Always looking for new adventures',
}

export type Role = {
  company: string
  title: string
  years: string
  story: string
}

export const career: Role[] = [
  {
    company: 'Nike',
    title: 'Senior Software Engineer',
    years: '2018 - 2026',
    story:
      "Helped 5,000+ engineers find things. I co-led Nike's move to Backstage, built search across tens of thousands of docs, and kept the entitlements platform answering a million requests a day. I also taught an AI agent to do the dependency upgrades nobody wanted to do.",
  },
  {
    company: 'InComm Digital Solutions',
    title: 'Software Engineer',
    years: '2014 - 2018',
    story:
      'Helped turn a gift card monolith into a full B2B and B2C platform, and added the queues and retries that stopped orders getting lost along the way. In payments, "it\'s probably fine" is never fine.',
  },
  {
    company: 'RMLS',
    title: 'QA Engineer, then Software Engineer',
    years: '2010 - 2014',
    story:
      'Started out breaking things on purpose, then got promoted to fixing them. I sat with realtors to find out what actually slowed them down, then sped it up.',
  },
  {
    company: 'Portland State University',
    title: 'BS Computer Science, BS Micro / Molecular Biology',
    years: '',
    story:
      "Two degrees: one in how computers work, one in how cells do. Both turn out to be mostly about debugging systems you didn't design.",
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
