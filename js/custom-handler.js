AFRAME.registerComponent('click-handler', {
	init: function(){
		this.handleClick = this.handleClick.bind(this);
		this.el.addEventListener('click', this.handleClick);
	},

	remove: function(){
		this.el.removeEventListener('click', this.handleClick);
	},

	handleClick: function(e){
		if(init && !clickLock){
			console.log(this.el.id);
			let nowPath = this.el.getAttribute('src');
			var targList = document.getElementById("start-btn");
			if(preEl == this.el){ //one picture was colored && click the same picture
				this.el.setAttribute('src', nowPath.replace('color', 'ori'));
				preEl = null;
				targList.innerText = "Start Video";
				targList.style.visibility = "hidden";
				document.getElementById("buttons_area2").style.visibility = "hidden"
				if(TextWindow){
					var del = document.getElementById("box");
        			del.parentNode.removeChild(del);
        			TextWindow = false;
        			document.getElementById("buttons_area2").style.visibility = "hidden";
        			document.getElementById("show-text").innerText = "Text";
				}
				if(MovieWindow){
					var del = document.getElementById("MovieW");
        			del.parentNode.removeChild(del);
        			MovieWindow = false;
				}
				return;
			}
			this.el.setAttribute('src', nowPath.replace('ori', 'color'));
			if(preEl != null){  //one picture was colored && click different picture
				let oldPath = preEl.getAttribute('src');
				preEl.setAttribute('src', oldPath.replace('color', 'ori'));
				document.getElementById("show-text").innerText = "Text";
				if(TextWindow){
					var del = document.getElementById("box");
        			del.parentNode.removeChild(del);
        			TextWindow = false;
        			document.getElementById("buttons_area2").style.visibility = "hidden";
				}
				else if(document.getElementById("buttons_area2").style.visibility == "visible"){
					document.getElementById("buttons_area2").style.visibility = "hidden";
				}
				if(MovieWindow){
					var del = document.getElementById("MovieW");
        			del.parentNode.removeChild(del);
        			MovieWindow = false;
				}
			}

			//no picture was colored && click one picture
			preEl = this.el;
			//alert(this.el.id);

			targList.innerText = "Start Video";
			targList.style.visibility = "visible";
		}
	},
});

AFRAME.registerComponent('markerhandler', {
	init: function() {
		this.el.addEventListener('markerFound', function(e){
			id = this.id;
			if(!firstGen[id]){
				let el = document.getElementById(id);
				let imgEl = document.createElement('a-image');
				imgEl.setAttribute('id', id);
				imgEl.setAttribute('src', '#' + id + '_ori');
				imgEl.setAttribute('width', muralData[id].width);
				imgEl.setAttribute('height', muralData[id].height);
				imgEl.setAttribute('scale', '0.005 0.005');
				imgEl.setAttribute('rotation', '-90');
				imgEl.setAttribute('class', 'clickable');
				imgEl.setAttribute('click-handler', '');
				el.appendChild(imgEl);
				firstGen[id] = true;
			}
		});
	}
});