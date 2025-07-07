class UserPublicDTO {
  constructor(user) {
    this.user_id = user.user_id;
    this.name = user.name;
    this.email = user.email;
    this.role = user.role;
    this.avatar = user.avatar;
    this.age = user.age;
  }
}

export default UserPublicDTO;
