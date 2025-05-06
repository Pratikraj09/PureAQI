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
            url: 'Your URL'+city,
            headers: { 'X-Api-Key': 'Your API Key'},
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

