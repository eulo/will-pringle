module.exports = {
  siteMetadata: {
    title: 'Will Pringle - Freelance Web Developer Melbourne',
    description: 'I\'m a freelance wordpress developer from Melbourne with over 10 years of experience. Working in Javascript, React js, PHP, Wordpress, Laravel, iOS & Android.',
    siteUrl: 'https://www.will-pringle.com',
    author: 'CodeDrips',
  },
  plugins: [
    'gatsby-plugin-layout',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    'gatsby-plugin-sitemap',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        baseUrl: 'tommb.com.au',
        protocol: 'https',
      }
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-31496425-2',
        // Puts tracking script in the head instead of the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        // Avoids sending pageview hits from custom paths
        exclude: [],
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://www.will-pringle.com',
        sitemap: 'https://www.will-pringle.com/sitemap.xml',
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },
  ],
};
