// 名称：网易云音乐Cookie获取
// 描述：自动获取网易云音乐登录Cookie
// 作者：基于用户需求开发
// 日期：2025-06-29
// 版本：1.0

const NETEASE_COOKIE_KEY = "netease_music_cookie";
const TARGET_DOMAIN = "music.163.com";

const $ = new Env("网易云Cookie获取");

if (typeof $request !== "undefined") {
    const requestUrl = $request.url;
    const requestHeaders = $request.headers;

    if (requestUrl.includes(TARGET_DOMAIN)) {
        // 从请求头中提取Cookie
        const cookie = requestHeaders["Cookie"] || requestHeaders["cookie"];
        
        if (cookie) {
            // 检查是否已保存过相同Cookie
            const oldCookie = $.getdata(NETEASE_COOKIE_KEY);
            if (oldCookie !== cookie) {
                $.setdata(cookie, NETEASE_COOKIE_KEY);
                
                // 发送通知
                $.msg("网易云音乐", "🍪 Cookie获取成功", "已保存最新Cookie");
                $.log("✅ 网易云Cookie获取成功：" + cookie);
            } else {
                $.log("ℹ️ Cookie未变化，无需更新");
            }
        } else {
            $.log("⚠️ 未在请求头中找到Cookie字段");
        }
    }
}

$done({});

// 环境工具函数
function Env(t, e) {
    return new (class {
        constructor(t, e) {
            this.name = t;
            this.data = null;
            this.dataFile = "box.dat";
            this.logs = [];
            this.isMute = !1;
            this.logSeparator = "\n";
            Object.assign(this, e);
            this.log("", `🔔 ${this.name}, 开始运行!`);
        }

        getdata(t) {
            return $persistentStore.read(t);
        }

        setdata(t, e) {
            return $persistentStore.write(t, e);
        }

        msg(t = this.name, e = "", i = "", o = {}) {
            $notification.post(t, e, i);
        }

        log(...t) {
            t.length > 0 && (this.logs = [...this.logs, ...t]);
            console.log(t.join(this.logSeparator));
        }

        done() {
            const t = ((new Date).getTime() / 1e3);
            this.log("", `🔔 ${this.name}, 结束! 🕛 运行时长: ${t} 秒`);
        }
    })(t, e);
}
