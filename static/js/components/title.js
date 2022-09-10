function titleCustom(title) {
    var titlePage = document.createElement("h1");
    titlePage.style.textAlign = "center";
    titlePage.style.fontSize = "50px";
    titlePage.style.marginBottom = "50px";
    titlePage.textContent = title
    return titlePage
}

export { titleCustom }