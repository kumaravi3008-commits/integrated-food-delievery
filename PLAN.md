# Home Page Layout Fix Plan

## Problems Identified

1. **Navbar offset missing** - Navbar is `fixed top-0`, but no section has `pt-*` padding to account for it (Hero starts at the top, hidden behind the navbar).
2. **Double vertical spacing** - `homepage.jsx` uses `gap-24 md:gap-32` between sections, BUT each section ALSO has its own `py-20 md:py-24`, creating excessive doubled spacing.
3. **Inconsistent section patterns** - Each section manually writes `w-full bg-black py-20 md:py-24 flex justify-center px-6 md:px-12` with a nested `max-w-7xl mx-auto` wrapper. No DRY pattern.
4. **Hero section relative positioning** - Hero has `absolute inset-0` decorative blobs but the `<section>` itself doesn't have `relative` class, causing potential overflow.
5. **Mixed padding values** - Navbar uses `px-6 sm:px-8 lg:px-20`, sections use `px-6 md:px-12`, Footer uses `max-w-7xl mx-auto` without padding on the outer wrapper.
6. **MobileApp blob overflow** - The `absolute` glow blob is inside the section but not properly contained.
7. **WhyChooseUs grid spacing** - Uses `gap-6` for grid-cols-2 but cards could be more spacious.
8. **CTA missing primary button** - Only has outline "Order now" button, missing the primary "Get Started" CTA button.

## Proposed Fixes

### File: `homepage.jsx`
- Remove `gap-24 md:gap-32` from the main wrapper div
- Sections already have their own `py-20 md:py-24` - that's sufficient spacing
- Add relative positioning wrapper

### File: `Hero.jsx`
- Add `relative` class to the `<section>` tag to contain the `absolute inset-0` blobs
- Add `pt-24 md:pt-32` to account for the fixed navbar

### File: `Features.jsx`
- Add `section-spacing` class or ensure consistent px values
- Replace manual flex justify-center px-6 with `page-container` usage

### File: `PopularRestaurants.jsx`
- Same pattern fixes

### File: `FoodCategories.jsx`
- Same pattern fixes

### File: `HowItWorks.jsx`
- Same pattern fixes

### File: `WhyChooseUs.jsx`
- Same pattern fixes
- Increase stat grid gap

### File: `Testimonials.jsx`
- Same pattern fixes

### File: `MobileApp.jsx`
- Add `relative` to the parent section to contain the absolute glow blob

### File: `Cta.jsx`
- Add a primary "Get Started" button with orange bg alongside the outline button
- Same pattern fixes

### File: `Footer.jsx`
- Add `page-gutters` or proper padding on the outer wrapper

### File: `index.css`
- Already has good utility classes (`page-container`, `page-gutters`, `section-spacing`) - we'll use them

