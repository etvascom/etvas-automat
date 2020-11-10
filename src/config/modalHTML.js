import { bgImg } from './b64BgImg'

export const css = {
  cardLink: `
    padding: 10px;
    background-image: ${bgImg} ;
    background-position: center center;
    width: 400px;
    display: flex;
    flex-direction: column;
    font-size: 15px;
    border-radius: 10px;
    background-color: #ffffff;
    color: #fff;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
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
  border: none;
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
  background-color: #00c0fc;
  margin-bottom: 15px;
  `,
  aLink: `
  color: #d3d3d3;
  text-decoration: underline;
  `
}

export const modal = `
<div style="${css.cardLink}" id="etvas-link">
<div style="${css.header}">
  <p>Value Added Services with Etvas</p>
  <a style="color: white" href="#" class="etvas-close" id="etvas-close-x" >
    <i class="fas fa-times"></i>
  </a>
</div>

<div>
  <p style="${css.container}">
    We work with Etvas to deliver relevant and personalised value added
    services to you. In order to deliver this service Etvas needs access
    to some of your personal information such as transaction and account
    data. Sharing this information does not allow Etvas to perform
    transactions on your account or on your behalf.
  </p>
</div>

<div style="${css.actions}">
  <button style="${css.button}" id="etvas-connect">CONNECT</button>
  <a href="#" style="${css.aLink}" id="etvas-close"> No, thanks!</a>
</div>
</div>
`
