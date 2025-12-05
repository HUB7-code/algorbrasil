const nodemailer = require('nodemailer');

// Configurar transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

const transporter = createTransporter();

// Verificar conexão
transporter.verify((error, success) => {
  if (error) {
    console.log('❌ Erro na configuração de email:', error.message);
    console.log('⚠️  Configure o .env com suas credenciais de email');
  } else {
    console.log('✅ Servidor de email pronto');
  }
});

// Enviar confirmação de newsletter
exports.sendNewsletterConfirmation = async (email) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Bem-vindo ao Estrategista de IA - Algor Brasil',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #B87333;">Bem-vindo ao Estrategista de IA!</h2>
        <p>Obrigado por se inscrever na nossa newsletter.</p>
        <p>Você receberá insights exclusivos sobre governança de IA diretamente no seu email.</p>
        <br>
        <p>Atenciosamente,</p>
        <p><strong>Equipe Algor Brasil</strong></p>
        <p style="color: #666; font-size: 12px;">Association for Algorithmization and Logic Governance Organization</p>
      </div>
    `
  };

  return transporter.sendMail(mailOptions);
};

// Enviar notificação de nova associação para a equipe
exports.sendAssociacaoNotification = async (data) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_FROM,
    subject: `Nova Solicitação de Associação - ${data.nome}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #B87333;">Nova Solicitação de Associação</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Nome:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.nome}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Empresa:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.empresa || 'Não informado'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Cargo:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.cargo || 'Não informado'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Interesse:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.interesse || 'Não informado'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Mensagem:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.mensagem || 'Nenhuma mensagem'}</td>
          </tr>
        </table>
      </div>
    `
  };

  return transporter.sendMail(mailOptions);
};

// Enviar confirmação de associação para o usuário
exports.sendAssociacaoConfirmation = async (email, nome) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Solicitação de Associação Recebida - Algor Brasil',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #B87333;">Solicitação Recebida!</h2>
        <p>Olá ${nome},</p>
        <p>Recebemos sua solicitação de associação à Algor Brasil.</p>
        <p>Nossa equipe analisará seu perfil e entrará em contato em breve.</p>
        <br>
        <p>Atenciosamente,</p>
        <p><strong>Equipe Algor Brasil</strong></p>
        <p style="color: #666; font-size: 12px;">Association for Algorithmization and Logic Governance Organization</p>
      </div>
    `
  };

  return transporter.sendMail(mailOptions);
};
