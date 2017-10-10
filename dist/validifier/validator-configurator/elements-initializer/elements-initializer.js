import errorsContainerBuilder from './errors-container-builder/errors-container-builder';
import asyncContainerBuilder from './async-container-builder/async-container-builder';
export default function (settings, control, validatorDeclaration) {
    errorsContainerBuilder(settings, control);
    asyncContainerBuilder(settings, control, validatorDeclaration);
};
//# sourceMappingURL=elements-initializer.js.map