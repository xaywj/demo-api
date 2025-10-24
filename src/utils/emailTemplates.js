// This file will contain any email templates needed for the application
exports.resetPasswordTemplate = (resetUrl) => {
  return `
    
      Password Reset Request
      Hello,
      You are receiving this email because you (or someone else) has requested the reset of your password.
      Please click on the button below to reset your password. This link will be valid for 10 minutes.
      
        Reset Password
      
      If you did not request this, please ignore this email and your password will remain unchanged.
      This is an automated email, please do not reply to this message.
    
  `;
};