export default [
  {
    code: 'en',
    file: 'en-US.json',
    language: 'en-US',
    domain: process.env.DEFAULT_DOMAIN,
    name: 'English',
    default: true,
  },
  {
    code: 'de',
    file: 'de-DE.json',
    language: 'de-DE',
    domain: process.env.DEFAULT_DOMAIN,
    name: 'Deutsch',
    default: false,
  },
];
