function getElement(selection) {
  const element = document.querySelector(selection);
  if (element) {
    return element;
  }
  throw new Error(
    `Please check "${selection}" selector, no such element exists`
  );
}
class gallery {
  constructor(element) {
    this.container = element;
    this.list = [...element.querySelectorAll(".img")];
    this.modal = getElement(".modal");
    this.modalImg = getElement(".main-img");
    this.imageName = getElement(".image-name");
    this.modalImages = getElement(".modal-images");
    this.closeBtn = getElement(".close-btn");
    this.nextBtn = getElement(".next-btn");
    this.prevBtn = getElement(".prev-btn");

    // pointing to gallery
    this.closeModel = this.closeModel.bind(this);
    this.nextImage = this.nextImage.bind(this);
    this.prevImage = this.prevImage.bind(this);
    this.chooseImage = this.chooseImage.bind(this);
    // bind function
    this.container.addEventListener(
      "click",
      function (e) {
        if (e.target.classList.contains("img")) {
          this.openModel(e.target, this.list);
        }
      }.bind(this)
    );
  }
  openModel(selectedImage, list) {
    this.setMainImage(selectedImage);
    // using map to acces each img of the nature and city based on selected img
    this.modalImages.innerHTML = list
      .map(function (image) {
        return `<img src="${
          image.src
        }" title="${image.title}" data-id="${image.dataset.id}" class= "${image.dataset.id === image.dataset.id ? "modal-img selected" : "model-img"}" />`;
      })
      .join("");
    this.modal.classList.add("open");
    this.closeBtn.addEventListener("click", this.closeModel);
    this.nextBtn.addEventListener("click", this.nextImage);
    this.prevBtn.addEventListener("click", this.prevImage);
    this.modalImages.addEventListener("click", this.chooseImage);
  }
  setMainImage(selectedImage) {
    this.modalImg.src = selectedImage.src;
    this.imageName = selectedImage.title;
  }
  closeModel(){
    this.modal.classList.remove("open");
    this.closeBtn.removeEventListener("click", this.closeModel);
    this.nextBtn.removeEventListener("click", this.nextImage);
    this.prevBtn.removeEventListener("click", this.prevImage);
    this.modalImages.removeEventListener("click", this.chooseImage);
  }
  nextImage(){
    const selected = this.modalImages.querySelector(".selected");
    const next =
      selected.nextElementSibling || this.modalImages.firstElementChild;
    selected.classList.remove("selected");
    next.classList.add("selected");
    this.setMainImage(next);
  }
  prevImage(){
    const selected = this.modalImages.querySelector(".selected");
    const prev =
      selected.previousElementSibling || this.modalImages.lastElementChild;
    selected.classList.remove("selected");
    prev.classList.add("selected");
    this.setMainImage(prev);
  }
  chooseImage(e){
if (e.target.classList.contains("modal-img")) {
  const selected = this.modalImages.querySelector(".selected");
  selected.classList.remove("selected");
  this.setMainImage(e.target);
  e.target.classList.add("selected");
}
  }
};
const nature = new gallery(getElement(".nature"));
const city = new gallery(getElement(".city"));