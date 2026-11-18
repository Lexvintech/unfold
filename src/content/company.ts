/** Single source of truth for company details used across the site. */
export const company = {
  name: 'BEAVERS PROPERTY LTD',
  shortName: 'Beavers Property',
  email: 'info@beavers.co.uk',
  phone: '+44 7490 969732',
  website: 'https://www.beavers.co.uk',
  websiteLabel: 'www.beavers.co.uk',
  office: '218 Rodway Road, Reading, RG30 6EE',
  registrationNumber: '15451127',
  registrationRegion: 'England',
  director: {
    name: 'Benson A. Meli',
    role: 'Managing Director',
  },
} as const

/** Phone number reduced to digits and a leading + for tel:/sms: links. */
export const phoneHref = (phone: string) => phone.replace(/[^\d+]/g, '')

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'What we buy', href: '#criteria' },
  { label: 'How it works', href: '#process' },
  { label: 'Our work', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
] as const
