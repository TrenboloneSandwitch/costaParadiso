async function getJSON(url) {
  const data = await fetch(url);
  return await data.json();
}

export default getJSON;
