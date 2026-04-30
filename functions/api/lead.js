/**
 * POST /api/lead
 * Recibe los datos del formulario de contacto, valida, y reenvía a Tokko CRM.
 * La API key vive en env vars de CF Pages (TOKKO_API_KEY) — nunca en el browser.
 *
 * Env vars requeridas en CF Pages → Settings → Environment variables:
 *   TOKKO_API_KEY  →  la API key de Tokko
 */

const TOKKO_PROPERTY_ID = 7883154;
const TOKKO_ENDPOINT    = 'https://www.tokkobroker.com/api/v1/webcontact/';
const ALLOWED_ORIGIN    = 'https://larrazabal.akprop.com.ar';

function corsHeaders(origin) {
  const allowed = origin === ALLOWED_ORIGIN || origin === 'https://larrazabal-545.pages.dev';
  return {
    'Access-Control-Allow-Origin':  allowed ? origin : ALLOWED_ORIGIN,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };
}

// OPTIONS preflight
export async function onRequestOptions({ request }) {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(request.headers.get('origin') || ''),
  });
}

// POST handler
export async function onRequestPost({ request, env }) {
  const origin  = request.headers.get('origin') || '';
  const headers = corsHeaders(origin);

  // 1. Parsear body
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'invalid_body' }, 400, headers);
  }

  const nombre   = (body.nombre   || '').trim();
  const email    = (body.email    || '').trim();
  const contacto = (body.contacto || '').trim();
  const horario  = (body.horario  || '').trim();

  // 2. Validación básica
  if (!nombre || !email || !contacto) {
    return json({ ok: false, error: 'missing_fields' }, 400, headers);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ ok: false, error: 'invalid_email' }, 400, headers);
  }

  // 3. Armar mensaje para Tokko
  let text = `Consulta desde landing Larrazabal 545. Teléfono/WhatsApp: ${contacto}.`;
  if (horario) text += ` Disponibilidad: ${horario}.`;

  const payload = {
    name:     nombre,
    email:    email,
    phone:    contacto,
    text:     text,
    property: TOKKO_PROPERTY_ID,
  };

  // 4. Enviar a Tokko
  const apiKey = env.TOKKO_API_KEY;
  if (!apiKey) {
    console.error('TOKKO_API_KEY no configurada');
    return json({ ok: false, error: 'server_config_error' }, 500, headers);
  }

  let tokkoRes;
  try {
    tokkoRes = await fetch(`${TOKKO_ENDPOINT}?key=${apiKey}`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    });
  } catch (err) {
    console.error('Error de red al llamar Tokko:', err);
    return json({ ok: false, error: 'network_error' }, 502, headers);
  }

  if (!tokkoRes.ok) {
    const detail = await tokkoRes.text().catch(() => '');
    console.error(`Tokko respondió ${tokkoRes.status}:`, detail);
    return json({ ok: false, error: 'tokko_error', status: tokkoRes.status }, 502, headers);
  }

  return json({ ok: true }, 200, headers);
}

function json(data, status, headers) {
  return new Response(JSON.stringify(data), { status, headers });
}
