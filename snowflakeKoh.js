function example(iter){
		var canvas = document.getElementById("canvas");
		var canvasHeight = parseInt(canvas.getAttribute("height"));
		var canvasWidth = parseInt(canvas.getAttribute("width"));
		var context = canvas.getContext('2d');
		context.lineWidth = "1";
		context.strokeStyle = "#4B0082";
		context.clearRect(0, 0, canvasWidth, canvasHeight);	
		
		// Рисуем начальный треугольник
		var len = document.getElementById("length");
		var length = len.valueAsNumber; 
		var xx = document.getElementById("x");
		var cor1x = xx.valueAsNumber; 
		var yy = document.getElementById("y");
		var cor1y = yy.valueAsNumber;
		var cor2x = cor1x + length;
		var cor2y = cor1y;
		var height = Math.sqrt(Math.pow(length, 2) - Math.pow((length / 2), 2));
		var cormedx = (cor1x + cor2x) / 2;
		var cormedy = (cor1y + cor2y) / 2;
		var cor3x = cormedx + (height * (cor1y - cormedy)) / (length / 2);
		var cor3y = cormedy + (height * (cor1x - cormedx)) / (length / 2);
			
		function Point(x, y){
			this.x = x;
			this.y = y;
		}
	
		cor1 = new Point(cor1x, cor1y);
		cor2 = new Point(cor2x, cor2y);
		cor3 = new Point(cor3x, cor3y);
		
		context.beginPath(); 
		context.moveTo(cor1.x, cor1.y);
		context.lineTo(cor2.x, cor2.y);
		context.lineTo(cor3.x, cor3.y);
		context.lineTo(cor1.x, cor1.y);
		context.stroke();
			
		// Рисуем снежинку	
			
		function Fractal(cor1, cor2, cor3, iter){
			if (iter > 0){
				var cor4 = new Point((cor2.x + 2 * cor1.x) / 3, (cor2.y + 2 * cor1.y) / 3);
				var cor5 = new Point((2 * cor2.x + cor1.x) / 3, (cor1.y + 2 * cor2.y) / 3);
				var corm = new Point((cor2.x + cor1.x) / 2, (cor2.y + cor1.y) / 2);
				var corn = new Point((4 * corm.x - cor3.x) / 3, (4 * corm.y - cor3.y) / 3);
				
				context.lineWidth = "1";
				context.strokeStyle = "#4B0082";
				context.beginPath(); 
				context.moveTo(cor4.x, cor4.y);
				context.lineTo(corn.x, corn.y);
				context.moveTo(cor5.x, cor5.y);
				context.lineTo(corn.x, corn.y);
				context.stroke();
				
				context.strokeStyle = "#FFF8FF";
				context.lineWidth = "3";
				context.beginPath(); 
				context.moveTo(cor4.x, cor4.y);
				context.lineTo(cor5.x, cor5.y);
				context.stroke();
				
				Fractal(cor4, corn, cor5, iter - 1);
				Fractal(corn, cor5, cor4, iter - 1);
				Fractal(cor1, cor4, new Point((2 * cor1.x + cor3.x) / 3, (2 * cor1.y + cor3.y) / 3), iter - 1);
				Fractal(cor5, cor2, new Point((2 * cor2.x + cor3.x) / 3, (2 * cor2.y + cor3.y) / 3), iter - 1);
			}
			return iter;
		}
		Fractal(cor1, cor2, cor3, iter);
		Fractal(cor2, cor3, cor1, iter);
		Fractal(cor3, cor1, cor2, iter);	
	}