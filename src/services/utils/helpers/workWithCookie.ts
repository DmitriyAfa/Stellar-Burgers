export function setCookie(name : string, value : any, expMinutes? : number) {
  let expires = '';

  if(expMinutes) {
    let date = new Date();
    
    date.setTime(date.getTime() + (expMinutes * 60 * 1000));
    expires = "expires=" + date.toUTCString();
  }
  
  document.cookie = name + "=" + value + "; " + expires + "; path=/";
}

export function deleteCookie(name : string) {
  setCookie(name, '', -1);
}

export function getCookie(name : string) {
  let matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)',
    ),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
