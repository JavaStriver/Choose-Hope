// access the data

var params = new URLSearchParams(window.location.search);
var service = params.get("getService");
var postcode = params.get("getPostcode");
window.onload = () => { fetchData() }
function fetchData() {

    fetch('https://y2783e31jh.execute-api.us-east-1.amazonaws.com/dev/choosehope',
        {
            method: "POST",
            headers: {
                // 'X-Api-Key': 'zBf7vql5eD8eqs79QMeLg7i6Obfvi3Jk8BEcRE39',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                serviceCategory: service,
                postCode: postcode
            })
        })
        // render it on the page
        .then(resp => resp.json())
        .then(function (resp) {
            console.log(resp);
            // Order the info
            if (resp.length === 0) {
                document.getElementById("h2").innerHTML = "Your current suburb is &nbsp" + `<h4>${postcode}</h4>` + "." + "<br> There are no &nbsp" + `<h4>${service}</h4>` + "&nbsp services available.";
                document.getElementById("changeLocation").innerHTML = "Change Location";
                document.getElementById("allServices").innerHTML = "Show All Services";
                document.getElementById("blankDiv").style.display = "";
                document.getElementById("changeLocationDiv").style.display = "block";
                document.getElementById("allServicesDiv").style.display = "block";
            } else {
                if (postcode === "1") {
                    document.getElementById("h2").innerHTML = "We found &nbsp" + resp.length + "&nbsp" + `<h4>${service}</h4>` + "&nbsp services for you in total:";
                    document.querySelector(".loadMore").style.display = 'block';
                    document.getElementById("changeLocationDiv").style.display = "block";
                    document.getElementById("allServicesDiv").style.display = "block";
                    // To avoid multiple services at the same time, set the load more button
                    $(document).ready(function () {
                        var list = $(".indiService");
                        var numToShow = 6;
                        var button = $(".loadMore");
                        var numInList = list.length;
                        list.hide();
                        if (numInList > numToShow) {
                            button.show();
                        }
                        list.slice(0, numToShow).show();

                        button.on("click", function () {
                            var showing = list.filter(':visible').length;
                            console.log(showing);
                            list.slice(showing - 1, showing + numToShow).fadeIn();
                            var nowShowing = list.filter(':visible').length;
                            if (nowShowing >= numInList) {
                                button.hide();
                            }
                        });
                    })
                } else {
                    document.getElementById("h2").innerHTML = "Your current suburb is &nbsp" + `<h4>${postcode}</h4>` + "." + "<br> We found &nbsp" + resp.length + "&nbsp" + `<h4>${service}</h4>` + "&nbsp services for you:";
                    document.getElementById("changeLocationDiv").style.display = "block";
                    document.getElementById("allServicesDiv").style.display = "block";
                }
                /*Scroll to top when arrow up clicked BEGIN*/
                $(window).scroll(function () {
                    var height = $(window).scrollTop();
                    if (height > 100) {
                        $('#back2Top').fadeIn();
                    } else {
                        $('#back2Top').fadeOut();
                    }
                });
                $(document).ready(function () {
                    $("#back2Top").click(function (event) {
                        event.preventDefault();
                        $("html, body").animate({ scrollTop: 0 }, "slow");
                        return false;
                    });

                });
                document.getElementById("changeLocation").innerHTML = "Change location";
                document.getElementById("allServices").innerHTML = "Show all services";
                document.getElementById("blankDiv").style.display = "none";
                const html = resp.map((service, index) => {
                    var detailId = "detail_" + index;
                    var seeDetailsId = "seeDetail_" + index;
                    var mapId = "map_" + index;
                    var onlineServiceOnly = "onlineServiceOnly_" + index;
                    var navigationId = "navigation_" + index;
                    var serviceNameId = "serviceName_" + index;
                    var serviceEmailId = "serviceEmail_" + index;
                    var serviceAddressId = "serviceAddress_" + index;
                    var openHoursId = "openHours_" + index;
                    var descriptionId = "description_" + index;
                    var serviceWebsiteAddressId = "serviceWebsiteAddress_" + index;
                    var serviceContactTelephone1Id = "serviceContactTelephone1_" + index;
                    var serviceContactTelephone2Id = "serviceContactTelephone2_" + index;
                    var travelId = "travel_" + index;
                    var statusId = "status_" + index;
                    var distanceId = "distance_" + index;
                    var walkId = "walk_" + index;
                    var bicycleId = "bicycle_" + index;
                    var carId = "car_" + index;
                    var wheelchairId = "wheelChair_" + index;

                    $(document).ready(function () {
                        if (service.serviceContactTelephone2.length === 0 || service.serviceAddress.length === 0) {
                            document.getElementById(`${wheelchairId}`).style.display = "none";
                        }
                        $(`#${seeDetailsId}`).on("click", function () {
                            // Check if the element is null
                            if (service.serviceName.length === 0) {
                                document.getElementById(`${serviceNameId}`).style.display = 'none';
                            }
                            if (service.serviceAddress.length === 0) {
                                document.getElementById(`${serviceAddressId}`).style.display = 'none';
                                document.getElementById(`${navigationId}`).style.display = 'none';
                                document.getElementById(`${travelId}`).style.display = 'none';
                            }
                            if (service.openHours.length === 0) {
                                document.getElementById(`${openHoursId}`).style.display = 'none';
                            }
                            if (service.description.length === 0) {
                                document.getElementById(`${descriptionId}`).style.display = 'none';
                            }
                            if (service.serviceWebsiteAddress.length === 0) {
                                document.getElementById(`${serviceWebsiteAddressId}`).style.display = 'none';
                            }
                            if (service.emailAddress.length === 0) {
                                document.getElementById(`${serviceEmailId}`).style.display = 'none';
                            }
                            if (service.serviceContactTelephone1.length === 0) {
                                document.getElementById(`${serviceContactTelephone1Id}`).style.display = 'none';
                            }
                            if (service.serviceContactTelephone2.length === 0) {
                                document.getElementById(`${serviceContactTelephone2Id}`).style.display = 'none';
                            }

                            $(`#${detailId}`).toggle(500);
                        })
                    })

                    // show elements in each service
                    return `
                    <div class="indiService">
                        <button class="seeDetails" id=${seeDetailsId} onclick="initMap()">More Info</button>
                        <p class="name" id=${serviceNameId}>${service.serviceName}</p>
                        <p class="address" id=${serviceAddressId}>${service.serviceAddress}</p>
                        <p class="openHours"  id=${openHoursId}>${service.openHours}</p>
                        <p class="wheelchair"  id=${wheelchairId}><img src="image/wheelchair.png" alt="">&nbsp Full wheelchair access</p>                     
                        <div class="details" id=${detailId} style="display: none">
                            <h3 id=${onlineServiceOnly} style="display: none; position: absolute;right: 150px;bottom: 140px;">Online Service Only</h3>                              
                            <div class="description" id=${descriptionId}>
                            <p class="word">Description:&nbsp</p><p>${service.description}</p>
                            </div>
                            <div class="travel" id=${travelId}>
                            <p class="status"  id=${statusId}></p>
                            <div class="distance"  id=${distanceId}></div>
                            <div class="walk"  id=${walkId}></div>
                            <div class="bicycle"  id=${bicycleId}></div>
                            <div class="car"  id=${carId}></div>
                            </div>
                            <a href="${service.serviceWebsiteAddress}" class="web"  id=${serviceWebsiteAddressId} target = "blank" /><img src="image/web.png" alt=""><p>Official Website</p></a>
                            <a href="tel:+${service.serviceContactTelephone1}" class="phone" id=${serviceContactTelephone1Id}><img src="image/phone.png" alt=""><p>${service.serviceContactTelephone1}</p></a>
                            <a href="tel:+${service.serviceContactTelephone2}" class="phone" id=${serviceContactTelephone2Id}><img src="image/phone.png" alt=""><p>${service.serviceContactTelephone2}</p></a>                     
                            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=+${service.emailAddress}" class="email"  id=${serviceEmailId} target = "blank" /><img src="image/email.png" alt=""><p>Email</p></a>     
                            <form action="http://maps.google.com/maps" method="get" target="_blank">
                                <input type="hidden" name="daddr" value="${service.serviceAddress}"/>
                                <input type="submit" value="Navigate to" class="navigateTo" id=${navigationId} />
                            </form>
                            <div class="map" id=${mapId}></div>
                        </div>
                    </div>
                    `;
                })
                    .join("");
                document.querySelector('.contain').insertAdjacentHTML("afterbegin", html);
            }

        })
        .catch(function (error) {
            console.log(error);
        });
}

// show google map
function initMap() {
    var params = new URLSearchParams(window.location.search);
    var service = params.get("getService");
    var postcode = params.get("getPostcode");

    fetch('https://y2783e31jh.execute-api.us-east-1.amazonaws.com/dev/choosehope',
        {
            method: "POST",
            headers: {
                // 'X-Api-Key': 'zBf7vql5eD8eqs79QMeLg7i6Obfvi3Jk8BEcRE39',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                serviceCategory: service,
                postCode: postcode
            })
        })
        // render it on the page
        .then(resp => resp.json())
        .then(function (resp) {
            const html = resp.map((service, index) => {
                if (service.latitude == "0") {
                    document.getElementById(`map_${index}`).style.display = 'none';
                    document.getElementById(`onlineServiceOnly_${index}`).style.display = 'inline-block';
                }

                const myLatLng = { lat: service.latitude, lng: service.longitude };
                const numberOfMap = new google.maps.Map(document.querySelector(`#map_${index}`), {
                    zoom: 15,
                    center: myLatLng,
                });
                new google.maps.Marker({
                    position: myLatLng,
                    map: numberOfMap,
                });
            })
        }
        )
        .catch(function (error) {
            console.log(error);
        });
}

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
        params.append("getService", service);
        params.append("getPostcode", postcode);
        location.href = "services.html?" + params.toString();
    }
}

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
                    var postcode = address.long_name;
                    var params = new URLSearchParams();
                    params.append("getService", service);
                    params.append("getPostcode", postcode);
                    location.href = "services.html?" + params.toString();
                }
            }
        });
    });
    return false;
}

// show all current services
function allServices() {
    var params = new URLSearchParams();
    params.append("getService", service);
    params.append("getPostcode", 1);
    location.href = "services.html?" + params.toString();
}

// back to privious page
function back() {
    window.history.go(-1);
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
function valueSender3() {
    var getPostcode = document.getElementById("input_id2").value;
    if (getPostcode.length === 0) {
        document.getElementById("numberError2").style.display = "none";
        document.getElementById("emptyError2").style.display = "block";
    } else if (isNaN(getPostcode)) {
        document.getElementById("emptyError2").style.display = "none";
        document.getElementById("numberError2").style.display = "block";
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
function valueSender4() {
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

function travelTime() {
    const status = document.querySelector('#status');
    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const origin = `${latitude}, ${longitude} `;
        console.log(origin);

        fetch('https://y2783e31jh.execute-api.us-east-1.amazonaws.com/dev/choosehope',
            {
                method: "POST",
                headers: {
                    // 'X-Api-Key': 'zBf7vql5eD8eqs79QMeLg7i6Obfvi3Jk8BEcRE39',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    serviceCategory: service,
                    postCode: postcode
                })
            })
            // render it on the page
            .then(resp => resp.json())
            .then(function (resp) {
                console.log(resp);
                const html = resp.map(service => {
                    const destination = `${service.latitude}, ${service.longitude} `;
                    let ApiURL = "https://maps.googleapis.com/maps/api/distancematrix/json?";
                    let walking = `origins=${origin}&destinations=${destination}&mode=walking&key=AIzaSyCxTkcaljc1eGqBEeua_dTtCDLB9dhNI-4`;
                    let bicycling = `origins=${origin}&destinations=${destination}&mode=bicycling&key=AIzaSyCxTkcaljc1eGqBEeua_dTtCDLB9dhNI-4`;
                    let driving = `origins=${origin}&destinations=${destination}&mode=driving&key=AIzaSyCxTkcaljc1eGqBEeua_dTtCDLB9dhNI-4`;

                    let finalwalking = `${ApiURL}${encodeURI(walking)}`;
                    let finalbicycling = `${ApiURL}${encodeURI(bicycling)}`;
                    let finaldriving = `${ApiURL}${encodeURI(driving)}`;

                    var json = fetch(`${finalwalking}`, {
                        mode: 'no-cors' // 'cors' by default
                    })
                    console.log(json);
                    // .then(json => json.json())
                    // .then(function (json) {
                    //     // var obj = eval(json);
                    //     // document.querySelector('.walk').innerHTML = obj.rows.elements.duration.text;
                    // })
                })
            })
    }
    function error() {
        // status.textContent = 'Unable to retrieve your location';
        console.warn('Unable to retrieve your location');
    }

    if (!navigator.geolocation) {
        status.textContent = 'Geolocation is not supported by your browser';
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
}

// document.querySelector('.seeDetails').addEventListener('click', travelTime);

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
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