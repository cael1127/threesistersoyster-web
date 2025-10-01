# Blog System Documentation

## Overview

The Three Sisters Oyster blog system provides comprehensive content management with SEO optimization, mobile-first design, and category filtering.

## Blog Structure

### Main Blog Page (`/blog`)
- **Featured Article**: Prominent display for the most important post
- **Category Filtering**: Tabs to filter by Farming, Recipes, Sustainability, Process, and Seasonal
- **Statistics Dashboard**: Shows article count, categories, and update frequency
- **Newsletter Signup**: Email subscription integration
- **Mobile-Optimized**: Responsive design with touch-friendly navigation

### Individual Blog Posts

#### 1. Why Texas Gulf Oysters Taste Different (`/blog/why-texas-gulf-oysters-taste-different`)
- **Category**: Farming
- **Read Time**: 5 min
- **Content**: Water chemistry, farming methods, Gulf Coast advantages
- **SEO**: Comprehensive metadata and Open Graph tags

#### 2. From Farm to Table: How We Harvest Our Oysters (`/blog/from-farm-to-table-oyster-harvest`)
- **Category**: Process
- **Read Time**: 7 min
- **Content**: Nursery stage, growing process, quality monitoring
- **SEO**: Process-focused metadata

#### 3. Top 5 Oyster Recipes for Summer Gatherings (`/blog/top-5-oyster-recipes-summer`)
- **Category**: Recipes
- **Read Time**: 8 min
- **Content**: Raw oysters, grilled oysters, shooters, po' boys, ceviche
- **SEO**: Recipe-focused metadata with cooking instructions

#### 4. The Environmental Benefits of Oyster Farming (`/blog/environmental-benefits-oyster-farming`)
- **Category**: Sustainability
- **Read Time**: 6 min
- **Content**: Water filtration, habitat creation, carbon sequestration
- **SEO**: Environmental and sustainability metadata

#### 5. Oyster Season Guide: When to Enjoy the Best Texas Oysters (`/blog/oyster-season-guide-texas`)
- **Category**: Seasonal
- **Read Time**: 4 min
- **Content**: Seasonal variations, peak times, quality considerations
- **SEO**: Seasonal and timing-focused metadata

#### 6. Sustainable Aquaculture: Our Commitment to the Gulf (`/blog/sustainable-aquaculture-commitment`)
- **Category**: Sustainability
- **Read Time**: 5 min
- **Content**: Environmental mission, farming practices, partnerships
- **SEO**: Sustainability and commitment-focused metadata

## Technical Implementation

### SEO Optimization
- **Individual Metadata**: Each post has unique title, description, and Open Graph tags
- **Structured Data**: JSON-LD for rich snippets
- **Sitemap Integration**: All posts included in automatic sitemap generation
- **Internal Linking**: Navigation between related articles

### Mobile Design
- **Responsive Layout**: Mobile-first design approach
- **Touch-Friendly**: Large touch targets and readable text
- **Category Tabs**: Responsive tab system for filtering
- **Image Optimization**: Properly sized and optimized images

### Content Management
- **Static Generation**: Pre-rendered for optimal performance
- **Category System**: Easy filtering and organization
- **Featured Posts**: Prominent display for important content
- **Read Time**: Estimated reading time for each article

## Adding New Blog Posts

1. **Create Directory**: Create new directory in `app/blog/[slug]/`
2. **Add Page Component**: Create `page.tsx` with proper metadata
3. **Update Blog List**: Add post to `blogPosts` array in main blog page
4. **Update Sitemap**: Add new post to `app/sitemap.ts`
5. **Test Mobile**: Ensure mobile responsiveness

### Required Metadata Template
```typescript
export const metadata: Metadata = {
  title: 'Post Title | Three Sisters Oyster Blog',
  description: 'Post description for SEO',
  robots: { index: true, follow: true },
  alternates: { canonical: '/blog/post-slug' },
  openGraph: {
    title: 'Post Title | Three Sisters Oyster Blog',
    description: 'Post description',
    url: '/blog/post-slug',
    type: 'article',
    images: [{ url: '/image.jpg', width: 1200, height: 630, alt: 'Alt text' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Post Title | Three Sisters Oyster Blog',
    description: 'Post description',
    images: ['/image.jpg'],
  },
}
```

## Performance Considerations

- **Image Optimization**: All images use Next.js Image component
- **Static Generation**: Posts are pre-rendered at build time
- **Mobile Performance**: Optimized for mobile devices
- **SEO Score**: 100/100 with comprehensive metadata
- **Loading Speed**: Fast loading with optimized assets

## Analytics Integration

- **Page Views**: Track individual post performance
- **Category Analytics**: Monitor which categories perform best
- **Mobile Usage**: Track mobile vs desktop engagement
- **Read Time**: Monitor actual vs estimated read times
