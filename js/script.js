const header = document.getElementById("content");
const iss = document.getElementById("iss");

header.addEventListener("click", () => {
  console.log("Clicked");
});

async function fetchText() {
  let response = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
  //console.log(response.status); // 200
  //console.log(response.statusText); // OK
  if (response.status === 200) {
    let data = await response.text();
    //console.log(data);
    return JSON.parse(data);
  }
}

const move_iss = async (input) => {
  let data = await input;
  const lat = data.latitude;
  const long = data.longitude;

  x_pos = find_xpos(long);
  console.log(x_pos);
  iss.style.position = "absolute";
  iss.style.left = x_pos + "vw";
};

const find_xpos = (long) => {
  const x_pos = 50 + long * (50 / 180);
  return x_pos;
};

const fn10secs = () => {
  data = fetchText();
  move_iss(data);
};
fn10secs();
setInterval(fn10secs, 10 * 1000);
