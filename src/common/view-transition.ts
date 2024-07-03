export async function startViewTransition(callback: () => void){
  if (!document.startViewTransition) {
    callback()
    return
  }
  const transition = document.startViewTransition(() => {
    callback()
  })
  await transition.updateCallbackDone
}