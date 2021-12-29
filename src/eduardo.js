function eduardo2(){
	console.clear();
	var i=0; 
	document.getElementsByClassName("cell-total").forEach(function(ct){
	    //
	    var row = ct.parentElement.children[0].children[0]
	    //console.log("====");
	    var nimi = "";
	    row.children.forEach(function(r){
	    	if (Data.Types.indexOf(r.innerText.toLowerCase()) != -1 ){
	    		nimi += 1 + Data.Types.indexOf(r.innerText.toLowerCase());
	    	} else nimi += String(nimi.split("_")[0]);
	    	if (nimi.length<=2) nimi += "_";
	    	//console.log(nimi);
		    if (nimi.split("_")[0]!=""){
		    	ct.setAttribute("id",nimi);
		    }
	    });
	    i++;
	})
	//console.log(Data);
}
function eduardo(){

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	        Data = JSON.parse(this.responseText);
	        eduardo2();
	    }
	};
	xmlhttp.open("GET", "./../main.json", true);
	xmlhttp.send();
}