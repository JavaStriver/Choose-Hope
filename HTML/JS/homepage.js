// Use the left and right arrow buttons to slide the slides
window.addEventListener('load', function () {
    var arrow_l = document.querySelector('.left');
    var arrow_r = document.querySelector('.right');
    var focus = document.querySelector('.part1');
    var focusWidth = focus.offsetWidth;

    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        // clearInterval(timer);
        // timer = null;
    })
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        // timer = setInterval(function () {
        //     arrow_r.click();
        // }, 5000);
    })

    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle')
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('index', i);
        ol.appendChild(li);
        li.addEventListener('click', function () {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            var index = this.getAttribute('index');
            num = index;
            circle = index;
            animate(ul, -index * focusWidth);
        })
    }
    ol.children[0].className = 'current';
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    var num = 0;
    var circle = 0;
    arrow_r.addEventListener('click', function () {
        if (num == ul.children.length - 1) {
            ul.style.left = 0;
            num = 0;
        }
        num++;
        animate(ul, -num * focusWidth);
        circle++;
        if (circle == ol.children.length) {
            circle = 0;
        }
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    });

    arrow_l.addEventListener('click', function () {
        if (num == 0) {
            num = ul.children.length - 1;
            ul.style.left = -num * focusWidth + 'px';
        }
        num--;
        animate(ul, -num * focusWidth);
        circle--;
        if (circle < 0) {
            circle = ol.children.length - 1;
        }
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }
    );
    // var timer = setInterval(function () {
    //     arrow_r.click();
    // }, 5000);
})

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
    var serviceLocation = document.getElementById("input_id").value;
    if (serviceLocation.length === 0) {
        document.getElementById("emptyError").style.display = "block";
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
        params.append("getServiceLocation", getServiceLocation);
        location.href = "services.html?" + params.toString();
    }
    isReconnectionServiceClick = false;
    isHousingServiceClick = false;
    isHealthServiceClick = false;
    isJobServiceClick = false;
    isLegalServiceClick = false;
    isLaundryServiceClick = false;
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
    isReconnectionServiceClick = false;
    isHousingServiceClick = false;
    isHealthServiceClick = false;
    isJobServiceClick = false;
    isLegalServiceClick = false;
    isLaundryServiceClick = false;
    return false;
}



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

function serviceConfirm() {
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

    fetch('https://y2783e31jh.execute-api.us-east-1.amazonaws.com/dev/servicelocation-by-servicecategory',
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                serviceCategory: getService
            })
        })
        .then(resp => resp.json())
        .then(function (resp) {
            console.log(resp);
            $(document).ready(function () {
                for (var i = 0; i < resp.serviceLocation.length; i++) {
                    $('#input_id').append('<option id="' + i + '">' + resp.serviceLocation[i] + '</option>');
                }

                var multiSelect = new IconicMultiSelect({

                    select: "#input_id",
                    placeholder: "Start typing a suburb or city",
                    noData: "Connect fail",
                    noResults: "No results",

                })
                multiSelect.init();
                multiSelect.subscribe(function (e) {
                    console.log(e);
                });
            })
        })
    isReconnectionServiceClick = false;
    isHousingServiceClick = false;
    isHealthServiceClick = false;
    isJobServiceClick = false;
    isLegalServiceClick = false;
    isLaundryServiceClick = false;
}
