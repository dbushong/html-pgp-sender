let pubKeys = [];
const $ = document.getElementById.bind(document);

const MAX_CHARS = 2000;

function makeMailToURL(email, subject, body) {
  const url = new URL(`mailto:${email}`);
  url.searchParams.append('subject', subject);
  url.searchParams.append('body', body);
  return url.href;
}

function makeMailToLink(email, subject, body) {
  const a = document.createElement('a');
  a.href = makeMailToURL(email, subject, body);
  a.innerText = 'Send via E-mail';
  return a;
}

async function handleEncrypt() {
  const iPlusOne = $('to').selectedIndex;
  if (!iPlusOne) return;

  const msg = $('message').value.trim();
  if (!msg) {
    $('email-form').style.display = 'none';
    return;
  }

  const keys = pubKeys[iPlusOne - 1].keys;

  const { data } = await openpgp.encrypt({
    message: openpgp.message.fromText($('message').value),
    publicKeys: keys,
  });

  const { user } = await keys[0].getPrimaryUser();

  $('email-form').style.display = '';
  $('email-to').innerText = user.userId.userid;
  $('body').innerText = data;
  const count = makeMailToURL(
    user.userId.email, $('subject').value, data
  ).length;
  $('count').innerText = count;
  $('count-line').classList.toggle('over', count > MAX_CHARS);

  try {
    await navigator.clipboard.writeText(data);
  } catch (err) {
    console.error('failed to copy to clipboard', err);
  }
}

async function handleSend() {
  const [key] = pubKeys[$('to').selectedIndex - 1].keys;
  
  const { user } = await key.getPrimaryUser();

  const link = makeMailToLink(
    user.userId.email, $('subject').value, $('body').innerText
  );

  location.href = link;
}

async function handleToSelect() {
  const toElem = $('to');
  const msgElem = $('message');

  if (toElem.selectedIndex) {
    history.replaceState(null, '', `./?to=${toElem.value}`);
    if (/\S/.test(msgElem.value)) handleEncrypt();
  } else {
    history.replaceState(null, '', './');
    $('email-form').style.display = 'none';
  }

  msgElem.focus();
}

function listener(fn) {
  return e => {
    e.preventDefault();
    fn().catch(err => { alert(err.stack); });
    return false;
  };
}

async function init() {
  pubKeys = window.pubKeys = await Promise.all(
    pubKeyStrings.map(
      s => openpgp.key.readArmored(s.trim().replace(/^[ \t]+/gm, ''))
    )
  );

  const toElem = $('to');
  for (const { keys: [key] } of pubKeys) {
    const opt = document.createElement('option');
    const { user } = await key.getPrimaryUser();
    opt.value = key.getFingerprint();
    opt.innerText = user.userId.userid;
    toElem.appendChild(opt);
  }

  const q = new URLSearchParams(location.search);
  let reqTo = q.get('to');
  if (!reqTo && pubKeys.length === 1) {
    reqTo = pubKeys[0].keys[0].getFingerprint();
  }
  if (reqTo) {
    toElem.value = reqTo;
    await handleToSelect();
  }

  $('max-chars').innerText = MAX_CHARS;

  toElem.addEventListener('change', listener(handleToSelect));
  $('email-form').addEventListener('submit', listener(handleSend));
  for (const id of ['message', 'subject']) {
    $(id).addEventListener('keyup', e => {
      handleEncrypt();
      return true;
    });
  }
}
init().catch(err => {
  setTimeout(() => {
    throw err;
  }, 0);
});
