var serialize = function (obj, prefix) {
  var str = [];
  for(var p in obj) {
    if (obj.hasOwnProperty(p)) {
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
  api: {
    error: 'http://mycode.in.ua/app/rovese/error.json',
    success: 'http://mycode.in.ua/app/rovese/success.json',
    //login: 'http://mycode.in.ua/app/rovese/login.json',
    login: 'http://rovese.jaya-test.com/api/login',
    registration: 'http://rovese.jaya-test.com/api/register',
    profile: 'http://rovese.jaya-test.com/api/profile',
    statistics: 'http://rovese.jaya-test.com/api/sellers',

    user: 'http://mycode.in.ua/app/rovese/user.json',
    seller: 'http://mycode.in.ua/app/rovese/seller.json',
    bonuses: 'http://mycode.in.ua/app/rovese/bonuses.json',
    //statistics: 'http://mycode.in.ua/app/rovese/statistics.json',
  }
}

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
