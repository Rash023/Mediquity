/* MEDICATION EMAIL TEMPLATE FOR EMAIL */
exports.medicationEmail = (
  userName,
  medicineName,
  type,
  dosage,
  time
) => {
  return `<!DOCTYPE html>
  <html>
  
  <head>
      <meta charset="UTF-8">
      <title>Medication Information</title>
      <style>
          body {
              background-color: #ffffff;
              font-family: Arial, sans-serif;
              font-size: 16px;
              line-height: 1.4;
              color: #333333;
              margin: 0;
              padding: 0;
          }
  
  
          .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              text-align: center;
          }
  
          .logo {
              max-width: 200px;
              margin-bottom: 20px;
          }
  
          .message {
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 20px;
          }
  
          .body {
              font-size: 16px;
              margin-bottom: 20px;
          }
  
          .cta {
              display: inline-block;
              padding: 10px 20px;
              background-color: #FFD60A;
              color: #000000;
              text-decoration: none;
              border-radius: 5px;
              font-size: 16px;
              font-weight: bold;
              margin-top: 20px;
          }
  
          .support {
              font-size: 14px;
              color: #999999;
              margin-top: 20px;
          }
  
          .highlight {
              font-weight: bold;
          }
      </style>
  
  </head>
  
  <body>
      <div class="container">
      <a href="http://localhost:3000">Mediquity</a>
          <div class="message">Medication Information</div>
          <div class="body">
            <p>Dear ${userName},</p>
            <p>Thank you for providing your medication details. Here's the information:</p>
            <p>Medicine Name: ${medicineName}</p>
            <p>Type: ${type}</p>
            <p>Dosage: ${dosage}</p>
            <p>Time: ${time}</p>
          </div>
          <div class="support">If you have any questions or concerns, feel free to contact us at <a href="mailto:info@example.com">info@example.com</a>.</div>
      </div>
  </body>
  
  </html>`;
};
