

    	/*phonegap plugin module*/
   	document.addEventListener("deviceready", onDeviceReady, false);


	// Cordova is loaded and it is now safe to call Cordova methods
  	 function onDeviceReady() {

	      //backbutton listener
      	document.addEventListener("backbutton", function(e){

       	 if($.mobile.activePage.is('#home')){

       	    e.preventDefault();

		    navigator.app.exitApp();

     	 }
     	 else {
       	 navigator.app.backHistory();
    	 }
     	}, false);
	}

	//indexdb initialize and slash page
	$(document).on('pageinit','#splash',function(){ 
	
	initDB();

	//bueatify select menu
	CityList[0]="縣市名稱";

	$.each(ZipList , function( idx, value ) {
  		ZipList[idx][0] = "鄉鎮名稱"; 
	});

	GMccList[0] = "行業別";

	$.each(TccList , function( idx, value ) {
  		TccList[idx][0] = "行業分類"; 
	});

	    setTimeout(function(){
		$.mobile.changePage("#home", "fade");
	    }, 2000);
	});



  $(document).on('pageshow','#home',function(){
	  //show recommend search
		getTop5Search();
  });
 
//Start home page reset 
  $(document).on('pageinit','#home',function(){

	$("#previousResult").hide();	

	/*initial GMCC select option*/
   	 initGMcc(inForm.GMCC, inForm.TCC);



	$('#GMCC').selectmenu('refresh');
	
	$('#TCC').selectmenu("refresh");

	


	 initCity( inForm.Group, inForm.ZipCode );

	$('#Group').selectmenu('refresh');
			
	$('#ZipCode').selectmenu("refresh");
		
	//jquery mobile selectmenu need
	 $("#Group").change(function () {

		changeCity(inForm.Group, inForm.ZipCode);
	
       		 $('#ZipCode').selectmenu("refresh");
   	 });	 			


	$("#GMCC").change(function () {

		changeGMcc(inForm.GMCC, inForm.TCC);
	
       		$('#TCC').selectmenu("refresh");
   	 });	

	//calculate bonus of sabbaticalday year 
	$("#sabbaticalday").change(function () {
		

		if ($("#sabbaticalday").val()==7){
			
			$("#sabbaticalbonus").val( 8000) ;

		}
		else if ($("#sabbaticalday").val()==14){

			$("#sabbaticalbonus").val( 16000) ;

		}
		else{
			$("#sabbaticalbonus").val( 1143 * $("#sabbaticalday").val()) ;
		}
		
				

   	 });	


	/*submit button function*/
	$("#submit_btn").on('click', function () {

	var RetlName = $("#RetlName").val();
	var Group = $("#Group").val();
	var ZipCode =  $("#ZipCode").val();
	var Addr = $("#Addr").val();
	var GMCC = $("#GMCC").val();
	var TCC = $("#TCC").val();
	
	if (($("#select-area").val()=="")&&(GMCC=="")){
		alert('沒有選擇區域或行業別!!');
		return;
	}

	$.mobile.changePage( $("#list"), { transition: "slide"} );

	
	queryctc( RetlName, Group, ZipCode, Addr, GMCC, TCC);	
		
	});


});


	
//address to google map 
$( document ).on( "pageshow", "#map", function() {
	
	
	$('#map_canvas').hide();
	$.mobile.loading( "show", {
			text: "讀取中",
			textVisible: true,
			theme: "a",
			html: ""
		});
	
	
	//$('#map_canvas').height(400);

		var geocoder = new google.maps.Geocoder();
		
		var markers = [];
			
		var c = 0;
		
		
		//透過Google Geocoder將地址轉為經緯座標
            function geocodeAjax(name, addr) {
                //利用Deferred物件協助非同步呼叫全部完成的時機
                var def = new jQuery.Deferred();
                //geocoder似乎有使用量管控，若快速連續呼叫會停止運作
                //在此使用setTimeout節流，每次查詢間隔一秒鐘
                setTimeout(function() {
                    //呼叫decode()，傳入參數及Callback函數
                    geocoder.geocode({ address: addr }, function (results, status) {
                        //檢查執行結果
                        if (status == google.maps.GeocoderStatus.OK) {
                            var loc = results[0].geometry.location;
                            markers.push({
                                title:  addr,
                                latlng: new google.maps.LatLng(loc.lat(), loc.lng()),
								label:  name 
                            });
                            //呼叫Deferred.resolve()，表示執行成功
                            def.resolve();
                        }
                        else
                        {
                            //呼叫Deferred.reject()，表示執行失敗
                            def.reject();
                        }
                    });
                }, c++ * 500);
                //傳回Promise物件，以協調非同步呼叫結果
                return def.promise();
            }
	var deferredArray = [];
	
	var i =0;
	
	$('#resList li').each(function(li)
	{
		
			 
		if (($(this).find("h2").text())!=""){
			//console.log( i + ": " + $(this).find("h2").text() );
			
			i++;
			deferredArray.push(geocodeAjax($(this).find("h2").text(), $(this).find("p").text()) );		
		}
 
	});

	     //利用Deferred特性，在所有地址轉換呼叫完畢後，繪製地圖
                $.when.apply(null, deferredArray).then(function () {
                    //設定地圖參數
                   	var myOptions = {
						mapTypeId: google.maps.MapTypeId.ROADMAP
					};

					var map = new google.maps.Map( document.getElementById("map_canvas"), myOptions );
                    //使用LatLngBounds統計檢視範圍
                    var bounds = new google.maps.LatLngBounds();
                    //加入標示點(Marker)
                    for (var i = 0; i < markers.length; i++) {
                        var m = markers[i];
                        //將此座標納入檢視範圍
                        bounds.extend(m.latlng);
                        var marker = new google.maps.Marker({
                            position: m.latlng,
                            title: m.title,
                            map: map,
							label: {
								text: m.label,
								color: "black"
							  }
                        });
                        google.maps.event.addListener(marker, 'click', function() {
                            window.location.href = "geo:0,0?q="+this.title;
                        });
                    }
					
					
								
					/*
					if (navigator.geolocation) navigator.geolocation.getCurrentPosition(function(pos) {
                        var me = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
						
						//put self location
						var myloc = new google.maps.Marker({
							clickable: false,
							icon: new google.maps.MarkerImage('https://maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
																			new google.maps.Size(22,22),
																			new google.maps.Point(0,18),
																			new google.maps.Point(11,11)),
							shadow: null,
							zIndex: 999,
							map: map
						});
						
                        myloc.setPosition(me);
                    }, function(error) {
                        console.log("fail to find my location");
                    });*/
					
					//hide loading
					$.mobile.loading( "hide" );
					$('#map_canvas').show();
					
                    //調整檢視範圍
                    map.fitBounds(bounds);
					
					
        });
});
