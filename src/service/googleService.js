require('dotenv').config();
const { google } = require('googleapis');

/**
 * Configura um cliente OAuth2 autenticado.
 * @param {string} accessToken - O token de acesso do usuário.
 * @param {string} refreshToken - O token de atualização do usuário.
 * @returns {import('google-auth-library').OAuth2Client} O cliente OAuth2 configurado.
 */
function getAuthenticatedClient(accessToken, refreshToken) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
  );
  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  });
  return oauth2Client;
}

/**
 * Envia um e-mail usando a API do Gmail.
 * @param {string} accessToken - Token de acesso do Google.
 * @param {string} refreshToken - Token de atualização do Google.
 * @param {string} to - Destinatário do e-mail.
 * @param {string} subject - Assunto do e-mail.
 * @param {string} messageText - Corpo do e-mail.
 */
async function sendGmail(accessToken, refreshToken, to, subject, messageText) {
  const oauth2Client = getAuthenticatedClient(accessToken, refreshToken);
  const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

  const emailLines = [
    `To: ${to}`,
    `Subject: ${subject}`,
    'Content-Type: text/plain; charset=UTF-8',
    'MIME-Version: 1.0',
    '',
    messageText,
  ];
  const email = emailLines.join('\r\n');
  const base64EncodedEmail = Buffer.from(email).toString('base64url');

  try {
    console.log('A enviar e-mail...');
    const response = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: base64EncodedEmail,
      },
    });
    console.log('E-mail enviado com sucesso:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao enviar o e-mail:', error.response?.data || error.message);
    throw new Error(`Falha ao enviar e-mail: ${error.response?.data?.error?.message || error.message}`);
  }
}

/**
 * Cria um evento no Google Calendar.
 * @param {string} accessToken - Token de acesso do Google.
 * @param {string} refreshToken - Token de atualização do Google.
 * @param {object} eventDetails - Detalhes do evento a ser criado.
 * @returns {Promise<object>} O evento criado.
 */
async function createCalendarEvent(accessToken, refreshToken, eventDetails) {
  const oauth2Client = getAuthenticatedClient(accessToken, refreshToken);
  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

  try {
    console.log('Criando evento no calendário...');
    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: eventDetails,
      sendNotifications: true,
    });
    console.log('Evento criado: %s', response.data.htmlLink);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar evento no calendário:', error.response?.data || error.message);
    throw new Error(`Falha ao criar evento no calendário: ${error.response?.data?.error?.message || error.message}`);
  }
}

/**
 * Atualiza um evento existente no Google Calendar.
 * @param {string} accessToken - Token de acesso do Google.
 * @param {string} refreshToken - Token de atualização do Google.
 * @param {string} eventId - ID do evento a ser atualizado.
 * @param {object} eventDetails - Novos detalhes para o evento.
 * @returns {Promise<object>} O evento atualizado.
 */
async function updateCalendarEvent(accessToken, refreshToken, eventId, eventDetails) {
  const oauth2Client = getAuthenticatedClient(accessToken, refreshToken);
  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

  try {
    console.log('Atualizando evento no calendário...');
    const response = await calendar.events.update({
      calendarId: 'primary',
      eventId: eventId,
      resource: eventDetails,
      sendNotifications: true,
    });
    console.log('Evento atualizado: %s', response.data.htmlLink);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar evento no calendário:', error.response?.data || error.message);
    throw new Error(`Falha ao atualizar evento no calendário: ${error.response?.data?.error?.message || error.message}`);
  }
}

/**
 * Cancela (deleta) um evento no Google Calendar.
 * @param {string} accessToken - Token de acesso do Google.
 * @param {string} refreshToken - Token de atualização do Google.
 * @param {string} eventId - ID do evento a ser cancelado.
 */
async function deleteCalendarEvent(accessToken, refreshToken, eventId) {
  const oauth2Client = getAuthenticatedClient(accessToken, refreshToken);
  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

  try {
    console.log('Cancelando evento no calendário...');
    await calendar.events.delete({
      calendarId: 'primary',
      eventId: eventId,
      sendNotifications: true,
    });
    console.log('Evento cancelado com sucesso.');
  } catch (error) {
    if (error.code === 410) {
      console.log('O evento já foi removido do Google Calendar.');
      return;
    }
    console.error('Erro ao cancelar evento no calendário:', error.response?.data || error.message);
    throw new Error(`Falha ao cancelar evento no calendário: ${error.response?.data?.error?.message || error.message}`);
  }
}

module.exports = {
  sendGmail,
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent
};
