function validate(tocheck) {
	// console.log(tocheck);
    	if(isNaN((tocheck)))
	    {  
	      alert('Please input numbers only');  
	      return false;  
	    }
}

function calculate() {
    var x = document.getElementById("myForm");
    
    var text = ""; 
    var map = new Object();
	var avg = 0;

    function get(k) {
		return map[k];
	}

    var i;
    var count = 0;
    for (i = 0; i < x.length - 1;i++) {
    	// console.log(x.elements[i - 1].value);
    	// console.log(map.has(x.elements[i - 1].value));
    	// console.log(map[x.elements[i-1].value] != undefined);
        if(i % 2 == 1) {
        	// if(map.has(x.elements[i - 1].value)) {
        	// 	map[x.elements[i - 1].value] += x.elements[i].value; 
        	// }
        	// else {
        		map[x.elements[i - 1].value] = x.elements[i].value; 
        	// }
        	text += "," + x.elements[i - 1].value + "!" + x.elements[i].value + ",";
        	avg += Number(x.elements[i].value);
        	count++;
        }
    }
    avg /= count;
    localStorage.setItem("text", text);
}

function addInput(divName){
          var newdiv = document.createElement('div');
          newdiv.innerHTML = "<input type=\"text\" name=\"name\" placeholder=\"Name\" /><br><input type=\"text\" name=\"money\" placeholder=\"Amount Paid\" onchange=\"validate(this.value)\"/>";
          document.getElementById(divName).appendChild(newdiv);     
}

function getResults() {
	var avg = 0;
	var count = 0;
    var map = new Object();

    var items = localStorage.getItem("text").split(",");
    for(i in items) {
    	if(items[i] != "") {
	    	var tmp = items[i].split("!");
    		map[tmp[0]] = tmp[1];
    		avg += Number(tmp[1]);
    		count++;
    	}
    }
    avg /= count;
    var rowNum = 1;
    var table = document.getElementById("resultsTable");
    for(i in map) {
    	var row = table.insertRow(rowNum);
    	var cell1 = row.insertCell(0);
    	cell1.innerHTML = i;
    	var cell2 = row.insertCell(1);
    	rowNum++;
    	if(Number(map[i]) < avg) {
    		cell2.innerHTML = "owes " + Math.ceil((avg - Number(map[i])) * 100) / 100;
    	}
    	else if(Number(map[i]) > avg) {
    		cell2.innerHTML = "gets " + Math.ceil(Number((map[i]) - avg) * 100) / 100;
    	}
    	else {
    		cell2.innerHTML = "is good to go";
    	}
    }
    localStorage.removeItem("text");
}

function clear() {
	localStorage.removeItem("text");
}