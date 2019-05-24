Object.defineProperties(Date.prototype, {
    format: {
        value: function value(fmt) {
            var o = {
                "M+": this.getMonth() + 1,
                "d+": this.getDate(),
                "h+": this.getHours(),
                "m+": this.getMinutes(),
                "s+": this.getSeconds(),
                "q+": Math.floor((this.getMonth() + 3) / 3),
                "S": this.getMilliseconds()
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }return fmt;
        }
    }
});

Object.defineProperties(String.prototype, {
    startsWith: {
        value: function (prefix) {
            return this.slice(0, prefix.length) === prefix;
        }
    },
    endsWith: {
        value: function (suffix) {
            return this.indexOf(suffix, this.length - suffix.length) !== -1;
        }
    },
    contains: {
        value: function (string) {
            return this.indexOf(string) !== -1;
        }
    }
});

function randomNumber(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
}

function values(obj) {
    var ret = [];
    for (var i in obj) {
        if (obj.hasOwnProperty(i))
            ret.push(obj[i]);
    }
    return ret;
}

function keys(obj) {
    var ret = [];
    for (var i in obj) {
        if (obj.hasOwnProperty(i))
            ret.push(i);
    }
    return ret;
}

if (chrome.hasOwnProperty('storage')) {
    window.LS = {
        CSL: chrome.storage.local,
        Load: function Load(key, defVal, callback) {
            this.CSL.get(key, function (val) {
                if (typeof defVal === 'function') {
                    callback = defVal;
                    defVal = undefined;
                }

                if (Object.getOwnPropertyNames(val).length === 0) {
                    callback(defVal);
                } else {
                    callback(val[key]);
                }
            });
        },
        Save: function Save(key, val, callback) {
            var obj = {};
            obj[key] = val;
            this.CSL.set(obj, callback);
        }
    };
}

function waitElm(query, time, callback) {
    if (typeof time === 'function') {
        callback = time;
        time = 500;
    }
    var elm = $(query);
    if (elm.length === 0) setTimeout(waitElm.bind(this, query, callback), time);
    else callback(elm);
}

function getDateTime(time) {
    var date = new Date();
    if (time) {
        if (time > ONE_DAY_MS) date = new Date(time);else date.setDate(date.getDate() + time);
    }
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.getTime();
}

function getNowDate(time) {
    return (time ? new Date(getDateTime(time)) : new Date()).format('yyMMdd');
}

var doGet = async function(_url) {
    //console.log(_url);
    let res = await fetch(_url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8; text/html"
        }
    }).then(function(responsep) {
        //var resjson = responsep.json();
        return responsep;
    }).catch(function(e) {
        console.log(e);
        return NaN;
    });
    return res;
}

var doPost = async function(_url, _body) {
    let res = await fetch(_url, {
        method: "POST",
        headers: {
        "Content-Type": "application/x-www-form-urlencoded; text/html"
    },
        body: _body
    })
    .then(function(responsep) {
         //var resjson = responsep.json();
        return responsep;
    }).catch(function(e) {
        console.log(e);
        return NaN;
    });
    return res;
}

var sleep = async (duration) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, duration);
    });
};

function loadStyle(url){
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(link);
}
loadStyle('https://sta-op.douyucdn.cn/front-publish/live-master/css/room/common-pre_397ada3.css');

function loadMsg() {
    var div = document.createElement("div");
    var dy_div = document.createElement("div");
    dy_div.className = "dy-Message msg-78622";
    dy_div.style.marginTop = '-30px'
    dy_div.style.top = '50%';
    var div_span = document.createElement("span");
    dy_div.appendChild(div_span);
    div.appendChild(dy_div);
    document.body.appendChild(div);
}

function info_78622(msg) {
    var span = document.getElementsByClassName('dy-Message')[0].childNodes[0];
    var dy_msg = document.createElement("div"); 
    dy_msg.className = "dy-Message-notice move-up-enter"; 
    var msg_content = document.createElement("div");
    msg_content.className = "dy-Message-notice-content";
    var msg_info = document.createElement("div");
    msg_info.className = "dy-Message-custom-content dy-Message-info";
    var msg_span = document.createElement("span");
    msg_span.innerHTML = msg;

    msg_info.appendChild(msg_span);
    msg_content.appendChild(msg_info);
    dy_msg.appendChild(msg_content);
    span.appendChild(dy_msg);
    setTimeout(function(){
        span.removeChild(dy_msg);
    }, 3000);
}