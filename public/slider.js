document.addEventListener('DOMContentLoaded', function() {
    // Function to update the slider value display and position
    const updateSliderValueDisplay = (slider, displayElement) => {
        const value = parseInt(slider.value, 10);
        const max = parseInt(slider.max, 10);
        const min = parseInt(slider.min, 10);

        // Update display text
        displayElement.textContent = value;

        // Calculate percentage of the current value within the range
        const percentage = ((value - min) / (max - min)) * 100;

        // Update position of the current value label
        displayElement.style.left = `calc(${percentage}% - 0px)`; // Adjust based on thumb size and label width
    };

    // Select all slider elements
    const sliders = document.querySelectorAll('.slider');

    sliders.forEach(slider => {
        const sliderId = slider.id; // Get current slider's ID
        const currentValueId = sliderId + '-value'; // Construct ID for current value display

        // Create or select the current value display element
        let currentValueDisplay = document.getElementById(currentValueId);
        if (!currentValueDisplay) {
            currentValueDisplay = document.createElement('span');
            currentValueDisplay.id = currentValueId;
            currentValueDisplay.className = 'current-value';
            slider.parentNode.insertBefore(currentValueDisplay, slider.nextSibling);
        }

        // Initial update for each slider
        updateSliderValueDisplay(slider, currentValueDisplay);

        // Update on slider change
        slider.addEventListener('input', () => updateSliderValueDisplay(slider, currentValueDisplay));
    });
});