define(['jquery', 'qlik', 'css!./Flythrough.css', './properties'], function ($, qlik, cssContent, properties) {
	var app = qlik.currApp();
	var SheetList = [];
	var m;
	var p;
	var renderingElement;
	var sheetDetails='';
	var currentSheetID = window.location.href.split("sheet/")[1].split("/")[0];
	app.getList("sheet", function(reply){
		$.each(reply.qAppObjectList.qItems, function(key, value) {
			sheetname = value.qData.title;
			sheetID = value.qInfo.qId;
			SheetList.push({ sheetname : sheetname, sheetID : sheetID});
		});
	});

	setTimeout(function(){
		console.log(SheetList.length);
		SheetList.forEach(function(t){
			sheetDetails = sheetDetails+'<div class="sheets" id="'+t.sheetID+'">'+t.sheetname+'</div>';
		})
	},1000);

	
	function sheetOnClickNavigate(){
		var sheetToNavigate = this.getAttribute("id");
		//console.log(sheetToNavigate);
		qlik.navigation.gotoSheet(sheetToNavigate);
		document.querySelector(".qv-contextmenu").style.display = 'None';
	}


	function isNavigationOpen(){
		if (document.querySelector(".qv-contextmenu") == null){
			p = false;
		}
		else {
			p = true;
		}
		return p;
	}

	setInterval(function(){
		app.getObject('CurrentSelections','CurrentSelections').then(function(reply){
			if (reply.layout.qSelectionObject.qSelections.length == 0){
				m = false;
			}
			else {
				m = true;
			}
		});
	},100);

	function  enableDrillCollapse(){
		var coll = document.getElementsByClassName("collapsible");
		var i;

		for (i = 0; i < coll.length; i++) {
  			coll[i].addEventListener("click", function() {
    		this.classList.toggle("active");
    		var content = this.nextElementSibling;
    		if (content.style.maxHeight){
      			content.style.maxHeight = null;
    		} else {
      			content.style.maxHeight = content.scrollHeight + "px";
    		} 
  		});
		}
	}

	


	$( "body" ).contextmenu(function(){
	
		setTimeout(function(){
			console.log("Is the Navgation Pane Open :",isNavigationOpen());
			console.log("Is there any current Selection : ",m);
		
		if (isNavigationOpen() == true && m == true){
			var onFlycurrentSheetID = window.location.href.split("sheet/")[1].split("/")[0];
			// SheetList.forEach(function(t){
			// 	sheetDetails = sheetDetails+'<div class="sheets" id="'+t.sheetID+'">'+t.sheetname+'</div>';
			// })
			renderingElement = document.createElement("li");
			renderingElement.innerHTML= '<button class="collapsible"> &#8609;&nbsp; Drill Through</button><div class="content">'+sheetDetails+'</div>';
			console.log(renderingElement);
			if (document.querySelector(".lui-popover") != null){
				document.querySelector(".lui-popover").querySelector("ul").appendChild(renderingElement);
			}
			if (document.querySelector(".qv-contextmenu") != null){
				document.querySelector(".qv-contextmenu").querySelector("ul").appendChild(renderingElement);
			}
			enableDrillCollapse();
			$(".sheets").on("click",sheetOnClickNavigate);
			document.getElementById(onFlycurrentSheetID).style.display = 'None';
		}
		},100);
		
	});

	return {
        
		definition: properties,	
		paint: function ($element) {
			dummyHtml = '<h3 id="Notification">Drill Through Enabled</h3>'
			$element.html(dummyHtml);			
		}
	};




}); 





