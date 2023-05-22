const markupItem = ({
  id,
  cl,
  cost,
  year,
  avaliableAmount,
  fixedPrice,
  quality,
  description, 
    imgURL }) => `
  <div class="viewed-wine">
  <button class="liked-wine" id=${id}>
        <svg class="heart" class="heart" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0123 5.57169L10.9253 4.48469C8.7774 2.33681 5.29499 2.33681 3.14711 4.48469C0.999223 6.63258 0.999223 10.115 3.14711 12.2629L11.9859 21.1017L11.9877 21.0999L12.0141 21.1262L20.8529 12.2874C23.0008 10.1395 23.0008 6.65711 20.8529 4.50923C18.705 2.36134 15.2226 2.36134 13.0747 4.50923L12.0123 5.57169ZM11.9877 18.2715L16.924 13.3352L18.3748 11.9342L18.3762 11.9356L19.4387 10.8732C20.8055 9.50635 20.8055 7.29028 19.4387 5.92344C18.0719 4.55661 15.8558 4.55661 14.4889 5.92344L12.0134 8.39904L12.0061 8.3918L12.005 8.39287L9.51107 5.89891C8.14423 4.53207 5.92815 4.53207 4.56132 5.89891C3.19449 7.26574 3.19449 9.48182 4.56132 10.8487L7.10075 13.3881L7.10254 13.3863L11.9877 18.2715Z" fill="#ABADB3"/>
        </svg>
    </button>
    <a class="viewed-wine-link" href='wine?id=${id}'>
    <div class="img-and-nameOfWine" style="background-image: url('${imgURL}');">
        <p class="nameOfWine">${description}</p>
        <p class="year">${year}</p>
    </div>
    <div class="wine-description">
        <div class="first-section">
            <div class="amount">
                <p class="wine-description-amount">${avaliableAmount} bottles <span>aviable</span></p>
            </div>
            <div class="cost">
                <p class="wine-description-cost">€${cost} <span>/ ${cl}cl</span></p>
            </div>
        </div>
        <div class="second-section">
            <div class="quality">
                <p class="wine-description-quality">${quality} <span>condition</span></p>
            </div>
            <div class="price">
                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 7V4.77778C5.5 3.24365 6.84315 2 8.5 2C10.1569 2 11.5 3.24365 11.5 4.77778V7M8.5 11.01V11M4.5 15H12.5C13.6046 15 14.5 14.1046 14.5 13V9C14.5 7.89543 13.6046 7 12.5 7H4.5C3.39543 7 2.5 7.89543 2.5 9V13C2.5 14.1046 3.39543 15 4.5 15Z" stroke="#434960" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <p class="wine-description-price">Fixed price</p>
            </div>
        </div>
      </div>
      </a>
    <button class="buy" id="b${id}" ${!avaliableAmount && 'disabled'}>Buy</button> 
    </div>
`