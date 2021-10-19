export class ProtocolModel {
    name: string;
    value: string;
    type: string;
    multi: boolean;
    auto: boolean;
    ["protected"]: boolean;
    constructor(name: string, value: string, type: string, multi: boolean, auto: boolean, prot: boolean) {
        this.name = name;
        this.value = value;
        this.type = type;
        this.multi = multi;
        this.auto = auto;
        this.protected = prot;
    }
}
