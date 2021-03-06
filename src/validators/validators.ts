import depsValidator         from "./deps/deps";
import emailValidator        from "./email/email";
import emailGovValidator     from "./email-gov/email-gov";
import equalsToValidator     from "./equals-to/equals-to";
import maxLengthValidator    from "./max-length/max-length";
import minLengthValidator    from "./min-length/min-length";
import patternValidator      from "./pattern/pattern";
import requiredValidator     from "./required/required";
import requiredTrueValidator from "./required-true/required-true";
import uniqueCheckValidator  from "./unique-check/unique-check";
import passwordValidator     from "./password/password";

export default [
  depsValidator,
  requiredValidator,
  minLengthValidator,
  maxLengthValidator,
  patternValidator,
  emailValidator,
  emailGovValidator,
  equalsToValidator,
  requiredTrueValidator,
  uniqueCheckValidator,
  passwordValidator,
];
