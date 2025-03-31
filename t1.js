// // Initialize Lucide icons
// document.addEventListener('DOMContentLoaded', () => {
//     lucide.createIcons();
//     initializeApp();
//   });
  
//   // Sample data for the application
//   const sampleData = {
//     diabetes: {
//       accuracy: 0.87,
//       precision: 0.83,
//       recall: 0.85,
//       f1Score: 0.84,
//       confusionMatrix: [[120, 18], [15, 88]],
//       roc: [
//         { fpr: 0, tpr: 0 },
//         { fpr: 0.1, tpr: 0.4 },
//         { fpr: 0.3, tpr: 0.7 },
//         { fpr: 0.5, tpr: 0.9 },
//         { fpr: 0.7, tpr: 0.95 },
//         { fpr: 1, tpr: 1 }
//       ],
//       precisionRecall: [
//         { recall: 0, precision: 1 },
//         { recall: 0.2, precision: 0.95 },
//         { recall: 0.4, precision: 0.9 },
//         { recall: 0.6, precision: 0.85 },
//         { recall: 0.8, precision: 0.75 },
//         { recall: 1, precision: 0.65 }
//       ]
//     },
//     heart: {
//       accuracy: 0.82,
//       precision: 0.79,
//       recall: 0.81,
//       f1Score: 0.80,
//       confusionMatrix: [[105, 25], [20, 90]],
//       roc: [
//         { fpr: 0, tpr: 0 },
//         { fpr: 0.15, tpr: 0.35 },
//         { fpr: 0.3, tpr: 0.65 },
//         { fpr: 0.5, tpr: 0.8 },
//         { fpr: 0.7, tpr: 0.9 },
//         { fpr: 1, tpr: 1 }
//       ],
//       precisionRecall: [
//         { recall: 0, precision: 1 },
//         { recall: 0.2, precision: 0.9 },
//         { recall: 0.4, precision: 0.85 },
//         { recall: 0.6, precision: 0.8 },
//         { recall: 0.8, precision: 0.7 },
//         { recall: 1, precision: 0.6 }
//       ]
//     }
//   };
  
//   // State for predictions
//   let predictionState = {
//     diabetesPrediction: null,
//     heartDiseasePrediction: null
//   };
  
//   // Initialize the application
//   function initializeApp() {
//     // Initialize all components
//     initializeDiabetesForm();
//     initializeHeartDiseaseForm();
//     initializeAccuracyMetrics();
//     initializeVisualizations();
//     initializeConfusionMatrices();
//     initializeModelComparison();
//   }
  
//   // Initialize Diabetes Prediction Form
//   function initializeDiabetesForm() {
//     const formContainer = document.getElementById('diabetes-prediction-form');
    
//     formContainer.innerHTML = `
//       <form id="diabetes-form" class="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div class="mb-3">
//           <label for="glucose" class="form-label">Glucose Level</label>
//           <input type="number" class="form-control" id="glucose" placeholder="70-200 mg/dL" required>
//         </div>
//         <div class="mb-3">
//           <label for="bloodPressure" class="form-label">Blood Pressure</label>
//           <input type="number" class="form-control" id="bloodPressure" placeholder="70-150 mm Hg" required>
//         </div>
//         <div class="mb-3">
//           <label for="insulin" class="form-label">Insulin Level</label>
//           <input type="number" class="form-control" id="insulin" placeholder="0-300 mu U/ml" required>
//         </div>
//         <div class="mb-3">
//           <label for="bmi" class="form-label">BMI</label>
//           <input type="number" class="form-control" id="bmi" step="0.1" placeholder="18.5-40" required>
//         </div>
//         <div class="mb-3">
//           <label for="age" class="form-label">Age</label>
//           <input type="number" class="form-control" id="age" placeholder="20-80" required>
//         </div>
//         <div class="mb-3">
//           <label for="pregnancies" class="form-label">Pregnancies</label>
//           <input type="number" class="form-control" id="pregnancies" placeholder="0-15" min="0" required>
//         </div>
//         <div class="mb-3">
//           <label for="skinThickness" class="form-label">Skin Thickness</label>
//           <input type="number" class="form-control" id="skinThickness" placeholder="10-50 mm" required>
//         </div>
//         <div class="mb-3">
//           <label for="diabetesPedigree" class="form-label">Diabetes Pedigree Function</label>
//           <input type="number" class="form-control" id="diabetesPedigree" step="0.01" placeholder="0.1-2.5" required>
//         </div>
//         <div class="col-span-1 md:col-span-2 mt-4">
//           <button type="submit" class="btn btn-primary py-2 px-4 rounded w-full">Predict Diabetes Risk</button>
//         </div>
//       </form>
//       <div id="diabetes-result" class="mt-4 hidden">
//         <div class="alert alert-info p-4 rounded-lg"></div>
//       </div>
//     `;
    
//     // Add form submission handler
//     document.getElementById('diabetes-form').addEventListener('submit', function(e) {
//       e.preventDefault();
      
//       // Simulate prediction (in real app, this would be an API call)
//       const randomValue = Math.random();
//       const prediction = randomValue > 0.5 ? 'Positive' : 'Negative';
//       const confidence = (randomValue * 50 + 50).toFixed(1);
      
//       // Update state
//       predictionState.diabetesPrediction = {
//         result: prediction,
//         confidence: confidence
//       };
      
//       // Show result
//       const resultElement = document.getElementById('diabetes-result');
//       resultElement.classList.remove('hidden');
//       resultElement.querySelector('.alert').innerHTML = `
//         <div class="flex items-center justify-between">
//           <div>
//             <h4 class="font-bold">Prediction Result:</h4>
//             <p class="mb-1">Diabetes Risk: <span class="font-bold ${prediction === 'Positive' ? 'text-danger' : 'text-success'}">${prediction}</span></p>
//             <p>Confidence: ${confidence}%</p>
//           </div>
//           <div class="text-center">
//             <div class="rounded-full h-24 w-24 flex items-center justify-center ${prediction === 'Positive' ? 'bg-danger' : 'bg-success'} text-white">
//               <span class="text-xl font-bold">${prediction === 'Positive' ? 'High' : 'Low'} Risk</span>
//             </div>
//           </div>
//         </div>
//       `;
//     });
//   }
  
//   // Initialize Heart Disease Prediction Form
//   function initializeHeartDiseaseForm() {
//     const formContainer = document.getElementById('heart-disease-prediction-form');
    
//     formContainer.innerHTML = `
//       <form id="heart-form" class="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div class="mb-3">
//           <label for="age" class="form-label">Age</label>
//           <input type="number" class="form-control" id="heart-age" placeholder="20-80" required>
//         </div>
//         <div class="mb-3">
//           <label for="sex" class="form-label">Sex</label>
//           <select class="form-select" id="sex" required>
//             <option value="" selected disabled>Select</option>
//             <option value="1">Male</option>
//             <option value="0">Female</option>
//           </select>
//         </div>
//         <div class="mb-3">
//           <label for="chestPain" class="form-label">Chest Pain Type</label>
//           <select class="form-select" id="chestPain" required>
//             <option value="" selected disabled>Select</option>
//             <option value="0">Typical Angina</option>
//             <option value="1">Atypical Angina</option>
//             <option value="2">Non-anginal Pain</option>
//             <option value="3">Asymptomatic</option>
//           </select>
//         </div>
//         <div class="mb-3">
//           <label for="restingBP" class="form-label">Resting Blood Pressure</label>
//           <input type="number" class="form-control" id="restingBP" placeholder="90-200 mm Hg" required>
//         </div>
//         <div class="mb-3">
//           <label for="cholesterol" class="form-label">Cholesterol</label>
//           <input type="number" class="form-control" id="cholesterol" placeholder="100-400 mg/dL" required>
//         </div>
//         <div class="mb-3">
//           <label for="fastingBS" class="form-label">Fasting Blood Sugar > 120 mg/dL</label>
//           <select class="form-select" id="fastingBS" required>
//             <option value="" selected disabled>Select</option>
//             <option value="1">Yes</option>
//             <option value="0">No</option>
//           </select>
//         </div>
//         <div class="mb-3">
//           <label for="restingECG" class="form-label">Resting ECG</label>
//           <select class="form-select" id="restingECG" required>
//             <option value="" selected disabled>Select</option>
//             <option value="0">Normal</option>
//             <option value="1">ST-T Wave Abnormality</option>
//             <option value="2">Left Ventricular Hypertrophy</option>
//           </select>
//         </div>
//         <div class="mb-3">
//           <label for="maxHR" class="form-label">Maximum Heart Rate</label>
//           <input type="number" class="form-control" id="maxHR" placeholder="60-220 bpm" required>
//         </div>
//         <div class="mb-3">
//           <label for="exerciseAngina" class="form-label">Exercise-Induced Angina</label>
//           <select class="form-select" id="exerciseAngina" required>
//             <option value="" selected disabled>Select</option>
//             <option value="1">Yes</option>
//             <option value="0">No</option>
//           </select>
//         </div>
//         <div class="mb-3">
//           <label for="oldpeak" class="form-label">Oldpeak (ST Depression)</label>
//           <input type="number" class="form-control" id="oldpeak" step="0.1" placeholder="0-6.0" required>
//         </div>
//         <div class="col-span-1 md:col-span-2 mt-4">
//           <button type="submit" class="btn btn-primary py-2 px-4 rounded w-full">Predict Heart Disease Risk</button>
//         </div>
//       </form>
//       <div id="heart-result" class="mt-4 hidden">
//         <div class="alert alert-info p-4 rounded-lg"></div>
//       </div>
//     `;
    
//     // Add form submission handler
//     document.getElementById('heart-form').addEventListener('submit', function(e) {
//       e.preventDefault();
      
//       // Simulate prediction (in real app, this would be an API call)
//       const randomValue = Math.random();
//       const prediction = randomValue > 0.5 ? 'Positive' : 'Negative';
//       const confidence = (randomValue * 50 + 50).toFixed(1);
      
//       // Update state
//       predictionState.heartDiseasePrediction = {
//         result: prediction,
//         confidence: confidence
//       };
      
//       // Show result
//       const resultElement = document.getElementById('heart-result');
//       resultElement.classList.remove('hidden');
//       resultElement.querySelector('.alert').innerHTML = `
//         <div class="flex items-center justify-between">
//           <div>
//             <h4 class="font-bold">Prediction Result:</h4>
//             <p class="mb-1">Heart Disease Risk: <span class="font-bold ${prediction === 'Positive' ? 'text-danger' : 'text-success'}">${prediction}</span></p>
//             <p>Confidence: ${confidence}%</p>
//           </div>
//           <div class="text-center">
//             <div class="rounded-full h-24 w-24 flex items-center justify-center ${prediction === 'Positive' ? 'bg-danger' : 'bg-success'} text-white">
//               <span class="text-xl font-bold">${prediction === 'Positive' ? 'High' : 'Low'} Risk</span>
//             </div>
//           </div>
//         </div>
//       `;
//     });
//   }
  
//   // Initialize Accuracy Metrics
//   function initializeAccuracyMetrics() {
//     const diabetesMetricsContainer = document.getElementById('diabetes-accuracy-metrics');
//     const heartMetricsContainer = document.getElementById('heart-accuracy-metrics');
    
//     // Render diabetes accuracy metrics
//     diabetesMetricsContainer.innerHTML = createMetricsHTML('diabetes');
    
//     // Render heart disease accuracy metrics
//     heartMetricsContainer.innerHTML = createMetricsHTML('heart');
//   }
  
//   // Helper function to create metrics HTML
//   function createMetricsHTML(modelType) {
//     const metrics = sampleData[modelType];
//     return `
//       <div class="grid grid-cols-2 gap-4">
//         <div class="p-4 bg-secondary rounded-lg text-center">
//           <h3 class="text-lg font-semibold">Accuracy</h3>
//           <p class="text-2xl font-bold">${(metrics.accuracy * 100).toFixed(1)}%</p>
//         </div>
//         <div class="p-4 bg-secondary rounded-lg text-center">
//           <h3 class="text-lg font-semibold">Precision</h3>
//           <p class="text-2xl font-bold">${(metrics.precision * 100).toFixed(1)}%</p>
//         </div>
//         <div class="p-4 bg-secondary rounded-lg text-center">
//           <h3 class="text-lg font-semibold">Recall</h3>
//           <p class="text-2xl font-bold">${(metrics.recall * 100).toFixed(1)}%</p>
//         </div>
//         <div class="p-4 bg-secondary rounded-lg text-center">
//           <h3 class="text-lg font-semibold">F1 Score</h3>
//           <p class="text-2xl font-bold">${(metrics.f1Score * 100).toFixed(1)}%</p>
//         </div>
//       </div>
//     `;
//   }
  
//   // Initialize Visualizations
//   function initializeVisualizations() {
//     const diabetesVizContainer = document.getElementById('diabetes-visualization');
//     const heartVizContainer = document.getElementById('heart-visualization');
    
//     // Create canvas elements for charts
//     diabetesVizContainer.innerHTML = `
//       <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <h3 class="text-lg font-semibold mb-4">ROC Curve</h3>
//           <canvas id="diabetes-roc-chart" height="250"></canvas>
//         </div>
//         <div>
//           <h3 class="text-lg font-semibold mb-4">Precision-Recall Curve</h3>
//           <canvas id="diabetes-pr-chart" height="250"></canvas>
//         </div>
//       </div>
//     `;
    
//     heartVizContainer.innerHTML = `
//       <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <h3 class="text-lg font-semibold mb-4">ROC Curve</h3>
//           <canvas id="heart-roc-chart" height="250"></canvas>
//         </div>
//         <div>
//           <h3 class="text-lg font-semibold mb-4">Precision-Recall Curve</h3>
//           <canvas id="heart-pr-chart" height="250"></canvas>
//         </div>
//       </div>
//     `;
    
//     // Create diabetes charts
//     createROCChart('diabetes-roc-chart', sampleData.diabetes.roc);
//     createPRChart('diabetes-pr-chart', sampleData.diabetes.precisionRecall);
    
//     // Create heart disease charts
//     createROCChart('heart-roc-chart', sampleData.heart.roc);
//     createPRChart('heart-pr-chart', sampleData.heart.precisionRecall);
//   }
  
//   // Create ROC chart
//   function createROCChart(canvasId, data) {
//     const ctx = document.getElementById(canvasId).getContext('2d');
//     new Chart(ctx, {
//       type: 'line',
//       data: {
//         datasets: [{
//           label: 'ROC Curve',
//           data: data.map(point => ({ x: point.fpr, y: point.tpr })),
//           borderColor: 'rgb(75, 192, 192)',
//           backgroundColor: 'rgba(75, 192, 192, 0.1)',
//           borderWidth: 2,
//           fill: true,
//           tension: 0.4
//         }, {
//           label: 'Random Classifier',
//           data: [{ x: 0, y: 0 }, { x: 1, y: 1 }],
//           borderColor: 'rgba(200, 200, 200, 0.8)',
//           borderWidth: 1,
//           borderDash: [5, 5],
//           pointRadius: 0
//         }]
//       },
//       options: {
//         responsive: true,
//         maintainAspectRatio: false,
//         scales: {
//           x: {
//             type: 'linear',
//             min: 0,
//             max: 1,
//             title: {
//               display: true,
//               text: 'False Positive Rate'
//             }
//           },
//           y: {
//             min: 0,
//             max: 1,
//             title: {
//               display: true,
//               text: 'True Positive Rate'
//             }
//           }
//         },
//         plugins: {
//           legend: {
//             position: 'bottom'
//           }
//         }
//       }
//     });
//   }
  
//   // Create Precision-Recall chart
//   function createPRChart(canvasId, data) {
//     const ctx = document.getElementById(canvasId).getContext('2d');
//     new Chart(ctx, {
//       type: 'line',
//       data: {
//         datasets: [{
//           label: 'Precision-Recall Curve',
//           data: data.map(point => ({ x: point.recall, y: point.precision })),
//           borderColor: 'rgb(153, 102, 255)',
//           backgroundColor: 'rgba(153, 102, 255, 0.1)',
//           borderWidth: 2,
//           fill: true,
//           tension: 0.4
//         }]
//       },
//       options: {
//         responsive: true,
//         maintainAspectRatio: false,
//         scales: {
//           x: {
//             type: 'linear',
//             min: 0,
//             max: 1,
//             title: {
//               display: true,
//               text: 'Recall'
//             }
//           },
//           y: {
//             min: 0,
//             max: 1,
//             title: {
//               display: true,
//               text: 'Precision'
//             }
//           }
//         },
//         plugins: {
//           legend: {
//             position: 'bottom'
//           }
//         }
//       }
//     });
//   }
  
//   // Initialize Confusion Matrices
//   function initializeConfusionMatrices() {
//     const diabetesMatrixContainer = document.getElementById('diabetes-confusion-matrix');
//     const heartMatrixContainer = document.getElementById('heart-confusion-matrix');
    
//     // Render diabetes confusion matrix
//     diabetesMatrixContainer.innerHTML = createConfusionMatrixHTML('diabetes');
    
//     // Render heart disease confusion matrix
//     heartMatrixContainer.innerHTML = createConfusionMatrixHTML('heart');
//   }
  
//   // Helper function to create confusion matrix HTML
//   function createConfusionMatrixHTML(modelType) {
//     const matrix = sampleData[modelType].confusionMatrix;
//     const total = matrix[0][0] + matrix[0][1] + matrix[1][0] + matrix[1][1];
    
//     return `
//       <div class="mx-auto max-w-md">
//         <div class="grid grid-cols-3 text-center">
//           <div class="p-3 border-b border-r border-gray-300 bg-secondary">
//             <span class="text-sm text-muted-foreground">Actual / Predicted</span>
//           </div>
//           <div class="p-3 font-semibold border-b border-r border-gray-300 bg-secondary">
//             <span class="text-sm">Negative</span>
//           </div>
//           <div class="p-3 font-semibold border-b border-gray-300 bg-secondary">
//             <span class="text-sm">Positive</span>
//           </div>
          
//           <div class="p-3 font-semibold border-r border-b border-gray-300 bg-secondary">
//             <span class="text-sm">Negative</span>
//           </div>
//           <div class="p-4 font-bold border-r border-b border-gray-300 bg-success/10">
//             <span>TN: ${matrix[0][0]}</span>
//             <div class="text-xs mt-1 text-success">
//               ${((matrix[0][0] / total) * 100).toFixed(1)}%
//             </div>
//           </div>
//           <div class="p-4 font-bold border-b border-gray-300 bg-danger/10">
//             <span>FP: ${matrix[0][1]}</span>
//             <div class="text-xs mt-1 text-danger">
//               ${((matrix[0][1] / total) * 100).toFixed(1)}%
//             </div>
//           </div>
          
//           <div class="p-3 font-semibold border-r border-gray-300 bg-secondary">
//             <span class="text-sm">Positive</span>
//           </div>
//           <div class="p-4 font-bold border-r border-gray-300 bg-danger/10">
//             <span>FN: ${matrix[1][0]}</span>
//             <div class="text-xs mt-1 text-danger">
//               ${((matrix[1][0] / total) * 100).toFixed(1)}%
//             </div>
//           </div>
//           <div class="p-4 font-bold border-gray-300 bg-success/10">
//             <span>TP: ${matrix[1][1]}</span>
//             <div class="text-xs mt-1 text-success">
//               ${((matrix[1][1] / total) * 100).toFixed(1)}%
//             </div>
//           </div>
//         </div>
        
//         <div class="mt-6">
//           <p class="mb-1"><strong>True Negative (TN):</strong> Correctly predicted as negative</p>
//           <p class="mb-1"><strong>False Positive (FP):</strong> Incorrectly predicted as positive</p>
//           <p class="mb-1"><strong>False Negative (FN):</strong> Incorrectly predicted as negative</p>
//           <p class="mb-1"><strong>True Positive (TP):</strong> Correctly predicted as positive</p>
//         </div>
//       </div>
//     `;
//   }
  
//   // Initialize Model Comparison
//   function initializeModelComparison() {
//     const comparisonContainer = document.getElementById('model-comparison');
    
//     comparisonContainer.innerHTML = `
//       <div>
//         <canvas id="comparison-chart" height="300"></canvas>
//       </div>
//       <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div class="border p-4 rounded-lg">
//           <h3 class="text-lg font-semibold mb-4">Diabetes Model Strengths</h3>
//           <ul class="list-disc pl-5 space-y-2">
//             <li>Higher overall accuracy (${(sampleData.diabetes.accuracy * 100).toFixed(1)}%)</li>
//             <li>Better precision for positive cases</li>
//             <li>More suitable for screening large populations</li>
//             <li>Lower false negative rate</li>
//           </ul>
//         </div>
//         <div class="border p-4 rounded-lg">
//           <h3 class="text-lg font-semibold mb-4">Heart Disease Model Strengths</h3>
//           <ul class="list-disc pl-5 space-y-2">
//             <li>Good balance between sensitivity and specificity</li>
//             <li>Better performance with unbalanced datasets</li>
//             <li>Works well with fewer features</li>
//             <li>Lower computational requirements</li>
//           </ul>
//         </div>
//       </div>
//     `;
    
//     // Create comparison chart
//     createComparisonChart();
//   }
  
//   // Create model comparison chart
//   function createComparisonChart() {
//     const ctx = document.getElementById('comparison-chart').getContext('2d');
    
//     const diabetesMetrics = sampleData.diabetes;
//     const heartMetrics = sampleData.heart;
    
//     new Chart(ctx, {
//       type: 'bar',
//       data: {
//         labels: ['Accuracy', 'Precision', 'Recall', 'F1 Score'],
//         datasets: [
//           {
//             label: 'Diabetes Model',
//             data: [
//               diabetesMetrics.accuracy * 100,
//               diabetesMetrics.precision * 100,
//               diabetesMetrics.recall * 100,
//               diabetesMetrics.f1Score * 100
//             ],
//             backgroundColor: 'rgba(54, 162, 235, 0.6)',
//             borderColor: 'rgba(54, 162, 235, 1)',
//             borderWidth: 1
//           },
//           {
//             label: 'Heart Disease Model',
//             data: [
//               heartMetrics.accuracy * 100,
//               heartMetrics.precision * 100,
//               heartMetrics.recall * 100,
//               heartMetrics.f1Score * 100
//             ],
//             backgroundColor: 'rgba(255, 99, 132, 0.6)',
//             borderColor: 'rgba(255, 99, 132, 1)',
//             borderWidth: 1
//           }
//         ]
//       },
//       options: {
//         responsive: true,
//         maintainAspectRatio: false,
//         scales: {
//           y: {
//             min: 50,
//             max: 100,
//             title: {
//               display: true,
//               text: 'Percentage (%)'
//             }
//           }
//         },
//         plugins: {
//           legend: {
//             position: 'bottom'
//           },
//           title: {
//             display: true,
//             text: 'Model Performance Comparison'
//           }
//         }
//       }
//     });
//   }
  
//   // Add Bootstrap class mapping for Tailwind classes
//   // This helps bridge the gap between Tailwind and Bootstrap
//   function addBootstrapClassMappings() {
//     // Map text colors
//     document.querySelectorAll('.text-danger').forEach(el => {
//       el.classList.add('text-danger');
//     });
    
//     document.querySelectorAll('.text-success').forEach(el => {
//       el.classList.add('text-success');
//     });
    
//     // Map background colors
//     document.querySelectorAll('.bg-danger').forEach(el => {
//       el.classList.add('bg-danger');
//     });
    
//     document.querySelectorAll('.bg-success').forEach(el => {
//       el.classList.add('bg-success');
//     });
    
//     // Call after DOM updates
//     setTimeout(addBootstrapClassMappings, 100);
//   }
  
//   // Call this function after initial load and DOM updates
//   window.addEventListener('load', addBootstrapClassMappings);
// JavaScript for Medical Prediction Platform

document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;

            // Update active tab
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update active content
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            document.getElementById(`${tabName}-tab`).classList.add('active');
        });
    });

    // Feature names for both models
    const diabetesFeatures = ['Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness', 'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age'];
    const heartFeatures = ['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal'];

    // Mock confusion matrix data (for demonstration)
    const diabetesConfusionMatrix = [[50, 10], [15, 45]];
    const heartConfusionMatrix = [[60, 8], [12, 55]];

    // Mock ROC curve data (for demonstration)
    const diabetesROC = {
        tpr: [0, 0.3, 0.5, 0.7, 0.9, 1],
        fpr: [0, 0.1, 0.2, 0.3, 0.6, 1]
    };
    const heartROC = {
        tpr: [0, 0.4, 0.6, 0.8, 0.95, 1],
        fpr: [0, 0.05, 0.15, 0.25, 0.5, 1]
    };

    // Mock PR curve data (for demonstration)
    const diabetesPR = {
        precision: [1, 0.9, 0.8, 0.7, 0.6, 0.5],
        recall: [0, 0.3, 0.5, 0.7, 0.9, 1]
    };
    const heartPR = {
        precision: [1, 0.95, 0.85, 0.75, 0.65, 0.55],
        recall: [0, 0.4, 0.6, 0.8, 0.9, 1]
    };

    // Mock feature importance (for demonstration)
    const diabetesFeatureImportance = [0.28, 0.22, 0.12, 0.08, 0.1, 0.15, 0.05, 0.1];

    // Helper function for rgba colors
    function rgba(r, g, b, a) {
        return` rgba(${r}, ${g}, ${b}, ${a})`;
    }

    // Load charts
    function loadCharts() {
        // Confusion Matrix for Diabetes
        new Chart(document.getElementById('diabetes-confusion-matrix'), {
            type: 'matrix',
            data: {
                datasets: [{
                    data: [
                        { x: 'Negative', y: 'Negative', v: diabetesConfusionMatrix[0][0] },
                        { x: 'Positive', y: 'Negative', v: diabetesConfusionMatrix[0][1] },
                        { x: 'Negative', y: 'Positive', v: diabetesConfusionMatrix[1][0] },
                        { x: 'Positive', y: 'Positive', v: diabetesConfusionMatrix[1][1] }
                    ],
                    backgroundColor: context => {
                        const value = context.dataset.data[context.dataIndex].v;
                        const alpha = value / 60; // Normalize based on max value
                        return rgba(74, 111, 165, alpha);
                    },
                    borderWidth: 1,
                    borderColor: '#ddd',
                    width: 0.9,
                    height: 0.9
                }]
            },
            options: {
                maintainAspectRatio: true,
                plugins: {
                    tooltip: {
                        callbacks: {
                            title: () => '',
                            label: context => {
                                const data = context.dataset.data[context.dataIndex];
                                return `Predicted: ${data.x}, Actual: ${data.y}, Count: ${data.v}`;
                            }
                        }
                    },
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Predicted'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Actual'
                        }
                    }
                }
            }
        });

        // ROC Curve for Diabetes
        new Chart(document.getElementById('diabetes-roc-curve'), {
            type: 'line',
            data: {
                labels: diabetesROC.fpr.map(v => v.toFixed(2)),
                datasets: [{
                    label: 'ROC Curve (AUC = 0.78)',
                    data: diabetesROC.tpr,
                    borderColor: '#4a6fa5',
                    backgroundColor: 'rgba(74, 111, 165, 0.1)',
                    fill: true,
                    tension: 0.4
                }, {
                    label: 'Random Classifier',
                    data: diabetesROC.fpr,
                    borderColor: '#ccc',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    fill: false,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    title: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'False Positive Rate'
                        },
                        suggestedMin: 0,
                        suggestedMax: 1
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'True Positive Rate'
                        },
                        suggestedMin: 0,
                        suggestedMax: 1
                    }
                }
            }
        });

        // Confusion Matrix for Heart Disease
        new Chart(document.getElementById('heart-confusion-matrix'), {
            type: 'matrix',
            data: {
                datasets: [{
                    data: [
                        { x: 'Negative', y: 'Negative', v: heartConfusionMatrix[0][0] },
                        { x: 'Positive', y: 'Negative', v: heartConfusionMatrix[0][1] },
                        { x: 'Negative', y: 'Positive', v: heartConfusionMatrix[1][0] },
                        { x: 'Positive', y: 'Positive', v: heartConfusionMatrix[1][1] }
                    ],
                    backgroundColor: context => {
                        const value = context.dataset.data[context.dataIndex].v;
                        const alpha = value / 60; // Normalize based on max value
                        return rgba(236, 112, 99, alpha);
                    },
                    borderWidth: 1,
                    borderColor: '#ddd',
                    width: 0.9,
                    height: 0.9
                }]
            },
            options: {
                maintainAspectRatio: true,
                plugins: {
                    tooltip: {
                        callbacks: {
                            title: () => '',
                            label: context => {
                                const data = context.dataset.data[context.dataIndex];
                                return `Predicted: ${data.x}, Actual: ${data.y}, Count: ${data.v}`;
                            }
                        }
                    },
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Predicted'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Actual'
                        }
                    }
                }
            }
        });

        // ROC Curve for Heart Disease
        new Chart(document.getElementById('heart-roc-curve'), {
            type: 'line',
            data: {
                labels: heartROC.fpr.map(v => v.toFixed(2)),
                datasets: [{
                    label: 'ROC Curve (AUC = 0.85)',
                    data: heartROC.tpr,
                    borderColor: '#ec7063',
                    backgroundColor: 'rgba(236, 112, 99, 0.1)',
                    fill: true,
                    tension: 0.4
                }, {
                    label: 'Random Classifier',
                    data: heartROC.fpr,
                    borderColor: '#ccc',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    fill: false,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    title: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'False Positive Rate'
                        },
                        suggestedMin: 0,
                        suggestedMax: 1
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'True Positive Rate'
                        },
                        suggestedMin: 0,
                        suggestedMax: 1
                    }
                }
            }
        });

        // Feature Importance for Diabetes
        new Chart(document.getElementById('diabetes-feature-importance'), {
            type: 'bar',
            data: {
                labels: diabetesFeatures,
                datasets: [{
                    label: 'Feature Importance',
                    data: diabetesFeatureImportance,
                    backgroundColor: '#4a6fa5'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });

        // Precision-Recall Curve for Diabetes
        new Chart(document.getElementById('diabetes-pr-curve'), {
            type: 'line',
            data: {
                labels: diabetesPR.recall.map(v => v.toFixed(2)),
                datasets: [{
                    label: 'Precision-Recall Curve',
                    data: diabetesPR.precision,
                    borderColor: '#4a6fa5',
                    backgroundColor: 'rgba(74, 111, 165, 0.1)',
                    fill: false,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Recall'
                        },
                        suggestedMin: 0,
                        suggestedMax: 1
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Precision'
                        },
                        suggestedMin: 0,
                        suggestedMax: 1
                    }
                }
            }
        });

        // Precision-Recall Curve for Heart Disease
        new Chart(document.getElementById('heart-pr-curve'), {
            type: 'line',
            data: {
                labels: heartPR.recall.map(v => v.toFixed(2)),
                datasets: [{
                    label: 'Precision-Recall Curve',
                    data: heartPR.precision,
                    borderColor: '#ec7063',
                    backgroundColor: 'rgba(236, 112, 99, 0.1)',
                    fill: false,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Recall'
                        },
                        suggestedMin: 0,
                        suggestedMax: 1
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Precision'
                        },
                        suggestedMin: 0,
                        suggestedMax: 1
                    }
                }
            }
        });
    }

    // Try to load charts if Chart.js is available
    try {
        loadCharts();
    } catch (error) {
        console.error("Error loading charts:", error);
    }

    // Diabetes Prediction Form Handling
    const diabetesForm = document.getElementById('diabetes-form');
    const diabetesResult = document.getElementById('diabetes-result');
    const diabetesProbabilityFill = document.getElementById('diabetes-probability-fill');
    const diabetesProbabilityText = document.getElementById('diabetes-probability-text');
    const diabetesBadge = document.getElementById('diabetes-badge');
    const resetDiabetesButton = document.getElementById('reset-diabetes');

    if (diabetesForm) {
        diabetesForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            try {
                // Validate input values
                const inputs = diabetesForm.querySelectorAll('input[type="number"]');
                let isValid = true;
                
                inputs.forEach(input => {
                    const value = parseFloat(input.value);
                    const name = input.name || 'input';
                    
                    // Check for specific fields
                    if (name === 'Glucose' && (value < 70 || value > 300)) {
                        console.warn('Glucose value out of normal range:', value);
                        isValid = false;
                    }
                    
                    if (name === 'BloodPressure' && (value < 50 || value > 200)) {
                        console.warn('Blood pressure value out of normal range:', value);
                        isValid = false;
                    }
                });
                
                if (!isValid) {
                    throw new Error('Input validation failed. Please check your values.');
                }

                // Mock prediction logic (replace with actual API call)
                const prediction = Math.random() > 0.5; // Simulate prediction
                const probability = Math.random(); // Simulate probability

                diabetesProbabilityFill.style.width = `${probability * 100}%`;
                diabetesProbabilityText.textContent =` Probability: ${(probability * 100).toFixed(2)}%`;

                if (prediction) {
                    diabetesBadge.classList.remove('negative');
                    diabetesBadge.classList.add('positive');
                    diabetesBadge.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Positive';
                } else {
                    diabetesBadge.classList.remove('positive');
                    diabetesBadge.classList.add('negative');
                    diabetesBadge.innerHTML = '<i class="fas fa-check-circle"></i> Negative';
                }

                diabetesResult.classList.remove('hidden');
            } catch (error) {
                console.error('Error in diabetes prediction:', error);
                // Display error message
                const errorContainer = document.createElement('div');
                errorContainer.className = 'error-message';
                errorContainer.textContent = 'An error occurred during prediction. Please try again.';
                
                // Remove any existing error message
                const existingError = diabetesForm.querySelector('.error-message');
                if (existingError) {
                    existingError.remove();
                }
                
                diabetesForm.appendChild(errorContainer);
            }
        });
    }

    if (resetDiabetesButton) {
        resetDiabetesButton.addEventListener('click', function() {
            diabetesForm.reset();
            diabetesResult.classList.add('hidden');
            
            // Remove any error messages
            const errorMessage = diabetesForm.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
        });
    }

    // Heart Disease Prediction Form Handling
    const heartForm = document.getElementById('heart-form');
    const heartResult = document.getElementById('heart-result');
    const heartProbabilityFill = document.getElementById('heart-probability-fill');
    const heartProbabilityText = document.getElementById('heart-probability-text');
    const heartBadge = document.getElementById('heart-badge');
    const resetHeartButton = document.getElementById('reset-heart');

    if (heartForm) {
        heartForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            try {
                // Mock prediction logic (replace with actual API call)
                const prediction = Math.random() > 0.5; // Simulate prediction
                const probability = Math.random(); // Simulate probability

                heartProbabilityFill.style.width = `${probability * 100}%`;
                heartProbabilityText.textContent = `Probability: ${(probability * 100).toFixed(2)}%`;

                if (prediction) {
                    heartBadge.classList.remove('negative');
                    heartBadge.classList.add('positive');
                    heartBadge.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Positive';
                } else {
                    heartBadge.classList.remove('positive');
                    heartBadge.classList.add('negative');
                    heartBadge.innerHTML = '<i class="fas fa-check-circle"></i> Negative';
                }

                heartResult.classList.remove('hidden');
            } catch (error) {
                console.error('Error in heart disease prediction:', error);
                // Display error message
                const errorContainer = document.createElement('div');
                errorContainer.className = 'error-message';
                errorContainer.textContent = 'An error occurred during prediction. Please try again.';
                
                // Remove any existing error message
                const existingError = heartForm.querySelector('.error-message');
                if (existingError) {
                    existingError.remove();
                }
                
                heartForm.appendChild(errorContainer);
            }
        });
    }

    if (resetHeartButton) {
        resetHeartButton.addEventListener('click', function() {
            heartForm.reset();
            heartResult.classList.add('hidden');
            
            // Remove any error messages
            const errorMessage = heartForm.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
        });
    }
});