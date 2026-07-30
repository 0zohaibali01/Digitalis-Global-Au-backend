import 'dotenv/config'

// Reuses the shared client so the Prisma client setup and driver
// adapter live in exactly one file.
import { prisma } from '../src/config/prisma'

/**
 * Seeds the CaseStudy table from the data that previously lived in the
 * frontend's src/data/caseStudies.js.
 *
 *   npx prisma db seed
 *
 * Safe to re-run: rows are upserted on slug. Array order sets sortOrder, so
 * Puzzle Art Australia keeps the featured (dark) card on the listing page.
 * Once this has run successfully you can delete src/data/caseStudies.js
 * from the frontend repo.
 */

type CaseStudySeed = {
  client: string
  industry: string
  metric: string
  roi: string
  slug: string
  summary: string
  headline: string
  challenge: string
  approach: string[]
  results: string[][]
  services: string[]
}

const caseStudies: CaseStudySeed[] = [
  {
    client: 'Puzzle Art Australia',
    industry: 'E-commerce',
    metric: '7x+ ROAS',
    roi: '185%',
    slug: 'puzzle-art-australia',
    summary:
      'A sharper Shopify and paid-media programme that turned product interest into stronger traffic and order growth.',
    headline: 'Making a distinctive product easier to discover, trust and buy.',
    challenge:
      'Puzzle Art Australia needed a digital experience and acquisition programme that could translate a visually distinctive product into consistent online demand.',
    approach: [
      'Refined the Shopify buying journey around product discovery and confidence',
      'Connected paid media to high-intent landing experiences',
      'Used performance data to keep creative, audiences and spend focused',
    ],
    results: [
      ['7x+', 'ROAS on paid media'],
      ['37%', 'Order growth in one month'],
      ['31%', 'Traffic growth in one month'],
    ],
    services: ['Shopify development', 'Digital marketing', 'Conversion optimisation'],
  },
  {
    client: 'Supacore',
    industry: 'Health & wellness',
    metric: '245% ROI',
    roi: '245%',
    slug: 'supacore',
    summary:
      'A Shopify foundation built to support a growing health and wellness brand with a more confident path to purchase.',
    headline: 'Building an e-commerce foundation for a brand ready to scale.',
    challenge:
      'As Supacore moved from early-stage momentum towards a larger e-commerce operation, the online store needed to make buying simple while supporting the brand’s next phase of growth.',
    approach: [
      'Created a conversion-conscious Shopify experience',
      'Focused the storefront around clearer product and checkout journeys',
      'Established a scalable platform for future merchandising and marketing activity',
    ],
    results: [
      ['245%', 'Return on investment'],
      ['Shopify', 'E-commerce platform'],
      ['Growth-ready', 'Checkout and conversion focus'],
    ],
    services: ['Shopify development', 'UX and conversion strategy', 'E-commerce optimisation'],
  },
  {
    client: 'Lux And Co Australia',
    industry: 'E-commerce · Wedding platform',
    metric: '240% ROI',
    roi: '240%',
    slug: 'lux-and-co-australia',
    summary:
      'A connected platform for bookings, e-commerce and certificate generation—designed around a more seamless customer journey.',
    headline: 'Bringing several customer journeys into one polished platform.',
    challenge:
      'Lux And Co Australia needed to make several important customer actions feel like one connected experience, from booking through to e-commerce and certificate generation.',
    approach: [
      'Mapped the end-to-end customer journey across the platform',
      'Brought bookings, commerce and certificate functionality into one experience',
      'Designed for a clear, low-friction journey across devices',
    ],
    results: [
      ['240%', 'Return on investment'],
      ['3-in-1', 'Booking, e-commerce and certificates'],
      ['One platform', 'Connected customer experience'],
    ],
    services: ['Custom web development', 'E-commerce development', 'UX design'],
  },
  {
    client: 'Verde Home & Living',
    industry: 'Furniture & Interiors',
    metric: '310% Revenue Growth',
    roi: '290%',
    slug: 'verde-home-living',
    summary:
      'A high-converting custom Webflow site and targeted Google Ads campaign for a luxury Australian home decor brand.',
    headline: 'Elevating premium furniture online with rich visual storytelling and organic reach.',
    challenge:
      'Verde struggled with low online conversions and high Google Ads acquisition costs due to an outdated mobile storefront and unoptimised product pages.',
    approach: [
      'Rebuilt the digital storefront using React and headless Shopify for ultra-fast load times',
      'Restructured Google Search and Shopping campaigns targeting high-intent luxury buyers',
      'Implemented automated email nurture sequences for high-value abandoned carts',
    ],
    results: [
      ['310%', 'Online revenue increase'],
      ['4.2x', 'Google Ads ROAS'],
      ['-28%', 'Customer acquisition cost'],
    ],
    services: ['Headless Shopify', 'Google Ads management', 'Technical SEO'],
  },
  {
    client: 'Kanga Skips Melbourne',
    industry: 'Commercial Services & Logistics',
    metric: '180+ Leads/mo',
    roi: '320%',
    slug: 'kanga-skips-melbourne',
    summary:
      'A hyper-local SEO and Google Local Services Ads strategy that dominated search results across greater Melbourne.',
    headline: 'Dominating Melbourne local search for waste management and equipment hire.',
    challenge:
      'Kanga Skips was losing local market share to national aggregators who controlled the top Google Map Pack rankings.',
    approach: [
      'Overhauled Google Business Profiles with location-specific landing page architectures',
      'Deployed target local schema markup and citation building across Victorian directories',
      'Ran geo-targeted Google Search campaigns focused on same-day service intent',
    ],
    results: [
      ['180+', 'Qualified monthly phone leads'],
      ['#1 Rank', 'Top 5 core search keywords'],
      ['+140%', 'Organic search traffic'],
    ],
    services: ['Local SEO', 'Google Search Ads', 'Conversion rate optimisation'],
  },
  {
    client: 'Apex Solar Solutions',
    industry: 'Renewable Energy',
    metric: '5.8x ROAS',
    roi: '210%',
    slug: 'apex-solar-solutions',
    summary:
      'Optimised Meta ads and custom landing pages driving high-converting commercial solar inquiries in Queensland.',
    headline: 'Connecting commercial solar solutions with decision-makers through precision paid social.',
    challenge:
      'Apex Solar was receiving low-quality consumer inquiries while burning ad budget attempting to target enterprise commercial property owners.',
    approach: [
      'Designed interactive lead qualification quizzes on dedicated Next.js landing pages',
      'Built targeted LinkedIn and Meta video campaigns focused on ROI and tax incentive messaging',
      'Integrated HubSpot CRM automation to route high-intent leads instantly to sales teams',
    ],
    results: [
      ['5.8x', 'Return on ad spend'],
      ['+62%', 'Lead qualification rate'],
      ['$2.1M', 'Pipeline generated in 90 days'],
    ],
    services: ['Meta Ads', 'Landing page design', 'Marketing automation'],
  },
  {
    client: 'Urban Fitness Co',
    industry: 'Health & Fitness',
    metric: '410% App Downloads',
    roi: '195%',
    slug: 'urban-fitness-co',
    summary:
      'A multi-channel app store launch and subscription acquisition funnel for a boutique Australian gym chain.',
    headline: 'Scaling hybrid digital fitness memberships across Sydney and Brisbane.',
    challenge:
      'Urban Fitness needed to monetize their hybrid gym platform and boost mobile app downloads without relying solely on expensive paid search.',
    approach: [
      'Optimised App Store and Google Play listings for primary organic keywords (ASO)',
      'Launched micro-influencer performance campaigns on TikTok and Instagram Reels',
      'Created frictionless 7-day trial landing pages with instant Apple Pay/Google Pay integration',
    ],
    results: [
      ['410%', 'Increase in monthly downloads'],
      ['42%', 'Free trial to paid subscriber conversion'],
      ['#3', 'Rank in Health & Fitness app category'],
    ],
    services: ['App Store Optimisation', 'Social performance ads', 'UX research'],
  },
  {
    client: 'Oceanic Seafood Exports',
    industry: 'B2B Trade & Wholesale',
    metric: '3.4M Organic Impressions',
    roi: '310%',
    slug: 'oceanic-seafood-exports',
    summary:
      'A complete B2B digital transformation, global SEO overhaul, and custom partner portal.',
    headline: 'Positioning an Australian exporter for global B2B digital acquisition.',
    challenge:
      'Oceanic relied on trade shows for commercial deals and had virtually zero digital visibility across international Asian and North American trade channels.',
    approach: [
      'Built a multi-lingual Webflow B2B portal complete with live inventory specs and RFQ tools',
      'Executed an enterprise international technical SEO campaign focusing on wholesale export terms',
      'Created targeted B2B LinkedIn campaigns aimed at international food importers and distributors',
    ],
    results: [
      ['3.4M', 'Organic search impressions'],
      ['+85%', 'International RFQ submissions'],
      ['12', 'New distributor contracts secured'],
    ],
    services: ['B2B Web development', 'Enterprise SEO', 'B2B Marketing'],
  },
  {
    client: 'Bondi Clean Beauty',
    industry: 'Cosmetics & Retail',
    metric: '12.4% Conv. Rate',
    roi: '275%',
    slug: 'bondi-clean-beauty',
    summary:
      'A high-speed Shopify Plus theme customization and Klaviyo lifecycle strategy driving repeat sales.',
    headline: 'Maximizing lifetime customer value for an organic Australian skincare line.',
    challenge:
      'High initial customer acquisition costs were eating into margins due to a low repeat purchase rate and fragmented post-purchase communication.',
    approach: [
      'Migrated storefront to a tailored Shopify Plus theme with custom subscription workflows',
      'Developed hyper-segmented Klaviyo email and SMS flows based on skin type quiz responses',
      'A/B tested checkout upsells and bundle building tools to increase Average Order Value (AOV)',
    ],
    results: [
      ['12.4%', 'E-commerce conversion rate'],
      ['+48%', 'Repeat customer revenue'],
      ['$112', 'Average Order Value (+$24)'],
    ],
    services: ['Shopify Plus development', 'Email & SMS marketing', 'CRO'],
  },
  {
    client: 'Sovereign Wealth Partners',
    industry: 'Financial Services',
    metric: '$14M New AUM',
    roi: '450%',
    slug: 'sovereign-wealth-partners',
    summary:
      'Content strategy, institutional SEO, and search advertising for a high-net-worth wealth advisor firm.',
    headline: 'Building digital trust and attracting high-net-worth investors in Sydney.',
    challenge:
      'Strict regulatory compliance and a highly conservative audience made traditional digital ad acquisition difficult and inefficient.',
    approach: [
      'Designed a sophisticated, accessible React website highlighting thought leadership content',
      'Implemented compliant, high-intent Google Search campaigns targeting private wealth keywords',
      'Produced authoritative long-form insights guides optimized for financial advisory queries',
    ],
    results: [
      ['$14M', 'New Assets Under Management (AUM)'],
      ['3.8x', 'Pipeline growth'],
      ['#1 Rank', 'Private wealth management Sydney'],
    ],
    services: ['Web development', 'Search Engine Marketing', 'Content Strategy'],
  },
  {
    client: 'Tasman Outdoor Gear',
    industry: 'Adventure & Apparel',
    metric: '6.2x Meta ROAS',
    roi: '230%',
    slug: 'tasman-outdoor-gear',
    summary:
      'Scaling an outdoor adventure brand across Australia and New Zealand via UGC ads and custom checkout apps.',
    headline: 'Turning rugged outdoor gear into a multi-million dollar e-commerce brand.',
    challenge:
      'Tasman faced seasonal sales slumps and struggled to scale their Meta ad spend without experiencing severe creative fatigue.',
    approach: [
      'Built a creator-driven User Generated Content (UGC) engine producing 20+ ad iterations monthly',
      'Optimised product detail pages with interactive 3D product view models and customer reviews',
      'Expanded campaigns to New Zealand market with localized shipping and currency rules',
    ],
    results: [
      ['6.2x', 'Blended Meta ROAS'],
      ['+165%', 'Year-over-year revenue growth'],
      ['22%', 'Lower cost per acquisition'],
    ],
    services: ['Performance Marketing', 'UGC Content Creation', 'E-commerce Optimization'],
  },
  {
    client: 'BuildTech Australia',
    industry: 'Construction & Engineering',
    metric: '220% Search Traffic',
    roi: '200%',
    slug: 'buildtech-australia',
    summary:
      'Complete rebrand, React web platform, and B2B organic search strategy for commercial builders.',
    headline: 'Modernising a tier-2 commercial builder’s digital footprint to win major tenders.',
    challenge:
      'An outdated corporate website was undermining sales efforts when pitching for multi-million dollar commercial government tenders.',
    approach: [
      'Designed a sleek, high-performance portfolio site showcasing major completed developments',
      'Optimized site architecture for commercial construction and civil engineering keywords',
      'Implemented custom video case studies detailing safety compliance and project scope',
    ],
    results: [
      ['220%', 'Increase in organic search traffic'],
      ['5', 'Major tier-1 tender shortlist wins'],
      ['0.8s', 'Average page load speed'],
    ],
    services: ['Web design & development', 'Technical SEO', 'Video Production'],
  },
  {
    client: 'Perth Dental Care',
    industry: 'Healthcare & Medical',
    metric: '210 New Patients/mo',
    roi: '340%',
    slug: 'perth-dental-care',
    summary:
      'Local search domination and automated patient booking funnel for multi-clinic dental practice.',
    headline: 'Filling practice appointment books through frictionless local digital booking.',
    challenge:
      'High cost-per-click on Google Search ads made acquiring new cosmetic and general dental patients unprofitable.',
    approach: [
      'Built a custom instant-booking web application integrated directly with dental PMS software',
      'Ran localized Google Search and Maps ads targeting high-margin cosmetic dentistry terms',
      'Automated post-visit review generation to collect over 300 5-star Google reviews',
    ],
    results: [
      ['210', 'New patients booked monthly'],
      ['$42', 'Cost per acquired patient (-52%)'],
      ['4.9★', 'Rating across 350+ Google reviews'],
    ],
    services: ['Local SEO', 'Google Ads', 'Custom Web Applications'],
  },
]

async function main() {
  for (const [index, study] of caseStudies.entries()) {
    const record = {
      client: study.client,
      industry: study.industry,
      metric: study.metric,
      roi: study.roi,
      summary: study.summary,
      headline: study.headline,
      challenge: study.challenge,
      approach: study.approach,
      results: study.results,
      services: study.services,
      sortOrder: index,
    }

    await prisma.caseStudy.upsert({
      where: { slug: study.slug },
      update: record,
      create: { slug: study.slug, ...record },
    })
  }

  console.log(`Seeded ${caseStudies.length} case studies.`)
}

main()
  .catch((error) => {
    console.error('Seed failed:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })