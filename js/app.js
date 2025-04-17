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

// Optimized isInViewport function (better performance)
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    // Use a 25% threshold for better performance
    return (
        rect.top <= windowHeight * 0.75 &&
        rect.bottom >= windowHeight * 0.25
    );
}

// Throttle function to limit how often a function is called
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

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

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', function() {
    // Get all animated elements that should trigger on scroll
    const animatedElements = document.querySelectorAll('.animate__animated');
    
    // Function to add animation classes when elements come into view (optimized)
    function checkAnimations() {
        animatedElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animate__animated--triggered')) {
                // Only add the triggered class - avoid manipulation of other classes for better performance
                element.classList.add('animate__animated--triggered');
                
                // Force the animation to play by manipulating opacity
                element.style.opacity = '0.99';
                setTimeout(() => {
                    element.style.opacity = '1';
                }, 10);
            }
        });
    }
    
    // Initial check for elements in viewport
    checkAnimations();
    
    // Throttle the scroll event for better performance
    window.addEventListener('scroll', throttle(checkAnimations, 100));
    
    // Standardize animations for category cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach((card, index) => {
        card.classList.add('animate__fadeInUp');
        card.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Apple-style text animation for hero heading with India tricolor theme
    const heroHeading = document.getElementById('heroHeading');
    
    if (heroHeading) {
        // Get the original text
        const text = heroHeading.textContent;
        
        // Clear the heading
        heroHeading.textContent = '';
        
        // Split the text into individual characters
        const chars = text.split('');
        
        // Create and append spans for each character
        chars.forEach((char, index) => {
            const span = document.createElement('span');
            
            // Distribute India's tricolor evenly across the text
            // Using modulo to create repeating pattern of saffron, white, green
            if (index % 3 === 0) {
                span.classList.add('char-saffron');
            } else if (index % 3 === 1) {
                span.classList.add('char-white');
            } else {
                span.classList.add('char-green');
            }
            
            span.textContent = char === ' ' ? '\u00A0' : char; // Replace spaces with non-breaking spaces
            
            // Use more predictable timing to avoid the "here and there" effect
            const delay = index * 0.05; // Consistent delay between characters
            span.style.animationDelay = `${delay}s`;
            
            heroHeading.appendChild(span);
        });
        
        // After all initial animations complete, start the continuous effects
        setTimeout(() => {
            // Get all spans
            const spans = heroHeading.querySelectorAll('span');
            
            // Function for synchronized highlight sweep effect
            const highlightSweep = () => {
                // Use forEach with a fixed delay pattern
                spans.forEach((span, index) => {
                    setTimeout(() => {
                        span.classList.add('animated');
                        
                        setTimeout(() => {
                            span.classList.remove('animated');
                        }, 2000); // Keep the glow for 2 seconds
                    }, index * 50); // More consistent timing (50ms between each)
                });
            };
            
            // First sweep after initial animation
            setTimeout(highlightSweep, 500);
            
            // Repeat the sweep at regular intervals
            setInterval(highlightSweep, 6000);
            
        }, chars.length * 50 + 500); // Wait until all characters have appeared
    }
});