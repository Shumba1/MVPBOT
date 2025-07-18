document.addEventListener('DOMContentLoaded', function() {
    // --- LOGIC FOR INTERACTIVE COURSE MODULES (Individual Pages) ---
    const courseSlider = document.getElementById('course-slider');
    if (courseSlider) {
        const progressBar = document.getElementById('progressBar');
        const stepCounter = document.getElementById('stepCounter');
        const prevButton = document.getElementById('prev-slide');
        const nextButton = document.getElementById('next-slide');
        const totalSlides = courseSlider.querySelectorAll('.splide__slide').length;
        
        let splide = new Splide(courseSlider, {
            type: 'slide',
            pagination: false,
            arrows: false,
            drag: true,
            keyboard: 'global',
            easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
            speed: 600,
        }).mount();

        const refreshLucideIcons = () => {
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        };
        
        const updateUI = () => {
            const currentIndex = splide.index;
            const progress = ((currentIndex + 1) / totalSlides) * 100;
            progressBar.style.width = `${progress}%`;
            stepCounter.textContent = `${currentIndex + 1} / ${totalSlides}`;
            prevButton.disabled = currentIndex === 0;
            
            if (currentIndex === totalSlides - 1) {
                nextButton.innerHTML = 'Finish Course <i data-lucide="check-circle"></i>';
            } else {
                nextButton.innerHTML = 'Next <i data-lucide="arrow-right"></i>';
            }
            refreshLucideIcons();
        };

        splide.on('moved', updateUI);
        
        prevButton.addEventListener('click', () => splide.go('<'));
        nextButton.addEventListener('click', () => {
            if (splide.index === totalSlides - 1) {
                window.location.href = 'courses.html'; 
            } else {
                splide.go('>');
            }
        });

        // Drill Tracking Logic
        const dayTracker = document.querySelector('.day-tracker');
        const completionMessage = document.getElementById('drill-completion-message');
        
        const saveDrillProgress = () => {
            if (!dayTracker || !window.localStorageKey) return;
            const completedDays = [];
            dayTracker.querySelectorAll('.day-item.completed').forEach(item => {
                completedDays.push(item.dataset.day);
            });
            localStorage.setItem(window.localStorageKey, JSON.stringify(completedDays));
        };

        const checkDrillCompletion = () => {
            if (!dayTracker || !completionMessage) return;
            const totalDays = dayTracker.querySelectorAll('.day-item').length;
            const completedDays = dayTracker.querySelectorAll('.day-item.completed').length;
            
            if (totalDays > 0 && totalDays === completedDays) {
                completionMessage.classList.add('show');
            } else {
                completionMessage.classList.remove('show');
            }
            refreshLucideIcons();
        };
        
        const loadDrillProgress = () => {
            if (!dayTracker || !window.localStorageKey) return;
            const savedProgress = JSON.parse(localStorage.getItem(window.localStorageKey));
            if (Array.isArray(savedProgress)) {
                savedProgress.forEach(dayNumber => {
                    const dayItem = dayTracker.querySelector(`.day-item[data-day="${dayNumber}"]`);
                    if (dayItem) dayItem.classList.add('completed');
                });
            }
            checkDrillCompletion();
        };

        if (dayTracker) {
            dayTracker.addEventListener('click', e => {
                const item = e.target.closest('.day-item');
                if (item) {
                    item.classList.toggle('completed');
                    saveDrillProgress();
                    checkDrillCompletion();
                }
            });
            loadDrillProgress();
        }

        // Quiz Logic
        const quizContainers = document.querySelectorAll('.quiz-container');
        if(quizContainers.length > 0) {
            quizContainers.forEach(container => {
                const options = container.querySelectorAll('.quiz-option');
                const feedbackBox = container.querySelector('.quiz-feedback');

                options.forEach(option => {
                    option.addEventListener('click', function() {
                        if (option.parentElement.querySelector('.selected')) return; // Prevent re-answering

                        options.forEach(opt => opt.classList.remove('selected'));
                        this.classList.add('selected');

                        const feedbackText = this.getAttribute('data-feedback');
                        if (feedbackBox && feedbackText) {
                            feedbackBox.innerHTML = `<p>${feedbackText}</p>`;
                            feedbackBox.classList.add('show');
                        }
                    });
                });
            });
        }
        
        updateUI();
    }
});