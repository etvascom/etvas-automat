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
        z-index: 10;
    `,
  iframe: `
        height: 100%;
        width: 100%;
        border:none;
    `
}

export const openDetails = pId => {
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
    document.body.removeChild(detailsContainer)
  })

  const locale = config.get('locale', 'en')
  const iframeEl = document.createElement('iframe')
  iframeEl.src = `${process.env.ETVAS_BASE_URL}/embed/${locale}/product/${pId}/details`
  iframeEl.style = css.iframe

  detailsContainer.appendChild(detailsHeader)
  detailsContainer.appendChild(iframeEl)

  document.body.appendChild(detailsContainer)
}
