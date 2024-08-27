import Cookies from "universal-cookie";

const cookies = new Cookies();

class CookieService {
  // GET COOKIES
  get(name) {
    return cookies.get(name);
  }
  // SET COOKIES
  set(name, value, options) {
    cookies.set(name, value, options);
  }
  // REMOVE COOKIES
  remove(name) {
    cookies.remove(name);
  }
}

export default new CookieService();
