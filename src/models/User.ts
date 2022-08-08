export default class User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    role: string;

    constructor (id: number, email: string, firstName: string, lastName: string, password: string, role: string) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.role = role;
    }
}