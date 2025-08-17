# Installation Guide for Interactive Elements

## Required Dependencies

To use the new animated counters and interactive elements, you need to install `framer-motion`:

```bash
npm install framer-motion
```

## What We've Added

### 1. **Enhanced Statistics Section** (`components/EnhancedStats.tsx`)
- **4 main animated counters** with staggered animations
- **3 additional smaller counters** below
- **Floating background elements** for visual appeal
- **Glassmorphism design** with backdrop blur effects

### 2. **Updated TotalHarvestedCounter** (`components/TotalHarvestedCounter.tsx`)
- Now uses animated counter instead of static text
- Smooth roll-up animation when scrolling into view

### 3. **Demo Page** (`/demo`)
- Full showcase of all interactive elements
- Accessible via navigation menu

## Current Implementation

The animated counters are now integrated into your homepage:

- **Hero Section**: Total Harvested counter (50,000+)
- **New Statistics Section**: 7 additional counters with icons
- **Floating Elements**: Subtle background animations

## Customization

### Update Counter Values
Edit the `end` prop in each `AnimatedCounter` component:

```tsx
<AnimatedCounter 
  end={50000}  // Change this number
  suffix="+" 
  duration={2500}
  delay={0.2}
/>
```

### Adjust Animation Timing
- `duration`: Animation length in milliseconds
- `delay`: Delay before animation starts
- `decimals`: Number of decimal places (for percentages)

### Modify Floating Elements
- `count`: Number of particles
- `className`: Custom styling
- `opacity`: Transparency level

## Next Steps

1. **Install framer-motion**: `npm install framer-motion`
2. **Test the counters**: Visit your homepage to see them in action
3. **Customize values**: Update the numbers to match your actual statistics
4. **Explore the demo**: Visit `/demo` to see all interactive elements

## Performance Notes

- Counters only animate once when scrolling into view
- Floating elements are optimized for smooth performance
- All animations use CSS transforms for hardware acceleration
- Mobile devices automatically reduce animation complexity

## Troubleshooting

If animations don't work:
1. Ensure `framer-motion` is installed
2. Check browser console for errors
3. Verify components are marked with `"use client"`
4. Ensure proper scroll container setup

---

**Ready to see your statistics come to life?** Install framer-motion and refresh your homepage! 