const methodSelect = document.getElementById('method');
const key2Group = document.getElementById('key2Group');
const form = document.getElementById('cryptoForm');
const resultBox = document.getElementById('resultBox');
const resultText = document.getElementById('resultText');
const copyBtn = document.getElementById('copyBtn');
const textInput = document.getElementById('text');

methodSelect.addEventListener('change', () => {
  const val = methodSelect.value;
  key2Group.style.display = (val === 'encrypt2' || val === 'decrypt2') ? 'block' : 'none';
  textInput.placeholder = (val === 'decrypt1' || val === 'decrypt2')
    ? 'Masukkan kode hasil encrypt'
    : 'Masukkan teks';
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const method = methodSelect.value;
  const text = encodeURIComponent(document.getElementById('text').value.trim());
  const key1 = encodeURIComponent(document.getElementById('key1').value.trim());
  const key2 = encodeURIComponent(document.getElementById('key2').value.trim());

  if (!text || !key1) {
    alert('Text dan Key wajib diisi!');
    return;
  }

  let url = '';
  if (method === 'encrypt1') {
    url = `https://api.fikmydomainsz.xyz/crypto/encrypt?text=${text}&key=${key1}`;
  } else if (method === 'decrypt1') {
    url = `https://api.fikmydomainsz.xyz/crypto/decrypt?text=${text}&key=${key1}`;
  } else if (method === 'encrypt2') {
    if (!key2) {
      alert('Key2 wajib diisi untuk Encrypt Double Key!');
      return;
    }
    url = `https://api.fikmydomainsz.xyz/crypto/encrypt2?text=${text}&key1=${key1}&key2=${key2}`;
  } else if (method === 'decrypt2') {
    if (!key2) {
      alert('Key2 wajib diisi untuk Decrypt Double Key!');
      return;
    }
    url = `https://api.fikmydomainsz.xyz/crypto/decrypt2?text=${text}&key1=${key1}&key2=${key2}`;
  }

  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.status) {
      resultText.textContent = data.cipher || data.plain;
      resultBox.style.display = 'block';
    } else {
      resultText.textContent = 'Error: ' + (data.error || 'Unknown error');
      resultBox.style.display = 'block';
    }
  } catch (err) {
    resultText.textContent = 'Request gagal: ' + err.message;
    resultBox.style.display = 'block';
  }
});

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(resultText.textContent).then(() => {
    copyBtn.textContent = 'Tersalin!';
    setTimeout(() => {
      copyBtn.textContent = 'Salin Hasil';
    }, 1500);
  });
});
