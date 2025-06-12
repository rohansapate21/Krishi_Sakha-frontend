// Mobile Navigation
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const navLinksLi = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Nav
    navLinks.classList.toggle('active');
    
    // Burger Animation
    burger.classList.toggle('toggle');
    
    // Animate Links
    navLinksLi.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
});

// Sample Price Data
const priceData = [
    { crop: 'Wheat', region: 'Buldhana', price: '₹27.50', trend: 'down', demand: 'Low' },
    { crop: 'Rice', region: 'Ratnagiri', price: '₹38.00', trend: 'down', demand: 'Medium' },
    { crop: 'Cotton', region: 'Nagpur', price: '₹73.00', trend: 'neutral', demand: 'High' },
    { crop: 'Wheat', region: 'Jalna', price: '₹26.60', trend: 'up', demand: 'High' },
    { crop: 'Cotton', region: 'Jalgaon', price: '₹65.00', trend: 'down', demand: 'Medium' },
];

// Populate Price Table
function populatePriceTable(filterRegion = 'all', filterCrop = 'all') {
    const tableBody = document.getElementById('price-data');
    tableBody.innerHTML = '';
    
    const filteredData = priceData.filter(item => {
        return (filterRegion === 'all' || item.region === filterRegion) && 
               (filterCrop === 'all' || item.crop.toLowerCase() === filterCrop);
    });
    
    filteredData.forEach(item => {
        const row = document.createElement('tr');
        
        const trendIcon = item.trend === 'up' ? '↑' : item.trend === 'down' ? '↓' : '→';
        const trendClass = item.trend === 'up' ? 'trend-up' : item.trend === 'down' ? 'trend-down' : 'trend-neutral';
        
        row.innerHTML = `
            <td>${item.crop}</td>
            <td>${item.region}</td>
            <td>${item.price}</td>
            <td class="${trendClass}">${trendIcon}</td>
            <td>${item.demand}</td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Filter Event Listeners
document.getElementById('region-select').addEventListener('change', (e) => {
    const region = e.target.value;
    const crop = document.getElementById('crop-select').value;
    populatePriceTable(region, crop);
});

document.getElementById('crop-select').addEventListener('change', (e) => {
    const crop = e.target.value;
    const region = document.getElementById('region-select').value;
    populatePriceTable(region, crop);
});

// Initialize Price Table
populatePriceTable();

// Price Trend Chart
const priceTrendCtx = document.getElementById('priceTrendChart').getContext('2d');
const priceTrendChart = new Chart(priceTrendCtx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Wheat',
                data: [22, 23.5, 24, 23.8, 24.5, 25],
                borderColor: '#4CAF50',
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                tension: 0.3,
                fill: true
            },
            {
                label: 'Rice',
                data: [30, 31.2, 32, 31.5, 32.7, 32],
                borderColor: '#2196F3',
                backgroundColor: 'rgba(33, 150, 243, 0.1)',
                tension: 0.3,
                fill: true
            },
            {
                label: 'Corn',
                data: [18, 17.5, 18.2, 18, 17.8, 18.2],
                borderColor: '#FFC107',
                backgroundColor: 'rgba(255, 193, 7, 0.1)',
                tension: 0.3,
                fill: true
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Crop Price Trends (Last 6 Months)',
                font: {
                    size: 16
                }
            },
            legend: {
                position: 'top'
            }
        },
        scales: {
            y: {
                beginAtZero: false,
                title: {
                    display: true,
                    text: 'Price (₹ per kg)'
                }
            }
        }
    }
});

// Weather Forecast Data
const forecastData = [
    { day: 'Mon', icon: 'fa-sun', high: 30, low: 22 },
    { day: 'Tue', icon: 'fa-cloud-sun', high: 28, low: 21 },
    { day: 'Wed', icon: 'fa-cloud-rain', high: 25, low: 20 },
    { day: 'Thu', icon: 'fa-cloud-sun', high: 27, low: 21 },
    { day: 'Fri', icon: 'fa-sun', high: 31, low: 23 }
];

// Populate Forecast
function populateForecast() {
    const forecastGrid = document.getElementById('forecast-data');
    forecastGrid.innerHTML = '';
    
    forecastData.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'forecast-day';
        
        dayElement.innerHTML = `
            <i class="fas ${day.icon}"></i>
            <h4>${day.day}</h4>
            <div class="forecast-temp">
                <span class="high-temp">${day.high}°</span>
                <span class="low-temp">${day.low}°</span>
            </div>
        `;
        
        forecastGrid.appendChild(dayElement);
    });
}

// Initialize Forecast
populateForecast();

// Smooth Scrolling for Navigation (only for internal links)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            burger.classList.remove('toggle');
        }
    });
});

// Close mobile menu when clicking on external links
document.querySelectorAll('.nav-links a:not([href^="#"])').forEach(link => {
    link.addEventListener('click', function() {
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            burger.classList.remove('toggle');
        }
    });
});

// Load More News Button
document.querySelector('.load-more').addEventListener('click', function() {
    // In a real app, this would fetch more news from an API
    alert('Loading more agricultural news...');
});

// Get User Location for Weather (simulated)
function getUserLocation() {
    // In a real app, this would use the Geolocation API
    console.log('Fetching user location...');
    // Simulate location detection
    setTimeout(() => {
        document.querySelector('.location').textContent = 'Northern Region, India';
    }, 1000);
}

// Initialize location
getUserLocation();


document.getElementById("leaf-image").addEventListener("change", function (e) {
    const file = e.target.files[0];
    const preview = document.getElementById("image-preview");
    preview.innerHTML = "";
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const img = document.createElement("img");
            img.src = event.target.result;
            preview.appendChild(img);
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById("predict-button").addEventListener("click", function () {
    const result = document.getElementById("prediction-result");
    
    // Replace this with an actual API call later
    result.textContent = "Analyzing image... (This is a placeholder. Connect to backend model here.)";
    
    setTimeout(() => {
        result.textContent = "Predicted Disease: Leaf Spot";
    }, 2000);
});
document.getElementById('predict-price-btn').addEventListener('click', () => {
    const crop = document.getElementById('predict-crop').value;
    const location = document.getElementById('predict-location').value.trim();
    const date = document.getElementById('predict-date').value;

    const output = document.getElementById('prediction-output');

    if (!crop || !location || !date) {
        output.innerHTML = '<p style="color:red;">Please fill in all fields.</p>';
        return;
    }

    // Mock prediction logic (replace this with actual ML/AI API logic)
    const randomPrice = (Math.random() * (50 - 20) + 20).toFixed(2);
    output.innerHTML = `<p>Predicted price for <strong>${crop}</strong> in <strong>${location}</strong> on <strong>${date}</strong> is <strong>₹${randomPrice} per kg</strong>.</p>`;
});

