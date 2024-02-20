export function anwserFormatter(answer) {
  return answer.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '').replace(/\s/g, '').toLowerCase();
}
