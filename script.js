// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, setting up event listeners');

    // Form Submission - try both form submit and button click
    const bookingForm = document.getElementById('booking-form');
    const submitButton = bookingForm ? bookingForm.querySelector('button[type="submit"]') : null;

    if (bookingForm) {

        // Method 2: Direct button click event (backup)
        if (submitButton) {
            console.log('Submit button found, attaching click listener');
            submitButton.addEventListener('click', function(e) {
                console.log('Submit button clicked directly');
                // Check if form is valid first
                if (bookingForm.checkValidity()) {
                    e.preventDefault();
                    e.stopPropagation();
                    handleFormSubmission(e);
                } else {
                    console.log('Form validation failed');
                }
            });
        }
    } else {
        console.error('Booking form not found!');
    }

    function handleFormSubmission(e) {
        console.log('handleFormSubmission called');
        e.preventDefault();
        e.stopPropagation();

        // Get form data
        const formData = new FormData(bookingForm);
        const bookingDetails = {
            type: formData.get('booking-type'),
            name: formData.get('guest-name'),
            email: formData.get('guest-email'),
            phone: formData.get('guest-phone'),
            checkIn: formData.get('check-in'),
            checkOut: formData.get('check-out'),
            partySize: formData.get('party-size'),
            specialRequests: formData.get('special-requests')
        };

        console.log('Form data collected:', bookingDetails);

        // Validate required fields
        if (!bookingDetails.type || !bookingDetails.name || !bookingDetails.email) {
            alert('Please fill in all required fields.');
            return;
        }

        // Create specific confirmation message
        let confirmationText = `✅ Booking Confirmed!\n\n`;

        // Add specific booking details
        const bookingTypeText = {
            'luxury-resort': 'Luxury Resort accommodation',
            'family-hotel': 'Family Hotel accommodation',
            'bed-breakfast': 'Bed & Breakfast accommodation',
            'budget-hostel': 'Budget Hostel accommodation',
            'volcano-tour': 'Volcano Tour experience',
            'beach-activities': 'Beach Activities package',
            'rainforest-adventure': 'Rainforest Adventure tour',
            'fishing-charter': 'Fishing Charter excursion',
            'cultural-tour': 'Cultural Tour experience',
            'helicopter-ride': 'Helicopter Ride tour',
            'local-seafood': 'Local Seafood Restaurant reservation',
            'american-cuisine': 'American Cuisine Restaurant reservation',
            'pan-asian': 'Pan-Asian Restaurant reservation',
            'pub-brewery': 'Pub/Microbrewery reservation',
            'entertainment-dining': 'Entertainment Dining reservation',
            'volcano-explorer-package': 'Volcano Explorer Package (3 days/2 nights)',
            'beach-paradise-package': 'Beach Paradise Package (5 days/4 nights)',
            'island-explorer-package': 'Complete Island Experience Package (7 days/6 nights)',
            'transport': 'Transportation service',
            'airport-transfer': 'Airport Transfer service',
            'rental-car': 'Rental Car reservation',
            'bike-rental': 'Bike Rental reservation',
            'contact': 'inquiry submission'
        };

        const specificType = bookingTypeText[bookingDetails.type] || bookingDetails.type;
        confirmationText += `Your ${specificType} has been successfully booked for ${bookingDetails.name}.\n\n`;

        if (bookingDetails.checkIn) {
            confirmationText += `Date: ${bookingDetails.checkIn}`;
            if (bookingDetails.checkOut) {
                confirmationText += ` to ${bookingDetails.checkOut}`;
            }
            confirmationText += `\n`;
        }

        confirmationText += `Party Size: ${bookingDetails.partySize}\n`;
        confirmationText += `Confirmation will be sent to: ${bookingDetails.email}\n\n`;
        confirmationText += `A confirmation email with details and payment instructions has been sent to your email address.`;

        console.log('About to close modal and show confirmation');

        // Close the booking modal first
        closeBookingModal();

        // Show confirmation popup
        alert(confirmationText);

        console.log('Booking submitted successfully');
    }

    // Initialize date inputs with reasonable defaults
    const checkinInput = document.getElementById('check-in');
    const checkoutInput = document.getElementById('check-out');

    if (checkinInput && checkoutInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        checkinInput.min = today.toISOString().split('T')[0];
        checkoutInput.min = tomorrow.toISOString().split('T')[0];

        // Update checkout date when checkin changes
        checkinInput.addEventListener('change', function() {
            const checkInDate = new Date(this.value);
            const nextDay = new Date(checkInDate);
            nextDay.setDate(nextDay.getDate() + 1);

            checkoutInput.min = nextDay.toISOString().split('T')[0];

            // If checkout is before checkin, update it
            if (checkoutInput.value && new Date(checkoutInput.value) <= checkInDate) {
                checkoutInput.value = nextDay.toISOString().split('T')[0];
            }
        });
    }
});

// Navigation function
function navigateToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        announceToScreenReader(`Navigated to ${sectionId} section`);
    }
}

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('main-nav');

if (hamburger && mainNav) {
    hamburger.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Booking Modal Functions
function openBookingModal(type = '') {
    const modal = document.getElementById('booking-modal');
    const bookingTypeSelect = document.getElementById('booking-type');
    const modalTitle = document.getElementById('modal-title');
    const confirmationMessage = document.getElementById('confirmation-message');

    // Hide confirmation message when opening
    confirmationMessage.style.display = 'none';

    // Clear existing options
    bookingTypeSelect.innerHTML = '';

    // Set booking type based on button clicked
    if (type) {
        switch(type) {
            // Hotel types
            case 'luxury-resort':
                bookingTypeSelect.innerHTML = '<option value="luxury-resort" selected>Luxury Resort</option>';
                modalTitle.textContent = 'Book Luxury Resort';
                break;
            case 'family-hotel':
                bookingTypeSelect.innerHTML = '<option value="family-hotel" selected>Family Hotel</option>';
                modalTitle.textContent = 'Book Family Hotel';
                break;
            case 'bed-breakfast':
                bookingTypeSelect.innerHTML = '<option value="bed-breakfast" selected>Bed & Breakfast</option>';
                modalTitle.textContent = 'Book Bed & Breakfast';
                break;
            case 'budget-hostel':
                bookingTypeSelect.innerHTML = '<option value="budget-hostel" selected>Budget Hostel</option>';
                modalTitle.textContent = 'Book Budget Hostel';
                break;

            // Activity types
            case 'volcano-tour':
                bookingTypeSelect.innerHTML = '<option value="volcano-tour" selected>Volcano Tour</option>';
                modalTitle.textContent = 'Book Volcano Tour';
                break;
            case 'beach-activities':
                bookingTypeSelect.innerHTML = '<option value="beach-activities" selected>Beach Activities</option>';
                modalTitle.textContent = 'Book Beach Activities';
                break;
            case 'rainforest-adventure':
                bookingTypeSelect.innerHTML = '<option value="rainforest-adventure" selected>Rainforest Adventure</option>';
                modalTitle.textContent = 'Book Rainforest Adventure';
                break;
            case 'fishing-charter':
                bookingTypeSelect.innerHTML = '<option value="fishing-charter" selected>Fishing Charter</option>';
                modalTitle.textContent = 'Book Fishing Charter';
                break;
            case 'cultural-tour':
                bookingTypeSelect.innerHTML = '<option value="cultural-tour" selected>Cultural Tour</option>';
                modalTitle.textContent = 'Book Cultural Tour';
                break;
            case 'helicopter-ride':
                bookingTypeSelect.innerHTML = '<option value="helicopter-ride" selected>Helicopter Ride</option>';
                modalTitle.textContent = 'Book Helicopter Ride';
                break;

            // Restaurant types
            case 'local-seafood':
                bookingTypeSelect.innerHTML = '<option value="local-seafood" selected>Local Seafood Restaurant</option>';
                modalTitle.textContent = 'Reserve Local Seafood Restaurant';
                break;
            case 'american-cuisine':
                bookingTypeSelect.innerHTML = '<option value="american-cuisine" selected>American Cuisine Restaurant</option>';
                modalTitle.textContent = 'Reserve American Cuisine Restaurant';
                break;
            case 'pan-asian':
                bookingTypeSelect.innerHTML = '<option value="pan-asian" selected>Pan-Asian Restaurant</option>';
                modalTitle.textContent = 'Reserve Pan-Asian Restaurant';
                break;
            case 'pub-brewery':
                bookingTypeSelect.innerHTML = '<option value="pub-brewery" selected>Pub/Microbrewery</option>';
                modalTitle.textContent = 'Reserve Pub/Microbrewery';
                break;
            case 'entertainment-dining':
                bookingTypeSelect.innerHTML = '<option value="entertainment-dining" selected>Entertainment Dining</option>';
                modalTitle.textContent = 'Reserve Entertainment Dining';
                break;

            // Package types
            case 'volcano-explorer-package':
                bookingTypeSelect.innerHTML = '<option value="volcano-explorer-package" selected>Volcano Explorer Package</option>';
                modalTitle.textContent = 'Book Volcano Explorer Package';
                break;
            case 'beach-paradise-package':
                bookingTypeSelect.innerHTML = '<option value="beach-paradise-package" selected>Beach Paradise Package</option>';
                modalTitle.textContent = 'Book Beach Paradise Package';
                break;
            case 'island-explorer-package':
                bookingTypeSelect.innerHTML = '<option value="island-explorer-package" selected>Complete Island Experience Package</option>';
                modalTitle.textContent = 'Book Complete Island Experience';
                break;

            // Transportation types
            case 'airport-transfer':
                bookingTypeSelect.innerHTML = '<option value="airport-transfer" selected>Airport Transfer Service</option>';
                modalTitle.textContent = 'Book Airport Transfer';
                break;
            case 'rental-car':
                bookingTypeSelect.innerHTML = '<option value="rental-car" selected>Rental Car</option>';
                modalTitle.textContent = 'Book Rental Car';
                break;
            case 'bike-rental':
                bookingTypeSelect.innerHTML = '<option value="bike-rental" selected>Bike Rental</option>';
                modalTitle.textContent = 'Book Bike Rental';
                break;

            // Other types
            case 'transport':
                bookingTypeSelect.innerHTML = '<option value="transport" selected>Transportation Service</option>';
                modalTitle.textContent = 'Book Transportation';
                break;
            case 'contact':
                bookingTypeSelect.innerHTML = '<option value="contact" selected>General Inquiry</option>';
                modalTitle.textContent = 'Contact Tourism Board';
                break;

            // Generic types
            case 'hotel':
                bookingTypeSelect.innerHTML = '<option value="">Select accommodation type</option><option value="luxury-resort">Luxury Resort</option><option value="family-hotel">Family Hotel</option><option value="bed-breakfast">Bed & Breakfast</option><option value="budget-hostel">Budget Hostel</option>';
                modalTitle.textContent = 'Book Your Hotel Stay';
                break;
            case 'activity':
                bookingTypeSelect.innerHTML = '<option value="">Select activity type</option><option value="volcano-tour">Volcano Tour</option><option value="beach-activities">Beach Activities</option><option value="rainforest-adventure">Rainforest Adventure</option><option value="fishing-charter">Fishing Charter</option><option value="cultural-tour">Cultural Tour</option><option value="helicopter-ride">Helicopter Ride</option>';
                modalTitle.textContent = 'Book Your Activity';
                break;
            case 'restaurant':
                bookingTypeSelect.innerHTML = '<option value="">Select restaurant type</option><option value="local-seafood">Local Seafood</option><option value="american-cuisine">American Cuisine</option><option value="pan-asian">Pan-Asian</option><option value="pub-brewery">Pub/Microbrewery</option><option value="entertainment-dining">Entertainment Dining</option>';
                modalTitle.textContent = 'Make Restaurant Reservation';
                break;

            default:
                bookingTypeSelect.innerHTML = '<option value="">Select an option</option><option value="hotel">Hotel Accommodation</option><option value="activity">Activity/Tour</option><option value="transport">Transportation</option><option value="package">Complete Package</option><option value="restaurant">Restaurant Reservation</option><option value="contact">General Inquiry</option>';
                modalTitle.textContent = 'Book Your Experience';
        }
    }

    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');

    // Focus management for accessibility
    const firstInput = modal.querySelector('input, select, textarea');
    if (firstInput) {
        firstInput.focus();
    }
}

function closeBookingModal() {
    const modal = document.getElementById('booking-modal');
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');

    // Reset form
    document.getElementById('booking-form').reset();
    document.getElementById('confirmation-message').style.display = 'none';
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('booking-modal');
    if (e.target === modal) {
        closeBookingModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeBookingModal();
    }
});

// Information Display Functions
function showGroceryInfo() {
    alert(`🛒 Grocery Store Locations:

This is a placeholder for detailed grocery store information.

In a full implementation, this would show:
• Store names and addresses
• Operating hours
• Special services available
• Directions from popular hotels

Contact the Tourism Board for specific store locations and hours.`);
}

function showTransportInfo() {
    alert(`✈️ Getting to Taniti Island:

🛬 BY AIR (Most Common):
• Small airport accommodating jets & propeller planes
• Airport expansion planned for larger jets
• Located 10 minutes from Taniti City

🚢 BY CRUISE SHIP:
• Weekly cruise ship docks at Yellow Leaf Bay
• Stays for one night per week
• Beautiful harbor setting

🚗 AIRPORT TRANSFERS:
• Rental cars available near airport
• Hotel shuttles available
• Taxis serve Taniti City
• Public bus connects to city center

📅 Future: Airport expansion will allow larger jets within the next few years!`);
}

function showGettingAroundInfo() {
    alert(`🚌 Getting Around Taniti Island:

🚌 PUBLIC BUSES:
• Serve Taniti City: 5 AM - 11 PM daily
• Private buses serve rest of island
• Affordable and reliable

🚕 TAXIS:
• Available in Taniti City
• Good for short trips and airport transfers

🚗 RENTAL CARS:
• Available from local agency near airport
• Great for exploring the whole island
• Required for reaching remote attractions

🚲 BIKE RENTALS:
• Available from several vendors
• Helmets included (required by law!)
• Perfect for Taniti City (flat & walkable)

🚶‍♂️ WALKING:
• Taniti City is very walkable
• Merriton Landing area easy to explore on foot
• Great for beach areas and downtown`);
}

function showWeatherInfo() {
    alert(`🌡️ Taniti Weather & Climate:

☀️ CURRENT CONDITIONS:
• Temperature: 82°F (28°C)
• Conditions: Partly Cloudy
• Humidity: 75%
• Wind: 8 mph East

🌴 CLIMATE OVERVIEW:
• Tropical climate year-round
• Average temp: 78-85°F (26-29°C)
• Warm ocean temperatures perfect for swimming
• Trade winds provide comfortable breeze

📅 BEST TIMES TO VISIT:
• Year-round destination
• Dry season: December - April
• Wet season: May - November (brief showers)

👕 WHAT TO PACK:
• Light, breathable clothing
• Sunscreen & hat
• Light rain jacket
• Comfortable walking shoes`);
}

function showCruiseInfo() {
    alert(`🚢 Cruise Ship Information:

📅 SCHEDULE:
• One small cruise ship per week
• Docks at Yellow Leaf Bay
• Stays for one night only

🏖️ YELLOW LEAF BAY:
• Beautiful, safe harbor
• White sandy beaches nearby
• Native architecture in Taniti City
• Easy access to main tourist areas

💡 TIP: If arriving by cruise ship, plan your island activities for your single day/night stay!`);
}

function showBusInfo() {
    alert(`🚌 Bus Transportation Details:

🏙️ TANITI CITY BUSES:
• Operating Hours: 5:00 AM - 11:00 PM daily
• Regular service throughout the city
• Connects major hotels and attractions
• Very affordable option

🏝️ ISLAND-WIDE SERVICE:
• Private buses serve rest of the island
• Connect Taniti City to other areas
• Service to Merriton Landing area
• Check schedules at hotel or tourism office

💡 TIP: Buses are a great budget-friendly way to get around, especially within Taniti City!`);
}

function showTaxiInfo() {
    alert(`🚕 Taxi Service Information:

📍 AVAILABILITY:
• Available throughout Taniti City
• Easy to find at popular tourist spots
• Hotel staff can call taxis for you

💰 BEST FOR:
• Airport transfers
• Short trips within the city
• When buses aren't running (after 11 PM)
• Convenient door-to-door service

💡 TIP: Taxis are more expensive than buses but offer convenience and flexibility for your schedule.`);
}

function showWalkingInfo() {
    alert(`🚶‍♂️ Walking Guide for Taniti:

🏙️ TANITI CITY:
• Very flat terrain - easy walking
• Compact downtown area
• Native architecture to admire
• Safe for pedestrians

🏖️ MERRITON LANDING:
• Rapidly developing area
• North side of Yellow Leaf Bay
• Easy to explore on foot
• Many activities located here

🏖️ BEACH AREAS:
• White sandy beaches around Yellow Leaf Bay
• Scenic waterfront walks
• Connect different beach areas on foot

💡 TIP: Comfortable walking shoes recommended. Bring sun protection for beach walks!`);
}

// Form Submission
document.getElementById('booking-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const bookingDetails = {
        type: formData.get('booking-type'),
        name: formData.get('guest-name'),
        email: formData.get('guest-email'),
        phone: formData.get('guest-phone'),
        checkIn: formData.get('check-in'),
        checkOut: formData.get('check-out'),
        partySize: formData.get('party-size'),
        specialRequests: formData.get('special-requests')
    };

    // Create specific confirmation message
    let confirmationText = `<strong>✅ Booking Confirmed!</strong><br>`;

    // Add specific booking details
    const bookingTypeText = {
        'luxury-resort': 'Luxury Resort accommodation',
        'family-hotel': 'Family Hotel accommodation',
        'bed-breakfast': 'Bed & Breakfast accommodation',
        'budget-hostel': 'Budget Hostel accommodation',
        'volcano-tour': 'Volcano Tour experience',
        'beach-activities': 'Beach Activities package',
        'rainforest-adventure': 'Rainforest Adventure tour',
        'fishing-charter': 'Fishing Charter excursion',
        'cultural-tour': 'Cultural Tour experience',
        'helicopter-ride': 'Helicopter Ride tour',
        'local-seafood': 'Local Seafood Restaurant reservation',
        'american-cuisine': 'American Cuisine Restaurant reservation',
        'pan-asian': 'Pan-Asian Restaurant reservation',
        'pub-brewery': 'Pub/Microbrewery reservation',
        'entertainment-dining': 'Entertainment Dining reservation',
        'volcano-explorer-package': 'Volcano Explorer Package (3 days/2 nights)',
        'beach-paradise-package': 'Beach Paradise Package (5 days/4 nights)',
        'island-explorer-package': 'Complete Island Experience Package (7 days/6 nights)',
        'transport': 'Transportation service',
        'airport-transfer': 'Airport Transfer service',
        'rental-car': 'Rental Car reservation',
        'bike-rental': 'Bike Rental reservation',
        'contact': 'inquiry submission'
    };

    const specificType = bookingTypeText[bookingDetails.type] || bookingDetails.type;
    confirmationText += `Your ${specificType} has been successfully booked for ${bookingDetails.name}.<br>`;

    if (bookingDetails.checkIn) {
        confirmationText += `<strong>Date:</strong> ${bookingDetails.checkIn}`;
        if (bookingDetails.checkOut) {
            confirmationText += ` to ${bookingDetails.checkOut}`;
        }
        confirmationText += `<br>`;
    }

    confirmationText += `<strong>Party Size:</strong> ${bookingDetails.partySize}<br>`;
    confirmationText += `<strong>Confirmation will be sent to:</strong> ${bookingDetails.email}<br>`;
    confirmationText += `A confirmation email with details and payment instructions has been sent to your email address.`;

    // Show confirmation message
    const confirmationMessage = document.getElementById('confirmation-message');
    confirmationMessage.innerHTML = confirmationText;
    confirmationMessage.style.display = 'block';

    // Scroll to confirmation message
    confirmationMessage.scrollIntoView({ behavior: 'smooth' });

    // Hide form temporarily
    this.style.display = 'none';

    // Show form again after 5 seconds for demo purposes
    setTimeout(() => {
        this.style.display = 'block';
        this.reset();
        confirmationMessage.style.display = 'none';
    }, 5000);

    console.log('Booking submitted:', bookingDetails);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation to buttons
function addLoadingState(button) {
    const originalText = button.textContent;
    button.textContent = 'Loading...';
    button.disabled = true;

    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
    }, 1000);
}

// Add click handlers for loading states
document.querySelectorAll('.action-btn, .cta-btn').forEach(button => {
    button.addEventListener('click', function() {
        if (!this.onclick) {
            addLoadingState(this);
        }
    });
});

// Initialize date inputs with reasonable defaults
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

document.getElementById('check-in').min = today.toISOString().split('T')[0];
document.getElementById('check-out').min = tomorrow.toISOString().split('T')[0];

// Update checkout date when checkin changes
document.getElementById('check-in').addEventListener('change', function() {
    const checkInDate = new Date(this.value);
    const checkOutInput = document.getElementById('check-out');
    const nextDay = new Date(checkInDate);
    nextDay.setDate(nextDay.getDate() + 1);

    checkOutInput.min = nextDay.toISOString().split('T')[0];

    // If checkout is before checkin, update it
    if (checkOutInput.value && new Date(checkOutInput.value) <= checkInDate) {
        checkOutInput.value = nextDay.toISOString().split('T')[0];
    }
});

// Accessibility: Announce page changes to screen readers
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);

    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Add screen reader class
const style = document.createElement('style');
style.textContent = `
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
`;
document.head.appendChild(style);

// Keyboard navigation enhancement
document.addEventListener('keydown', function(e) {
    // Alt + 1 for main navigation
    if (e.altKey && e.key === '1') {
        document.querySelector('.main-nav a').focus();
        e.preventDefault();
    }
    // Alt + 2 for main content
    if (e.altKey && e.key === '2') {
        document.querySelector('#main-content').focus();
        e.preventDefault();
    }
});