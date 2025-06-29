/**
 * 网易云音乐 Cookie 获取脚本
 */
const cookie = $request.headers.Cookie;  // 获取请求头中的 Cookie 字段
if (cookie) {
  $notify("🎧 网易云音乐 Cookie 已获取", "", cookie);
  // 将 Cookie 存储在 persistent store 中，后续脚本可用
  $persistentStore.write(cookie, "music_163_cookie");
}
$done({});