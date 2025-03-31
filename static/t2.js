// // JavaScript for Medical Prediction Platform with Session Storage

// document.addEventListener('DOMContentLoaded', function() {
//     // Initialize session storage for previous predictions if not available
//     if (!sessionStorage.getItem('diabetesPredictions')) {
//         sessionStorage.setItem('diabetesPredictions', JSON.stringify([]));
//     }
//     if (!sessionStorage.getItem('heartPredictions')) {
//         sessionStorage.setItem('heartPredictions', JSON.stringify([]));
//     }

//     // Tab functionality
//     document.querySelectorAll('.tab').forEach(tab => {
//         tab.addEventListener('click', () => {
//             const tabName = tab.dataset.tab;

//             // Update active tab
//             document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
//             tab.classList.add('active');

//             // Update active content
//             document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
//             document.getElementById(`${tabName}-tab`).classList.add('active');
//         });
//     });

//     // Feature names for both models
//     const diabetesFeatures = ['Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness', 
//                              'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age'];
//     const heartFeatures = ['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 
//                           'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal'];

//     // Load previous predictions from session storage
//     loadPreviousPredictions();

//     // Try to load charts if Chart.js is available
//     try {
//         // Fetch model metrics from server
//         fetch('/api/model-metrics')
//             .then(response => response.json())
//             .then(data => {
//                 loadCharts(data);
//             })
//             .catch(error => {
//                 console.error("Error fetching model metrics:", error);
//                 // Fallback to mock data
//                 loadCharts({
//                     'diabetes': {
//                         'confusion_matrix': [[50, 10], [15, 45]],
//                         'feature_importance': [0.28, 0.22, 0.12, 0.08, 0.1, 0.15, 0.05, 0.1]
//                     },
//                     'heart': {
//                         'confusion_matrix': [[60, 8], [12, 55]]
//                     }
//                 });
//             });
//     } catch (error) {
//         console.error("Error loading charts:", error);
//     }

//     // Diabetes Prediction Form Handling
//     const diabetesForm = document.getElementById('diabetes-form');
//     const diabetesResult = document.getElementById('diabetes-result');
//     const diabetesProbabilityFill = document.getElementById('diabetes-probability-fill');
//     const diabetesProbabilityText = document.getElementById('diabetes-probability-text');
//     const diabetesBadge = document.getElementById('diabetes-badge');
//     const resetDiabetesButton = document.getElementById('reset-diabetes');
//     const diabetesHistoryContainer = document.getElementById('diabetes-history');

//     if (diabetesForm) {
//         diabetesForm.addEventListener('submit', function(event) {
//             event.preventDefault();
            
//             try {
//                 // Get form data
//                 const formData = new FormData(diabetesForm);
//                 const jsonData = {};
                
//                 // Validate and collect all input values
//                 diabetesFeatures.forEach(feature => {
//                     const value = formData.get(feature);
//                     if (value === null || value === '') {
//                         throw new Error(`${feature} value is required`);
//                     }
//                     jsonData[feature] = parseFloat(value);
//                 });
                
//                 // Make API call to Python backend
//                 fetch('/api/predict/diabetes', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify(jsonData)
//                 })
//                 .then(response => response.json())
//                 .then(data => {
//                     if (data.success) {
//                         // Update UI with prediction result
//                         diabetesProbabilityFill.style.width = `${data.probability}%`;
//                         diabetesProbabilityText.textContent = `Probability: ${data.probability.toFixed(2)}%`;

//                         if (data.prediction === 1) {
//                             diabetesBadge.classList.remove('negative');
//                             diabetesBadge.classList.add('positive');
//                             diabetesBadge.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Positive';
//                         } else {
//                             diabetesBadge.classList.remove('positive');
//                             diabetesBadge.classList.add('negative');
//                             diabetesBadge.innerHTML = '<i class="fas fa-check-circle"></i> Negative';
//                         }

//                         diabetesResult.classList.remove('hidden');
                        
//                         // Save to session storage
//                         const prediction = {
//                             timestamp: new Date().toLocaleString(),
//                             inputs: jsonData,
//                             result: data.prediction,
//                             probability: data.probability
//                         };
                        
//                         const predictions = JSON.parse(sessionStorage.getItem('diabetesPredictions'));
//                         predictions.push(prediction);
//                         sessionStorage.setItem('diabetesPredictions', JSON.stringify(predictions));
                        
//                         // Update history display
//                         updatePredictionHistory(diabetesHistoryContainer, predictions);
//                     } else {
//                         throw new Error(data.error || 'Prediction failed');
//                     }
//                 })
//                 .catch(error => {
//                     console.error('API error:', error);
//                     showError(diabetesForm, error.message);
//                 });
//             } catch (error) {
//                 console.error('Form error:', error);
//                 showError(diabetesForm, error.message);
//             }
//         });
//     }

//     if (resetDiabetesButton) {
//         resetDiabetesButton.addEventListener('click', function() {
//             diabetesForm.reset();
//             diabetesResult.classList.add('hidden');
            
//             // Remove any error messages
//             const errorMessage = diabetesForm.querySelector('.error-message');
//             if (errorMessage) {
//                 errorMessage.remove();
//             }
//         });
//     }

//     // Heart Disease Prediction Form Handling
//     const heartForm = document.getElementById('heart-form');
//     const heartResult = document.getElementById('heart-result');
//     const heartProbabilityFill = document.getElementById('heart-probability-fill');
//     const heartProbabilityText = document.getElementById('heart-probability-text');
//     const heartBadge = document.getElementById('heart-badge');
//     const resetHeartButton = document.getElementById('reset-heart');
//     const heartHistoryContainer = document.getElementById('heart-history');

//     if (heartForm) {
//         heartForm.addEventListener('submit', function(event) {
//             event.preventDefault();
            
//             try {
//                 // Get form data
//                 const formData = new FormData(heartForm);
//                 const jsonData = {};
                
//                 // Validate and collect all input values
//                 heartFeatures.forEach(feature => {
//                     const value = formData.get(feature);
//                     if (value === null || value === '') {
//                         throw new Error(`${feature} value is required`);
//                     }
//                     jsonData[feature] = parseFloat(value);
//                 });
                
//                 // Make API call to Python backend
//                 fetch('/api/predict/heart', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify(jsonData)
//                 })
//                 .then(response => response.json())
//                 .then(data => {
//                     if (data.success) {
//                         // Update UI with prediction result
//                         heartProbabilityFill.style.width = `${data.probability}%`;
//                         heartProbabilityText.textContent =` Probability: ${data.probability.toFixed(2)}%`;

//                         if (data.prediction === 1) {
//                             heartBadge.classList.remove('negative');
//                             heartBadge.classList.add('positive');
//                             heartBadge.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Positive';
//                         } else {
//                             heartBadge.classList.remove('positive');
//                             heartBadge.classList.add('negative');
//                             heartBadge.innerHTML = '<i class="fas fa-check-circle"></i> Negative';
//                         }

//                         heartResult.classList.remove('hidden');
                        
//                         // Save to session storage
//                         const prediction = {
//                             timestamp: new Date().toLocaleString(),
//                             inputs: jsonData,
//                             result: data.prediction,
//                             probability: data.probability
//                         };
                        
//                         const predictions = JSON.parse(sessionStorage.getItem('heartPredictions'));
//                         predictions.push(prediction);
//                         sessionStorage.setItem('heartPredictions', JSON.stringify(predictions));
                        
//                         // Update history display
//                         updatePredictionHistory(heartHistoryContainer, predictions);
//                     } else {
//                         throw new Error(data.error || 'Prediction failed');
//                     }
//                 })
//                 .catch(error => {
//                     console.error('API error:', error);
//                     showError(heartForm, error.message);
//                 });
//             } catch (error) {
//                 console.error('Form error:', error);
//                 showError(heartForm, error.message);
//             }
//         });
//     }

//     if (resetHeartButton) {
//         resetHeartButton.addEventListener('click', function() {
//             heartForm.reset();
//             heartResult.classList.add('hidden');
            
//             // Remove any error messages
//             const errorMessage = heartForm.querySelector('.error-message');
//             if (errorMessage) {
//                 errorMessage.remove();
//             }
//         });
//     }
    
//     // Add event listeners for history clearing buttons
//     const clearDiabetesHistoryBtn = document.getElementById('clear-diabetes-history');
//     if (clearDiabetesHistoryBtn) {
//         clearDiabetesHistoryBtn.addEventListener('click', function() {
//             sessionStorage.setItem('diabetesPredictions', JSON.stringify([]));
//             updatePredictionHistory(diabetesHistoryContainer, []);
//         });
//     }
    
//     const clearHeartHistoryBtn = document.getElementById('clear-heart-history');
//     if (clearHeartHistoryBtn) {
//         clearHeartHistoryBtn.addEventListener('click', function() {
//             sessionStorage.setItem('heartPredictions', JSON.stringify([]));
//             updatePredictionHistory(heartHistoryContainer, []);
//         });
//     }
    
//     // Helper function to show errors
//     function showError(form, message) {
//         // Display error message
//         const errorContainer = document.createElement('div');
//         errorContainer.className = 'error-message';
//         errorContainer.textContent = message || 'An error occurred during prediction. Please try again.';
        
//         // Remove any existing error message
//         const existingError = form.querySelector('.error-message');
//         if (existingError) {
//             existingError.remove();
//         }
        
//         form.appendChild(errorContainer);
//     }
    
//     // Helper function to update prediction history display
//     function updatePredictionHistory(container, predictions) {
//         if (!container) return;
        
//         container.innerHTML = '';
        
//         if (predictions.length === 0) {
//             container.innerHTML = '<p class="empty-history">No prediction history available</p>';
//             return;
//         }
        
//         // Show most recent 5 predictions (or fewer if less available)
//         const recentPredictions = predictions.slice(-5).reverse();
        
//         recentPredictions.forEach(prediction => {
//             const predItem = document.createElement('div');
//             predItem.className = 'history-item';
            
//             const resultClass = prediction.result === 1 ? 'positive' : 'negative';
//             const resultText = prediction.result === 1 ? 'Positive' : 'Negative';
            
//             predItem.innerHTML = `
//                 <div class="history-time">${prediction.timestamp}</div>
//                 <div class="history-result ${resultClass}">${resultText} (${prediction.probability.toFixed(2)}%)</div>
//             `;
            
//             container.appendChild(predItem);
//         });
//     }
    
//     // Function to load previous predictions from session storage
//     function loadPreviousPredictions() {
//         const diabetesPredictions = JSON.parse(sessionStorage.getItem('diabetesPredictions') || '[]');
//         const heartPredictions = JSON.parse(sessionStorage.getItem('heartPredictions') || '[]');
        
//         if (diabetesHistoryContainer) {
//             updatePredictionHistory(diabetesHistoryContainer, diabetesPredictions);
//         }
        
//         if (heartHistoryContainer) {
//             updatePredictionHistory(heartHistoryContainer, heartPredictions);
//         }
//     }
    
//     // Function to load charts with model metrics
//     function loadCharts(metricsData) {
//         // Implementation for charts would go here, using the metrics data
//         // This code depends on Chart.js being available and assumes the
//         // HTML contains the necessary canvas elements
//         console.log('Loading charts with metrics data:', metricsData);
        
//         // Only continue if Chart library is available
//         if (typeof Chart === 'undefined') {
//             console.warn('Chart.js not available');
//             return;
//         }
        
//         // Load confusion matrices, ROC curves, PR curves, etc.
//         // (This would depend on your exact chart implementation)
//     }
// });
document.addEventListener('DOMContentLoaded', function() {
    // Initialize session storage
    if (!sessionStorage.getItem('diabetesPredictions')) {
        sessionStorage.setItem('diabetesPredictions', JSON.stringify([]));
    }
    if (!sessionStorage.getItem('heartPredictions')) {
        sessionStorage.setItem('heartPredictions', JSON.stringify([]));
    }

    // Tab functionality
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            document.getElementById(`${tabName}-tab`).classList.add('active');
        });
    });

    // Feature names
    const diabetesFeatures = ['Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness', 'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age'];
    const heartFeatures = ['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal'];

    // Load previous predictions
    loadPreviousPredictions();

    // Load charts
    try {
        fetch('/api/model-metrics')
            .then(response => response.json())
            .then(data => loadCharts(data))
            .catch(error => {
                console.error("Error fetching model metrics:", error);
                loadCharts({
                    'diabetes': { 'confusion_matrix': [[50, 10], [15, 45]], 'feature_importance': [0.28, 0.22, 0.12, 0.08, 0.1, 0.15, 0.05, 0.1] },
                    'heart': { 'confusion_matrix': [[60, 8], [12, 55]] }
                });
            });
    } catch (error) {
        console.error("Error loading charts:", error);
    }

    // Diabetes Form Handling
    handleForm('diabetes', diabetesFeatures);
    // Heart Form Handling
    handleForm('heart', heartFeatures);

    // Clear history buttons
    document.getElementById('clear-diabetes-history').addEventListener('click', () => clearHistory('diabetes'));
    document.getElementById('clear-heart-history').addEventListener('click', () => clearHistory('heart'));

    // Helper functions
    function handleForm(formType, features) {
        const form = document.getElementById(`${formType}-form`);
        const result = document.getElementById(`${formType}-result`);
        const probabilityFill = document.getElementById(`${formType}-probability-fill`);
        const probabilityText = document.getElementById(`${formType}-probability-text`);
        const badge = document.getElementById(`${formType}-badge`);
        const historyContainer = document.getElementById(`${formType}-history`);
        const resetButton = document.getElementById(`reset-${formType}`);

        form.addEventListener('submit', function(event) {
            event.preventDefault();
            result.classList.add('hidden'); // Hide previous results
            showLoading(form);

            try {
                const jsonData = {};
                features.forEach(feature => {
                    const value = parseFloat(form.elements[feature].value);
                    if (isNaN(value)) throw new Error(`${feature} must be a number.`);
                    jsonData[feature] = value;
                });
                fetch(`/api/predict/${formType}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(jsonData)
                })
                .then(response => {
                    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                    return response.json();
                })
                .then(data => {
                    hideLoading(form);
                    if (data.success) {
                        probabilityFill.style.width = `${data.probability}%`;
                        probabilityText.textContent = `Probability: ${data.probability.toFixed(2)}%`;
                        badge.innerHTML = `<i class="fas ${data.prediction === 1 ? 'fa-exclamation-triangle' : 'fa-check-circle'}"></i>${data.prediction === 1 ? 'Positive' : 'Negative'}`;
                        badge.classList.remove(data.prediction === 1 ? 'negative' : 'positive');
                        badge.classList.add(data.prediction === 1 ? 'positive' : 'negative');
                        result.classList.remove('hidden');
                        storePrediction(formType, jsonData, data);
                        updatePredictionHistory(historyContainer, JSON.parse(sessionStorage.getItem(`${formType}Predictions`)));
                    } else {
                        showError(form, data.error || 'Prediction failed.');
                    }
                })
                .catch(error => {
                    hideLoading(form);
                    showError(form, error.message || 'An error occurred.');
                    console.error('API error:', error);
                });
            } catch (error) {
                hideLoading(form);
                showError(form, error.message);
                console.error('Form error:', error);
            }
        });

        resetButton.addEventListener('click', () => {
            form.reset();
            result.classList.add('hidden');
            form.querySelectorAll('.error-message').forEach(el => el.remove());
        });
    }

    function storePrediction(formType, inputs, data) {
        const prediction = { timestamp: new Date().toLocaleString(), inputs, result: data.prediction, probability: data.probability };
        const predictions = JSON.parse(sessionStorage.getItem(`${formType}Predictions`));
        predictions.push(prediction);
        sessionStorage.setItem(`${formType}Predictions`, JSON.stringify(predictions));
    }

    function updatePredictionHistory(container, predictions) {
        if (!container) return;
        container.innerHTML = predictions && predictions.length > 0 ? predictions.slice(-5).reverse().map(pred => `
            <div class="history-item">
                <div class="history-time">${pred.timestamp}</div>
                <div class="history-result ${pred.result === 1 ? 'positive' : 'negative'}">${pred.result === 1 ? 'Positive' : 'Negative'} (${pred.probability.toFixed(2)}%)</div>
            </div>`).join('') : '<p class="empty-history">No prediction history available</p>';
    }

    function loadPreviousPredictions() {
        ['diabetes', 'heart'].forEach(type => updatePredictionHistory(document.getElementById(`${type}-history`), JSON.parse(sessionStorage.getItem(`${type}Predictions`))));
    }

    function loadCharts(metricsData) {
        if (typeof Chart === 'undefined') {
            console.warn('Chart.js not available');
            return;
        }
        const diabetesCanvas = document.getElementById('diabetes-confusion-matrix');
        if (diabetesCanvas && metricsData.diabetes && metricsData.diabetes.confusion_matrix) {
            new Chart(diabetesCanvas, {
                type: 'heatmap',
                data: {
                    labels: ['Negative', 'Positive'],
                    datasets: [{
                        data: [
                            { x: 'Negative', y: 'Negative', value: metricsData.diabetes.confusion_matrix[0][0] },
                            { x: 'Positive', y: 'Negative', value: metricsData.diabetes.confusion_matrix[1][0] },
                            { x: 'Negative', y: 'Positive', value: metricsData.diabetes.confusion_matrix[0][1] },
                            { x: 'Positive', y: 'Positive', value: metricsData.diabetes.confusion_matrix[1][1] }
                        ]
                    }]
                },
                options: { scales: { x: { display: true }, y: { display: true } } }
            });
        }
        // Add other chart implementations here
    }

    function showError(form, message) {
        const errorContainer = document.createElement('div');
        errorContainer.className = 'error-message';
        errorContainer.textContent = message;
        form.querySelectorAll('.error-message').forEach(el => el.remove());
        form.appendChild(errorContainer);
    }

    function clearHistory(formType) {
        sessionStorage.setItem(`${formType}Predictions`, JSON.stringify([]));
        updatePredictionHistory(document.getElementById(`${formType}-history`), []);
    }

    function showLoading(form){
        form.classList.add("loading");
    }

    function hideLoading(form){
        form.classList.remove("loading");
    }
});