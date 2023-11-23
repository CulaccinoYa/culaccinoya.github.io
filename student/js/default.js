jconfirm.defaults={
	title:'',
	theme:'material',
	defaultButtons:{
		ok:{text:"好的"},
		close:{text:"关闭"},
		cancel:{text:"取消"}
	}
}
var Host="https://sf-api.suxber.live:2053/"
function getvalue(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
	    var pair = vars[i].split("=");
	    if (pair[0] == variable) {
	        return pair[1]
	    }
	}
	return (false)
}
function timetostring(times){
	if(!times||times==null||times=='') return "";
	if(typeof(times)!=="int") times=parseInt(times);
	var time = new Date(times);
	var y = time.getFullYear();
	var m = time.getMonth()+1;
	if(m<10) m='0'+m;
	var d = time.getDate();
	if(d<10) d='0'+d;
	return y+'-'+m+'-'+d;
}

function addWaterMarker() {
	if(location.href.slice(-10))
	if(!document.getElementById("watermark")){
		var can = document.createElement('canvas');
		can.setAttribute("id", "watermark");
	}else{
		var can = document.getElementById("watermark")
	}
    let body = document.body;
    body.appendChild(can);
    can.width = 240;
    can.height = 150;
    can.style.display = 'none';
    let cans = can.getContext('2d');
    cans.rotate(-20 * Math.PI / 180);
	cans.font = "14px Arial";
    cans.fillStyle = "rgba(0, 0, 0, 0.125)";
    cans.textAlign = 'center';
    cans.textBaseline = 'Middle';
    cans.fillText($.cookie('student_id')+' - 操行分查询系统', can.width / 3, can.height / 2);
	let t=new Date(Date.now())
	var y = t.getFullYear();
	var m = t.getMonth()+1;
	if(m<10) m='0'+m;
	var d = t.getDate();
	if(d<10) d='0'+d;
	var h = t.getHours();
	if(h<10) h='0'+h;
	var mm = t.getMinutes();
	if(mm<10) mm='0'+mm;
	var s = t.getSeconds();
	if(s<10) s='0'+s;
	let time=y+'/'+m+'/'+d+' '+h+":"+mm+":"+s
    cans.fillText(time, can.width / 2.7, can.height / 1.6);
	if(!document.getElementById("watermark_div")){
		var dom = document.createElement('div');
		dom.setAttribute("id", "watermark_div");
		dom.style.cssText  = "pointer-events: none !important;";
		dom.style.position = 'fixed';
		dom.style.top = 0;
		dom.style.left = 0;
		dom.style.width = '100%';
		dom.style.height = '100%';
		dom.style.zIndex = 9999;
		document.body.appendChild(dom);
		dom.style.display = 'block';
	}else{
		var dom = document.getElementById("watermark_div")
	}
    dom.style.backgroundImage = "url(" + can.toDataURL("image/png") + ")";
}

if(location.href.slice(-10)!=='index.html')addWaterMarker(),setInterval("addWaterMarker()",1000);
