// middleware/auth-layout.global.ts
export default defineNuxtRouteMiddleware((to) => {
  // const { locale } = useLocale()

  // console.log(to.path, locale.value);

  setPageLayout('default')
})