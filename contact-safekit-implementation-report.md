# SafeKit Contact Form Implementation Report

## Scope

This report summarizes the SafeKit contact form implementation in this repository, reviewed on 2026-10-15.

## Contact Form

`content/contact-safekit.md` defines a standalone Hugo page at `/contact-safekit/`. It is a separate alternative to the existing contact page, which embeds Evidian's external form.

The form:

- Posts by `POST` to FormSubmit, with an email subject configured as `[safekit.eviden.com] CONTACT_EN / Information / High Availability` and an absolute `_next` redirect to the confirmation page.
- Collects inquiry type (Information, Price, or Other), first and last name, company, country, optional free-text inquiry, and a required Yes/No opt-in.
- Uses browser-native required-field and email validation, input length limits, and autocomplete hints.
- Includes FormSubmit's CAPTCHA flag, a hidden honeypot field, an Eviden privacy-policy notice, and a submit button.
- Loads dedicated CSS and JavaScript. The JavaScript prefills matching text/select fields and the opt-in radio from URL query parameters; unknown or unmatched values are ignored.

## Confirmation Page

`content/confirmation-safekit.md` defines `/confirmation-safekit/`. The page presents a thank-you message, says the request will be processed, and provides a link back to browse SafeKit. It uses the contact stylesheet and a status region for assistive technology.

## Generated output and caveats

The generated site output includes the contact page and confirmation page, plus the contact CSS and query-prefill JavaScript.

The form delivery and redirect depend on the external FormSubmit service. The repository contains no server-side submission handler, so successful delivery, CAPTCHA behavior, and redirect behavior were not verified. Also, the configured email subject remains the same for all inquiry types, including Price and Other; confirm whether that static subject is intentional. The existing embedded contact form remains in place.

## Source files inspected

- `content/contact-safekit.md`
- `static/css/contact-safekit.css`
- `static/js/contact-safekit-query.js`
- `content/confirmation-safekit.md`
- `content/fr/contact-safekit.md`
- `content/fr/confirmation-safekit.md`
- `content/contact-us-for-safekit.md`
