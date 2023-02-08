export const setImagePath = (img: any) => {
  let temp: string[] = JSON.parse(img);
  let result: string[] = [];
  temp.map((data) => {
    let url = `http://localhost:8080/` + data.substring(7);
    result.push(url);
  });
  return result;
};
