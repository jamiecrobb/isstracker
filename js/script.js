const iss = document.getElementById("iss");
const latitude = document.getElementById("latitude");
const longitude = document.getElementById("longitude");

async function fetchText() {
  let response = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
  //console.log(response.status); // 200
  //console.log(response.statusText); // OK
  if (response.status === 200) {
    let data = await response.text();
    //console.log(data);
    return JSON.parse(data);
  } else {
    console.log("Something went wrong!");
  }
}

const move_iss = async (input) => {
  let data = await input;
  const lat = data.latitude;
  const long = data.longitude;
  x_pos = find_xpos(long);
  y_pos = find_ypos(lat);
  iss.style.left = x_pos + "px";
  iss.style.top = y_pos + "px";
  latitude.innerHTML = `${lat}°`;
  longitude.innerHTML = `${long}°`;
};

const find_xpos = (long) => {
  const x_pos = 400 + long * (450 / 180);
  return x_pos;
};

const find_ypos = (lat) => {
  const y_pos = 200 - lat * (225 / 90);
  return y_pos;
};

const fn10secs = () => {
  data = fetchText();
  move_iss(data);
};
fn10secs();
setInterval(fn10secs, 1000);
