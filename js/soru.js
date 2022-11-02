function Soru(soruMetni, cevapSecenekleri, dogruCevap) {
  this.soruMetni = soruMetni;
  this.cevapSecenekleri = cevapSecenekleri;
  this.dogruCevap = dogruCevap;
}

Soru.prototype.cevabiKontrolEt = function (cevap) {
  return cevap === this.dogruCevap;
};

let sorular = [
  new Soru(
    "1-Which one is not a string method?",
    { a: "slice", b: "trim", c: "pop", d: "split" },
    "c"
  ),
  new Soru(
    "2-Which method removes last element from array?",
    { a: "pop", b: "shift", c: "indexOf", d: "push" },
    "a"
  ),
  new Soru(
    "3- Which method adds new element to array (at the end)?",
    { a: "filter", b: "pop", c: "length", d: "push" },
    "d"
  ),
  new Soru(
    "4-Which method slices out a piece of an array?",
    { a: "charAt", b: "slice", c: "splice", d: "join" },
    "b"
  ),
];
