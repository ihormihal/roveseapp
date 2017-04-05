var serialize = function (obj, prefix) {
  var str = [];
  for(var p in obj) {
    if (obj.hasOwnProperty(p)) {
      if(obj[p] === "" || obj[p] === undefined){
        continue;
      }
      var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
      str.push(typeof v == "object" ?
        $rootScope.serialize(v, k) :
        encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
};

var validate = {
  email: function(email){
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
}

var dateConv = function(string){

  //var date = new Date(item.created_at);
  //(date.getDate()+' '+d.months[date.getMonth()]+' '+date.getFullYear())
  //console.log(date);


  var output = '';
  try {
    var dt = string.substring(0, 10).split('-');
    output = dt[2]+' '+d.months[parseInt(dt[1])-1]+' '+dt[0];
  } catch (error) {
    //console.log(error)
  }
  return output;
};

// var validate = {
//   email: function(email){
//     if(email.indexOf('@') !== -1 && email.indexOf(' ') !== -1){
//       var t = email.split('@');
//       if(t[0] && t[1] && t[1].indexOf('.') !== -1){
//         return true;
//       }
//     }
//     return false;
//   }
// }

export default {
  domain: 'http://rovese.jaya-test.com',
  api: {
    error: 'http://mycode.in.ua/app/rovese/error.json',
    success: 'http://mycode.in.ua/app/rovese/success.json'
  },
  serialize: serialize,
  valid: validate,
  dateConv: dateConv
}
