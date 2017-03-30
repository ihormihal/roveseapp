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

export default {
  serialize: serialize,
  domain: 'http://rovese.jaya-test.com',
  api: {
    error: 'http://mycode.in.ua/app/rovese/error.json',
    success: 'http://mycode.in.ua/app/rovese/success.json'
  }
}


    // login:        'http://rovese.jaya-test.com/api/login',
    // registration: 'http://rovese.jaya-test.com/api/register',
    // profile:      'http://rovese.jaya-test.com/api/profile',
    // settings:     'http://rovese.jaya-test.com/api/profile',
    // statistics:   'http://rovese.jaya-test.com/api/sellers',
    // sellerReg:    'http://rovese.jaya-test.com/api/sellers',
    // seller:       'http://rovese.jaya-test.com/api/seller',

//логин (email, password) -> (token)
//регистрация (...) -> (success)
//восстановление пароля (email) -> новый пароль на почту
//данные профиля регионального представителя (GET)
//редактирование данных профиля
//регистрация продавца
//список зарегистрированных продавцов
//данные профиля продавца (GET)
//редактирование продавца
//все бонусы по продавцу (GET)
//запрос на списание бонусов продавца за определенный месяц
//письмо (subject, message) (2 типа - предложение и сообщить об ошибке)
