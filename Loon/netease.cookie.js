// neatease.cookie.js
if (typeof $request !== 'undefined') {
  const cookie = $request.headers.Cookie;
  if (cookie) {
    $notify('网易云 Cookie 获取成功', '', cookie);
    $persistentStore.write(cookie, 'music_163_cookie');
  }
}
$done({});