document.getElementById('torrentFile').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (!file) {
    alert('Por favor, selecione um arquivo .torrent.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const arrayBuffer = e.target.result;
    const uint8Array = new Uint8Array(arrayBuffer);
    const decoder = new TextDecoder('utf-8');
    const text = decoder.decode(uint8Array);

    const info = extractInfo(text);
    if (info) {
      const magnetLink = createMagnetLink(info);
      displayMagnetLink(magnetLink);
    } else {
      alert('Não foi possível extrair as informações do arquivo .torrent.');
    }
  };
  reader.readAsArrayBuffer(file);
});

function extractInfo(torrentData) {
  // Implementação simplificada para extrair o dicionário 'info'
  const infoMatch = torrentData.match(/4:info(.+?)6:length/i);
  if (infoMatch && infoMatch[1]) {
    return infoMatch[1];
  }
  return null;
}

function createMagnetLink(info) {
  const infoHash = sha1(info);
  return `magnet:?xt=urn:btih:${infoHash}`;
}

function displayMagnetLink(magnetLink) {
  const magnetLinkElement = document.getElementById('magnetLink');
  magnetLinkElement.href = magnetLink;
  magnetLinkElement.textContent = magnetLink;
  document.getElementById('magnetLinkContainer').classList.remove('hidden');
}

function sha1(str) {
  // Função simplificada para calcular o hash SHA-1
  // Em uma implementação real, utilize a API Web Crypto ou uma biblioteca externa
  return 'dummyhashvalue1234567890abcdef';
}
