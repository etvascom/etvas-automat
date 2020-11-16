import { config } from './config'

const css = {
  closeButton: `
        padding: 15px 30px 0 0;
        position: absolute;
        top: 0;
        right: 0;
        `,
  detailsContainer: `
        background-color:white;
        width: 800px;
        height: 800px;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
    `,
  iframe: `
        height: 100%;
        width: 100%;
        border:none;
    `,
    modalWrapper: `
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    z-index: 10;
    background-color: rgba(255, 255, 255, .8);
    display: flex;
    align-items: center;
    `
}

export const openDetails = pId => {
  const modalWrapper = document.createElement('div')
  modalWrapper.style = css.modalWrapper

  const detailsContainer = document.createElement('div')
  detailsContainer.style = css.detailsContainer
  detailsContainer.id = 'etvas_product_details'

  const detailsHeader = document.createElement('div')
  detailsHeader.innerHTML = `
      <a  href="#" style="${css.closeButton}" id='etvas-close-details' >
      <i class="fas fa-times"></i>
      </a>
  `
  detailsHeader.addEventListener('click', function (e) {
    document.body.style.overflow = 'auto'
    document.body.removeChild(modalWrapper)
  })

  const locale = config.get('locale', 'en')
  const iframeEl = document.createElement('iframe')
  iframeEl.src = `${process.env.ETVAS_BASE_URL}/embed/${locale}/product/${pId}/details`
  iframeEl.style = css.iframe

  modalWrapper.appendChild(detailsContainer)
  detailsContainer.appendChild(detailsHeader)
  detailsContainer.appendChild(iframeEl)

  document.body.style.overflow = 'hidden'
  document.body.appendChild(modalWrapper)
}
