const PRICE = 20000;
const ADMIN_WA = "6281367064147";

const qty = document.getElementById("quantity");
const minus = document.getElementById("minus");
const plus = document.getElementById("plus");
const itemTotal = document.getElementById("itemTotal");
const grandTotal = document.getElementById("grandTotal");

function rupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(value).replace("IDR", "Rp");
}

function updateTotal() {
  let n = parseInt(qty.value, 10) || 1;
  if (n < 1) n = 1;
  qty.value = n;
  const total = n * PRICE;
  itemTotal.textContent = rupiah(total);
  grandTotal.textContent = rupiah(total);
}

minus.addEventListener("click", () => {
  qty.value = Math.max(1, (parseInt(qty.value, 10) || 1) - 1);
  updateTotal();
});

plus.addEventListener("click", () => {
  qty.value = (parseInt(qty.value, 10) || 1) + 1;
  updateTotal();
});

qty.addEventListener("input", updateTotal);

document.getElementById("orderForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const note = document.getElementById("note").value.trim();
  const quantity = parseInt(qty.value, 10) || 1;
  const total = quantity * PRICE;

  const message =
`Halo Admin SERASA 👋

Saya ingin memesan:

Produk: Keripik Pedas SERASA
Jumlah: ${quantity} pouch
Harga: ${rupiah(total)}

Data Pemesan:
Nama: ${name}
No. WhatsApp: ${phone}
Alamat: ${address}${note ? `\nCatatan: ${note}` : ""}

Mohon konfirmasi ketersediaan dan proses pesanannya. Terima kasih.`;

  window.open(`https://wa.me/${ADMIN_WA}?text=${encodeURIComponent(message)}`, "_blank");
});

document.getElementById("year").textContent = new Date().getFullYear();
updateTotal();
