import { title, text, button, abort, fallbackLanguage } from './i18n'

export const css = {
  card: `
    padding: 10px;
    background-image: url(https://scripts.etvas-automat.com/bg-connect.png);
    background-position: center center;
    background-repeat: no-repeat;
    width: 400px;
    display: flex;
    flex-direction: column;
    font-size: 15px;
    border-radius: 10px;
    background-color: #4f000c;
    color: #fff;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 10000;
    box-shadow: 0 0 40px #999999;`,
  container: `
    padding: 0 15px;
    line-height: 26px;
    font-size: 14px;
  `,
  header: `
    font-weight: bold;
    padding: 0 15px;
    font-size: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 32px;
  `,
  actions: `
    padding: 0 15px;
    margin-bottom: 20px;
    text-align: center;
  `,
  button: `width: 100%;
    border: 2px solid white;
    color: white;
    padding: 15px 1px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 18px;
    margin: 4px 2px;
    cursor: pointer;
    transition-duration: 0.4s;
    border-radius: 5px;
    font-weight: bold;
    background-color: transparent;
    margin-bottom: 15px;
  `,
  link: `
    color: #d3d3d3;
    text-decoration: underline;
  `
}

export const contents = lang => `<div style="${css.header}">
  <p>${title[lang] || title[fallbackLanguage]}</p>
  <a style="color: white;text-decoration:none;" href="#" class="etvas-connect-close">&times;</a>
</div>
<div>
  <p style="${css.container}">${text[lang] || text[fallbackLanguage]}</p>
</div>

<div style="${css.actions}">
  <button style="${css.button}" id="etvas-connect">${
  button[lang] || button[fallbackLanguage]
}</button>
  <a href="#" style="${css.link}" class="etvas-connect-close">${
  abort[lang] || abort[fallbackLanguage]
}</a>
</div>
`
