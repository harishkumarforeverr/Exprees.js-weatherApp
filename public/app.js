// fetch("https://puzzle.mead.io/puzzle").then((res) => {
//   res.json().then((data) => {
//     console.log(data);
//   });
// });
// fetch("http://localhost:9999/weather?address=india").then((res) => {
//   res.json().then((data) => console.log(data));
// });

const form = document.querySelector("form");
const input = document.querySelector("input");
const p1 = document.querySelector("#p1");
const p2 = document.querySelector("#p2");
form.addEventListener("submit", (e) => {
  p1.textContent = "loading ...";
  p2.textContent = "";
  e.preventDefault();
  if (!input.value) return (p1.textContent = "please enter a valid input");
  fetch("/weather?address=" + input.value).then((res) => {
    res.json().then((data) => {
      if (data.err) {
        return (p1.textContent = data.err);
      }
      const { address, describtion, forcast } = data;

      p1.textContent = forcast;
      p2.textContent = address + " " + describtion;
    });
  });
});
