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
      createdAt: this.string(""),
      isActive: this.boolean(false),
      isStaff: this.boolean(false),
      isSuperuser: this.boolean(false),
      isCurrent: this.boolean(false),
      token: this.string(""),
    };
  }
}
