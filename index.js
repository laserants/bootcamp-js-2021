const paragraphs = document.getElementsByTagName("p");

if (paragraphs.length > 0)
{
    const paragraph = paragraphs[0];
    paragraph.innerText = "Bienvenidos al bootcamp!";
}

if (paragraphs.length > 1)
{
    const paragraph = paragraphs[1];
    const fecha = new Date();
    paragraph.innerText = "parrafos en el documento: " + paragraphs.length + " (" + fecha + ")";
}