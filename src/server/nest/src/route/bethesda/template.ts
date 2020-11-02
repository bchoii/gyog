const businessname = 'Bethesda Medical Centre';

export const welcometemplate = patient => `Hi ${patient.name}, this is Beth, your virtual assistant from ${businessname}. You will be reminded for your follow up appointment in a few months' time. And thank you for coming to ${businessname} today.

Here is the link to Data Protection Notice and Terms and Conditions for using this service. https://www.bethesdamedical.com.sg/privacy-policy/

By using this service, you acknowledge that you have read and understood the above Data Protection Notice, and consent to the collection, use and disclosure of my personal data by ${businessname} for the purposes set
out in the Notice.

To unsubscribe, click https://bethesda.que.bz/bethesda/unsub?ref=${patient.ref}`;

export const appointmentremindertemplate = patient => `Dear ${patient.name}, this is Beth from ${businessname}. Your next appointment is due in 7 days. Please click here to make your next appointment.

https://bethesda.que.bz/appointment?ref=${patient.ref}

To unsubscribe click https://bethesda.que.bz/bethesda/unsub?ref=${patient.ref}`;

export const medicationremindertemplate = patient => `Dear ${patient.name}, this is Beth from ${businessname}. Your medication is running low. Please click below request for medicine resupply. Our nurses will contact you for verification.

https://bethesda.que.bz/bethesda/request?ref=${patient.ref}

To unsubscribe click https://bethesda.que.bz/bethesda/unsub?ref=${patient.ref}`;

export const paymentlinktemplate = prescription => `Dear ${prescription.patient.name}, this is Beth from ${businessname}. Your prescription is ready. Please click below to make payment. Delivery will be made in about 3 days from payment.

https://bethesda.que.bz/stripe?code=${prescription.code}

To unsubscribe click https://bethesda.que.bz/bethesda/unsub?ref=${prescription.patient.ref}`;
