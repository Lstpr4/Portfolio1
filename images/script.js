const texts = [
    "Beginner Software Engineer",
    "Experienced Robotics Engineer"
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;
let deleteSpeed = 50;
let pauseTime = 2000;

function type() {
    const currentText = texts[textIndex];
    const typingText = document.querySelector('.typing-text');
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = deleteSpeed;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = pauseTime;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
}

// All DOM-related functionality
document.addEventListener('DOMContentLoaded', function() {
    // Set initial scroll position to home section if URL doesn't have a hash
    if (!window.location.hash) {
        setTimeout(() => {
            const homeSection = document.getElementById('home');
            if (homeSection) {
                homeSection.scrollIntoView({ behavior: 'auto' });
            }
        }, 100);
    }
    
    // Setup scattered text
    const scatterLetters = document.querySelectorAll('.scatter-letter');
    
    // Calculate positions for the scatter effect
    scatterLetters.forEach((letter, index) => {
        // Set random starting position and rotation
        const x = Math.random() > 0.4 ? Math.random() : -Math.random();
        const y = Math.random() > 0.5 ? Math.random() : -Math.random();
        const r = Math.random() * 2 - 1; // Random rotation
        
        // Set custom properties for the animation
        letter.style.setProperty('--x', x);
        letter.style.setProperty('--y', y);
        letter.style.setProperty('--r', r);
        
        // Get the letter content
        const content = letter.textContent;
        
        // Special positioning for the 'e' after 'W'
        let specialOffset = 0;
        if (index === 1 && content === 'e') { // The 'e' right after 'W'
            specialOffset = -10; // Move it to the left by 10px
        }
        
        // Determine width based on character - give spaces less width
        let letterWidth = 36; // Default width
        if (content === ' ' || content === '&nbsp;') {
            letterWidth = 20; // Slightly wider spaces
        } else if (content === '.' || content === ',') {
            letterWidth = 12; // Smaller width for punctuation
        } else if (content === 'i' || content === 'l' || content === 't') {
            letterWidth = 24; // Smaller width for narrow letters
        } else if (content === 'm' || content === 'w') {
            letterWidth = 46; // Larger width for wide letters
        } else if (content === 'W') {
            letterWidth = 40; // Reduced width for capital W
        }
        
        // Calculate the position for this letter
        let position = 0;
        for (let i = 0; i < index; i++) {
            const prevContent = scatterLetters[i].textContent;
            // Add appropriate width based on the previous character
            if (prevContent === ' ' || prevContent === '&nbsp;') {
                position += 20;
            } else if (prevContent === '.' || prevContent === ',') {
                position += 12;
            } else if (prevContent === 'i' || prevContent === 'l' || prevContent === 't') {
                position += 24;
            } else if (prevContent === 'm' || prevContent === 'w') {
                position += 46;
            } else if (prevContent === 'W') {
                position += 40;
            } else {
                position += 36;
            }
        }
        
        // Calculate total width for centering
        let totalWidth = 0;
        
        for (let i = 0; i < scatterLetters.length; i++) {
            const c = scatterLetters[i].textContent;
            if (c === ' ' || c === '&nbsp;') {
                totalWidth += 20;
            } else if (c === '.' || c === ',') {
                totalWidth += 12;
            } else if (c === 'i' || c === 'l' || c === 't') {
                totalWidth += 24;
            } else if (c === 'm' || c === 'w') {
                totalWidth += 46;
            } else if (c === 'W') {
                totalWidth += 40;
            } else {
                totalWidth += 36;
            }
        }
        
        const startX = -totalWidth/2;
        const finalX = startX + position + specialOffset;
        const finalY = 0;
        
        letter.style.setProperty('--final-x', finalX + 'px');
        letter.style.setProperty('--final-y', finalY + 'px');
        
        // Stagger the animation
        letter.style.animationDelay = `${index * 0.05}s, 3s`;
    });
    
    // Get splash screen element
    const splashScreen = document.getElementById('splash-screen');
    
    // Remove splash screen after animations complete
    setTimeout(() => {
        if (splashScreen && splashScreen.parentNode) {
            splashScreen.parentNode.removeChild(splashScreen);
            
            // Scroll to home section after splash screen is removed
            const homeSection = document.getElementById('home');
            if (homeSection) {
                setTimeout(() => {
                    homeSection.scrollIntoView({ behavior: 'smooth' });
                }, 100); // Small delay to ensure smooth transition
            }
        }
    }, 7000); // Increased to account for longer animations
    
    // Start the typing animation
    type();
    
    // Setup about section hover effects
    const aboutSection = document.getElementById('about');
    aboutSection.addEventListener('mouseenter', () => {
        const letters = document.querySelectorAll('.letter');
        letters.forEach(letter => {
            // Randomly decide if the letter should turn red
            if (Math.random() > 0.5) {
                letter.style.color = 'rgb(242, 94, 94)';
            } else {
                letter.style.color = 'white';
            }
        });
    });

    // Reset colors when hover ends
    aboutSection.addEventListener('mouseleave', () => {
        const letters = document.querySelectorAll('.letter');
        letters.forEach(letter => {
            letter.style.color = 'white';
        });
    });
    
    // Function to toggle body scroll
    function toggleBodyScroll(disable) {
        if (disable) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    // Setup sidebar toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (menuToggle && hamburger && sidebar && mainContent) {
        console.log('Menu elements found');
        
        menuToggle.addEventListener('click', function() {
            console.log('Menu clicked');
            hamburger.classList.toggle('active');
            sidebar.classList.toggle('active');
            mainContent.classList.toggle('sidebar-active');
            
            // Toggle body scroll based on sidebar state
            toggleBodyScroll(sidebar.classList.contains('active'));
        });
        
        // Close sidebar when clicking on a menu item
        const menuItems = document.querySelectorAll('.sidebar-menu a');
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                hamburger.classList.remove('active');
                sidebar.classList.remove('active');
                mainContent.classList.remove('sidebar-active');
                toggleBodyScroll(false);
            });
        });
    } else {
        console.error('Menu elements not found');
    }
    
    // Word hover effect for bio section
    const bioTexts = document.querySelectorAll('.bio-text');
    bioTexts.forEach(paragraph => {
        const originalText = paragraph.textContent;
        const words = originalText.split(' ');
        
        // Replace paragraph content with spans for each word
        paragraph.innerHTML = words.map(word => 
            `<span class="bio-word">${word}</span>`
        ).join(' ');
        
        // Add hover effect to each word
        const bioWords = paragraph.querySelectorAll('.bio-word');
        bioWords.forEach(word => {
            word.addEventListener('mouseover', () => {
                word.style.color = 'rgb(242, 94, 94)';
                word.style.textShadow = '0 0 8px rgba(242, 94, 94, 0.7)';
                const bioBox = paragraph.closest('.bio-box');
                if (bioBox) {
                    bioBox.style.boxShadow = '0 0 20px rgba(242, 94, 94, 0.5)';
                    bioBox.style.borderColor = 'rgba(242, 94, 94, 0.6)';
                }
            });
            
            word.addEventListener('mouseout', () => {
                word.style.color = '';
                word.style.textShadow = '';
                // Don't reset container shadow here to maintain effect while any word is hovered
            });
        });
    });
    
    // Reset bio boxes when mouse leaves them
    const bioBoxes = document.querySelectorAll('.bio-box');
    bioBoxes.forEach(box => {
        box.addEventListener('mouseleave', () => {
            box.style.boxShadow = '';
            box.style.borderColor = 'rgba(242, 94, 94, 0.2)';
            
            const allWords = box.querySelectorAll('.bio-word');
            allWords.forEach(word => {
                word.style.color = '';
                word.style.textShadow = '';
            });
        });
    });

    // Super simple skill animation
    console.log('Skills and Tools animation script loaded');
    
    // Fallback to ensure sections eventually appear even if scroll doesn't trigger
    setTimeout(function() {
        showSkillsSection();
        showToolsSection();
    }, 3000); // Show after 3 seconds if not triggered by scroll
    
    // Add scroll event with throttling to improve performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(function() {
            checkAndShowSkills();
            checkAndShowTools();
        }, 100);
    });
    
    // Check once immediately in case sections are already visible
    setTimeout(function() {
        checkAndShowSkills();
        checkAndShowTools();
    }, 500);
    
    function checkAndShowSkills() {
        const skillsSection = document.getElementById('skills-section');
        if (!skillsSection) {
            console.error('Skills section not found');
            return;
        }
        
        const rect = skillsSection.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        // If skills section is at least 30% visible in viewport
        if (rect.top < windowHeight * 0.7) {
            showSkillsSection();
        }
    }
    
    function showSkillsSection() {
        // Get all the elements we need to animate
        const sectionHeader = document.querySelector('.section-header');
        const skillsContainer = document.querySelector('.skills-container');
        const skillItems = document.querySelectorAll('.skill-item');
        const skillLevels = document.querySelectorAll('.skill-level');
        
        // Remove hidden-element class from container
        if (skillsContainer) {
            skillsContainer.classList.remove('hidden-element');
            skillsContainer.classList.add('visible');
        }
        
        // Add visible classes
        if (sectionHeader) {
            sectionHeader.classList.remove('hidden-element');
            sectionHeader.classList.add('visible');
        }
        
        // Animate each skill item with delay
        if (skillItems && skillItems.length > 0) {
            skillItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('skill-visible');
                    // Also show the skill level
                    const skillLevel = item.querySelector('.skill-level');
                    if (skillLevel) {
                        skillLevel.style.opacity = '1';
                        skillLevel.style.transform = 'translateX(0)';
                    }
                }, 100 + (index * 100));
            });
        }
        
        // Remove scroll listener once animation is triggered
        window.removeEventListener('scroll', checkAndShowSkills);
    }

    // Create an Intersection Observer for the skills section
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                showSkillsSection();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    // Start observing the skills section
    const skillsSection = document.getElementById('skills-section');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    function checkAndShowTools() {
        const toolsSection = document.getElementById('tools-section');
        if (!toolsSection) {
            console.error('Tools section not found');
            return;
        }
        
        const rect = toolsSection.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        // If tools section is at least 30% visible in viewport
        if (rect.top < windowHeight * 0.7) {
            console.log('Tools section in view, triggering animation');
            showToolsSection();
        }
    }
    
    function showToolsSection() {
        console.log('Showing tools section');
        
        // Get all the elements we need to animate
        const sectionHeader = document.querySelector('#tools-section .section-header');
        const toolsContainer = document.querySelector('.tools-container');
        const toolItems = document.querySelectorAll('.tool-item');
        
        // Add visible classes
        if (sectionHeader) sectionHeader.classList.add('visible');
        if (toolsContainer) toolsContainer.classList.add('visible');
        
        // Animate each tool item with delay
        if (toolItems && toolItems.length > 0) {
            console.log('Animating', toolItems.length, 'tool items');
            toolItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('tool-visible');
                }, 300 + (index * 150));
            });
        } else {
            console.error('No tool items found');
        }
        
        // Remove scroll listener once animation is triggered
        window.removeEventListener('scroll', checkAndShowTools);
    }

    // Observer for Education section
    const educationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelector('.education-container').classList.add('visible');
                
                // Add staggered animation to each education item
                const educationItems = document.querySelectorAll('.education-item');
                educationItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('education-visible');
                    }, 300 * (index + 1));
                });
                
                educationObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    // Observe the Education section
    const educationSection = document.getElementById('education');
    if (educationSection) {
        educationObserver.observe(educationSection);
    }

    // Contact Me button functionality
    const contactButton = document.getElementById('p2');
    const sidebarContactLink = document.getElementById('sidebar-contact');
    let contactInfoVisible = false;
    let contactInfoElement = null;
    
    function toggleContactInfo() {
        if (!contactInfoVisible) {
            // Create contact info element if it doesn't exist
            if (!contactInfoElement) {
                contactInfoElement = document.createElement('div');
                contactInfoElement.className = 'contact-info';
                contactInfoElement.innerHTML = `
                    <p><i class="fas fa-phone"></i> (661) 369-1963</p>
                    <p><i class="fas fa-at"></i> jonathanmunoz07@outlook.com</p>
                `;
                contactInfoElement.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                contactInfoElement.style.border = '1px solid rgb(242, 94, 94)';
                contactInfoElement.style.borderRadius = '5px';
                contactInfoElement.style.padding = '15px';
                contactInfoElement.style.marginTop = '15px';
                contactInfoElement.style.color = 'white';
                contactInfoElement.style.boxShadow = '0 0 10px rgba(242, 94, 94, 0.5)';
                contactInfoElement.style.animation = 'fadeIn 0.3s ease-in-out';
                
                // Insert after the buttons
                contactButton.parentNode.insertBefore(contactInfoElement, contactButton.nextSibling);
            } else {
                // Just show it if it already exists
                contactInfoElement.style.display = 'block';
                contactInfoElement.style.animation = 'fadeIn 0.3s ease-in-out';
            }
            contactInfoVisible = true;
        } else {
            // Hide the contact info
            contactInfoElement.style.animation = 'fadeOut 0.3s ease-in-out forwards';
            setTimeout(() => {
                contactInfoElement.style.display = 'none';
            }, 300);
            contactInfoVisible = false;
        }
    }
    
    contactButton.addEventListener('click', toggleContactInfo);
    
    // Also trigger contact info from sidebar link
    if (sidebarContactLink) {
        sidebarContactLink.addEventListener('click', function(e) {
            e.preventDefault();
            toggleContactInfo();
            
            // Also close the sidebar on mobile if it's open
            const sidebar = document.getElementById('sidebar');
            if (sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                document.querySelector('.hamburger').classList.remove('active');
            }
        });
    }

    // Status animation
    const statuses = ['online', 'busy', 'idle'];
    const statusText = document.querySelector('.status-text');
    const statusOrb = document.querySelector('.status-orb');
    let currentStatusIndex = 0;
    let statusCharIndex = 0;
    let isStatusDeleting = false;
    let statusTypingSpeed = 120;
    
    // Initialize with first status
    updateStatusOrb(statuses[currentStatusIndex]);
    
    function updateStatusOrb(status) {
        // Remove existing status classes
        statusOrb.classList.remove('status-online', 'status-busy', 'status-idle');
        
        // Add correct status class
        statusOrb.classList.add('status-' + status);
    }
    
    function typeStatus() {
        const currentStatus = statuses[currentStatusIndex];
        
        if (isStatusDeleting) {
            // Deleting characters
            statusText.textContent = currentStatus.substring(0, statusCharIndex - 1);
            statusCharIndex--;
            statusTypingSpeed = 70;
        } else {
            // Adding characters
            statusText.textContent = currentStatus.substring(0, statusCharIndex + 1);
            statusCharIndex++;
            statusTypingSpeed = 120;
        }
        
        // Determine what to do next
        if (!isStatusDeleting && statusCharIndex === currentStatus.length) {
            // Finished typing the full status
            statusTypingSpeed = 2000; // Pause longer to read
            isStatusDeleting = true;
            setTimeout(typeStatus, statusTypingSpeed);
            return;
        } else if (isStatusDeleting && statusCharIndex === 0) {
            // Finished deleting the status
            isStatusDeleting = false;
            currentStatusIndex = (currentStatusIndex + 1) % statuses.length;
            updateStatusOrb(statuses[currentStatusIndex]);
            statusTypingSpeed = 500; // Pause before typing next status
        }
        
        setTimeout(typeStatus, statusTypingSpeed);
    }
    
    // Start the status typing animation
    if (statusText && statusOrb) {
        setTimeout(typeStatus, 1000);
    }

    // Initialize project section animations
    function initProjectsSection() {
        const projectsContainer = document.querySelector('.projects-container');
        if (projectsContainer) {
            projectsContainer.classList.add('hidden-element');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.remove('hidden-element');
                        entry.target.classList.add('fade-in-up');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(projectsContainer);
        }
    }

    // Call all initialization functions
    initProjectsSection();
});

// Add fadeIn and fadeOut animations to the stylesheet dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-10px); }
    }
`;
document.head.appendChild(style);
// Add this within the document.addEventListener('DOMContentLoaded', function() {...}) block

// Function to maintain layout on minimization/restoration
function maintainLayout() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    const hamburger = document.querySelector('.hamburger');
    let scrollPosition = window.scrollY || window.pageYOffset;
    let isSidebarActive = sidebar.classList.contains('active');

    // Save current state
    function saveState() {
        scrollPosition = window.scrollY || window.pageYOffset;
        isSidebarActive = sidebar.classList.contains('active');
    }

    // Restore layout
    function restoreLayout() {
        // Restore sidebar state
        if (isSidebarActive) {
            sidebar.classList.add('active');
            mainContent.classList.add('sidebar-active');
            hamburger.classList.add('active');
        } else {
            sidebar.classList.remove('active');
            mainContent.classList.remove('sidebar-active');
            hamburger.classList.remove('active');
        }

        // Restore scroll position
        window.scrollTo({
            top: scrollPosition,
            behavior: 'auto'
        });

        // Re-trigger visibility checks for animated elements
        if (!isFooterInView()) {
            checkAndShowSkills();
            checkAndShowTools();
            checkAndShowEducation();
            checkAndShowProjects();
        }
    }

    // Handle resize with debouncing
    let resizeTimeout;
    window.addEventListener('resize', function() {
        saveState();
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(restoreLayout, 100);
    });

    // Handle minimization/restoration
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
            restoreLayout();
        } else {
            saveState();
        }
    });

    // Add viewport meta tag for consistent scaling
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    document.head.appendChild(meta);
}

// Add checkAndShowEducation and checkAndShowProjects if not already present
function checkAndShowEducation() {
    const educationSection = document.getElementById('education');
    if (!educationSection || isFooterInView()) return;

    const rect = educationSection.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    if (rect.top < windowHeight * 0.7) {
        const educationContainer = document.querySelector('.education-container');
        const educationItems = document.querySelectorAll('.education-item');

        if (educationContainer) {
            educationContainer.classList.add('visible');
        }

        if (educationItems && educationItems.length > 0) {
            educationItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('education-visible');
                }, 300 * (index + 1));
            });
        }
    }
}

function checkAndShowProjects() {
    const projectsContainer = document.querySelector('.projects-container');
    if (!projectsContainer || isFooterInView()) return;

    const rect = projectsContainer.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    if (rect.top < windowHeight * 0.7) {
        projectsContainer.classList.remove('hidden-element');
        projectsContainer.classList.add('fade-in-up');
    }
}

// Call maintainLayout
maintainLayout();
// Function to check if footer is in view
function isFooterInView() {
    const footer = document.querySelector('footer');
    if (!footer) return false;
    const rect = footer.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    return rect.top <= windowHeight && rect.bottom >= 0;
}

// Modified scroll event handler to skip animations when footer is in view
let scrollTimeout;
window.addEventListener('scroll', function() {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(function() {
        if (!isFooterInView()) {
            // Only trigger animations if footer is not in view
            checkAndShowSkills();
            checkAndShowTools();
            checkAndShowEducation();
            checkAndShowProjects();
        }
    }, 100);
});

// Ensure footer doesn't trigger animations on initial load
setTimeout(function() {
    if (!isFooterInView()) {
        checkAndShowSkills();
        checkAndShowTools();
        checkAndShowEducation();
        checkAndShowProjects();
    }
}, 500);
function restoreLayout() {
    // ... existing code ...
    // Force reflow for animations
    mainContent.style.display = 'none';
    void mainContent.offsetWidth;
    mainContent.style.display = '';
}
// Scroll to projects on small screens after splash screen
setTimeout(() => {
    if (window.innerWidth <= 768) {
        const projectsSection = document.querySelector('.projects-container');
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
}, 7500); // After splash screen (7000ms + 500ms buffer)
let letterWidth = 15; // From 20
if (content === ' ') letterWidth = 8;
function adjustProjectsAlignment() {
    const container = document.querySelector('.projects-container');
    if (container) {
        container.style.display = 'flex';
        container.style.margin = '20px auto';
    }
}
document.addEventListener('DOMContentLoaded', function() {
    // Function to center and stack projects
    function adjustProjectsLayout() {
        const projectsContainer = document.querySelector('.projects-container');
        const projectItems = document.querySelectorAll('.project-item');

        if (projectsContainer && projectItems.length > 0) {
            // Force reflow to fix alignment
            projectsContainer.style.display = 'none';
            void projectsContainer.offsetWidth;
            projectsContainer.style.display = 'flex';

            // Adjust based on window size
            const windowWidth = window.innerWidth;
            projectsContainer.style.width = '100vw';
            projectsContainer.style.height = '100vh';
            projectsContainer.style.margin = '0';
            projectsContainer.style.justifyContent = 'center';
            projectsContainer.style.alignItems = 'center';

            projectItems.forEach(item => {
                item.style.margin = '0 auto'; // Center each item
                if (windowWidth <= 480) {
                    item.style.flex = '0 1 90%';
                    item.style.maxWidth = '95%';
                    projectsContainer.style.flexDirection = 'column';
                } else if (windowWidth <= 768) {
                    item.style.flex = '0 1 45%';
                    item.style.maxWidth = '100%';
                    projectsContainer.style.flexDirection = 'row';
                } else {
                    item.style.flex = '0 1 300px';
                    item.style.maxWidth = '350px';
                    projectsContainer.style.flexDirection = 'row';
                }
            });
        }
    }

    // Initial adjustment
    adjustProjectsLayout();

    // Adjust on resize
    window.addEventListener('resize', adjustProjectsLayout);

    // Rest of your existing JavaScript
});
function scrollToSection(fas fa-project-diagram) {
            const element = document.getElementById(fas fa-project-diagram);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
