// Minecraft-inspired JavaScript for Crownforge

// Function to copy server IP to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Create a tooltip to show "Copied!" message
        const button = document.querySelector('button.minecraft-button');
        const originalText = button.textContent;
        
        // Change button text temporarily
        button.textContent = "Copied!";
        
        // Reset button text after 2 seconds
        setTimeout(() => {
            button.textContent = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
        // Fallback for browsers that don't support clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        // Show copied message
        const button = document.querySelector('button.minecraft-button');
        const originalText = button.textContent;
        button.textContent = "Copied!";
        setTimeout(() => {
            button.textContent = originalText;
        }, 2000);
    });
}

// Initialize UI elements - consolidated into a single DOMContentLoaded event
document.addEventListener('DOMContentLoaded', () => {
    // Add animation to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    
    // Use requestAnimationFrame for better performance
    requestAnimationFrame(() => {
        featureCards.forEach((card, index) => {
            // Add a slight delay to each card for a staggered effect
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 * index);
        });
    });
    
    // Optimize typing animation for welcome text
    initTypingAnimation();
});

// Optimized typing animation function
function initTypingAnimation() {
    const welcomeSection = document.querySelector('#welcome .section-content');
    if (!welcomeSection) return;
    
    const paragraphs = welcomeSection.querySelectorAll('p');
    if (!paragraphs.length) return;
    
    // Store original text and clear paragraphs
    const originalTexts = [];
    paragraphs.forEach(p => {
        originalTexts.push(p.textContent);
        p.textContent = '';
        p.style.opacity = '1';
    });
    
    // More efficient typing animation with chunking
    let currentParagraph = 0;
    let currentChar = 0;
    const CHUNK_SIZE = 3; // Type multiple characters at once for better performance
    
    function typeText() {
        if (currentParagraph >= paragraphs.length) return;
        
        // Type a chunk of characters at once
        for (let i = 0; i < CHUNK_SIZE; i++) {
            if (currentChar < originalTexts[currentParagraph].length) {
                paragraphs[currentParagraph].textContent += originalTexts[currentParagraph].charAt(currentChar);
                currentChar++;
            } else {
                // Move to next paragraph
                currentParagraph++;
                currentChar = 0;
                
                // If we have more paragraphs, schedule the next one after a delay
                if (currentParagraph < paragraphs.length) {
                    setTimeout(typeText, 500); // Delay before starting next paragraph
                }
                return;
            }
        }
        
        // Schedule the next chunk
        requestAnimationFrame(() => {
            setTimeout(typeText, 30);
        });
    }
    
    // Use Intersection Observer with better options
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start typing animation with a small delay
                setTimeout(typeText, 300);
                observer.disconnect();
            }
        });
    }, { 
        threshold: 0.2, // Trigger earlier
        rootMargin: "0px 0px 50px 0px" // Trigger before fully in view
    });
    
    observer.observe(welcomeSection);
}

// Add passive event listeners for better performance
window.addEventListener('scroll', () => {}, { passive: true });
window.addEventListener('touchstart', () => {}, { passive: true });
