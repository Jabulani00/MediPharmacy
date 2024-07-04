import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as sgMail from '@sendgrid/mail';

admin.initializeApp();

sgMail.setApiKey('46QCPG9KUPFFJVQ2C1TV1MUV');

export const sendApprovalEmail = functions.firestore.document('Users/{userId}').onUpdate(async (change, context) => {
  const newValue = change.after.data();
  const previousValue = change.before.data();

  if (newValue.status === 'active' && previousValue.status === 'pending') {
    const msg = {
      to: newValue.email,
      from: 'medi@pharm.com',
      subject: 'Account Approved',
      text: `Hello ${newValue.name},\n\nYour account has been approved and is now active. You can now log in and start using the service.\n\nThank you.`,
      html: `<strong>Hello ${newValue.name},</strong><br><br>Your account has been approved and is now active. You can now log in and start using the service.<br><br>Thank you.`,
    };

    try {
      await sgMail.send(msg);
      console.log('Approval email sent successfully');
    } catch (error) {
      console.error('Error sending approval email:', error);
    }
  }
});
