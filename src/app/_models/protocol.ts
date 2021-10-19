import { GETService } from "../get.service";
import { POSTService } from "../post.service";
import { ProtocolModel } from "./protocolOLD";

export class Protocol {
    protocolNumber!: string;
    private req_validate_protocol!: string;
    cardPath!: string;
    response!: Object;
  
    constructor(public servizioGet: GETService, private postService: POSTService) { }

    // createProtocol(){
    // this.servizioGet.getProtocol().subscribe(res =>{
    //       this.ProtocolNumber = res.protocol;
    //      });
    //      return this.ProtocolNumber;
    // }
    // setProtocol(newProtocolNumber : string){
    //   this.ProtocolNumber = newProtocolNumber;
    // }
    // getNumber(protocolNumber: string){
    //   if (this.checkProtocolNumber(protocolNumber)){
    //     return (this.createProtocol());
    //   }
    // }
    // checkProtocolNumber(checkprotocol : string){
    //   if(checkprotocol == undefined){
    //     return true;
    //   } else{
    //     return false;
    //   }
    // }
    validateProtocol(){
        // this.logger.log(logLevelModel.debug, ProtocolloService.name, "INIZIO - Validazione della comunicazione con il back-end.");
        let password: string;
        let protocol: string;
        
        
        // let req_validate_protocol: string; 
        this.servizioGet.getValidate().subscribe(res => {
            localStorage.setItem("pin", res.password)
            this.req_validate_protocol = res.password;
        }, error => console.log("Error: ", error),
        () => {

            this.generateProtocolNumber();
            // this.logger.log(logLevelModel.debug, ProtocolloService.name, "FINE - Validazione della comunicazione con il back-end.");
        }
        );
        // return protocol;
        // return req_validate_protocol;
        
    }
    // generateProtocolNumber(password: string){
        generateProtocolNumber(){
        // this.logger.log(logLevelModel.debug, ProtocolloService.name, "INIZIO - Generazione di un numero di protocollo.");
        let cardPath: string;
        let protocol: string;
        
        
        this.servizioGet.getProtocol(this.req_validate_protocol).subscribe(res => {
            cardPath = res.card_path;
            protocol = res.protocol;
            this.protocolNumber = res.protocol;
            this.cardPath = res.card_path;
        }, error => console.log("Error: ", error),
        () => {
            sessionStorage.setItem("cardPath", cardPath);
            sessionStorage.setItem("protocol", protocol);
            
            //this.saveProtocol(JSON.parse(sessionStorage.getItem("protocolBody")));
            // this.logger.log(logLevelModel.debug, ProtocolloService.name, "FINE - Generazione di un numero di protocollo.");
        }
        );
        // return protocol;

        
        


    }

    getProtocolNumber(){
        // let check = sessionStorage.getItem("protocol");
        let protocol = sessionStorage.getItem("protocol");
        // if (check == null || check == undefined || check == "" || check == "undefined"){
        if (protocol === undefined || protocol === null || protocol.trim().length === 0){
            this.validateProtocol();
            // this.generateProtocolNumber();

        } else {
            this.protocolNumber = protocol;
        }
        // return  protocol;
    }
    destroyProtocolNumber(){
        if (sessionStorage.getItem("protocol") == null || sessionStorage.getItem("protocol") == undefined || sessionStorage.getItem("protocol") == "" || sessionStorage.getItem("protocol") == "undefined"){
        } else {
        sessionStorage.removeItem("protocol");
        }
    }

    destroyProtocolCardPth(){
        if (sessionStorage.getItem("cardPath") == null || sessionStorage.getItem("cardPath") == undefined || sessionStorage.getItem("cardPath") == "" || sessionStorage.getItem("cardPath") == "undefined"){
        } else {
        sessionStorage.removeItem("cardPath");
        }
    }

    //Metodo per il salvataggio del protocollo.
    saveProtocol(data: Array < ProtocolModel > ) {
        // this.logger.log(logLevelModel.debug, ProtocolloService.name, "INIZIO - Salvataggio del protocollo.");
        data.forEach(element =>
        this.postService.postContent(element).subscribe(
            res => {
            this.response = res;
            },
            error => console.log(error),
            () => {
            sessionStorage.removeItem("protocolBody");
            // this.logger.log(logLevelModel.debug, ProtocolloService.name, "FINE - Salvataggio del protocollo.");
            }
        )
        )
    }
}
