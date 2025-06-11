# Curated Cruiser Website Requirements Document

## Project Overview

Curated Cruiser is a mobile auto detailing service operating in Castro Valley and San Ramon, California. This document outlines the requirements for developing a professional, responsive, and user-friendly website using GitHub Pages.

## Technical Requirements

### Hosting & Deployment

- **Platform**: GitHub Pages
- **Repository Structure**: Standard GitHub Pages structure with main branch deployment
- **Domain**: The website will use the domain curatedcruiser.com (already owned by the client)
- **SSL**: Enabled through GitHub Pages

### Technologies

- **Framework**: Must be compatible with GitHub Pages. Foundation css framework is preferred. HTML/JS libraries are open to suggestions.
- **CSS Framework**: Foundation CSS is preferred.
- **Animation Library**: use built in Foundation CSS animations or vanilla css
- **Package Management**: NPM or Yarn for dependency management
- **Version Control**: Git with GitHub

### Design Requirements

- **Layout**: Single-page application with smooth scroll to different sections
- **Responsive Design**: Mobile-first approach that works across all devices
- **Typography**: Modern, clean, and readable fonts (See below for font details and import code)
- **Image Requirements**:
  - Landscape photos: iPhone ratio (typically 4:3 or 16:9)
  - Other photos: Square (1:1 aspect ratio)
  - All images should be optimized for web (compressed, modern formats)
- **Color Scheme**: See below for a color palette for background, text and a cta color for links and buttons.
- **Typography**: Modern, clean, and readable fonts (system fonts or Google Fonts)

## Functional Requirements

### Navigation

- Fixed header with logo and navigation links (the logo's intrinsic size ratio is 25∶4, set the height to around 100px)
- Smooth scrolling to page sections when navigation links are clicked
- Mobile hamburger menu for smaller screens
- Active state for current section in navigation
- for lower sections, they need to be large enough to see movement when navigating to them.

### Required Sections

#### 1. Hero Section

- Prominent headline showcasing the business value proposition
- text to the left, and an image of a detailed vehicle to the right
- Call-to-action button leading to the booking section and one to pricing

#### 2. Services/Pricing Section

- Overview of all services offered
- two main categories: Express and Premium
- subCategories are: size, interior/exterior and addons
- Pricing information for different service packages
- Visual icons representing each service category. (size: use sedan, SUV, and XL SUV, interior/exterior use rear view mirror or external)
- Each service package should have a clear description and pricing

#### 3. Service Areas

- Custom Map image showing Castro Valley and San Ramon service areas (map.png) to be provided by windsurf
- Visual representation of coverage areas

#### 4. Booking/Contact Section

- Simple booking form with date/time selection
- Service selection dropdown
- Contact information fields
- Vehicle information fields
- Form validation with error messages
- Submission confirmation

#### 6. About/Bio Section

- Information about the business owner/operator
- Business story and philosophy
- Emphasis on personalized service as a core value
- Professional headshot or action photo

#### 7. Testimonials Section

- Customer reviews carousel/slider using the google reviews api
- Star ratings display

#### 8. Footer

- Contact information
- Social media links
- Copyright information
- Privacy policy link
- Service area quick links (google business)

## Interactive Features

### Booking System

- Implement date/time picker for scheduling
- Service package selection with dynamic pricing
- Form validation with user-friendly error messages
- Confirmation email capability
- Calendar integration (optional, if GitHub Pages limitations allow)

### Responsive Navigation

- Smooth scrolling between sections
- Active state for current section
- Mobile-friendly dropdown/hamburger menu
- Back-to-top button that appears when scrolling down

## Performance Requirements

- Page load time under 3 seconds
- Optimized images with lazy loading implementation
- Minified CSS and JavaScript files
- Performance score of at least 90 on Google PageSpeed Insights
- Proper caching implementation

## Accessibility Requirements

- WCAG 2.1 AA compliance
- Semantic HTML structure
- Proper heading hierarchy
- Alt text for all images
- Keyboard navigation support
- Sufficient color contrast ratios
- Screen reader compatibility
- CSS naming can be anything / utility-first

## SEO Requirements

- Optimized meta tags for each section
- Schema markup for local business
- Proper heading structure (H1, H2, etc.)
- SEO-friendly URL structure
- XML sitemap
- Robots.txt file
- Google Analytics integration

## Browser & Device Compatibility

- Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- Mobile responsiveness for iOS and Android devices
- Tablet optimization
- Desktop responsive layouts

## Additional Instructions for Windsurf AI

When implementing this website with Windsurf AI, please consider the following instructions:

1. **Use Claude 3.5 Sonnet model** for most code generation tasks as it better understands long content and generates accurate codebases.

2. **Contextual Understanding**: Upload the business profile document to Windsurf AI so it can accurately represent the business in the website content.

3. **Multi-file Structure**:

   - index.html (main page)
   - css/ (directory for stylesheets)
   - js/ (directory for JavaScript files)
   - img/ (directory for images)
   - assets/ (directory for other assets)

4. **Cascade Instructions**: When using Windsurf's Cascade feature:

   - Start by building the basic HTML structure
   - Implement Foundation CSS for responsive design
   - Create the smooth scrolling navigation system
   - Implement the booking form with validation

5. **Image Handling**:

   - Implement responsive image handling
   - Ensure proper aspect ratios as specified (iPhone ratio for landscape, square for others)
   - Leave comments for the client where images need to be added/optimized/renamed
   - Use lazy loading for performance optimization

6. **Code Comments**: Include comprehensive comments throughout the code to explain functionality and implementation details.

7. **Testing Instructions**: Provide instructions for testing the website on different devices and browsers.

## Development Workflow

1. **Initial Setup**:

   - Initialize GitHub repository
   - Set up basic project structure
   - Configure GitHub Pages deployment

2. **Development Phases**:

   - Phase 1: Basic HTML structure and CSS styling
   - Phase 2: Responsive design implementation
   - Phase 3: JavaScript functionality and animations
   - Phase 4: Form implementation and validation
   - Phase 5: Testing and optimization

3. **Testing**:

   - Cross-browser testing
   - Mobile responsiveness testing
   - Performance testing
   - Accessibility testing

4. **Deployment**:
   - Final review and adjustments
   - GitHub Pages deployment
   - Domain configuration
   - Post-launch testing

## Maintenance Considerations

- Provide documentation for future content updates
- Guide for adding new gallery images
- Instructions for updating service offerings and pricing
- Backup procedures

## Timeline Expectations

- Development: 2-3 weeks
- Testing and revisions: 1 week
- Deployment and final adjustments: 3-5 days

## Typography

```
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500&family=Josefin+Sans:ital@0;1&display=swap" rel="stylesheet">
```

## Colors

#4285F4: ctas (links and buttons)
#F4B400: highlight color
#227198: visited ctas or dark ctas
#f2f1ef: background
#3c3c3c: dark background or subheadings
#343434: text

---

This requirements document is designed to work with Windsurf AI's capabilities, particularly leveraging its Cascade feature for understanding the entire project context and implementing features across multiple files.
