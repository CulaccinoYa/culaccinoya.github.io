jconfirm.defaults={
	title:'',
	theme:'material',
	type:"orange",
	defaultButtons:{
		ok:{text:"好的"},
		close:{text:"关闭"},
		cancel:{text:"取消"}
	}
}
var sftools={
	api:function(data,suc=function(){},fail=function(){}){
		if(!data.loading){
			data.loading='操作正在处理'
		}
		if(!data.timeout){
			data.timeout=10000
		}
		if(!data.hideload){
			var loading=$.alert({content:'<div class="p-2 d-flex align-items-center justify-content-between"> <strong>'+data.loading+'</strong> <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div></div>',buttons:[],closeIcon:false});
		}
		let token=$.cookie('sf_token');
		$.ajax({
			type:"POST",
			url:"https://sf-api.suxber.live://sf-api.suxber.live/"+data.url,
			data:JSON.stringify({"data":data.data,"account":token}),
			timeout:data.timeout,
			contentType:"application/json;charset=UTF-8",
			success:function (e) {
				if(!data.hideload){
					loading.close();
				}
				if(e.code==200){
					suc(e.data);
				}else if(e.code==1000){
					$.alert({type:'red',icon:"mdi mdi-alert-circle",title:'错误',content:'账户信息发生变动，您被迫下线',buttons:[],closeIcon:false});
				}else if(e.code==300){
					if(!data.hidefail){
						$.alert({title:'请继续完成操作',content:'<iframe style="height:70vh;width:100%" scrolling="0" frameborder="0" src="'+e.data+'"></iframe>',boxWidth:'100%'})
					}
					fail({network:true,msg:'请在弹出的新窗口继续完成操作'})
				}else{
					if(!data.hidefail){
						$.alert({type:'red',icon:"mdi mdi-alert-circle",title:'错误',content:e.msg});
					}
					fail({network:true,msg:e.msg})
				}
			},
			error:function () {
			    if(!data.hideload){
			    	loading.close();
			    }
				if(!data.hidefail){
					$.alert({type:'red',icon:"mdi mdi-alert-circle",title:'错误',content:'请检查网络连接'});
				}
				fail({network:false})
			}
		});
	}
}
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
	var time = new Date(times*1000);
	var y = time.getFullYear();
	var m = time.getMonth()+1;
	if(m<10) m='0'+m;
	var d = time.getDate();
	if(d<10) d='0'+d;
	var h = time.getHours();
	if(h<10) h='0'+h;
	var mm = time.getMinutes();
	if(mm<10) mm='0'+mm;
	var s = time.getSeconds();
	if(s<10) s='0'+s;
	return y+'-'+m+'-'+d+' '+h+":"+mm+":"+s;
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
    cans.fillText($.cookie('sf_id')+' - SF工具箱管理系统', can.width / 3, can.height / 2);
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

if(location.href.slice(-10)!=='login.html')addWaterMarker(),setInterval("addWaterMarker()",1000);