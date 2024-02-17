import { html, load } from "emmy-dom";

export function app({el}) {
  el.className = 'flex flex-col justify-center items-center space-y-3 text-center w-full h-full text-white'

  const base = 'eanorambuena.github.io/short'
  const aliasIndex ={
    'emmy-dom': 'https://www.npmjs.com/package/emmy-dom'
  }

  const encrypt = (url) => {
    if (Object.values(aliasIndex).includes(url)) {
      return `${base}/?${Object.keys(aliasIndex).find((key) => aliasIndex[key] === url)}`
    }

    const shorter = url
      .replace(/https:\/\/github.com\/eanorambuena\//g, '~h~')
      .replace(/https:\/\/outlook.office365.com\/mail\/inbox\/id\//g, '~g~')
      .replace(/https:\/\/uccl0.sharepoint.com\//g, '~f~')
      .replace(/https:\/\/www.notion.so\//g, '~e~')
      .replace(/https:\/\/www.npmjs.com\/package\//g, '~d~')
      .replace(/https:\/\/github.com\//g, '~c~')
      .replace(/.pages.dev/g, '~b~')
      .replace(/.github.io/g, '~a~')
      .replace(/.vercel.app/g, '~9~')
      .replace(/.netlify.app/g, '~8~')
      .replace(/www./g, '~7~')
      .replace(/.com/g, '~6~')
      .replace(/.org/g, '~5~')
      .replace(/ing/g, '~4~')
      .replace(/login/g, '~3~')
      .replace(/https:\/\//g, '~2~')
      .replace(/http:\/\//g, '~1~')
      .replace(/\//g, '~0~')
  
    return `${base}/?${shorter}`
  }

  const decrypt = (url) => {
    if (Object.keys(aliasIndex).includes(url)) {
      return aliasIndex[url]
    }

    return url
      .replace(/~h~/g, 'https://github.com/eanorambuena/')
      .replace(/~g~/g, 'https://outlook.office365.com/mail/inbox/id/')
      .replace(/~f~/g, 'https://uccl0.sharepoint.com/')
      .replace(/~e~/g, 'https://www.notion.so/')
      .replace(/~d~/g, 'https://www.npmjs.com/package/')
      .replace(/~c~/g, 'https://github.com/')
      .replace(/~b~/g, '.pages.dev')
      .replace(/~a~/g, '.github.io')
      .replace(/~9~/g, '.vercel.app')
      .replace(/~8~/g, '.netlify.app')
      .replace(/~7~/g, 'www.')
      .replace(/~6~/g, '.com')
      .replace(/~5~/g, '.org')
      .replace(/~4~/g, 'ing')
      .replace(/~3~/g, 'login')
      .replace(/~2~/g, 'https://')
      .replace(/~1~/g, 'http://')
      .replace(/~0~/g, '/')
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
