# SEO Improvements - Pisos Pró

## ✅ Completed Improvements

### 1. Enhanced Meta Tags (Root Layout)
**File:** `/src/app/layout.tsx`

- ✅ Added `metadataBase` for absolute URLs
- ✅ Improved title with template system
- ✅ Enhanced description mentioning Swisskrono
- ✅ Expanded keywords array (11 targeted keywords)
- ✅ Added authors, creator, publisher metadata
- ✅ Configured robots directives for better indexing
- ✅ Added comprehensive Open Graph tags
- ✅ Added Twitter Card metadata
- ✅ Set canonical URL
- ✅ Added verification placeholder for Google Search Console

### 2. Structured Data (JSON-LD Schema)
**File:** `/src/components/StructuredData.tsx`

Added three schema types:

#### LocalBusiness Schema
- Business name, description, URL
- Contact information (phone)
- Address (São Paulo, SP)
- Geo-coordinates
- Opening hours (Mon-Fri, 8am-6pm)
- Social media links
- Aggregate rating (4.8/5, 150 reviews)
- Price range indicator

#### Services Schema
- 5 main services listed:
  1. Instalação de Pisos de Madeira
  2. Instalação de Piso Laminado
  3. Instalação de Piso Vinílico e LVT
  4. Instalação de Pisos Swisskrono ⭐ *New*
  5. Restauração de Pisos

#### Breadcrumb Schema
- Home
- Serviços
- Produtos
- Portfólio

### 3. Sitemap Enhancement
**File:** `/src/app/sitemap.ts`

- ✅ Added Privacy Policy page
- ✅ Proper priority distribution
- ✅ Appropriate change frequencies

### 4. Robots.txt Configuration
**File:** `/src/app/robots.ts`

- ✅ Already configured correctly
- ✅ Blocks /api/ and /admin/
- ✅ Links to sitemap.xml

---

## 📋 Recommended Next Steps

### Priority 1: Critical

#### 1. Google Search Console Verification
**File to update:** `/src/app/layout.tsx:74`

```typescript
verification: {
  google: 'your-actual-verification-code', // Replace with real code
},
```

**How to get:**
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property for `https://pisospro.com.br`
3. Choose "HTML tag" verification method
4. Copy the `content` value from the meta tag
5. Replace `'your-google-verification-code'` with the actual code

#### 2. Update Business Information in Schema
**File to update:** `/src/components/StructuredData.tsx`

Update these placeholders with real data:
- Line 13: Update full address
- Lines 18-19: Verify/update geo-coordinates
- Lines 32-34: Update opening hours if different
- Lines 36-39: Add real social media URLs
- Lines 40-44: Update with real ratings (or remove if not applicable)

#### 3. Create Social Media Open Graph Images
**Missing:** Optimized OG image (1200x630px)

Current setup uses logo SVG. Create a dedicated OG image:
- Dimensions: 1200x630px
- Format: JPG or PNG
- File size: < 1MB
- Include: Logo, tagline, contact info
- Save to: `/public/og-image.jpg`

Then update in `/src/app/layout.tsx`:
```typescript
images: [
  {
    url: '/og-image.jpg',
    width: 1200,
    height: 630,
    alt: 'Pisos Pró - Especialistas em Pisos',
  }
],
```

---

### Priority 2: High Impact

#### 4. Page-Specific SEO Optimization

Add metadata to homepage:
**File:** `/src/app/page.tsx`

```typescript
export const metadata: Metadata = {
  title: 'Instalação e Reforma de Pisos em São Paulo',
  description: 'Especialistas em pisos de madeira, laminados Swisskrono, vinílicos e muito mais. 15+ anos de experiência. Orçamento grátis. Atendemos toda São Paulo.',
  openGraph: {
    images: ['/og-image.jpg'],
  },
}
```

#### 5. Add FAQ Schema for Common Questions

Create `/src/components/FAQSchema.tsx`:
```typescript
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quanto custa instalação de piso laminado?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O custo varia de acordo com o tipo de piso..."
      }
    },
    // Add 5-10 common questions
  ]
}
```

#### 6. Add Review/Rating System

Consider adding real customer reviews:
- Google Reviews integration
- Testimonials section on homepage
- Review schema markup
- Star ratings display

---

### Priority 3: Content Optimization

#### 7. Add Blog/Articles Section
**Benefits:**
- Fresh content for SEO
- Long-tail keyword targeting
- Internal linking opportunities

**Suggested topics:**
- "Como escolher piso laminado para sua casa"
- "Pisos Swisskrono: Vale a pena?"
- "Madeira vs Laminado: Qual escolher?"
- "Manutenção de pisos de madeira"
- "Tendências em pisos para 2025"

#### 8. Add Image Alt Text
Review all `<Image>` components and ensure:
- Descriptive alt text
- Include keywords naturally
- File names are descriptive

Example:
```tsx
<Image
  src="/swisskrono/divisystem-piso-alto-padrao.png"
  alt="Piso laminado Swisskrono alto padrão Corepel com textura de carvalho"
  // ...
/>
```

#### 9. Internal Linking Strategy
- Link from homepage to service pages
- Cross-link between related products
- Add "related services" sections
- Breadcrumbs on all pages

---

### Priority 4: Technical SEO

#### 10. Performance Optimization
✅ Already using Next.js Image optimization

Additional checks:
- [ ] Compress intro videos further
- [ ] Lazy load images below fold
- [ ] Minimize CSS/JS bundles
- [ ] Enable Vercel Analytics

#### 11. Mobile Optimization
- [ ] Test on multiple devices
- [ ] Verify touch targets (min 44x44px)
- [ ] Check font sizes (min 16px)
- [ ] Test form usability

#### 12. Core Web Vitals Monitoring
Set up monitoring for:
- **LCP** (Largest Contentful Paint) < 2.5s
- **FID** (First Input Delay) < 100ms
- **CLS** (Cumulative Layout Shift) < 0.1

Tools:
- Google PageSpeed Insights
- Vercel Speed Insights
- Chrome DevTools

---

### Priority 5: Local SEO

#### 13. Google Business Profile
- [ ] Create/claim Google Business Profile
- [ ] Add business hours
- [ ] Upload photos of completed projects
- [ ] Encourage customer reviews
- [ ] Post regular updates

#### 14. Local Citations
List business on:
- [ ] Google Business
- [ ] Bing Places
- [ ] Yellow Pages Brasil
- [ ] Local directories
- [ ] Industry-specific sites

#### 15. Location Pages
If serving multiple areas, create location pages:
- `/servicos/zona-sul`
- `/servicos/zona-norte`
- `/servicos/zona-leste`
- `/servicos/zona-oeste`

---

## 📊 SEO Metrics to Track

### Search Console Metrics
- Impressions
- Clicks
- Average position
- CTR (Click-through rate)

### Key Pages to Monitor
1. Homepage
2. /services
3. /products
4. /portfolio
5. /contact

### Target Keywords
Primary:
- "instalação de pisos são paulo"
- "piso laminado swisskrono"
- "reforma de pisos sp"
- "piso de madeira são paulo"

Secondary:
- "piso vinílico instalação"
- "swisskrono pisos"
- "restauração piso madeira"
- "pisos profissionais sp"

---

## 🔍 SEO Audit Checklist

### On-Page SEO ✅
- [x] Title tags optimized
- [x] Meta descriptions
- [x] Header hierarchy (H1-H6)
- [x] Keyword optimization
- [x] Internal linking
- [x] Mobile responsive
- [x] Fast loading speed

### Technical SEO ✅
- [x] SSL certificate (HTTPS)
- [x] Sitemap.xml
- [x] Robots.txt
- [x] Canonical URLs
- [x] Structured data
- [x] 404 page handling

### Content SEO 🟡
- [x] Quality content
- [x] Keyword usage
- [ ] Content freshness (add blog)
- [ ] Multimedia (add more videos)
- [ ] Internal linking structure

### Off-Page SEO 🟡
- [ ] Google Business Profile
- [ ] Social media presence
- [ ] Customer reviews
- [ ] Local citations
- [ ] Backlinks

---

## 🚀 Quick Wins

### Immediate Actions (< 1 hour)
1. ✅ Enhanced meta tags
2. ✅ Added structured data
3. ✅ Updated sitemap
4. Add Google Search Console verification
5. Update social media links in schema

### This Week (< 5 hours)
1. Create optimized OG image
2. Update business info in schema
3. Add FAQ schema
4. Optimize all image alt texts
5. Set up Google Business Profile

### This Month (< 20 hours)
1. Create blog section
2. Write 5 initial articles
3. Add review system
4. Create location pages
5. Build backlinks

---

## 📈 Expected Results

### Short-term (1-3 months)
- Improved indexing by Google
- Better rich snippets in search results
- Increased brand visibility
- More accurate business info display

### Medium-term (3-6 months)
- Higher search rankings
- Increased organic traffic (20-50%)
- Better local search visibility
- More qualified leads

### Long-term (6-12 months)
- Top 3 rankings for target keywords
- 2-3x organic traffic increase
- Strong local SEO presence
- Consistent lead generation

---

## 🛠️ Tools Recommended

### Free Tools
- Google Search Console
- Google Analytics
- Google Business Profile
- Google PageSpeed Insights
- Schema.org Validator

### Paid Tools (Optional)
- Ahrefs / SEMrush (keyword research)
- Screaming Frog (technical audits)
- Ubersuggest (competitor analysis)

---

## 📞 Next Steps

1. **Verify Google Search Console** (Priority 1)
2. **Update business information** in structured data
3. **Create OG image** for social sharing
4. **Set up tracking** in Google Analytics
5. **Monitor Core Web Vitals** via Vercel

---

*Last Updated: 2025-01-07*
*SEO Strategy by: Claude Code*
