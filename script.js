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
    });
}

// Initialize UI elements
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.minecraft-button');
    
    // Add animation to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach((card, index) => {
        // Add a slight delay to each card for a staggered effect
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });
});

// Minecraft-style typing animation for welcome text
document.addEventListener('DOMContentLoaded', () => {
    const welcomeSection = document.querySelector('#welcome .section-content');
    if (welcomeSection) {
        const paragraphs = welcomeSection.querySelectorAll('p');
        
        // Store original text and clear paragraphs
        const originalTexts = [];
        paragraphs.forEach(p => {
            originalTexts.push(p.textContent);
            p.textContent = '';
            p.style.opacity = '1';
        });
        
        // Type out text character by character
        let currentParagraph = 0;
        let currentChar = 0;
        
        function typeText() {
            if (currentParagraph < paragraphs.length) {
                if (currentChar < originalTexts[currentParagraph].length) {
                    paragraphs[currentParagraph].textContent += originalTexts[currentParagraph].charAt(currentChar);
                    currentChar++;
                    setTimeout(typeText, 30); // Adjust typing speed here
                } else {
                    currentParagraph++;
                    currentChar = 0;
                    setTimeout(typeText, 500); // Delay before starting next paragraph
                }
            }
        }
        
        // Start typing animation when section is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeText, 500);
                    observer.disconnect();
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(welcomeSection);
    }
});
