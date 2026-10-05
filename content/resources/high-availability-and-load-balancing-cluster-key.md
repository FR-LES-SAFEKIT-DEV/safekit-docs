---
title: "SafeKit Cluster Key: One-Month Trial for Windows and Linux High Availability"
canonical: "https://safekit.eviden.com/resources/high-availability-and-load-balancing-cluster-key/"
description: "Request your SafeKit cluster key for a one-month trial on Windows and Linux. SafeKit proposes a SANless architecture for simple, all-in-one high availability and application clustering without a SAN."
category: "resources"
lang: "en"
topics: "Receive a free SafeKit one-month license key by email for Windows or Linux, 🔍 SafeKit High Availability Navigation Hub"
---

# SafeKit Cluster Key: One-Month Trial for Windows and Linux High Availability

## Receive a free SafeKit one-month license key by email for Windows or Linux

This license key gives access to all SafeKit features: network load balancing, real-time replication and failover. After, you can replace it with a permanent license key without having to uninstall the product.

Once you receive the `license.txt` file by email, copy it to the following location on each node in the cluster:

* On Windows: `C:\safekit\conf\license.txt`
* On Linux: `/opt/safekit/conf/license.txt`

<script src="https://www.google.com/recaptcha/api.js" async defer></script>

<form class="safekit-trial-key-form" action="https://license.my.evidian.com/sek.asp" method="get" target="safekit-trial-key-result-frame" onsubmit="return safekitTrialKeyCaptchaValidated();">
  <label for="trial-key-email">Email address</label>
  <div class="safekit-trial-key-fields">
    <input id="trial-key-email" name="Email" type="email" autocomplete="email" required placeholder="name@example.com">
    <div class="g-recaptcha safekit-trial-key-captcha" data-sitekey="6Le7pcMtAAAAAJXkLnMzsIxNUBiAV-wzbuST3H2R"></div>
    <p class="safekit-trial-key-privacy">Your privacy is important to us. By submitting this form, you accept the terms in our <a href="https://eviden.com/privacy-policy/" target="_blank" rel="noopener">Privacy Policy</a>. Please read it to understand how we ensure your rights are upheld.</p>
    <button type="submit">Get a free trial key</button>
  </div>
  <p id="safekit-trial-key-captcha-error" class="safekit-trial-key-error" hidden>Please confirm that you are not a robot.</p>
</form>

<div class="safekit-trial-key-result">
  <iframe name="safekit-trial-key-result-frame" title="SafeKit trial key request result"></iframe>
</div>

<script>
  function safekitTrialKeyCaptchaValidated() {
    var captchaError = document.getElementById('safekit-trial-key-captcha-error');

    if (typeof grecaptcha === 'undefined' || !grecaptcha.getResponse()) {
      captchaError.hidden = false;
      return false;
    }

    var recaptchaResponses = document.querySelectorAll('.safekit-trial-key-form [name="g-recaptcha-response"]');
    for (var index = 0; index < recaptchaResponses.length; index++) {
      recaptchaResponses[index].disabled = true;
    }

    captchaError.hidden = true;
    return true;
  }
</script>

<style>
  .safekit-trial-key-form {
    max-width: 720px;
    margin: 1.5rem 0;
  }

  .safekit-trial-key-form label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 700;
  }

  .safekit-trial-key-fields {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    align-items: stretch;
  }

  .safekit-trial-key-fields input {
    flex: 1 1 260px;
    min-height: 2.75rem;
    padding: 0.65rem 0.8rem;
    border: 1px solid #b8c2cc;
    border-radius: 4px;
    font: inherit;
  }

  .safekit-trial-key-captcha {
    flex: 0 0 304px;
  }

  .safekit-trial-key-privacy {
    flex: 1 0 100%;
    margin: 0;
  }

  .safekit-trial-key-error {
    margin: 0.75rem 0 0;
    color: #b00020;
    font-weight: 700;
  }

  .safekit-trial-key-error[hidden] {
    display: none !important;
  }

  .safekit-trial-key-fields button {
    min-height: 2.75rem;
    padding: 0.65rem 1rem;
    border: 0;
    border-radius: 4px;
    background: #005eb8;
    color: #fff;
    font: inherit;
    font-weight: 700;
    cursor: pointer;
  }

  .safekit-trial-key-fields button:hover,
  .safekit-trial-key-fields button:focus {
    background: #004986;
  }

  .safekit-trial-key-result {
    max-width: 920px;
    margin: 1.5rem 0;
  }

  .safekit-trial-key-result iframe {
    width: 100%;
    min-height: 520px;
    border: 1px solid #b8c2cc;
    border-radius: 4px;
    background: #fff;
  }
</style>


{{%  insert-safekit-hub-en  %}}
 


{{%  insert-safekit-4-buttons-en  %}}