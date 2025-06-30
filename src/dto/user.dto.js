class UserDTO {
  constructor({
    firstName,
    lastName,
    email,
    password,
    avatar,
    age,
    role = "user",
  }) {
    this.name = `${firstName} ${lastName}`;
    this.email = email;
    this.password = password; // This will be hashed in the repository
    this.avatar =
      avatar || "https://cdn-icons-png.flaticon.com/512/266/266033.png";
    this.age = age;
    this.role = role;
  }
}

export default UserDTO;
