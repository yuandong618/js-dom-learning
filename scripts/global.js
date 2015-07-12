
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

/*********************index.html begin************************/
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

/**********************index.html end*****************/

/****************** about.html begin*****************/
//显示section
function showSection(id) {
	var sections=document.getElementsByTagName("section");
	for(var i=0;i<sections.length;i++) {
		if(sections[i].getAttribute("id")!=id){
			sections[i].style.display="none";
		}
		else {
			sections[i].style.display="block";
		}

	}
}
//点击相应的link 对应的内容才显示
function  prepareInternalnav(){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	var articles=document.getElementsByTagName("article");
	if(articles.length==0) return false;
	var navs=articles[0].getElementsByTagName("nav");
	if(navs.length==0) return false;
	var links=navs[0].getElementsByTagName("a");
	for(var i=0;i<links.length;i++) {
		var sectionId=links[i].getAttribute("href").split("#")[1];
		if(!document.getElementById(sectionId)) return false;
		document.getElementById(sectionId).style.display="none";
		links[i].destination=sectionId;
		links[i].onclick=function (){
			showSection(this.destination);
			return false;
		}
	}
}


addLoadEvent(prepareInternalnav);

/***************about.html end*********************/


/***************photos.html begin*****************/

function showPic(whichpic){
	if(!document.getElementById("placeholder")) return true;
	var source=whichpic.getAttribute("href");
	var placeholder = document.getElementById("placeholder");
	placeholder.setAttribute("src",source);
	if(!document.getElementById("description")) return false;
	if(whichpic.getAttribute("title")){
		var text=whichpic.getAttribute("title");
	} else {
		var text="";
	}

	var description=document.getElementById("description");
	if(description.firstChild.nodeType==3) {
		description.firstChild.nodeValue=text;

	}
	return false;

}

function preparePlaceholder(){
	if(!document.createElement) return false;
	if(!document.createTextNode) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("imagegallery")) return false;
	var placeholder = document.createElement("img");
	placeholder.setAttribute("id","placeholder");
	placeholder.setAttribute("src","images/placeholder.gif");
	placeholder.setAttribute("alt","my image gallery");
	var description = document.createElement("p");
	description.setAttribute("id","description");
	var desctext = document.createTextNode("Choose an image");
	description.appendChild(desctext);
	var gallery = document.getElementById("imagegallery");
	insertAfter(description,gallery);
	insertAfter(placeholder,description);
}

function prepareGallery(){
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	var gallery=document.getElementById("imagegallery");
	if(!gallery) return false;
	var links=gallery.getElementsByTagName("a");
	for(var i=0;i<links.length;i++){
		links[i].onclick= function (){
			return showPic(this);
		}
	}

}

addLoadEvent(preparePlaceholder);

addLoadEvent(prepareGallery);


/***************photos.html end*****************/



/***************live.html begin*****************/

function addClass(element,value){
	if(!element.className){
		element.className=value;
	}else {
		var newClassName=element.className;
		newClassName=newClassName+" "+value;
		element.className=newClassName;
	}

}

function stripeTables(){
	if(!document.getElementsByTagName) return false;
	var tables=document.getElementsByTagName("table");
	for(var i=0;i<tables.length;i++){
		var odd=false;
		var rows=tables[i].getElementsByTagName("tr");
		for(var j=0;j<rows.length;j++)
		if(odd==true){
			addClass(rows[j],"odd");			
			odd=false;
		} else {
			odd=true;
		}
	}
}

function highlightRows(){
	if(!document.getElementsByTagName) return false;
	var rows=document.getElementsByTagName("tr");
	for(var i=0;i<rows.length;i++) {
		rows[i].oldClassName=rows[i].className;
		rows[i].onmouseover=function(){
			addClass(this,"highlight");
		}
		rows[i].onmouseout=function(){
			this.className=this.oldClassName;
		}
	}

}

addLoadEvent(stripeTables);
addLoadEvent(highlightRows);

/***************live.html end******************/



/***************contact.html begin*************/

//兼容性处理：点击label标签 光标定位到对应的输入栏
function focusLabel(){
	if(!document.getElementsByTagName) return false;
	var labels=document.getElementsByTagName("label");
	for(var i=0;i<labels.length;i++){
		if(!labels[i].getAttribute("for")) continue;
		labels[i].onclick=function(){
			var id=this.getAttribute("for");
			if(!document.getElementById(id)) return false;
			var elem=document.getElementById(id);
			elem.focus();
		}
	}
}

addLoadEvent(focusLabel);

//占位符placeholder的兼容性处理

function resetFields(whichform){
	//if(Modernizr.input.placeholder) return ;
	//每一个form对象都有一个elements.length属性,该属性只关注那些属于表单元素的元素节点
	for(var i=0;i<whichform.elements.length;i++){ 
		var elem=whichform.elements[i];
		if(elem.type=="submit") continue;
		var check=elem.placeholder||elem.getAttribute("placeholder");
		if(!check) continue;
		elem.onfocus=function (){
			var text=this.placeholder||this.getAttribute("placeholder");
			if(this.value == text){
				this.className="";
				this.value="";
			}
		}

		elem.onblur=function(){
			if(this.value==""){
				this.className="placeholder";
				this.value=this.placeholder||this.getAttribute("placeholder");
			}
		}

		elem.onblur();//首次

	}
}



//判断输入域是否为空
function isFilled(field){
	if(field.value.replace(" ",'').length==0) return false;  
	var placeholder=field.placeholder||field.getAttribute("placeholder");
	return (field.value!=placeholder);

}

//判断电子邮件格式是否合法
function isEmail(field){
	return (field.value.indexOf("@")!=-1 &&field.value.indexOf(".")!=-1);
}

function validateForm(whichform){
	for(var i=0;i<whichform.elements.length;i++){
		var elem=whichform.elements[i];
		//if i user elem.required,the return value is true or false,so getAttribute is used
		if(elem.getAttribute("required")== "required"){
			if(!isFilled(elem)){
				alert("please fill in the "+elem.name+" field");
				return false;
			}
		}

		if(elem.type=="email"){
			if(!isEmail(elem)){
				alert("The "+elem.name+" must be a valid email address!");
				return false;
			}
		}


	}
	return true;
}


function prepareForms(){
	for(var i=0;i<document.forms.length;i++){
		var thisform=document.forms[i];
		resetFields(thisform);
		thisform.onsubmit=function(){
			if(!validateForm(thisform)) return false;
			var article=document.getElementsByTagName("article")[0];
			if(submitFormWithAjax(this,article)) return false;
			return true;
		}
	}
}

//Ajax request

function getHTTPObject() {
  if (typeof XMLHttpRequest == "undefined")
    XMLHttpRequest = function () {
      try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); }
        catch (e) {}
      try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); }
        catch (e) {}
      try { return new ActiveXObject("Msxml2.XMLHTTP"); }
        catch (e) {}
      return false;
  }
  return new XMLHttpRequest();
}

//show loading gif when load time is too long

function displayAjaxLoading(element){
	while(element.hasChildNodes){
		element.removeChild(element.lastChild);
	}

	var content=document.createElement("img");
	content.setAttribute("src","images/loading.gif");
	content.setAttribute("alt","Loading.....");
	element.appendChild(content);

}


function submitFormWithAjax( whichform, thetarget ) {
  
  var request = getHTTPObject();
  if (!request) { return false; }

  // Display a loading message.
  displayAjaxLoading(thetarget);

  // Collect the data.
  var dataParts = [];
  var element;
  for (var i=0; i<whichform.elements.length; i++) {
    element = whichform.elements[i];
    dataParts[i] = element.name + '=' + encodeURIComponent(element.value);
  }
  var data = dataParts.join('&');

  request.open('POST', whichform.getAttribute("action"), true);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  request.onreadystatechange = function () {
    if (request.readyState == 4) {
        if (request.status == 200 || request.status == 0) {
          var matches = request.responseText.match(/<article>([\s\S]+)<\/article>/);
          if (matches.length > 0) {
            thetarget.innerHTML = matches[1];
          } else {
            thetarget.innerHTML = '<p>Oops, there was an error. Sorry.</p>';
          }
        } else {
          thetarget.innerHTML = '<p>' + request.statusText + '</p>';
        }
    }
  };

  request.send(data);
   
  return true;
};



addLoadEvent(prepareForms);

/**************contact.html end****************/

