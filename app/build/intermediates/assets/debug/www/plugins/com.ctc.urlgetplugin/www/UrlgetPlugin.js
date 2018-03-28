cordova.define("com.ctc.urlgetplugin.urlgetplugin", function(require, exports, module) {
var preurlget = function( PreUrl, RetlName, Group, ZipCode, Addr, GMCC, TCC, pageNum, queriesNum, callback){
    		cordova.exec(   callback,
                    function(err){ callback(''); console.log("error: " + err); } ,
                    "UrlgetPlugin", "Urlget",
                    [{"PreUrl": PreUrl}, {"RetlName": RetlName},  {"Group": Group},
		     {"ZipCode": ZipCode},  {"Addr": Addr},  {"GMCC": GMCC}, 
		     {"TCC": TCC} ,  {"pageNum": pageNum} , {"queriesNum": queriesNum}]);
		}	


});
