export class User {

    public username: string;

    /**
     * comes after 
     */
    /**
     * comes after
     */

    public id!: string;

    public email_address!: string;
    public first_name!: string;
    public last_name!: string;

    public memberOf!: string[];
    public declaredMemberOf!: string[];

    public path!: string;

    public barcode!: string;
    public sala!: string;
    public deviceName!: string;

    constructor(username: string){
        this.username = username;
    }

    public Groups!: string[];

}
