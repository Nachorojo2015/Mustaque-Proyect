export function randomOrder() {
  let order = "";
  let x = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
  for (let i = 0; i < 5; i++) {
    const randomNumber = Math.floor(Math.random() * x.length);
    order += x[randomNumber];
  }
  return order;
}
