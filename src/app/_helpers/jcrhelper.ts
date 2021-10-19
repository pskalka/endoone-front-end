import { SchedaSlingAttributeBean } from "../_models/SchedaSlingAttributeBean";

export class JcrHelper {

   static getJcrStringValue(items: SchedaSlingAttributeBean[], name: string): string {
      let item: SchedaSlingAttributeBean = items.find(s => s.name === name);
      if (item != null) {
         return `${item.value}`;
      } else {
         return null;
      }
   }

   static getJcrDateValue(items: SchedaSlingAttributeBean[], name: string): Date {
      let item: SchedaSlingAttributeBean = items.find(s => s.name === name);
      if (item != null) {
         return new Date(item.value);
      } else {
         return null;
      }
   }

   static getJcrNumberValue(items: SchedaSlingAttributeBean[], name: string): number {
      let item: SchedaSlingAttributeBean = items.find(s => s.name === name);
      if (item != null) {
         return Number.parseInt(`${item.value}`);
      } else {
         return null;
      }
   }

   static getJcrStringArrayValue(items: SchedaSlingAttributeBean[], name: string): string[] {
      let item: SchedaSlingAttributeBean = items.find(s => s.name === name);
      if (item != null) {
         let items: string[] = Array.from(item.value);
         let result: string[] = [];
         /*
            14 jun 2021 pskalka:
            json from Sling comes as this:
            [
               "[\"[\\\"protesi_dentaria\\\"\"",
               "\"\\\"protesi_acustica\\\"\"",
               "\"\\\"cellulare\\\"]\"]"
            ]
            so it must be cleaned by removing all: [, ], "
         */
         let re = /[\[\]\"\\]/g;
         items.forEach(x => {
            // console.log(x);
            let y = x.replace(re, "");
            // console.log(y);
            result.push(y);
         });
         return result;
      } else {
         return null;
      }
   }

   static getJcrBooleanValue(items: SchedaSlingAttributeBean[], name: string): boolean {
      let item: SchedaSlingAttributeBean = items.find(s => s.name === name);
      if (item != null) {
         return item.value;
      } else {
         return null;
      }
   }

}