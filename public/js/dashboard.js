var app = window.app || {};
app.dashboard = app.login || {};

app.dashboard.initialize = function(){
	$(function() {
		init();
	});

	function init(){
		bindEvents();
	}
	
	function bindEvents(){
	    $.ajax({
			url: "/api/expense/all/",
			type: "GET",
			//data: data,
			dataType: "json",
			success: function(resp) {console.log(resp);
				if(resp.success == true){
		
				}
				else if(resp.success == false){
        
            	}
			},
			error: function(){

			},
			complete: function(){

			}
		});
	}
}

app.dashboard.addExpense = function(){
    var data = {
		    expenseName: "food",
		    expense: "235"
		};
		$.ajax({
			url: "/api/expense/save/",
			type: "POST",
			data: data,
			dataType: "json",
			success: function(resp) {console.log(resp);
				if(resp.success == true){
		
				}
				else if(resp.success == false){
        
            	}
			},
			error: function(){

			},
			complete: function(){

			}
		});
}