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
    fetch('http://localhost:3000/get-config')
            .then(response => response.json())
            .then(config => {
                console.log(config)
                // Update slider values based on config
                sliders.forEach((slider, index) => {
                    slider.value = config[`slider${index + 1}`]; // Adjust the property name as per your JSON structure
                    sliderValues[index].value = config[`slider${index + 1}`]; // Adjust the property name as per your JSON structure
                });
            })
            .catch(error => {
                console.error('Error fetching config:', error);
            });

    // Select all slider elements
    const sliders = document.querySelectorAll('.slider');
    const sliderValues = document.querySelectorAll('.slider-value');

    sliders.forEach((slider, index) => {
        const sliderValueInput = sliderValues[index];
        // Update slider value when input value changes
        sliderValueInput.addEventListener('input', function() {
            slider.value = this.value;
        });

        // Update input value when slider value changes
        slider.addEventListener('input', function() {
            sliderValueInput.value = this.value;
        });
    });

    const ledSlider = document.getElementById('led-slider');

    // Add an event listener to the slider input element
    ledSlider.addEventListener('input', function() {
        // Get the current value of the slider
        const sliderValue = this.value;
        const buttonLabel ='led'; // Using button ID as the label

        // Find selected checkbox value
        let checkboxValue;
        const selectedCheckbox = document.querySelector('.checkbox-row input[type="checkbox"]:checked');
        if (selectedCheckbox) {
            checkboxValue = selectedCheckbox.value; // Get the value of the checked checkbox
        } else {
            checkboxValue = 'None selected';
        }

        // Prepare data to be sent
        const dataToSend = {
            buttonLabel,
            sliderValue,
            checkboxValue
        };

        // Sending data to backend
        fetch('http://localhost:3000/process-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        })
            .then(response => response.text())
            .then(data => {
                console.log(data); // Add this console.log statement
            })
            .catch(error => console.error('Error:', error));
    });
});