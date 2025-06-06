jQuery(document).ready(function($){
    $('.search-icon').on('click', function(){
        // console.log('test')
        var city = $('#search-location').val();
        var cm = $('#cm span');
        var nd = $('#nd span');
        var oz = $('#oz span');
        var sd = $('#sd span');
        var pm2 = $('#pm2 span');
        var pm10 = $('#pm10 span');
        $.ajax({
            method: 'get',
            url: 'https://api.api-ninjas.com/v1/airquality?city='+city,
            headers: { 'X-Api-Key': '4tfu36ELNUS8u+rNc3FFaw==w8X9R7r6yhmHfwAD'},
            contentType: 'application/json',
            success: function(result) {
                console.log(result);
                cm.html(result.CO.concentration)
                nd.html(result.NO2.concentration)
                oz.html(result.O3.concentration)
                sd.html(result.SO2.concentration)
                pm2.html(result["PM2.5"].concentration)
                pm10.html(result.PM10.concentration)
            },
            error: function ajaxError(jqXHR) {
                console.error('Error: ', jqXHR.responseText);
            }
        })

        $('.city').html(city)
    })

})

// jQuery(window).on("load", function($) {
//     console.log('load')
//     var city = jQuery('#search-location').val();
//         var cm = jQuery('#cm span');
//         var nd = jQuery('#nd span');
//         var oz = jQuery('#oz span');
//         var sd = jQuery('#sd span');
//         var pm2 = jQuery('#pm2 span');
//         var pm10 = jQuery('#pm10 span');
//     jQuery.ajax({
//         method: 'get',
//         url: 'https://api.api-ninjas.com/v1/airquality?city=pune',
//         headers: { 'X-Api-Key': '4tfu36ELNUS8u+rNc3FFaw==w8X9R7r6yhmHfwAD'},
//         contentType: 'application/json',
//         success: function(result) {
//             console.log(result);
//             cm.html(result.CO.concentration)
//             nd.html(result.NO2.concentration)
//             oz.html(result.O3.concentration)
//             sd.html(result.SO2.concentration)
//             // pm2.html(result.PM2.5.concentration)
//             pm10.html(result.PM10.concentration)
//         },
//         error: function ajaxError(jqXHR) {
//             console.error('Error: ', jqXHR.responseText);
//         }
//     })
// });
jQuery(document).ready(function($){
    $('.search-icon').on('click', function(){
        var city = $('#search-location').val();
        
        $.ajax({
            url: '/air_quality_view/', // Django API endpoint
            method: 'GET',
            data: { city: city },
            success: function(response) {
                console.log(response); // Debug: Check if data is received
                
                // Update AQI values dynamically
                $('.city').html(response.city);
                $('#aqi').html(response.aqi);
                $('#pm10').html(response.pm10 + " µg/m³");

                // Update weather values dynamically
                $('#temperature').html((response.temperature - 273.15).toFixed(2) + "°C"); // Convert from Kelvin to Celsius
                $('#humidity').html(response.humidity + "%");
                $('#wind_speed').html(response.wind_speed + " km/h");
            },
            error: function(error) {
                console.error("Error fetching data: ", error);
            }
        });
    });
});

