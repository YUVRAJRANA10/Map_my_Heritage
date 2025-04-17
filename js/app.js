// Toggle more reviews function
function toggleMoreReviews() {
    const moreReviews = document.getElementById('more-reviews');
    const seeMoreBtn = document.querySelector('.see-more-btn');
    
    if (moreReviews.style.display === 'none') {
        moreReviews.style.display = 'block';
        seeMoreBtn.innerHTML = '<i class="fas fa-chevron-up"></i> See Less Reviews';
        seeMoreBtn.classList.remove('animate__pulse', 'animate__infinite');
        
        // Add animation to newly revealed reviews
        const hiddenReviews = moreReviews.querySelectorAll('.review-card');
        hiddenReviews.forEach((card, index) => {
            card.classList.add('animate__animated', 'animate__fadeInUp');
            card.style.animationDelay = `${index * 0.2}s`;
        });
    } else {
        moreReviews.style.display = 'none';
        seeMoreBtn.innerHTML = '<i class="fas fa-chevron-down"></i> See More Reviews';
        seeMoreBtn.classList.add('animate__pulse', 'animate__infinite');
    }
}

// Improved isInViewport function with better performance
function isInViewport(element) {
    // Cache window height for performance
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    // Use getBoundingClientRect only once per check
    const { top, bottom } = element.getBoundingClientRect();
    
    // Use a more efficient check
    return (top <= windowHeight * 0.85 && bottom >= 0);
}

// Better throttle function with requestAnimationFrame for smoother performance
const throttle = (function() {
    let waiting = false;
    return function(callback) {
        if (!waiting) {
            waiting = true;
            requestAnimationFrame(function() {
                callback();
                waiting = false;
            });
        }
    };
})();

// Handle search functionality
function simulateSearch(button) {
    const originalContent = button.innerHTML;
    button.disabled = true;
    button.classList.add('animate__animated', 'animate__pulse', 'animate__infinite');
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Searching...</span>';
    
    // Simulate search delay
    setTimeout(() => {
        button.classList.remove('animate__animated', 'animate__pulse', 'animate__infinite');
        button.innerHTML = originalContent;
        button.disabled = false;
        
        // Show a success animation
        button.classList.add('animate__animated', 'animate__bounceIn');
        setTimeout(() => {
            button.classList.remove('animate__animated', 'animate__bounceIn');
        }, 1000);
    }, 1500);
}

// Initialize animations on page load - Store variables in global scope to avoid recreation
const animatedElements = [];
let cachedScrollY = 0;
let ticking = false;

document.addEventListener('DOMContentLoaded', function() {
    // Cache all animated elements once on load
    document.querySelectorAll('.animate__animated').forEach(el => {
        if (!el.classList.contains('animate__animated--triggered')) {
            animatedElements.push(el);
        }
    });
    
    // Use passive event listener for scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Standardize animations for category cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach((card, index) => {
        card.classList.add('animate__fadeInUp');
        card.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Apple-style text animation for hero heading with India tricolor theme
    initializeHeroHeading();
    
    // Initial check for animations
    checkAnimations();
});

// Separate scroll handler for better performance
function handleScroll() {
    // Store the current scroll position
    cachedScrollY = window.scrollY;
    
    // Use requestAnimationFrame to avoid layout thrashing
    if (!ticking) {
        requestAnimationFrame(() => {
            checkAnimations();
            ticking = false;
        });
        ticking = true;
    }
}

// Separate function to check which elements are visible
function checkAnimations() {
    // Process a batch of elements at a time for smoother performance
    const elementsToRemove = [];
    
    for (let i = 0; i < animatedElements.length; i++) {
        const element = animatedElements[i];
        
        if (isInViewport(element)) {
            // Mark element as triggered
            element.classList.add('animate__animated--triggered');
            
            // Schedule removal from the array
            elementsToRemove.push(i);
            
            // Use CSS for animation instead of JS style changes
            // This avoids forced reflows
            element.classList.add('animate__triggered');
        }
    }
    
    // Remove processed elements from the array (in reverse order to avoid index shifting)
    for (let i = elementsToRemove.length - 1; i >= 0; i--) {
        animatedElements.splice(elementsToRemove[i], 1);
    }
    
    // Once we've processed all elements, remove the scroll listener to save resources
    if (animatedElements.length === 0) {
        window.removeEventListener('scroll', handleScroll);
    }
}

// Separate hero heading initialization for better organization
function initializeHeroHeading() {
    const heroHeading = document.getElementById('heroHeading');
    if (!heroHeading) return;
    
    // Get the original text and clear the heading
    const text = heroHeading.textContent;
    heroHeading.textContent = '';
    
    // Create a document fragment to minimize DOM operations
    const fragment = document.createDocumentFragment();
    
    // Pre-calculate all spans before adding to DOM
    const chars = text.split('');
    
    // Create and append spans for each character
    chars.forEach((char, index) => {
        const span = document.createElement('span');
        
        // Distribute India's tricolor
        if (index % 3 === 0) {
            span.classList.add('char-saffron');
        } else if (index % 3 === 1) {
            span.classList.add('char-white');
        } else {
            span.classList.add('char-green');
        }
        
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.animationDelay = `${index * 0.05}s`;
        
        fragment.appendChild(span);
    });
    
    // Add all spans to DOM in one operation
    heroHeading.appendChild(fragment);
    
    // Schedule highlight effects
    setTimeout(() => {
        scheduleHighlightSweep(heroHeading);
    }, chars.length * 50 + 500);
}

// Schedule highlight sweep with better performance
function scheduleHighlightSweep(heroHeading) {
    const spans = heroHeading.querySelectorAll('span');
    let animationActive = false;
    const spansArray = Array.from(spans);
    
    // Function for synchronized highlight sweep effect
    const highlightSweep = () => {
        // Skip if animation is already active
        if (animationActive) return;
        animationActive = true;
        
        // Track pending animations
        let pendingAnimations = spans.length;
        
        // Setup animation completion tracking to avoid memory leaks
        function onAnimationComplete() {
            pendingAnimations--;
            if (pendingAnimations === 0) {
                animationActive = false;
            }
        }
        
        // Use requestAnimationFrame for the initial batch
        requestAnimationFrame(() => {
            // Apply classes in batches for smoother performance
            for (let i = 0; i < spansArray.length; i++) {
                const span = spansArray[i];
                
                // Stagger the animations using setTimeout but with fewer DOM operations
                setTimeout(() => {
                    span.classList.add('animated');
                    
                    setTimeout(() => {
                        span.classList.remove('animated');
                        onAnimationComplete();
                    }, 2000);
                }, i * 50);
            }
        });
    };
    
    // First sweep after initial animation
    setTimeout(highlightSweep, 500);
    
    // Use a more efficient interval for recurring sweeps
    setInterval(() => {
        // Only start a new sweep if the heading is visible
        if (isInViewport(heroHeading) && !animationActive) {
            highlightSweep();
        }
    }, 6000);
}

// Add a custom CSS class to help with animations
if (!document.getElementById('scroll-optimize-styles')) {
    const style = document.createElement('style');
    style.id = 'scroll-optimize-styles';
    style.textContent = `
        .animate__triggered {
            will-change: opacity, transform;
            animation-play-state: running !important;
            opacity: 1 !important;
        }
    `;
    document.head.appendChild(style);
}