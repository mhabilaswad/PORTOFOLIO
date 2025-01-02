document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling on wheel scroll
    let isScrolling = false;
    const scrollDuration = 1000; // Duration of scroll animation in milliseconds
    const scrollThreshold = 50; // Tolerance threshold in pixels

    // Function to scroll to the next section
    function scrollToNextSection() {
        const sections = $('section');
        const currentScrollPosition = $(window).scrollTop();
        let nextSection = null;

        sections.each(function() {
            const sectionTop = $(this).offset().top;
            if (sectionTop > currentScrollPosition + scrollThreshold) {
                nextSection = $(this);
                return false; // Exit the loop
            }
        });

        if (nextSection) {
            $('html, body').animate({
                scrollTop: nextSection.offset().top
            }, scrollDuration, function() {
                isScrolling = false;
            });
        } else {
            isScrolling = false; // Reset scrolling if no section found
        }
    }

    // Function to scroll to the previous section
    function scrollToPreviousSection() {
        const sections = $('section');
        const currentScrollPosition = $(window).scrollTop();
        let previousSection = null;

        for (let i = sections.length - 1; i >= 0; i--) {
            const section = $(sections[i]);
            const sectionTop = section.offset().top;
            if (sectionTop < currentScrollPosition - scrollThreshold) {
                previousSection = section;
                break;
            }
        }

        if (previousSection) {
            $('html, body').animate({
                scrollTop: previousSection.offset().top
            }, scrollDuration, function() {
                isScrolling = false;
            });
        } else {
            isScrolling = false; // Reset scrolling if no section found
        }
    }

    $(window).on('wheel', function(event) {
        if (!isScrolling) {
            isScrolling = true;
            if (event.originalEvent.deltaY > 0) {
                // Scroll down
                scrollToNextSection();
            } else {
                // Scroll up
                scrollToPreviousSection();
            }
        }
    });

    // Move the background based on cursor position
    $(document).mousemove(function(e) {
        const amountMovedX = (e.clientX / window.innerWidth - 0.5) * 10;
        const amountMovedY = (e.clientY / window.innerHeight - 0.5) * 10;
        $('body').css('background-position', `${50 + amountMovedX}% ${50 + amountMovedY}%`);
    });

    // Handle section visibility on scroll
    $(window).scroll(function() {
        const scrollPosition = $(window).scrollTop();
        const windowHeight = $(window).height();

        $('section').each(function() {
            const sectionTop = $(this).offset().top;
            const sectionHeight = $(this).outerHeight();

            if (scrollPosition + (windowHeight / 2) >= sectionTop && scrollPosition + (windowHeight / 2) < sectionTop + sectionHeight) {
                $(this).css('opacity', 1);
            } else {
                $(this).css('opacity', 0.5);
            }
        });
    });

    // Initial check for section visibility on page load
    $(window).trigger('scroll');
});


const awards = [
    { img: 'Awards/FotoHOLOGY1.jpg', title: '[2nd Runner Up] HOLOGY 7.0 Data Mining Competition by Brawijaya University', description: 'Achieved 2nd Runner Up in the Data Mining Competition at Brawijaya University, outperforming over 190 competitors by developing a highly accurate clothing classification model and completing an e-commerce product sales clustering' },
    { img: 'Awards/Innovillage2024.jpg', title: '[TOP 165] Innovillage 2024 by Telkom Indonesia', description: 'Receive funding for a social project to integrate IoT-based smart sensors for monitoring water quality collected from the filtration process in Gampong Jawa Village, Banda Aceh' },
    { img: 'Awards/DataSlayer.png', title: '[Finalist] Data Slayer 2.0 Machine Learning Competition by Telkom University Purwokerto', description: 'Surpassed 220+ competitors on Developing an accurate human fall detection classification model using Pretrained YOLOv8n for enhancing safety insights' }
];

let currentAward = 0;

function changeAward(direction) {
    if (direction === 'next') {
        currentAward = (currentAward + 1) % awards.length;
    } else if (direction === 'prev') {
        currentAward = (currentAward - 1 + awards.length) % awards.length;
    }
    updateAwardDisplay();
}

function updateAwardDisplay() {
    document.getElementById('award-img').src = awards[currentAward].img;
    document.getElementById('award-title').textContent = awards[currentAward].title;
    document.getElementById('award-description').textContent = awards[currentAward].description;
}
