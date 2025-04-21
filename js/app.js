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

// Toggle itinerary details visibility
function toggleItinerary(itineraryId) {
    const detailsElement = document.getElementById(`${itineraryId}-details`);
    
    // Hide all other itineraries first
    document.querySelectorAll('.itinerary-details').forEach(el => {
        if (el.id !== `${itineraryId}-details`) {
        el.style.display = 'none';
        }
    });
    
    // Toggle the selected itinerary
    if (detailsElement.style.display === 'none') {
        detailsElement.style.display = 'block';
        
        // Scroll to the itinerary details with smooth animation
        setTimeout(() => {
            detailsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    } else {
        detailsElement.style.display = 'none';
    }
}

// Function to save itinerary as PDF with proper content
function saveItineraryPDF(itineraryId) {
    // First, make sure the itinerary details are visible
    const detailsElement = document.getElementById(`${itineraryId}-details`);
    const wasHidden = detailsElement.style.display === 'none';
    
    if (wasHidden) {
        detailsElement.style.display = 'block';
    }
    
    // Show loading message
    const loadingToast = document.createElement('div');
    loadingToast.classList.add('position-fixed', 'bottom-0', 'end-0', 'p-3', 'm-3', 'bg-info', 'text-white', 'rounded');
    loadingToast.style.zIndex = '5000';
    loadingToast.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Generating your PDF...';
    document.body.appendChild(loadingToast);
    
    // Load jsPDF library dynamically if not already loaded
    function loadJsPDF() {
        return new Promise((resolve) => {
            if (window.jspdf) {
                resolve(window.jspdf.jsPDF);
                return;
            }
            
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
            script.onload = () => resolve(window.jspdf.jsPDF);
            document.body.appendChild(script);
        });
    }
    
    // Generate PDF content
    loadJsPDF().then((jsPDF) => {
        // Create new PDF document
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });
        
        // Get itinerary data
        const itineraryNames = {
            'north-india': 'North India Heritage Tour',
            'south-india': 'South India Temples Tour',
            'unesco-wonders': 'UNESCO Wonders of India Tour'
        };
        
        const itineraryTitle = itineraryNames[itineraryId];
        
        // Add logo and header
        // Since we can't directly add images in this example, we'll create a text-based header
        doc.setFontSize(22);
        doc.setTextColor(255, 153, 51); // Saffron color from Indian flag
        doc.text('Map My Heritage', 105, 20, { align: 'center' });
        
        // Add title
        doc.setFontSize(18);
        doc.setTextColor(0, 0, 0);
        doc.text(itineraryTitle, 105, 30, { align: 'center' });
        
        // Add horizontal line
        doc.setDrawColor(19, 136, 8); // Green from Indian flag
        doc.setLineWidth(0.5);
        doc.line(20, 35, 190, 35);
        
        // Extract and add itinerary content
        const packageTitle = detailsElement.querySelector('.card-header h5').textContent;
        doc.setFontSize(14);
        doc.text(packageTitle, 20, 45);
        
        // Add package inclusions
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text('Package Inclusions:', 20, 55);
        
        const inclusionItems = Array.from(detailsElement.querySelectorAll('.list-group-item')).slice(0, 5);
        inclusionItems.forEach((item, index) => {
            doc.text(`• ${item.textContent.trim()}`, 25, 65 + (index * 7));
        });
        
        // Add itinerary days
        doc.text('Itinerary Overview:', 20, 105);
        
        const timelineItems = Array.from(detailsElement.querySelectorAll('.timeline-item')).slice(0, 5);
        timelineItems.forEach((item, index) => {
            const title = item.querySelector('.timeline-title').textContent;
            const description = item.querySelector('.timeline-content p').textContent;
            doc.text(`${title}`, 25, 115 + (index * 14));
            doc.setFontSize(10);
            doc.text(`${description}`, 25, 120 + (index * 14));
            doc.setFontSize(12);
        });
        
        // Add price information
        const priceInfo = detailsElement.querySelector('.alert-success h6').textContent;
        doc.setFontSize(12);
        doc.text('Price Information:', 20, 195);
        doc.setFontSize(11);
        doc.text(priceInfo, 25, 202);
        
        // Add footer with contact info
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text('Map My Heritage - Your gateway to India\'s cultural treasures', 105, 280, { align: 'center' });
        doc.text('Contact: info@mapmyheritage.in | www.mapmyheritage.in | +91-123-456-7890', 105, 285, { align: 'center' });
        
        // Save the PDF
        try {
            doc.save(`${itineraryNames[itineraryId]} - Map My Heritage.pdf`);
            
            // Remove loading message
            document.body.removeChild(loadingToast);
            
            // Show success message
            const successToast = document.createElement('div');
            successToast.classList.add('position-fixed', 'bottom-0', 'end-0', 'p-3', 'm-3', 'bg-success', 'text-white', 'rounded', 'animate__animated', 'animate__fadeIn');
            successToast.style.zIndex = '5000';
            successToast.innerHTML = '<i class="fas fa-check-circle mr-2"></i> Your itinerary has been saved to your downloads folder!';
            document.body.appendChild(successToast);
            
            // Remove success message after 3 seconds
            setTimeout(() => {
                successToast.classList.remove('animate__fadeIn');
                successToast.classList.add('animate__fadeOut');
                setTimeout(() => {
                    document.body.removeChild(successToast);
                }, 1000);
            }, 3000);
        } catch (e) {
            console.error("PDF generation failed:", e);
            
            // Show error message
            document.body.removeChild(loadingToast);
            const errorToast = document.createElement('div');
            errorToast.classList.add('position-fixed', 'bottom-0', 'end-0', 'p-3', 'm-3', 'bg-danger', 'text-white', 'rounded', 'animate__animated', 'animate__fadeIn');
            errorToast.style.zIndex = '5000';
            errorToast.innerHTML = '<i class="fas fa-exclamation-circle mr-2"></i> There was an error generating your PDF. Please try again.';
            document.body.appendChild(errorToast);
            
            // Remove error message after 3 seconds
            setTimeout(() => {
                errorToast.classList.remove('animate__fadeIn');
                errorToast.classList.add('animate__fadeOut');
                setTimeout(() => {
                    document.body.removeChild(errorToast);
                }, 1000);
            }, 3000);
        }
        
        // If it was hidden before, hide it again
        if (wasHidden) {
            detailsElement.style.display = 'none';
        }
    }).catch(err => {
        console.error("Failed to load jsPDF:", err);
        document.body.removeChild(loadingToast);
        
        // Show error message
        const errorToast = document.createElement('div');
        errorToast.classList.add('position-fixed', 'bottom-0', 'end-0', 'p-3', 'm-3', 'bg-danger', 'text-white', 'rounded');
        errorToast.style.zIndex = '5000';
        errorToast.innerHTML = '<i class="fas fa-exclamation-circle mr-2"></i> Failed to load PDF generation library. Please check your internet connection.';
        document.body.appendChild(errorToast);
        
        // Remove error message after 3 seconds
        setTimeout(() => {
            document.body.removeChild(errorToast);
        }, 4000);
        
        // If it was hidden before, hide it again
        if (wasHidden) {
            detailsElement.style.display = 'none';
        }
    });
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

// Add to window onload to ensure it works after the page is loaded
window.addEventListener('load', function() {
    // Add active class to view buttons when clicked
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });
});