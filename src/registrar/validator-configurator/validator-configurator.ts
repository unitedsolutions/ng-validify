import _                   from 'lodash';
import dataInitializer     from './data-initializer/data-initializer';
import dependentsRegistrar from './dependents-registrar/dependents-registrar';
import preprocessor        from './preprocessor/preprocessor';
import elementsInitializer from './elements-initializer/elements-initializer';
import errorGenerator      from './error-generator/error-generator';
import validatorBuilder    from './validator-builder/validator-builder';

export default validatorDeclaration => {
  let dataNames = ['async', 'checkbox', 'validatorName', 'directiveNamePrefixed', 'validatorNamePrefixed'];
  let supplementalData = _.pick(validatorDeclaration, dataNames);
  let configurator = (control, configs, el) => {
    dataInitializer(control, el);
    dependentsRegistrar(control);
    configs = preprocessor(control, configs, validatorDeclaration);
    elementsInitializer(control, validatorDeclaration);
    errorGenerator(control, configs, validatorDeclaration);
    return validatorBuilder(control, configs, validatorDeclaration);
  };

  return _.extend(configurator, supplementalData);
};
