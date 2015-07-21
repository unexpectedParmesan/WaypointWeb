var COOKIE = {
  setCookie: function(name, value, expiration){
    var string = encodeURIComponent(name)+ '=' + encodeURIComponent(value);
    string += ';expires=' + expiration.toUTCString();
    document.cookie = string; 
  },
  getCookie: function(name){
    var nameLength = name.length;
    var cookies = document.cookie.split(';');
    var i, value, result;

    for (i = 0; i < cookies.length; i++){
      value = (cookies[i][0] === ' ') ? cookies[i].slice(1) : cookies[i];
      value = decodeURIComponent(value);
      if (value.slice(0, nameLength) === name) {
        result = cookies[i].split('=');
        return result[1];
      }
      return false; // return false if no cookie is found
    } 
  },
  deleteCookie: function(name){
    document.cookie = encodeURIComponent(name) + '=;' + 'Thu, 01 Jan 1970 00:00:01 GMT';
    return !getCookie(name); // should return true if cookie was successfully deleted
  },
};

module.exports = COOKIE;