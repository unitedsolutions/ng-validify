import * as _                                     from 'lodash';
import {Directive, Input, forwardRef, ElementRef} from '@angular/core';
import {HttpClientPlus}                           from 'ng-http-client-plus';
import {NG_VALIDATORS, NG_ASYNC_VALIDATORS}       from '@angular/forms';
import selectorAssembler                          from './_lib/selector-assembler';

export default validators => {
  return validators.map(validatorConfigurator => {
    let {async: _async, checkbox, validatorNamePrefixed} = validatorConfigurator;
    let {directiveNamePrefixed} = validatorConfigurator;
    let directiveName = directiveNamePrefixed || validatorNamePrefixed;
    let selector = selectorAssembler(directiveName, checkbox);

    let providers = [{
      provide: _async ? NG_ASYNC_VALIDATORS : NG_VALIDATORS,
      useExisting: forwardRef(() => ValidatorDirectiveClass),
      multi: true        
    }];
    
    @Directive({selector, providers}) class ValidatorDirectiveClass {
      private validator;
      private onChange;
      private control;
      @Input(`${directiveName}`) private configs;
    
      constructor(private el: ElementRef, private http: HttpClientPlus) {}
    
      ngOnChanges(changes) {
        if('configs' in changes) {
          if(!this.control) {
            return;
          }
          
          this.createValidator();
          if(this.onChange) {
            this.onChange();
          }
        }
      }
    
      validate(control?) {
        let error = {[directiveName]: true};
        
        if(_async) {
          _.extend(control, {http: this.http})
        }
        
        _.extend(this, {
          control, 
          validate() {
            return this.validator();
          }
        });
        
        this.createValidator();
        
        return _async ? Promise.resolve(error) : error; 
      }
    
      registerOnValidatorChange(fn) {
        this.onChange = fn; 
      }
    
      private createValidator() {
        this.validator = validatorConfigurator(this.control, this.configs, this.el);
        setTimeout(() => this.validate());
      }
    };

    return ValidatorDirectiveClass;
  });
};
