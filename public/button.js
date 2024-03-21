document.addEventListener('DOMContentLoaded', function() {
    // Find all buttons within the control-panel that are not associated with checkboxes
    const buttons = document.querySelectorAll('.control-panel .control button');

    buttons.forEach(button => {
        // Adding event listener to each button
        button.addEventListener('click', function() {
            // Assuming each button's corresponding slider has an ID that matches a pattern
            const sliderId = this.id + '-slider'; // Modify based on your actual ID pattern
            const slider = document.getElementById(sliderId);

            if (slider) {
                const duration = parseInt(slider.value, 10); // Get the slider value

                // Darken the button
                this.style.backgroundColor = 'darkgray';

                // After the specified duration, reset the button color
                setTimeout(() => {
                    this.style.backgroundColor = ''; // Reset the color
                }, duration);
            }

            const buttonLabel = this.id; // Using button ID as the label
            const sliderValue = slider ? slider.value : 'No slider found';

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
});