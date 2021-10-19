import { FieldType } from './field-type.enum';
import { FormField } from './form-field';
import { FormTextField } from './form-text-field';

describe('FormField', () => {
  it('should create an instance', () => {
    let propertyAuto: boolean = false;
    let propertyDescription: string = "test propertyDescription";
    let propertyMulti: boolean = false;
    let propertyName: string = "test propertyName";
    let propertyProtected: boolean = false;
    let propertyType: string = FieldType.text;
    
    expect(new FormField(propertyType)).toBeTruthy();
  });
});
