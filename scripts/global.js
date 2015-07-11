
//解决方案:页面加载可能执行多个函数
function addLoadEvent(func){

	var oldonload = window.onload;
	if(typeof window.onload != 'function'){
		window.onload = func;
	}
	else {
		window.onload = function (){
			oldonload();
			func();
		}
	}

}

//当前导航栏选中

function highlightPage(){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	var headers=document.getElementsByTagName('header');
	if(headers.length==0) return false;
	var navs=headers[0].getElementsByTagName("nav");
	if(navs.length==0) return false;
	var links=navs[0].getElementsByTagName("a");
	var linkurl;
	for(var i=0;i<links.length;i++) {
		linkurl=links[i].getAttribute("href");
		if(window.location.href.indexOf(linkurl)!=-1){
			links[i].className="here";
			var linktext=links[i].lastChild.nodeValue.toLowerCase();
			document.body.setAttribute("id",linktext);
		}
	}
	

}

//图片移动动画
function moveElement(elementID,final_x,final_y,interval) {
	if(!document.getElementById) return false;

	if(!document.getElementById(elementID)) return false;
	var ele = document.getElementById(elementID);
	if(ele.movement){
		clearTimeout(ele.movement);
	}
	if(!ele.style.left) {
		ele.style.left="0px";
	}
	if(!ele.style.top) {
		ele.style.top="0px";
	}

	var xpos=parseInt(ele.style.left);
	var ypos=parseInt(ele.style.top);

	if(xpos==final_x && ypos==final_y) {
		return true;
	}

	if(xpos<final_x){
		var dist=Math.ceil((final_x - xpos)/10);
		xpos=xpos+dist;
	}

	if(xpos>final_x){
		var dist=Math.ceil((xpos - final_x)/10);
		xpos=xpos-dist;
	}

	if(ypos>final_y){
		var dist=Math.ceil((ypos - final_y)/10);
		ypos=ypos-dist;
	}

	if(ypos<final_y){
		var dist=Math.ceil((final_y - ypos)/10);
		ypos=ypos+dist;
	}

	ele.style.left=xpos+"px";
	ele.style.top=ypos+"px";

	var repeat="moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
	ele.movement=setTimeout(repeat,interval);


}

function insertAfter(newElement,targetElement){
	var parent=targetElement.parentNode;
	if(parent.lastChild==targetElement){
		parent.appendChild(newElement);
	}else {
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}

function prepareSlideshow(){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("intro")) return false;
	var intro=document.getElementById("intro");
	var slideshow=document.createElement("div");
	slideshow.setAttribute("id","slideshow");
	var frame=document.createElement("img");
	frame.setAttribute("src","images/frame.gif");
	frame.setAttribute("alt","");
	frame.setAttribute("id","frame");
	slideshow.appendChild(frame);
	var preview =document.createElement("img");
	preview.setAttribute("src","images/slideshow.gif");
	preview.setAttribute("alt","a glimpse of what awaits you");
	preview.setAttribute("id","preview");
	slideshow.appendChild(preview);
	insertAfter(slideshow,intro);
	var links=document.getElementsByTagName('a');
	var dest;
	for(var i=0;i<links.length;i++) {
		links[i].onmouseover=function (){
			dest=this.getAttribute("href");
			if(dest.indexOf("index.html")!=-1) {
				moveElement("preview",0,0,5);
			}

			if(dest.indexOf("about.html")!=-1) {
				moveElement("preview",-150,0,5);
			}

			if(dest.indexOf("photos.html")!=-1){
				moveElement("preview",-300,0,5);
			}

			if(dest.indexOf("live.html")!=-1){
				moveElement("preview",-450,0,5);
			}

			if(dest.indexOf("contact.html")!=-1){
				moveElement("preview",-600,0,5);
			}
		}
	}

}

addLoadEvent(highlightPage);
addLoadEvent(prepareSlideshow);
