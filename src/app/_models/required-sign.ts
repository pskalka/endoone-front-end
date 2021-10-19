export class RequiredSign {

   public AuthorizedGroups: string[];

   public Label: string;

   constructor(label: string, authorizedGroups: string[]) {
      this.Label = label;
      this.AuthorizedGroups = authorizedGroups;
   }

}
