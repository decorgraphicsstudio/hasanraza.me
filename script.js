var startTime = Date.now(); // Start time before the load event

window.addEventListener('load', function () {
    var preloader = document.getElementById('preloader');
    var counter = document.getElementById('counter');
    var progress = 0;
    var startTime = Date.now();
    var initialDelay = 1000; // Delay before starting the counter (in milliseconds)
    var totalTime = Math.max(1000, Date.now() - startTime + initialDelay); // Calculate total time including initial delay
    var intervalDuration = 10; // Duration of each increment (in milliseconds)
    var progressPerStep = 100 / (totalTime / intervalDuration); // Calculate how much progress increases per step

    // Counter interval to simulate loading progress
    var interval = setInterval(function () {
        if (progress < 100) {
            progress += progressPerStep; // Increment progress
            progress = Math.min(progress, 100); // Ensure progress does not exceed 100
            counter.innerHTML = Math.round(progress) + '%'; // Display rounded progress
        }
    }, intervalDuration);

    // Ensure preloader hides and animations start after the loading is complete
    setTimeout(function () {
        progress = 100; // Ensure the counter reaches exactly 100
        counter.innerHTML = '100%'; // Set the final value to 100%
        clearInterval(interval); // Clear the interval

        startGSAPAnimations(); // Start GSAP animations or other actions
    }, totalTime);  // Wait until totalTime is reached


    function startGSAPAnimations() {
        gsap.to(".box1", {
            height: "0",
            delay: 0.3,
            duration: 1.4,
            ease: "power4.out",
        });

        gsap.to(".box2", {
            height: "0",
            delay: 0.3,
            duration: 1.4,
            ease: "power4.out",
            onComplete: function () {
                document.querySelector(".box").style.display = "none"; // Hide the box
                document.querySelector("#projects").classList.remove("d-none");
                gsap.to(".contant", {
                    opacity: "1",
                    scale: "1",
                    duration: 1,
                    ease: "back.inOut",
                });
                gsap.from(".head-text", {
                    x: "100",
                    opacity: "0",
                    scale: "0.5",
                    duration: 1.5,
                    ease: "bounce.out",
                    stagger: 0.3,
                });
                gsap.from(".glass-card", {
                    scale: "1.5",
                    rotate: "90",
                    duration: 1.2,
                    ease: "bounce.out",
                });
                gsap.from(".glass-card2", {
                    scale: "1.5",
                    rotate: "-90",
                    duration: 1.2,
                    ease: "bounce.out",
                });
            },
        });
    }
});

gsap.from(".logo-name", {
    x: "100",
    opacity: "0",
    duration: 1,
    ease: "power4.inOut",
})

Shery.mouseFollower({
    skew: true,
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 0.3,
});

Shery.makeMagnet(".magnet");

Shery.imageMasker(".text_media" /* Element to target.*/, {
    //Parameters are optional.
    mouseFollower: true,
    text: "Hasan",
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 1,
});

// Anchor element ko select karte hain
let links = document.querySelectorAll(".link_text");

links.forEach(function (link) {
    // Text ko span tags me wrap kar rahe hain
    let letters = link.textContent.split(""); // Split the text into individual letters
    link.innerHTML = ""; // Empty the link's content

    letters.forEach(letter => {
        let span = document.createElement('span'); // Create a span element for each letter
        span.textContent = letter; // Set the letter as the span's content
        link.appendChild(span); // Append the span to the link
    });

    // Ab animation add kar rahe hain
    let spans = link.querySelectorAll('span'); // Get all the span elements

    // Event listener for mouse hover
    link.addEventListener("mouseenter", function () {
        // Clone each span and apply the animation
        spans.forEach(span => {
            // Clone the current span
            let clone = span.cloneNode(true);
            clone.classList.add("clone_text"); // Add a class to easily identify clones
            clone.style.position = "absolute";
            clone.style.top = span.offsetTop + "px"; // Position clone at the same top position
            clone.style.left = span.offsetLeft + "px"; // Position clone at the same left position
            clone.style.color = "#BC6C25"; // Different color for clone
            clone.style.opacity = 0; // Initially invisible
            link.appendChild(clone); // Append clone to the link

            let clones = link.querySelectorAll('.clone_text'); // Get all the cloned spans

            // Animate the original span upwards with stagger
            gsap.to(spans, {
                y: -50, // Move original letter upwards
                opacity: 0,
                duration: 0.5, // Shorter duration for a snappier effect
                ease: "power4.inOut",
                stagger: 0.1 // Stagger each letter upwards by 0.1 seconds
            });

            // Animate the clone span from below to replace the original with stagger
            gsap.fromTo(clones, {
                y: 50, // Start from below the original
                opacity: 0, // Initially hidden
            }, {
                y: 0, // Move to the original position
                opacity: 1, // Make visible
                duration: 0.5, // Shorter duration for a snappier effect
                ease: "power4.inOut",
                stagger: 0.1 // Stagger each clone's appearance by 0.1 seconds
            });
        });
    });
    // Event listener for mouse leave
    link.addEventListener("mouseleave", function () {
        // Move the original spans back to their original position with stagger
        gsap.to(spans, {
            y: 0, // Move original letters back to original position
            opacity: 1, // Make them fully visible
            duration: 0.5, // Shorter duration for a snappier effect
            ease: "power4.inOut",
            stagger: 0.1 // Stagger each letter downwards by 0.1 seconds
        });

        // Move the clones back down and remove them after animation with stagger
        let clones = link.querySelectorAll('.clone_text'); // Get all the cloned spans
        gsap.to(clones, {
            y: 50, // Move clones downwards
            opacity: 0, // Fade out the clones
            duration: 0.5, // Shorter duration for a snappier effect
            ease: "power4.inOut",
            stagger: 0.1, // Stagger each clone's disappearance by 0.1 seconds
            onComplete: () => clones.forEach(clone => clone.remove()) // Remove the clones after animation completes
        });
    });
});


const cards = document.querySelectorAll('.myCard');
cards.forEach(function (card) {
    // Store the original transform property
    const originalTransform = card.style.transform;

    document.addEventListener('mousemove', function (e) {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // Calculate translation values
        const x = (e.clientX / windowWidth * 20) - 0; // Adjust this as needed
        const y = (e.clientY / windowHeight * 20) - 0; // Adjust this as needed

        // Set transform origin to the center
        card.style.transformOrigin = 'center';

        // Combine the original rotation with the new translation
        card.style.transform = `${originalTransform} translate(${x}px, ${y}px)`;
    });

    // Reset the card position when the mouse leaves the window
    document.addEventListener('mouseleave', function () {
        card.style.transform = originalTransform; // Reset to original transform
    });
});

let projectImg = document.querySelector('[data-img]').dataset.img;

let projects = document.querySelectorAll('.project');

projects.forEach(function (project) {
    let img;

    // Mouse enter event
    project.addEventListener('mouseenter', function () {
        let imgSRC = project.getAttribute('data-img');
        img = document.createElement('img');
        img.classList.add('project-img');
        img.src = imgSRC;
        project.appendChild(img);

        gsap.to(img, {
            opacity: 1,
            rotate: 0,
            scale: 1,
            ease: 'power4.inOut',
        });
    });

    // Mouse leave event
    project.addEventListener('mouseleave', function () {
        img = project.querySelector('.project-img');

        gsap.to(img, {
            opacity: 0,
            rotate: "-10",
            scale: 0,
            ease: 'power4.inOut',
            onComplete: function () {
                if (img) {
                    project.removeChild(img);
                }
            }
        });
    });
});