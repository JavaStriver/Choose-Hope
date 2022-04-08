// Function to disable scroll
var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
    e.preventDefault();
}


function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () { supportsPassive = true; }
    }));
} catch (e) { }

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
    window.addEventListener('DOMMouseScroll', preventDefault); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys);
}

// call this to Enable
function enableScroll() {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}

// determine which service was clicked
var isReconnectionServiceClick = false;
var isHousingServiceClick = false;
var isHealthServiceClick = false;
var isJobServiceClick = false;
var isLegalServiceClick = false;
var isLaundryServiceClick = false;

function reconnectionServiceClick() {
    isReconnectionServiceClick = true;
}

function housingServiceClick() {
    isHousingServiceClick = true;
}

function healthServiceClick() {
    isHealthServiceClick = true;
}

function jobServiceClick() {
    isJobServiceClick = true;
}

function legalServiceClick() {
    isLegalServiceClick = true;
}

function laundryServiceClick() {
    isLaundryServiceClick = true;
}

// Send the entered information
function valueSender() {
    var getPostcode = document.getElementById("input_id").value;
    if (getPostcode.length === 0) {
        document.getElementById("numberError").style.display = "none";
        document.getElementById("emptyError").style.display = "block";
    } else if (isNaN(getPostcode)) {
        document.getElementById("emptyError").style.display = "none";
        document.getElementById("numberError").style.display = "block";
    } else {
        var params = new URLSearchParams();
        if (isReconnectionServiceClick) {
            var getService = "Reconnect";
        }
        if (isHousingServiceClick) {
            var getService = "Social Housing";
        }
        if (isHealthServiceClick) {
            var getService = "Health Care";
        }
        if (isJobServiceClick) {
            var getService = "Job";
        }
        if (isLegalServiceClick) {
            var getService = "Legal";
        }
        if (isLaundryServiceClick) {
            var getService = "Laundry";
        }
        params.append("getService", getService);
        params.append("getPostcode", getPostcode);
        location.href = "services.html?" + params.toString();
    }
}

// Get the current postcode and send
function valueSender2() {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(function (position) {
        var geocoder = new google.maps.Geocoder();
        var latLng = new google.maps.LatLng(
            position.coords.latitude, position.coords.longitude);
        geocoder.geocode({
            'latLng': latLng
        }, function (results) {
            for (var i = 0; i < results[0].address_components.length; i++) {
                var address = results[0].address_components[i];
                if (address.types[0] == "postal_code") {
                    console.log(address.long_name);
                    var getPostcode = address.long_name;

                    var params = new URLSearchParams();
                    if (isReconnectionServiceClick) {
                        var getService = "Reconnect";
                    }
                    if (isHousingServiceClick) {
                        var getService = "Social Housing";
                    }
                    if (isHealthServiceClick) {
                        var getService = "Health Care";
                    }
                    if (isJobServiceClick) {
                        var getService = "Job";
                    }
                    if (isLegalServiceClick) {
                        var getService = "Legal";
                    }
                    if (isLaundryServiceClick) {
                        var getService = "Laundry";
                    }
                    params.append("getService", getService);
                    params.append("getPostcode", getPostcode);
                    location.href = "services.html?" + params.toString();
                }
            }
        });
    });
    return false;
}

isReconnectionServiceClick = false;
isHousingServiceClick = false;
isHealthServiceClick = false;
isJobServiceClick = false;
isLegalServiceClick = false;
isLaundryServiceClick = false;

/* When the user clicks on the button, toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");

}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}
