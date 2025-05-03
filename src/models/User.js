import { Model } from "pinia-orm";

export default class User extends Model {
  static entity = "users";
  static primaryKey = "uuid";

  static fields() {
    return {
      uuid: this.uid(""),
      firstName: this.string(""),
      lastName: this.string(""),
      email: this.string(""),
      password: this.string(""),
      phone: this.string(""),
    };
  }
}
