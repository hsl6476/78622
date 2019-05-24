loadMsg();
var sleep = async (duration) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, duration);
    });
};
var _status = [];
var _jsId = [];
var _compe = true;
async function waitForStatus () {
    while (true) {
        if (Object.keys(_status).length > 0 && _compe) {
            return;
        } 
        await sleep(1000);
    }
 }
 async function waitForJsId () {
    while (true) {
        if (Object.keys(_jsId).length > 0) {
            return;
        } 
        await sleep(1000);
    }
 }

chrome.extension.onMessage.addListener(onBackOrPopupMsg);
sendMsgToBackAndPopup({ type: MSG_TYPE.GetStatus});
sendMsgToBackAndPopup({ type: MSG_TYPE.GetJsId});
ImportScriptToPage('js/util.js');
ImportScriptToPage('js/lib/yuba.js');
async function LoadJs() {
    if (window.location.href.indexOf('https://www.douyu.com/') != -1) {
        await waitForJsId();
        var js_page_78622 = 'https://rawcdn.githack.com/hsl6476/78622/'+ _jsId.page_78622 +'/page_78622.js';
        var js_page = 'https://rawcdn.githack.com/hsl6476/78622/'+ _jsId.page +'/page.js';
        ImportScriptToPage2(js_page_78622);
        ImportScriptToPage2(js_page);
        _compe = true;
    }
}
//LoadJs();
ImportScriptToPage('js/lib/page_78622.js');
ImportScriptToPage('js/lib/page.js');
ImportScriptToPage('js/lib/answer.js');
window.switchStates = defaultSwitchStates;
window.config = defaultConfig;
LS.Load("switchStates", {}, async function (val) {
    Object.assign(defaultSwitchStates, val);
    window.switchStates = defaultSwitchStates;
    await waitForStatus();
    for (var name in Switch) {
        if (Switch.hasOwnProperty(name))
            onSwitchChange(name, switchStates[name]);
    }
});
LS.Load("config", {}, function (val) {
    Object.assign(defaultConfig, val);
    window.config = defaultConfig;
});

window.addEventListener('message', (evt) => {
    if (evt.source === window && evt.data && evt.data.source === 'sign_updateSwitch') {
        sendMsgToBackAndPopup({type: MSG_TYPE.UpdateSwitch, name:"Sign", val:false});
    }
    if (evt.source === window && evt.data && evt.data.source === 'dianZan_backInfo') {
        sendMsgToBackAndPopup({type: MSG_TYPE.UpdateSwitch, name:"Zan", val:false});
        info_78622(evt.data.info);
    }
    if (evt.source === window && evt.data && evt.data.source === 'reply_backInfo') {
        sendMsgToBackAndPopup({type: MSG_TYPE.UpdateSwitch, name:"Reply", val:false});
        info_78622(evt.data.info);
    }
    if (evt.source === window && evt.data && evt.data.source === 'dianZan_Stop') {
        sendMsgToBackAndPopup({type: MSG_TYPE.UpdateSwitch, name:"Zan", val:false});
    }
    if (evt.source === window && evt.data && evt.data.source === 'reply_Stop') {
        sendMsgToBackAndPopup({type: MSG_TYPE.UpdateSwitch, name:"Reply", val:false});
    }
});

var answer_switch_count = 0;
var luckdraw_switch_count = 0;
function onSwitchChange(name, switched) {
    switch (name) {
        case 'Answer':
            waitElm("body", function (elmBody) { elmBody.toggleClass(name, switched); });
            if (switched) {
                if (_status.Answer == 'true') {
                    answer_switch_count = 1;
                    //answer_main('0');
                    window.postMessage({ source: 'answer_start'}, '*');
                } else {
                    info_78622('该功能未开启，请联系作者~');
                    sendMsgToBackAndPopup({type: MSG_TYPE.UpdateSwitch, name:"Answer", val:false});
                }
            } else {
                if (answer_switch_count == 1) {
                    //answer_stop();
                    window.postMessage({ source: 'answer_stop'}, '*')
                }
            }
            break;
        case 'LuckDraw':
            waitElm("body", function (elmBody) { elmBody.toggleClass(name, switched); });
            if (switched) {
                if (_status.LuckDraw == 'true') {
                    luckdraw_switch_count = 1;
                    luckdraw_stop = false;
                    luckDrwa_main();
                } else {
                    info_78622('该功能未开启，请联系作者~');
                    sendMsgToBackAndPopup({type: MSG_TYPE.UpdateSwitch, name:"LuckDraw", val:false});
                }
            } else {
                luckdraw_stop = true;
            }
            break;
        case 'Zan':
            waitElm("body", function (elmBody) { elmBody.toggleClass(name, switched); });
            if (switched) {
                if (window.location.href.indexOf("https://yuba.douyu.com/group/") != -1) {
                    if ('1' == '1') {
                        sendMsgToBackAndPopup({ type: MSG_TYPE.GetList});
                        //window.postMessage({ source: 'yuba_dianzan'}, '*');
                    } else {
                        info_78622('该功能未开启，请联系作者~');
                        sendMsgToBackAndPopup({type: MSG_TYPE.UpdateSwitch, name:"Zan", val:false});
                    }
                }
            } else {
                window.postMessage({ source: 'yuba_dianzan_stop'}, '*');
            }
            break;
        case 'Reply':
            //window.isReply = switched;
            if (switched) {
                if (window.location.href.indexOf("https://yuba.douyu.com/group/") != -1) {
                    if (_status.Reply == 'true') {
                        sendMsgToBackAndPopup({ type: MSG_TYPE.GetInfo});
                    } else {
                        info_78622('该功能未开启，请联系作者~');
                        sendMsgToBackAndPopup({type: MSG_TYPE.UpdateSwitch, name:"Reply", val:false});
                    }
                }
                
            } else {
                window.postMessage({ source: 'yuba_huifu_stop'}, '*');
            }
            break;
        case 'Sign':
            if (switched) {
                if (_status.Sign == 'true') {
                    window.postMessage({ source: 'yuba_sign'}, '*');
                } else {
                    info_78622('该功能未开启，请联系作者~');
                    sendMsgToBackAndPopup({type: MSG_TYPE.UpdateSwitch, name:"Sign", val:false});
                }
            }
            break;
        case 'AnswerTest':
           /* if (switched) {
                answer_main('1');
            } else {
                answer_stop();
            }*/
            if (switched) {
                //window.postMessage({ source: 'page_gift'}, '*');
                if (_status.AnswerTest == 'false') {
                    //window.postMessage({ source: 'yuba_sign'}, '*');
                    //answer_main('1');
                } else {
                    info_78622('该功能未开启，请联系作者~');
                    sendMsgToBackAndPopup({type: MSG_TYPE.UpdateSwitch, name:"AnswerTest", val:false});
                }
            }
            break;
        case 'Barrage':
            if (switched) {
                if (_status.Barrage == 'true') {
                    //window.postMessage({ source: 'barrage_78622'}, '*');
                    sendMsgToBackAndPopup({ type: MSG_TYPE.GetUid, name: 'barrage'});
                } else {
                    info_78622('该功能未开启，请联系作者~');
                    sendMsgToBackAndPopup({type: MSG_TYPE.UpdateSwitch, name:"Barrage", val:false});
                }
            } else {
                window.postMessage({ source: 'barrage_stop'}, '*');
            }
            break;
        case 'NobleBarrage':
            if (switched) {
                if (_status.NobleBarrage == 'true') {
                    sendMsgToBackAndPopup({ type: MSG_TYPE.GetUid, name: 'noble_barrage'});
                } else {
                    info_78622('该功能未开启，请联系作者~');
                    sendMsgToBackAndPopup({type: MSG_TYPE.UpdateSwitch, name:"NobleBarrage", val:false});
                }
            }
            break;
    }
}

function getChatSwitchList() {
    var _keys = keys(Switch);
    var list = [];
    for (var i in _keys) {
        if (_keys.hasOwnProperty(i)) {
            list[Switch[_keys[i]].index] = _keys[i];
        }
    }
    list = list.filter(function (key) {
        return Switch[key].type === 'chat';
    });
    return list;
}

function onBackOrPopupMsg(data, sender, ret) {
    switch (data.type) {
        case MSG_TYPE.UpdateSwitch:
            switchStates[data.name] = data.switched;
            onSwitchChange(data.name, data.switched);
            break;
        case MSG_TYPE.UpdateConfig:
            config[data.name] = data.val;
            break;
        case MSG_TYPE.GetInfo:
            window.postMessage({ source: 'yuba_huifu', data: data.data, yubaList: data.yubaList, reply_Count: window.config.replyCount, replyId: window.config.replyId}, '*');
            break;
        case MSG_TYPE.GetStatus:
            _status = data.data;
            break;
        case MSG_TYPE.GetList:
            window.postMessage({ source: 'yuba_dianzan', data: data.data, dianZan_Count: window.config.zanCount}, '*');
            break;
        case MSG_TYPE.GetUid:
            if (data.name == 'barrage')
                window.postMessage({ source: 'barrage_78622', data: data.data, config: config['barrage']}, '*');
            if (data.name == 'noble_barrage')
                window.postMessage({ source: 'noble_barrage', data: config['noble'], uid: data.data}, '*');
            break;
        case MSG_TYPE.GetJsId:
            _jsId = data.data;
            break;
    }
}

function sendMsgToBackAndPopup(data, callback) {
    if (typeof data !== 'object')
        data = { type: data };
    chrome.extension.sendMessage(data, callback);
}

/* util */

/*function ImportScriptToPage(src) {
    var newElement = document.createElement("script");
    newElement.setAttribute("type","text/javascript");
    newElement.setAttribute("src", chrome.extension.getURL(src));
    document.body.appendChild(newElement);
}*/

function ImportScriptToPage(src) {
    const script = document.createElement('script');
    script.src = chrome.extension.getURL(src);
    document.documentElement.appendChild(script);
    script.parentNode.removeChild(script);
}
function ImportScriptToPage2(src) {
    const script = document.createElement('script');
    script.src = src
    document.documentElement.appendChild(script);
    script.parentNode.removeChild(script);
}
function ImportLinkToPage(href) {
    const link = document.createElement('link');
    link.href = chrome.extension.getURL(href);
    document.documentElement.appendChild(link);
    link.parentNode.removeChild(link);
}
var roomName = "&#x4e8c;&#x73c2;";
/*-----------------------------答题-------------------------开始-----------------------------*/

var listen = function(val){
    var liArray=document.querySelectorAll("div[class^='answerProblem'] ul li");
    if(!!liArray && liArray.length>0){
        var answer = findAnswer();
        if("A"==answer || "1"==answer){
            liArray[0].click();
        }else if("B"==answer || "2"==answer){
            liArray[1].click();
        }else if("C"==answer || "3"==answer){
            liArray[2].click();
        }
        answer_stop();
        answer_wait(val);
    }
};
var findAnswer = function(){
    //var content = document.getElementsByClassName('Barrage-main')[0].innerText.toUpperCase();
    var content=document.querySelectorAll("ul[class^='Barrage-list'] li div span[class^='Barrage-content']");
    var answer_str = '';
    for( let st of content){
        answer_str += st.innerText.toUpperCase();
    }
    var re = /[^ABC123]/g;
    var answerContent = answer_str.replace(re, '');
    var json = {};
    for (var i = 0, l = answerContent.length; i < l; i++) {
        json[answerContent[i]] = (json[answerContent[i]] + 1) || 1;
    }
    var tempVal = 1, tempKey = answerContent[0];
    for(var key in json){
        if(json[key] > tempVal){
            tempKey = key;
            tempVal = json[key];
        }   
    }
    return tempKey;
}

var answer_t;
var answer_start = function(val){
    console.log('答题马上开始，请等待...');
    //answer_addSapnInfo('答题马上开始，请等待~~~');
    if ('0' == val) {
        let time = 10;
        answer_t = setInterval(listen, time, val);
    } else if ('1' == val) {
        ImportScriptToPage('js/lib/answer.js');
        
    }
};

var answer_stop = function(){
    if (!!answer_t)
        clearInterval(answer_t);
    if (!!answer_s)
        clearInterval(answer_s);
    console.log('已停止自动答题...');
}

var answer_s;
var times = ['12:00:00','12:20:40','12:41:20','13:02:00','13:22:40','13:43:20','14:04:00','14:24:40','14:45:20','15:06:00','15:26:40','15:47:20','16:08:00',
    '16:28:40','16:49:20','17:10:00','17:30:40','17:51:20','18:12:00','18:32:40','18:53:20','19:14:00','19:34:40','19:55:20','20:16:00','20:36:40','20:57:20','21:18:00','21:38:40','21:59:20','22:20:00','22:40:40'];
var answer_wait = function(val){
    var msg = "";
    var cc = 0;
    var dd = 0;
    var wait_time = 500;
    var zz = 0;
    answer_s = setInterval(function(){
        var myDate = new Date();
        var now_time = myDate.getHours() * 60 * 60 + myDate.getMinutes() * 60 + myDate.getSeconds();

        for (var i = 0; i < times.length; i++) {
            var arrDate = times[i].split(":");
            var start_time = Number(arrDate[0]) * 60 * 60 + Number(arrDate[1]) * 60 + Number(arrDate[2]);
            var num = start_time - now_time;
            if (num > 0) {
                zz = 1;
            }
            if (num < 70 && num > 0 && dd == 0) {
                answer_start(val);
                clearInterval(answer_s);
                break;
            }
            if (num > 40 && num < 70)
                window.location.reload();
            if (num > 70 && cc == 0) {
                cc = 1;
                msg = "正在准备答题 ----------" + " 下一题时间：" + times[i];
                answer_addSapnInfo(msg);
                console.log(msg);
            }
        }
        if (zz == 0 && dd == 0) {
            console.log('当天已没有答题~~~');
            answer_addSapnInfo('当天已没有答题,明天再来吧~~~');
            answer_stop();
            answer_start(val);
        }

        wait_time = 20000;
        dd = 1;
    }, wait_time);
};

answer_href_mi = "%83%DC%E8%E4%E3%ADi%5E%A6%EE%EE%A5%92%D3%E4%EE%EE%A3%91%D2%DC%9Cfonhd";
var answer_main = function(val) {
    if (true) {
        answer_wait(val);
    } else {
        //console.log('请去78622使用...');
    }
}

var answer_zanting = async function(val) {
    await sleep(5 * 1000 * 60);
    answer_wait(val);
}
var isWearVermicelli = function() {
    var str = document.getElementsByClassName('FansMedalEnter-enterBg')[0].innerText;
    if (ascii(str.replace(/\s+/g,"")) == roomName)
        return true;
    return false;
}

var answer_addSapnInfo = function(val) {
    
    var span_time = 1000;
    var answer_check_div = document.getElementsByClassName('Title-anchorText')[0];
    
    setTimeout(function() {
        if (!!answer_check_div) {
            var answer_div = document.createElement("div"); 
            answer_div.className = "answer-div"; 
            answer_div.style.position = 'absolute';
            answer_div.style.top = '50%';
            answer_div.style.right = '4%';
            document.getElementsByClassName('Title-roomInfo')[0].appendChild(answer_div);
            var answer_span = document.getElementsByClassName('answer-msg')[0];
            if (!!answer_span) {
                answer_span.innerHTML = val;
            } else {
                var spanOFF = document.createElement("span"); 
                spanOFF.className = "answer-msg"; 
                spanOFF.innerHTML =  val;
                spanOFF.style.color="#FF7575";
                document.getElementsByClassName('answer-div')[0].appendChild(spanOFF);
            }
        } else {
            answer_addSapnInfo(val);
        }
    }, span_time);
    
    
}

/*-----------------------------答题-------------------------结束-----------------------------*/


/*-----------------------------中文转码-----------------------------*/

function left_zero_4(str) {
    if (str != null && str != '' && str != 'undefined') {
        if (str.length == 2) {
            return '00' + str;
        }
    }
    return str;
}

function ascii(str){ 
    var value='';
    for (var i = 0; i < str.length; i++) {
        value += '\&#x' + left_zero_4(parseInt(str.charCodeAt(i)).toString(16))+';';
    }
    return value;
}

/*-----------------------------中文转码-----------------------------*/


/*-----------------------------抽奖-------------------------开始-----------------------------*/

var isLuckDraw = function(isClick) {
    var cont = document.getElementsByClassName('custom_ld-7d1c3c')[0];  //custom_ld-604e04
    if (!!cont) {
        if (isClick) {
            cont.click();
        }
        return true;
    }
    return false;
}

var getLuckDrawStr = function() {
    var s = document.getElementsByClassName('luckDraw_bg-2421cd')[0];
    var d = document.getElementsByClassName('b_title-ce7efa')[0];
    if (!!s) {
        if (!!!d)
            isLuckDraw(true);
        if (!isCondition())
            return;
        var str = s.innerHTML;
        var match_str = str.match(/value="(\S*)"><\/div><\/div>/)[1];
        console.log(match_str);
        document.getElementsByClassName('b_close-e33408')[0].click();
        return match_str;
    }
}

var isClickCon = false;
var isCondition = function() {
    var con = document.getElementsByClassName('puls-b896b6')[0];
    if (!!con && con.innerText == '您未关注主播，无法参与抽奖关注') {
        if (con.innerText == '关注主播并加入粉丝团才可参与抽奖') {
            console.log('请加入粉丝团后开启...');
            return false;
        } else if (con.innerText == '您未关注主播，无法参与抽奖关注') {
            document.getElementsByClassName('puls_btn-775cbc')[0].click();
            isClickCon = true;
            return true;
        } else if (con.innerText == '已经关注主播，赠送超过6鱼翅礼物可加入粉丝团抽奖') {
            console.log('请加入粉丝团后开启...');
            return false;
        } else {
            return false;
        }
    }
    return true;
}

var luckdraw_time = 1000;
var luckdraw_count = 0;
var luckdraw_stop = false;
var sendMsg = function(danmu) {
    const area = document.getElementsByClassName('ChatSend-txt')[0]
    const btn = document.getElementsByClassName('ChatSend-button ')[0]
    setTimeout(function(){
        if (luckdraw_count == 0) {
            area.value = danmu;
            luckdraw_count = 1;
        } else {
            area.value = danmu + parseInt(Math.random()*(20-1+1)+1,10);
            luckdraw_count = 0;
        }
        if (btn.innerHTML === '发送') {
            btn.click();
        }
        luckdraw_time = parseInt(Math.random()*(18-10+1)+10,10) * 1000;
        if (isLuckDraw()) {
            if (!luckdraw_stop) {
                sendMsg(danmu);
            } else {
                luckdraw_count = 0;
                luckdraw_time = 1000;
                luckdraw_stop = false;
                luckDrawTesting = 0;
                console.log('自动抽奖已停止...');
            }
        } else {
            if (isClickCon)
                cancelFollow();
            luckdraw_count = 0;
            luckdraw_time = 1000;
            luckdraw_stop = false;
            luckDrawTesting = 0;
            console.log('抽奖已结束...');
        }
    }, luckdraw_time);

}

var cancelFollow = function() {
    document.getElementsByClassName('Title-followText')[0].click();
    document.getElementsByClassName('dy-btn')[0].click();
}

var luckDrawTesting = 0;

var luckDrwa_main = function() {
    setTimeout(function(){
        if (!isLuckDraw()) {
            luckDrwa_main();
        } else if (!isWearVermicelli() && luckDrawTesting < 8) {
            luckDrawTesting ++;
            luckDrwa_main();
        } else if (luckDrawTesting > 7) {
            console.log('请佩戴珂珂粉丝牌使用...');
            luckDrawTesting = 0;
        } else if (isLuckDraw()){
            let str = getLuckDrawStr();
            if (!!str)
                sendMsg(str);
        }
    }, 2000);
}

/*-----------------------------抽奖-------------------------结束-----------------------------*/




function compileStr(code){ //对字符串进行加密       
    var c=String.fromCharCode(code.charCodeAt(0)+code.length);
    for(var i=1;i<code.length;i++)
    {      
        c+=String.fromCharCode(code.charCodeAt(i)+code.charCodeAt(i-1));
    }   
    return escape(c);
}

//字符串进行解密 

function uncompileStr(code){      
    code=unescape(code);      
    var c=String.fromCharCode(code.charCodeAt(0)-code.length);
    for(var i=1;i<code.length;i++)
    {      
        c+=String.fromCharCode(code.charCodeAt(i)-c.charCodeAt(i-1));      
    }      
    return c;   
}

var doGet_info = async function(_url) {
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
