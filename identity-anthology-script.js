// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', (event) => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const config = {
        rootMargin: '50px 0px',
        threshold: 0.01
    };

    let imageObserver = new IntersectionObserver((entries, self) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                preloadImage(entry.target);
                self.unobserve(entry.target);
            }
        });
    }, config);

    images.forEach(image => {
        imageObserver.observe(image);
    });

    function preloadImage(img) {
        const src = img.getAttribute('data-src');
        if (!src) { return; }
        img.src = src;
    }

    // Fade-in animation for elements as they come into view
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0,
        rootMargin: "0px 0px -100px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Interactive book preview
    const bookCovers = document.querySelectorAll('.book-cover');
    bookCovers.forEach(cover => {
        cover.addEventListener('click', function() {
            // You could implement a modal or slideout here to show more book details
            alert(`Opening preview for ${this.alt}`);
        });
    });

    // Back to top button
    let backToTopButton = document.getElementById("back-to-top");
    if (!backToTopButton) {
        backToTopButton = document.createElement('button');
        backToTopButton.innerHTML = '↑';
        backToTopButton.setAttribute('id', 'back-to-top');
        backToTopButton.style.display = 'none'; // Hide the button initially
        document.body.appendChild(backToTopButton);
    }

    function scrollFunction() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    }

    // Attach scroll event listener
    window.addEventListener('scroll', scrollFunction);

    // Scroll to top when the button is clicked
    backToTopButton.addEventListener('click', function() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    });

    // Form submission (newsletter signup)
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            // Here you would typically send this to your server or newsletter service
            alert(`Thank you for subscribing with: ${email}`);
            this.reset();
        });
    }

    // Countdown timer for next event
    const nextEventDate = new Date("2024-09-15T00:00:00").getTime();
    let countdownElement = document.getElementById('countdown');
    if (!countdownElement) {
        countdownElement = document.createElement('div');
        countdownElement.setAttribute('id', 'countdown');
        const eventsSection = document.querySelector('#events');
        if (eventsSection) {
            eventsSection.prepend(countdownElement);
        }
    }

    const countdownTimer = setInterval(function() {
        const now = new Date().getTime();
        const distance = nextEventDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `Next event in: ${days}d ${hours}h ${minutes}m ${seconds}s`;

        if (distance < 0) {
            clearInterval(countdownTimer);
            countdownElement.innerHTML = "Event has started!";
        }
    }, 1000);
});