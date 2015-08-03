(function(){ 

	var pizzas = document.getElementById("pizzas");
	var res = db.exec("SELECT * FROM pizzas LIMIT 5");
	var table = "<table class='bordered striped hoverable centered'>"
	for(var i = 0; i < res.values.length; i++){
		var value = res.values[i];
		if(sessionStorage.getItem("username")) {
			var extra = "<td class='pricer'><input class='priceItem' value='"+value[2]+"'> <button class='priceChanger' data-name='"+value[0]+"'>Change Price</button></td>";
		} else {
			var extra = "<td>" + value[2] + "</td>";
		}
		table += "<tr><td><img src='http://lorempizza.com/100/100?breaker="+(new Date())+ "' /></td><td>" + value[0] + "</td><td>" + value[1] + "</td>"+extra+"</tr>"
	}
	table += "</table>";
	pizzas.innerHTML = table;
	$(".priceChanger").click(function(e){
		var price = $(this).closest(".pricer").find(".priceItem").val();
		var name = $(this).data("name");
		if(btoa(sessionStorage.getItem("username")) === "YWRtaW4="){
			db.exec("UPDATE pizzas SET price=" + price + " WHERE name = '" + name+"'");
			alert("Updated price!");
		} else {
			alert("Only the admin user can change prices >:( ");
		}
	});
})();
