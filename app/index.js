import { html, load } from "emmy-dom";

export function app({el}) {
  el.className = 'flex flex-col justify-center items-center space-y-3 text-center w-full h-full text-white'

  const base = 'eanorambuena.github.io/short'

  const encrypt = (url) => {
    return `${base}/?${url
      .replace(/https:\/\/outlook.office365.com\/mail\/inbox\/id\//g, '~01~')
      .replace(/https:\/\/uccl0.sharepoint.com\//g, '~02~')
      .replace(/https:\/\//g, '~0')
      .replace(/http:\/\//g, '~1')
      .replace(/www./g, '~2')
      .replace(/.com/g, '~3')
      .replace(/.org/g, '~4')
      .replace(/ing/g, '~5')
      .replace(/login/g, '~6')
      .replace(/\//g, '~7')
    }`
  }

  const decrypt = (url) => {
    return url
      .replace(/~01~/g, 'https://outlook.office365.com/mail/inbox/id/')
      .replace(/~02~/g, 'https://uccl0.sharepoint.com/')
      .replace(/~0/g, 'https://')
      .replace(/~1/g, 'http://')
      .replace(/~2/g, 'www.')
      .replace(/~3/g, '.com')
      .replace(/~4/g, '.org')
      .replace(/~5/g, 'ing')
      .replace(/~6/g, 'login')
      .replace(/~7/g, '/')
  }

  const [result, setResult] = el.useState('')

  el.useEffect(() => {
    const url = window.location.search.slice(1)
    if (url === '') return
    console.log(decrypt(url))
    window.location.replace(decrypt(url))
  }, ['didMount'])

  el.useEffect(() => {
    const $input = el.querySelector('input')
    const $form = el.querySelector('form')

    $form.addEventListener('submit', () => {
      const url = $input.value
      if (url === '') return
      setResult(encrypt(url))
      navigator.clipboard.writeText(result())
    })
  }, ['didMount'])

  return () => html`
    <h1 class="text-3xl font-bold">URL Shortener</h1>
    <form class="p-6 rounded-md bg-gray-800 flex flex-col space-y-3 items-center w-[90%]">
      <input class="p-2 rounded-md text-black w-full" placeholder="Enter URL" type="text">
      <button class="p-2 rounded-md bg-gray-800 w-full" type="submit">Shorten</button>
      <p class="p-2 rounded-md w-full">${result()}</p>
    </form>
  `
}

export const App = load(app, 'App')
