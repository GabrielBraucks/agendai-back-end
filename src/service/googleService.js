require('dotenv').config();
const { google } = require('googleapis');

async function sendGmail(accessToken, refreshToken, to, subject, messageText) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
  );

  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  const emailLines = [
    `To: ${to}`,
    `Subject: ${subject}`,
    'Content-Type: text/plain; charset=UTF-8',
    'MIME-Version: 1.0',
    '',
    messageText,
  ];
  const email = emailLines.join('\r\n');

  // 4. Codificar a mensagem em Base64URL (padrão para a API do Gmail em Node.js)
  const base64EncodedEmail = Buffer.from(email).toString('base64url');

  // 5. Obter uma instância da API do Gmail autenticada com o cliente OAuth2
  const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

  try {
    // 6. Enviar a mensagem
    console.log('A enviar e-mail...');
    const response = await gmail.users.messages.send({
      userId: 'me', // 'me' refere-se ao utilizador autenticado
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

module.exports = { sendGmail };