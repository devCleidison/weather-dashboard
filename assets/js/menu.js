let isMenu = false;
let toggleMenu = document.getElementById("toggleMenu");
let menu = document.getElementById("menu");


toggleMenu.addEventListener("click", () => {
  if (!isMenu) {
    menu.classList.add("on");
  } else{
    menu.classList.remove('on');
  }
  document.body.style.overflow = !isMenu ? 'hidden' : 'initial'
  isMenu = !isMenu;
});