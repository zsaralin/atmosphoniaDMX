document.addEventListener('DOMContentLoaded', function() {
    const saveButton = document.getElementById('save-button');

    saveButton.addEventListener('click', function() {
        const sliders = document.querySelectorAll('.slider');
        const sliderValues = Array.from(sliders).map(slider => slider.value);

        // Send the slider values to the backend
        fetch('/update-config', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sliderValues)
        })
            .then(response => {
                if (response.ok) {
                    console.log('Configuration updated successfully.');
                } else {
                    throw new Error('Failed to update configuration.');
                }
            })
            .catch(error => {
                console.error('Error updating configuration:', error);
            });
    });
});