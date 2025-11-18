# Email Tracking with Gmail.js

This guide shows you how to track emails that have been sent using Gmail.js.

## Overview

Gmail.js provides a simple API for tracking sent emails through the `gmail.track` namespace. This is perfect for:
- Analytics and monitoring
- Email delivery confirmation
- Logging sent emails
- Building email tracking features

## Basic Usage

### Track Sent Emails

```javascript
const gmail = new Gmail();

// Track all sent emails
gmail.track.sent_emails(function(emailData, url, body, xhr) {
    console.log('Email sent!');
    console.log('To:', emailData.to);
    console.log('Subject:', emailData.subject);
    console.log('Body:', emailData.body);
});
```

### Track Scheduled Emails

```javascript
// Track emails scheduled for later
gmail.track.scheduled_emails(function(emailData, url, body, xhr) {
    console.log('Email scheduled!');
    console.log('To:', emailData.to);
    console.log('Scheduled time:', emailData.scheduled_time);
});
```

### Track All Emails (Sent + Scheduled)

```javascript
// Track both sent and scheduled emails
gmail.track.all_emails(function(emailData, type, url, body, xhr) {
    if (type === 'sent') {
        console.log('Email sent immediately');
    } else if (type === 'scheduled') {
        console.log('Email scheduled for later');
    }
    
    console.log('Email data:', emailData);
});
```

## Email Data Structure

The `emailData` object contains information about the sent email:

```javascript
{
    to: ['recipient@example.com'],           // Array of recipients
    cc: ['cc@example.com'],                  // CC recipients
    bcc: ['bcc@example.com'],                // BCC recipients
    subject: 'Email Subject',                // Email subject
    body: 'Email body content...',           // Email body (HTML or plain text)
    from: 'sender@example.com',              // Sender email
    thread_id: '1234567890abcdef',           // Thread ID
    message_id: 'msg-a:r123',                // Message ID
    scheduled_time: 1234567890,              // Unix timestamp (for scheduled emails)
    // ... additional fields
}
```

## Advanced Examples

### Save Sent Emails to Database

```javascript
gmail.track.sent_emails(function(emailData) {
    // Send to your backend API
    fetch('/api/emails/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            to: emailData.to,
            subject: emailData.subject,
            sentAt: new Date().toISOString(),
            threadId: emailData.thread_id
        })
    });
});
```

### Email Analytics

```javascript
let emailsSentToday = 0;
let emailsByRecipient = {};

gmail.track.sent_emails(function(emailData) {
    emailsSentToday++;
    
    // Track by recipient
    emailData.to.forEach(function(recipient) {
        emailsByRecipient[recipient] = (emailsByRecipient[recipient] || 0) + 1;
    });
    
    console.log('Emails sent today:', emailsSentToday);
    console.log('By recipient:', emailsByRecipient);
});
```

### Notification System

```javascript
gmail.track.sent_emails(function(emailData) {
    // Show browser notification
    if (Notification.permission === 'granted') {
        new Notification('Email Sent!', {
            body: `To: ${emailData.to.join(', ')}\nSubject: ${emailData.subject}`,
            icon: '/path/to/icon.png'
        });
    }
});
```

### Debug Logger

```javascript
// Use the built-in logger for debugging
gmail.track.sent_emails(gmail.track.logger('MY APP'));

// Or with custom prefix
gmail.track.sent_emails(gmail.track.logger('Email Tracker'));
```

## Use Cases

1. **Email Delivery Confirmation** - Track when emails are successfully sent
2. **Email Analytics Dashboard** - Build analytics for sent emails
3. **Email Backup System** - Automatically backup all sent emails
4. **Compliance and Auditing** - Log all sent emails for compliance
5. **Email Templates Tracking** - Track template usage
6. **A/B Testing** - Track different email variations

## Related

- [Gmail.js Documentation](../README.md)
- [Observer API](../README.md#observers)
- [Issue #646](https://github.com/KartikTalwar/gmail.js/issues/646) - Original feature request
