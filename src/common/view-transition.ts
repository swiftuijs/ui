export interface ITransitionOptions {
  update: () => void
  type: 'forwards' | 'backwards'
}

export async function startViewTransition(options: ITransitionOptions) {
  options.update()
  // if (!document.startViewTransition) {
  //   options.update()
  //   return
  // }
  // console.log('transition start')
  // // const transition = document.startViewTransition({
  // //   // @ts-expect-error fix this
  // //   update: options.update,
  // //   types: [options.type]
  // // })
  // const transition = document.startViewTransition(options.update)
  // // await transition.ready
  // await transition.updateCallbackDone
}