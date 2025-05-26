class User {
    id: string;
    name: string;
    email: string;
    passsword: string;
    role: string;

    constructor(
        id: string,
        name: string,
        email: string,
        passsword: string,
        role: string
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.passsword = passsword;
        this.role = role;
    }
}



export { User };