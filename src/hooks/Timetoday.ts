export default function timetoday() {
  let now: Date = new Date();
  let nowYear: number = now.getFullYear();
  let nowMonth: number = now.getMonth() + 1;
  let nowDate: number = now.getDate();

  let set: string = `${nowYear}-${nowMonth}-${nowDate}`;
  return set;
}
