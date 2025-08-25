import { isEmpty, isEmptyArray, isNullOrUndefined } from "./helpers";

export const useValidators = () => {
  // Reactive language cookie
  const languageCookie = useCookie("locale") || "ar";

  // 👉 Reactive RTL check (will update when cookie changes)
  const isAppRTL = computed(() => languageCookie.value === "ar");

  // 👉 Required Validator
  const requiredValidator = (value) => {
    if (isNullOrUndefined(value) || isEmptyArray(value) || value === false)
      return isAppRTL.value ? "هذا الحقل مطلوب" : "This field is required";

    return (
      !!String(value).trim().length ||
      (isAppRTL.value ? "هذا الحقل مطلوب" : "This field is required")
    );
  };

  // 👉 Email Validator
  const emailValidator = (value) => {
    if (isEmpty(value)) return true;

    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (Array.isArray(value))
      return (
        value.every((val) => re.test(String(val))) ||
        (isAppRTL.value
          ? "يجب أن يكون حقل البريد الإلكتروني صالحاً"
          : "The email field must be a valid email")
      );

    return (
      re.test(String(value)) ||
      (isAppRTL.value
        ? "يجب أن يكون حقل البريد الإلكتروني صالحاً"
        : "The email field must be a valid email")
    );
  };

  // 👉 Length Validator
  const lengthValidator = (value, length) => {
    if (isEmpty(value)) return true;

    return (
      String(value).length < length ||
      (isAppRTL.value
        ? `يجب أن يكون الحد الأقصى للأحرف على الأكثر ${length} حرفاً`
        : `The max characters must be at most ${length} characters`)
    );
  };

  return {
    requiredValidator,
    emailValidator,
    lengthValidator,
  };
};
