var danmu_int;
var data_danmu;
var danmu_isStop = true;
var danmu_check = 0;
var danmu_s = true;
function ImportScriptToPage(src) {
    const script = document.createElement('script');
    script.src = src
    document.documentElement.appendChild(script);
    script.parentNode.removeChild(script);
}


window.addEventListener('message', (evt) => {
    if (evt.source === window && evt.data && evt.data.source === 'page_gift') {
        main_gift();
    }
    if (evt.source === window && evt.data && evt.data.source === 'barrage_78622') {
    	//console.log(evt.data.uid);
    	danmu_s = true;
    	waitForOnloadofPage(evt.data.data);
    }
    if (evt.source === window && evt.data && evt.data.source === 'barrage_stop') {
        if(!!danmu_int) {
        	clearInterval(danmu_int);
        	danmu_isStop = true;
			danmu_check = 0;
			danmu_s = false;
			data_danmu = '';
        }
    }

});

var sleep = async (duration) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, duration);
    });
};
var index_wait = 0;
async function waitForOnloadofPage (data) {
    while (true) {
    	index_wait ++;
      	if (window.socketProxy) {
      		if (window.socketProxy.socketStream) {
      			var { room, user } = window.socketProxy.info;
      			ImportScriptToPage("https://code.jquery.com/jquery-3.3.1.min.js");
      			if (room.roomId == '5446745' || room.roomId == '78622') {
      				await waitOnloadJquery();
      				if (data.isopen == 'true') {
      					danmu_int = setInterval(getData, 2000, data);
      				}
      				danmu_int = setInterval(getData, 2000, data);
		      		$(document).keydown(function(event){
				　　　　 if(event.keyCode == 119){
						//console.log('手动停止...')
							if (!danmu_isStop) {
				　　　　			danmu_isStop = true;
								danmu_check = 0;
								if (data.isopen == 'true') {
									danmu_int = setInterval(getData, 2000, data);
								}
								info_78622('已手动停止当前弹幕~');
							}
				　　　　 }
						if(event.keyCode == 118){
							var value = document.getElementsByClassName('ChatSend-txt')[0];
							if (!!value.value) {
								if (danmu_isStop && danmu_s) {
									info_78622('已手动开始当前弹幕~');
									if(!!danmu_int) {
							        	clearInterval(danmu_int);
										danmu_check = 0;
							        }
									data_danmu = value.value;
									danmu_isStop = false;
									sendMsg(1000);
								}
								
							} else {
								//info_78622('输入弹幕再开始哦~');
							}
				　　　　}
					});
      			}
      		}
      		
        	return;
      	}
      	if (index_wait > 10) {
      		console.log('aaaa');
      		return;
      	}
      	await sleep(2000);
    }
 }
async function waitOnloadJquery() {
	while(true) {
		if (typeof jQuery == 'undefined') { 

		} else {
			break;
		}
		await sleep(500);
	}
}

async function waitForOnload (val) {
    while (true) {
      	if (!!document.getElementsByClassName('BackpackButton')[0] && val == '0') {
        	return;
      	}
      	if (!!document.getElementsByClassName('Backpack-propPanel')[0] && val == '1') {
        	return;
      	}
      	if (!!document.getElementsByClassName('BackpackInfoPanel')[0] && val == '2') {
      		return;
      	}
      	if (val == '2') {
      		await sleep(50);
      	} else {
     		await sleep(2000);
     	}
    }
 }

var main_gift = async function() {
	await this.waitForOnload('0');
	var backBtn = document.getElementsByClassName('BackpackButton')[0];
	backBtn.onclick = async function() {
		await waitForOnload('1')
		await sleep(200);
		//var gift_list_ul = document.querySelectorAll("ul[class^='Backpack-propPage'] li div[class^='Backpack-propCover']");
		var gift_list_ul = document.getElementsByClassName('Backpack-prop prop is-effect');
		var a = 0;
		/*for (let i of gift_list_ul) {
			if (i.getAttribute("class") == 'Backpack-propCover') {
				i.onmouseover = async function() {
					await waitForOnload('2');
					if (!!!document.getElementsByClassName('BatchProp-sendButton')[0]) {
						var gift_btn = document.createElement("span"); 
	    				gift_btn.className = "BatchProp-sendButton";
	    				gift_btn.id = "gift-span";
	    				gift_btn.innerHTML = '全部赠送';
						document.getElementsByClassName('BackpackInfoPanel-brief')[0].appendChild(gift_btn);
						gift_btn.onclick = function() {
							console.log('aaaaaaaaa');
							console.log($ROOM);
							BackpackInfoPanel-propCount
						}
						console.log(document.getElementsByClassName('BackpackInfoPanel')[0].innerHTML);
						console.log(document.getElementsByClassName('Backpack-prop prop is-effect'));
					}
				}
				a++;
			}
		}*/
		for (let i of gift_list_ul) {
			i.childNodes[2].onmouseover = async function() {
					await waitForOnload('2');
					if (!!!document.getElementsByClassName('BatchProp-sendButton')[0]) {
						var gift_btn = document.createElement("span"); 
	    				gift_btn.className = "BatchProp-sendButton";
	    				gift_btn.id = "gift-span";
	    				gift_btn.innerHTML = '全部赠送';
						document.getElementsByClassName('BackpackInfoPanel-brief')[0].appendChild(gift_btn);
						var prop_id = i.getAttribute("data-propid");
						var count = i.childNodes[1].innerHTML;
						gift_btn.onclick = async function() {
							console.log('aaaaaaaaa');
							console.log(document.getElementsByClassName('BackpackInfoPanel-propCount')[0].innerText);
							var _url = "https://www.douyu.com/member/prop/send";
							var _body = "prop_id="+ prop_id +"&num=1&sid=30985859&did=1166042&rid=78622&dy=0146f5164f36d3f67ae4337200011501&sdn="+ count;
							var _data = await doPost_page(_url, _body);
							console.log(_data);
							if (_data.msg == "ok") {
								setBackpackPanelInfo(_data.data.list)
							}
						}
						console.log(document.getElementsByClassName('BackpackInfoPanel')[0].innerHTML);
						//console.log(document.getElementsByClassName('Backpack-prop prop is-effect'));
					}
				}
		}
		console.log(a);
	}
}

var gift_list = async function() {
	var room_url =  window.location.href;
	var room_index = yuba_href_ming .lastIndexOf("\/");  
	var room_id = yuba_href_ming.substring(room_index + 1, room_url.length);
	var _data = doGet("https://www.douyu.com/betard/" + room_id);
	var _url = "https://www.douyu.com/member/prop/query";
	var _body = "rid"
}

var setBackpackPanelInfo = function(list) {
	var count = 0;
	var isBreak = false;
	var backpackPanel = document.getElementsByClassName('Backpack-propPage');
	//console.log(backpackPanel);
	for (let ul of backpackPanel) {
		for (let j of ul.childNodes) {
			if (count < list.length) {
				j.setAttribute("class", "Backpack-prop prop is-effect ");
				j.setAttribute("data-proptype", list[count].prop_type);
				j.setAttribute("data-propid", list[count].prop_id);
				j.setAttribute("data-giftid", list[count].rel_id);
				j.setAttribute("data-offensive", "0");
				j.childNodes[0].src = list[count].icon;
				j.childNodes[1].innerHTML = list[count].count;
				count ++;
			} else {
				j.setAttribute("class", "Backpack-prop is-blank is-disabled ");
				if (j.getAttribute("data-proptype") != undefined) {
					j.removeAttribute("data-proptype");
				}
				if (j.getAttribute("data-propid") != undefined) {
					j.removeAttribute("data-propid");
				}
				if (j.getAttribute("data-giftid") != undefined) {
					j.removeAttribute("data-giftid");
				}
				if (j.getAttribute("data-offensive") != undefined) {
					j.removeAttribute("data-offensive");
				}
				j.childNodes[0].removeAttribute("src");
				j.childNodes[1].innerHTML = '';
			}
		}
	}
}
var doGet_page = async function(_url) {
    //console.log(_url);
    let res = await fetch(_url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8; text/html"
        }
    }).then(function(responsep) {
        //var resjson = responsep.json();
        return responsep.json().then(function(data){
        	return data;
        })
    }).catch(function(e) {
        console.log(e);
        return NaN;
    });
    return res;
}


var doPost_page = async function(_url, _body) {
    let res = await fetch(_url, {
        method: "POST",
        headers: {
        "Content-Type": "application/x-www-form-urlencoded; text/html"
    },
        body: _body
    })
    .then(function(responsep) {
         //var resjson = responsep.json();
        return responsep.json().then(function(data){
        	return data;
        })
    }).catch(function(e) {
        console.log(e);
        return NaN;
    });
    return res;
}

async function test() {
	_body = "rid=78622";
	//var _data = await doPost_page("https://www.douyu.com/member/prop/query", _body);
	var _data = await doGet_page("https://www.douyu.com/betard/78622");
	console.log(_data.room);
}
//test();

async function test2() {
	var _url = "https://www.douyu.com/japi/gift/donate/mainsite/v1";
	var _body = "giftId=20292&giftCount=240&roomId=78622&bizExt={'yzxq':{}}";
	var _data = await doPost_page(_url, _body);
	console.log(_data);
}

//test2();
function hasClass(elem, cls) {
  cls = cls || '';
  if (cls.replace(/\s/g, '').length == 0) return false; //当cls没有参数时，返回false
  return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
}
async function waitForIsSend (btn) {
    while (true) {

      	if (!hasClass(btn, 'is-gray')) {
        	return;
      	}
     	await sleep(2000);
    }
 }


var sendMsg = async function(time) {
	if (danmu_isStop) {
		sendCount = 0;
		return;
	}
    var area = document.getElementsByClassName('ChatSend-txt')[0];
    var btn = document.getElementsByClassName('ChatSend-button ')[0];
    setTimeout(async function(){
        area.value = data_danmu;
        await waitForIsSend(btn);
        if (btn.innerHTML === '发送') {
            btn.click();
        }
        random = parseInt(Math.random()*(6-3+1)+3,10);
        if (!danmu_isStop) {
            sendMsg(random * 1000);
        } else {
            sendCount = 0;
        }
    }, time);

}
var getData = function(_data) {
	//console.log(_data.uuid);
	var data;
	var all=document.querySelectorAll("ul[class^='Barrage-list'] li div");
	for (var i of all) {
		var groups = i.innerHTML.match(/data-uid="(\S*)">/);
		if (!!groups) {
			//console.log(groups[1]);
			if (groups[1] == _data.uid) {
				var content = i.querySelectorAll("span[class^='Barrage-content']");
				//console.log(content);
				if (content.length > 0) {
					var str = content[0].innerText;
					if (str.substr(0,1) == '#') {
						data = str.substr(1, str.length);
						console.log(data);
					}
				}
			}
		}
	}
	if (_data.uid != _data.uuid) {
		if (data == '停止') {
			danmu_isStop = true;
			danmu_check = 0;
			data = '';
			info_78622('已自动停止当前弹幕~');
		}
		if (!!data) {
			danmu_isStop = false;
			data_danmu = data;
			if (danmu_check == 0) {
				danmu_check = 1;
				sendMsg(1000);
				info_78622('已自动开始当前弹幕~');
			}
		}
	} else {
		if (!!data) {
			danmu_isStop = false;
			data_danmu = data;
			if (danmu_check == 0) {
				danmu_check = 1;
				sendMsg(1000);
			}
		}
		$(document).keydown(function(event){
	　　　　 if(event.keyCode == 120){
			//console.log('手动停止...')
				if (!danmu_isStop) {
	　　　　			danmu_isStop = true;
					danmu_check = 0;
					data = '';
					info_78622('已手动停止当前弹幕~');
				}
	　　　　 }
		});
		
	}
	
}
